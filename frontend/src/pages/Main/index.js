import React, { useEffect, useState } from 'react';
import Api from '../../services/Api';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import NewEntranceModal from '../../componets/Modal/NewEntrance';
import { MdAdd } from 'react-icons/md';
import { FaCircle, FaBookOpen, FaSignOutAlt } from 'react-icons/fa';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import useLoader from '../../componets/Loader/useLoader';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import moment from 'moment-timezone';

// import NewReleaseParkingSpaceModal from '../../componets/Modal/NewReleaseParkingSpace';
// import { Button, Modal } from 'react-bootstrap';

const { SearchBar } = Search;

export default function Main({ match }) {
	const parking_id = '5d87b172e44b6435d84252ea';

	const [loader, handleLoader] = useLoader();

	const [todayTicket, setTodayTicket] = useState('- -');
	const [availableParkingsSpace, setAvailableParkingsSpace] = useState('- -');
	const [activeParkingsSpace, setActiveParkingsSpace] = useState('- -');
	const [todayReservations, setTodayReservations] = useState('- -');
	const [checkInPending, setCheckInPending] = useState('- -');
	const [todayTicketPorcentage, setTodayTicketPorcentage] = useState('100%');
	const [pendingReservesList, setPendingReservesList] = useState([]);
	const [todayReservationsList, setTodayReservationsList] = useState([]);

	useEffect(() => {
		async function getItems() {
			const TodayTicket = await Api.get(
				`/select-today-ticket-reservations/?parking_id=${parking_id}`
			);

			const AvailableParkingSpace = await Api.get(
				`/select-available-parking-spaces/?parking_id=${parking_id}&available=${true}`
			);

			const ActiveParkingSpaces = await Api.get(
				`/select-active-parking-spaces/?parking_id=${parking_id}`
			);

			const TodayReservations = await Api.get(
				`/select-today-count-reservations/?parking_id=${parking_id}`
			);

			const CheckInPending = await Api.get(
				`/select-checkin-pending-reservation/?parking_id=${parking_id}`
			);

			const TodayReservationsHistoric = await Api.get(
				`/select-today-reservations/?parking_id=${parking_id}`
			);

			const PendingReservations = await Api.get(
				`/select-checkout-pending-reservation/?parking_id=${parking_id}`
			);

			const availableParkingsSpace = AvailableParkingSpace.data.total;

			const todayTicket = TodayTicket.data.result;

			const activeParkingsSpace = ActiveParkingSpaces.data.total;

			const todayReservations = TodayReservations.data.result;

			const checkInPending = CheckInPending.data.result;

			const todayTicketPorcentage =
				(availableParkingsSpace / activeParkingsSpace) * 100 + '%';

			console.log(PendingReservations);

			const pendingReservations = PendingReservations.data.result.map(
				item => {
					return {
						id: item._id,
						options: item._id,
						app: item.client.name ? true : false,
						clientNumber:
							item.client.telephone.ddd +
							item.client.telephone.number,
						vehiclePlate: item.client.vehicle.plate,
						clientName: item.client.name,
						parkingSpace: item.parking.space.name,
						checkIn: item.period
							? item.period.check_in
								? moment(item.period.check_in.moment).format(
										'DD/MM/YYYY'
								  )
								: null
							: null
					};
				}
			);

			const todayReservationsHistoric = TodayReservationsHistoric.data.result.map(
				item => {
					return {
						id: item._id,
						options: item._id,
						app: item.client.name ? true : false,
						clientNumber:
							item.client.telephone.ddd +
							item.client.telephone.number,
						vehiclePlate: item.client.vehicle.plate,
						clientName: item.client.name,
						parkingSpace: item.parking.space.name,
						checkIn: item.period
							? item.period.check_in
								? moment(item.period.check_in.moment).format(
										'DD/MM/YYYY'
								  )
								: null
							: null,
						checkOut: item.period
							? item.period.check_out
								? moment(item.period.check_out.moment).format(
										'DD/MM/YYYY'
								  )
								: null
							: null
					};
				}
			);

			setTodayTicket(todayTicket);
			setAvailableParkingsSpace(availableParkingsSpace);
			setActiveParkingsSpace(activeParkingsSpace);
			setTodayReservations(todayReservations);
			setCheckInPending(checkInPending);
			setTodayTicketPorcentage(todayTicketPorcentage);
			setTodayReservationsList(todayReservationsHistoric);
			setPendingReservesList(pendingReservations);

			handleLoader(false);
		}

		getItems();
	}, []);

	function openModalReleaseParked(id) {
		console.log(id);
	}

	// function openModalDetailsParked(id) {
	// 	console.log(id);
	// }

	function optionsParkingSpaceLockedFormatter(cell) {
		return (
			<>
				<button
					type='button'
					className='btn shadow-none cursor-context-menu'
				>
					<FaBookOpen
						size={17.5}
						color='#777777'
						className='cursor-pointer'
						onClick={event => openModalReleaseParked(cell)}
					/>
				</button>
				<button
					type='button'
					className='btn shadow-none cursor-context-menu'
				>
					<FaSignOutAlt
						size={17.5}
						color='#777777'
						className='cursor-pointer'
						onClick={event => openModalReleaseParked(cell)}
					/>
				</button>
			</>
		);
	}

	function optionsParkingSpaceHistoricFormatter(cell) {
		return (
			<button
				type='button'
				className='btn shadow-none mr-2 cursor-context-menu'
			>
				<FaBookOpen
					size={17.5}
					color='#777777'
					className='cursor-pointer'
					onClick={event => openModalReleaseParked(cell)}
				/>
			</button>
		);
	}

	function optionsAppClientFormatter(cell) {
		return cell ? (
			<FaCircle
				size={10}
				color='#28a745'
				className='align-baseline ml-2'
			/>
		) : (
			<FaCircle
				size={10}
				color='#dc3545'
				className='align-baseline ml-2'
			/>
		);
	}

	const columnsParking = [
		{
			dataField: 'parkingSpace',
			text: 'Vaga',

			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#eeeeee'
					};
				}
				return {
					backgroundColor: '#fff'
				};
			}
		},
		{
			dataField: 'vehiclePlate',
			text: 'Veículo',

			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#eeeeee'
					};
				}
				return {
					backgroundColor: '#fff'
				};
			}
		},
		{
			dataField: 'app',
			text: 'App',

			formatter: optionsAppClientFormatter,

			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#eeeeee'
					};
				}
				return {
					backgroundColor: '#fff'
				};
			}
		},
		{
			dataField: 'clientName',
			text: 'Cliente',

			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#eeeeee'
					};
				}
				return {
					backgroundColor: '#fff'
				};
			}
		},
		{
			dataField: 'checkIn',
			text: 'Entrada',

			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#eeeeee'
					};
				}
				return {
					backgroundColor: '#fff'
				};
			}
		},
		{
			dataField: 'options',
			text: 'Ações',

			formatter: optionsParkingSpaceLockedFormatter,

			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#eeeeee'
					};
				}
				return {
					backgroundColor: '#fff'
				};
			}
		}
	];

	const columnsParked = [
		{
			dataField: 'parkingSpace',
			text: 'Vaga',

			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#eeeeee'
					};
				}
				return {
					backgroundColor: '#fff'
				};
			}
		},
		{
			dataField: 'vehiclePlate',
			text: 'Veículo',

			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#eeeeee'
					};
				}
				return {
					backgroundColor: '#fff'
				};
			}
		},
		{
			dataField: 'app',
			text: 'App',

			formatter: optionsAppClientFormatter,

			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#eeeeee'
					};
				}
				return {
					backgroundColor: '#fff'
				};
			}
		},
		{
			dataField: 'clientName',
			text: 'Cliente',

			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#eeeeee'
					};
				}
				return {
					backgroundColor: '#fff'
				};
			}
		},
		{
			dataField: 'checkIn',
			text: 'Entrada',

			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#eeeeee'
					};
				}
				return {
					backgroundColor: '#fff'
				};
			}
		},
		{
			dataField: 'checkOut',
			text: 'Saída',

			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#eeeeee'
					};
				}
				return {
					backgroundColor: '#fff'
				};
			}
		},
		{
			dataField: 'options',
			text: 'Ações',

			formatter: optionsParkingSpaceHistoricFormatter,

			style: (cell, row, rowIndex, colIndex) => {
				if (rowIndex % 2 === 0) {
					return {
						backgroundColor: '#eeeeee'
					};
				}
				return {
					backgroundColor: '#fff'
				};
			}
		}
	];

	return (
		<>
			<Header />
			<div className='container-fluid'>
				<div className='row'>
					<SideBar route={match} />
					<main
						role='main'
						className='col-md-9 ml-sm-auto col-lg-10 px-4'
					>
						<div className='d-flex card-columns card-deck mt-4'>
							<div
								className='alert alert-light shadow card border mb-0'
								role='alert'
							>
								<h4 className='fs-12pt fw-400'>
									Ticket do dia
								</h4>

								<hr />

								<p className='mb-0 fw-700 fs-15pt text-success'>
									R$ {todayTicket}
								</p>
							</div>

							<div
								className='alert alert-light shadow card border mb-0'
								role='alert'
							>
								<h4 className='fs-12pt fw-400'>Minhas vagas</h4>

								<hr />

								<div className='d-flex justify-content-between align-items-center'>
									<p className='mb-0 fw-700 fs-15pt parking mr-3'>
										{availableParkingsSpace} /
										{activeParkingsSpace}
									</p>
									<div className='progress flex-grow-1 height-05'>
										<div
											className='progress-bar bg-pro-parking'
											role='progressbar'
											style={{
												width: todayTicketPorcentage
											}}
											aria-valuenow='25'
											aria-valuemin='0'
											aria-valuemax='100'
										/>
									</div>
								</div>
							</div>

							<div
								className='alert alert-light shadow card border mb-0'
								role='alert'
							>
								<h4 className='fs-12pt fw-400'>
									Reservas do dia
								</h4>

								<hr />

								<p className='mb-0 fw-700 fs-15pt parking'>
									{todayReservations}
								</p>
							</div>

							<div
								className='alert alert-light shadow card border mb-0'
								role='alert'
							>
								<h4 className='fs-12pt fw-400'>
									Aguardando entrada
								</h4>

								<hr />

								<p className='mb-0 fw-700 fs-15pt parking'>
									{checkInPending}
								</p>
							</div>
						</div>
						<div className='d-flex justify-content-end my-5'>
							<button
								type='button'
								className='btn btn-sm bg-pro-parking shadow-sm text-light'
								data-toggle='modal'
								data-target='#modalNewEntrance'
							>
								<MdAdd
									size={22}
									color='#fff'
									className='pr-1'
								/>
								Nova entrada
							</button>
						</div>
						<div className='p-3 br-5px bg-white shadow border mb-5'>
							<ToolkitProvider
								keyField='id'
								data={pendingReservesList}
								columns={columnsParking}
								search
								filter={filterFactory()}
							>
								{props => (
									<>
										<div className='d-flex justify-content-between mb-4'>
											<h1 className='h4 text-black-50 fw-400 mb-4'>
												Saídas pendentes
											</h1>
											<SearchBar
												{...props.searchProps}
												placeholder='Pesquise'
												className='form-control-sm'
											/>
										</div>
										<BootstrapTable
											style={{ borderSize: 0 }}
											{...props.baseProps}
											filter={filterFactory()}
											pagination={paginationFactory({
												sizePerPageList: [10],
												withFirstAndLast: true,
												alwaysShowAllBtns: true,
												firstPageText: 'Primeira',
												prePageText: 'Anterior',
												nextPageText: 'Próxima',
												lastPageText: 'Última'
											})}
										/>
									</>
								)}
							</ToolkitProvider>
						</div>

						<div className='p-3 br-5px bg-white mt-4 shadow border mb-5'>
							<ToolkitProvider
								keyField='id'
								data={todayReservationsList}
								columns={columnsParked}
								search
								filter={filterFactory()}
							>
								{props => (
									<>
										<div className='d-flex justify-content-between mb-4'>
											<h1 className='h4 text-black-50 fw-400 mb-4'>
												Histórico de reservas do dia
											</h1>
											<SearchBar
												{...props.searchProps}
												placeholder='Pesquise'
												className='form-control-sm'
											/>
										</div>
										<BootstrapTable
											style={{ borderSize: 0 }}
											{...props.baseProps}
											filter={filterFactory()}
											pagination={paginationFactory({
												sizePerPageList: [10],
												withFirstAndLast: true,
												alwaysShowAllBtns: true,
												firstPageText: 'Primeira',
												prePageText: 'Anterior',
												nextPageText: 'Próxima',
												lastPageText: 'Última'
											})}
										/>
									</>
								)}
							</ToolkitProvider>
						</div>
					</main>

					<NewEntranceModal />
					{/* <NewReleaseParkingSpaceModal /> */}
				</div>
			</div>
			{loader}
		</>
	);
}
