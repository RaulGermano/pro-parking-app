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
import moment from 'moment-timezone';
import { getToken } from '../../services/Auth';
import jwt from 'jsonwebtoken';
import NewReleaseParked from '../../componets/Modal/NewReleaseParked';
import InformationsParked from '../../componets/Modal/InformationsParked';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const { SearchBar } = Search;

export default function Main({ match, history }) {
	const [loader, handleLoader] = useLoader();

	const [newEntrance, setNewEntrance] = useState(false);
	const [newReleaseParked, setNewReleaseParked] = useState(false);
	const [informationsParked, setInformationsParked] = useState(false);
	const [todayTicket, setTodayTicket] = useState('- -');
	const [availableParkingsSpace, setAvailableParkingsSpace] = useState('- -');
	const [activeParkingsSpace, setActiveParkingsSpace] = useState('- -');
	const [todayReservations, setTodayReservations] = useState('- -');
	const [checkInPending, setCheckInPending] = useState('- -');
	const [idReservationExit, setIdReservationExit] = useState('');
	const [todayTicketPorcentage, setTodayTicketPorcentage] = useState('0%');
	const [pendingReservesList, setPendingReservesList] = useState([]);
	const [pendingEntrancesList, setPendingEntrancesList] = useState([]);

	useEffect(() => {
		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		console.log(informations);

		const { parking } = informations;

		async function getItems() {
			const TodayTicket = await Api.get(
				`/select-today-ticket-reservations/?parking_id=${parking}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const AvailableParkingSpace = await Api.get(
				`/select-available-parking-spaces/?parking_id=${parking}&available=${true}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const ActiveParkingSpaces = await Api.get(
				`/select-active-parking-spaces/?parking_id=${parking}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const TodayReservations = await Api.get(
				`/select-today-count-reservations/?parking_id=${parking}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const CheckInPending = await Api.get(
				`/select-checkin-pending-reservation/?parking_id=${parking}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const PendingReservationList = await Api.get(
				`/select-checkin-pending-reservation-list/?parking_id=${parking}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const PendingReservations = await Api.get(
				`/select-checkout-pending-reservation/?parking_id=${parking}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const availableParkingsSpace = AvailableParkingSpace.data.total;

			const todayTicket = TodayTicket.data.result;

			const activeParkingsSpace = ActiveParkingSpaces.data.total;

			const todayReservations = TodayReservations.data.result;

			const checkInPending = CheckInPending.data.result;

			const todayTicketPorcentage =
				(availableParkingsSpace / activeParkingsSpace) * 100 + '%';

			const pendingReservations = PendingReservations.data.result.map(
				item => {
					return {
						id: item._id,
						options: item._id,
						app: item.client.name ? true : false,
						clientNumber: item.client.telephone
							? item.client.telephone.ddd +
							  item.client.telephone.number
							: '- -',
						vehiclePlate: item.client.vehicle.plate,
						clientName: item.client.name ? item.client.name : '- -',
						parkingSpace: item.parking.space.name,
						checkIn: item.period
							? item.period.check_in
								? `${moment(item.period.check_in.moment).format(
                                    'DD/MM/YYYY'
                                )} às ${moment(item.period.check_in.moment).format('HH:mm')}h`
								: null
							: null
					};
				}
            );
            
            /////////////////////////////////////////////////////////////////////////////////////

			const PendingReservationItens = PendingReservationList.data.result.map(
				item => {
					return {
						id: item._id,
						options: item._id,
						clientNumber: item.client.telephone
							? item.client.telephone.ddd +
							  item.client.telephone.number
							: '- -',
						vehiclePlate: item.client.vehicle.plate,
						clientName: item.client.name ? item.client.name : '- -',
						parkingSpace: item.parking.space.name,
                        moment: `${moment(item.createdAt).format(
							'DD/MM/YYYY'
						)} às ${moment(item.createdAt).format('HH:mm')}h`
					};
				}
			);

			setTodayTicket(todayTicket);
			setAvailableParkingsSpace(availableParkingsSpace);
			setActiveParkingsSpace(activeParkingsSpace);
			setTodayReservations(todayReservations);
			setCheckInPending(checkInPending);
			setTodayTicketPorcentage(todayTicketPorcentage);
			setPendingEntrancesList(PendingReservationItens);
			setPendingReservesList(pendingReservations);

			handleLoader(false);
		}

		getItems();
	}, []);

	const openModalReleaseParked = id => {
		setNewReleaseParked(true);
		setIdReservationExit(id);
	};

	const openModalInformationsParked = id => {
		setInformationsParked(true);
		setIdReservationExit(id);
	};

	const optionsParkingSpaceLockedFormatter = cell => {
		return (
			<>
				<button
					type='button'
					className='btn shadow-none cursor-context-menu p-0'
				>
					<FaBookOpen
						size={17.5}
						color='#777777'
						className='cursor-pointer'
						onClick={event => openModalInformationsParked(cell)}
					/>
				</button>
				<button
					type='button'
					className='btn shadow-none cursor-context-menu pr-0'
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
	};

	const optionsParkingSpaceHistoricFormatter = cell => {
		return (
			<button
				type='button'
				className='btn shadow-none mr-2 cursor-context-menu'
			>
				<FaBookOpen
					size={17.5}
					color='#777777'
					className='cursor-pointer'
					onClick={event => openModalInformationsParked(cell)}
				/>
			</button>
		);
	};

	const optionsAppClientFormatter = cell => {
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
	};

	const rowStyles = index => {
		if (index % 2 === 0) {
			return {
				backgroundColor: '#eeeeee'
			};
		}
		return {
			backgroundColor: '#fff'
		};
	};

	const columnsParking = [
		{
			dataField: 'parkingSpace',
			text: 'Vaga',

			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'vehiclePlate',
			text: 'Veículo',

			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'app',
			text: 'App',

			formatter: optionsAppClientFormatter,

			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'clientName',
			text: 'Cliente',

			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'checkIn',
			text: 'Entrada',

			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'options',
			text: 'Ações',

			formatter: optionsParkingSpaceLockedFormatter,

			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		}
	];

	const columnsEntranceParkingPending = [
		{
			dataField: 'parkingSpace',
			text: 'Vaga',

			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'vehiclePlate',
			text: 'Veículo',

			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'clientName',
			text: 'Cliente',

			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'options',
			text: 'Ações',

			formatter: optionsParkingSpaceHistoricFormatter,

			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		}
	];

	return (
		<>
			<Header />

			<NewEntranceModal
				show={newEntrance}
				onHide={() => setNewEntrance(false)}
				history={history}
			/>

			<NewReleaseParked
				show={newReleaseParked}
				onHide={() => setNewReleaseParked(false)}
				history={history}
				reservationid={idReservationExit}
			/>

			<InformationsParked
				show={informationsParked}
				onHide={() => setInformationsParked(false)}
				history={history}
				reservationid={idReservationExit}
			/>

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
										{availableParkingsSpace}/
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
								onClick={() => setNewEntrance(true)}
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

						<div className='p-3 br-5px bg-white shadow border mb-5'>
							<ToolkitProvider
								keyField='id'
								data={pendingEntrancesList}
								columns={columnsEntranceParkingPending}
								search
								filter={filterFactory()}
							>
								{props => (
									<>
										<div className='d-flex justify-content-between mb-4'>
											<h1 className='h4 text-black-50 fw-400 mb-4'>
												Entradas pendentes
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
				</div>
			</div>
			{loader}
		</>
	);
}
