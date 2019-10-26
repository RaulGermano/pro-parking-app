import React, { useState, useEffect } from 'react';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import BootstrapTable from 'react-bootstrap-table-next';
import { FaCircle, FaBookOpen } from 'react-icons/fa';
import { MdAdd, MdEdit } from 'react-icons/md';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
// import NewParkingSpaceModal from '../../componets/Modal/NewParkingSpace';
// import EditParkingSpace from '../../componets/Modal/EditParkingSpace';
// import InformationsParkingSpace from '../../componets/Modal/InformationsParkingSpace';
import Api from '../../services/Api';
import useLoader from '../../componets/Loader/useLoader';
import moment from 'moment-timezone';
import { getToken } from '../../services/Auth';
import jwt from 'jsonwebtoken';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const { SearchBar } = Search;

export default function ParkingLots(props) {
	const { match, history } = props;

	const [loader, handleLoader] = useLoader();
	const [parkingSpaceId, setParkingSpaceId] = useState('');
	const [totalParkingSpaces, setTotalParkingSpaces] = useState(0);
	const [activeParkingSpaces, setActiveParkingSpaces] = useState(0);
	const [availableParkingSpaces, setAvailableParkingSpaces] = useState(0);
	const [notActiveParkingSpaces, setNotActiveParkingSpaces] = useState(0);
	const [
		pendingCheckoutParkingSpaces,
		setPendingCheckoutParkingSpaces
	] = useState(0);
	const [modalShow, setModalShow] = useState(false);
	const [editParkingSpace, setEditParkingSpace] = useState(false);
	const [informationsParkingSpace, setInformationsParkingSpace] = useState(
		false
	);
	const [sessionInformations, setSessionInformations] = useState({});
	const [pendingReservesList, setPendingReservesList] = useState([{}]);

	useEffect(() => {
		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		const { id: parkingUser_id, name, parking: parking_id } = informations;

		setSessionInformations({
			parkingUser_id,
			parking_id,
			name
		});

		console.log(informations);

		const { parking } = informations;

		async function getItems() {
			const selectTotalParkingSpacesResult = await Api.get(
				`/select-total-parking-spaces/?parking_id=${parking}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectAvailableParkingSpacesResult = await Api.get(
				`/select-available-parking-spaces/?parking_id=${parking}&available=${true}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectActiveParkingSpacesResult = await Api.get(
				`/select-active-parking-spaces/?parking_id=${parking}&excluded=${true}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectNotActiveParkingSpacesResult = await Api.get(
				`/select-active-parking-spaces/?parking_id=${parking}&excluded=${false}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectPendingCheckoutParkingSpacesResult = await Api.get(
				`/select-pending-checkout-parking-spaces/?parking_id=${parking}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectAllParkingSpacesResult = await Api.get(
				`/select-all-parking-spaces/?parking_id=${parking}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectTotalParkingSpaces =
				selectTotalParkingSpacesResult.data.total;

			const selectAvailableParkingSpaces =
				selectAvailableParkingSpacesResult.data.total;

			const selectActiveParkingSpaces =
				selectActiveParkingSpacesResult.data.total;

			const selectNotActiveParkingSpaces =
				selectNotActiveParkingSpacesResult.data.total;

			const selectPendingCheckoutParkingSpaces =
				selectPendingCheckoutParkingSpacesResult.data.total;

			const selectAllParkingSpaces = selectAllParkingSpacesResult.data.result.map(
				item => {
					return {
						id: item._id,
						name: item.name,
						value: item.value,
						excluded: item.excluded,
						available: item.available,
						created_at: `${moment(item.createdAt).format(
							'DD/MM/YYYY'
						)} às ${moment(item.createdAt).format('HH:mm')}h`
					};
				}
			);

			setTotalParkingSpaces(selectTotalParkingSpaces);
			setAvailableParkingSpaces(selectAvailableParkingSpaces);
			setActiveParkingSpaces(selectActiveParkingSpaces);
			setNotActiveParkingSpaces(selectNotActiveParkingSpaces);
			setPendingCheckoutParkingSpaces(selectPendingCheckoutParkingSpaces);
			setPendingReservesList(selectAllParkingSpaces);

			handleLoader(false);
		}

		getItems();
	}, []);

	const openModalEditParkingSpace = id => {
		setEditParkingSpace(true);
		setParkingSpaceId(id);
	};

	const openModalInformationsParkingSpace = id => {
		setInformationsParkingSpace(true);
		setParkingSpaceId(id);
	};

	const optionsParkingSpaceHistoricFormatter = cell => {
		return (
			<>
				<button
					type='button'
					className='btn shadow-none mr-2 cursor-context-menu p-0'
				>
					<FaBookOpen
						size={17.5}
						color='#777777'
						className='cursor-pointer'
						onClick={event =>
							openModalInformationsParkingSpace(cell)
						}
					/>
				</button>

				<button
					type='button'
					className='btn shadow-none mr-2 cursor-context-menu p-0'
				>
					<MdEdit
						size={22.5}
						color='#777777'
						className='cursor-pointer'
						onClick={event => openModalEditParkingSpace(cell)}
					/>
				</button>
			</>
		);
	};

	const optionsUserFormatter = rowIndex => {
		return ++rowIndex;
	};

	const optionsUserStatusFormatter = cell => {
		console.log('teste: ', cell);

		return cell ? (
			<FaCircle size={10} className='align-baseline ml-3 text-danger' />
		) : (
			<FaCircle size={10} className='align-baseline ml-3 text-primary' />
		);
	};

	const optionsUserTypeFormatter = cell => {
		return cell ? (
			<FaCircle size={10} className='align-baseline ml-3 text-success' />
		) : (
			<FaCircle size={10} className='align-baseline ml-3 text-warning' />
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

	const columnsParked = [
		{
			dataField: 'option',
			text: 'N',
			formatter: (cell, row, rowIndex) => optionsUserFormatter(rowIndex),
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'name',
			text: 'Nome',
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'value',
			text: 'Valor por hora',
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'available',
			text: 'Disponibilidade',
			formatter: optionsUserTypeFormatter,
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'excluded',
			text: 'Status',
			formatter: optionsUserStatusFormatter,
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'created_at',
			text: 'Criada em',
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'id',
			text: 'Ações',
			formatter: optionsParkingSpaceHistoricFormatter,
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		}
	];

	return (
		<>
			<Header />
			{/* 
			<InformationsParkingSpace
				show={informationsParkingSpace}
				onHide={() => setInformationsParkingSpace(false)}
				history={history}
				parkingspaceid={parkingSpaceId}
			/>

			<EditParkingSpace
				show={editParkingSpace}
				onHide={() => setEditParkingSpace(false)}
				history={history}
				parkingspaceid={parkingSpaceId}
			/> */}

			<div className='container-fluid'>
				<div className='row'>
					<SideBar route={match} />
					<main
						role='main'
						className='col-md-9 ml-sm-auto col-lg-10 px-4'
					>
						<div className='mt-4 d-flex justify-content-between'>
							<div>
								<button
									type='button'
									className='btn btn-light bg-white shadow border'
								>
									Total:
									<span className='badge badge-secondary ml-2'>
										{totalParkingSpaces}
									</span>
								</button>

								<button
									type='button'
									className='btn bg-white shadow border ml-3'
								>
									Ativos:
									<span className='badge text-light bg-pro-parking ml-2'>
										{notActiveParkingSpaces}
									</span>
								</button>

								<button
									type='button'
									className='btn bg-white shadow border ml-3'
								>
									Inativos:
									<span className='badge badge-danger ml-2'>
										{activeParkingSpaces}
									</span>
								</button>

								<button
									type='button'
									className='btn bg-white shadow border ml-3'
								>
									Reservadas:
									<span className='badge badge-warning ml-2'>
										{pendingCheckoutParkingSpaces}
									</span>
								</button>

								<button
									type='button'
									className='btn bg-white shadow border ml-3'
								>
									Livres:
									<span className='badge badge-success ml-2'>
										{availableParkingSpaces}
									</span>
								</button>
							</div>
							<div>
								<button
									type='button'
									className='btn btn-sm bg-pro-parking text-light shadow-sm'
									onClick={() => setModalShow(true)}
								>
									<MdAdd
										size={22}
										color='#fff'
										className='pr-1'
									/>
									Nova vaga
								</button>

								{/* <NewParkingSpaceModal
									show={modalShow}
									history={history}
									onHide={() => setModalShow(false)}
								/> */}
							</div>
						</div>

						<div className='p-3 br-5px bg-white mt-4 shadow border mb-5'>
							<ToolkitProvider
								keyField='id'
								data={pendingReservesList}
								columns={columnsParked}
								search
								filter={filterFactory()}
							>
								{props => (
									<>
										<div className='d-flex justify-content-between mb-4'>
											<h1 className='h4 text-black-50 fw-400 mb-4'>
												Minhas vagas
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
