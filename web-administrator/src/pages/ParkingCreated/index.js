import React, { useState, useEffect } from 'react';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import BootstrapTable from 'react-bootstrap-table-next';
import { FaCircle, FaBookOpen } from 'react-icons/fa';
import { MdAdd, MdEdit } from 'react-icons/md';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import NewParkingModal from '../../componets/Modal/NewParking';
import EditParkingModal from '../../componets/Modal/EditParking';
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

	const [parkingId, setParkingId] = useState('');
	const [allParkingsCounter, setAllParkingsCounter] = useState(0);
	const [exludedParkingsCounter, setExcludedParkingsCounter] = useState(0);
	const [allParkingsList, setAllParkingsList] = useState([{}]);
	const [sessionInformations, setSessionInformations] = useState({});
	const [newParkingModal, setNewParkingModal] = useState(false);
	const [editParkingModal, setEditParkingModal] = useState(false);
	const [excludeParkingModal, setExcludeParkingModal] = useState(false);

	const [
		notExcludedParkingsCounter,
		setNotExcludedParkingsCounter
	] = useState(0);

	useEffect(() => {
		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		setSessionInformations(informations);

		async function getItems() {
			const selectAllParkingsListResult = await Api.get(
				`/select-all-parkings`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectAllParkingsCounterResult = await Api.get(
				`/select-all-parkings-counter`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectExcludedParkingsCounterResult = await Api.get(
				`/select-specific-excluded-parkings-counter/?excluded=${true}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectNotExcludedParkingsCounterResult = await Api.get(
				`/select-specific-excluded-parkings-counter/?excluded=${false}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectAllParkingsCounter =
				selectAllParkingsCounterResult.data.result;

			const selectExcludedParkingsCounter =
				selectExcludedParkingsCounterResult.data.result;

			const selectNotExcludedParkingsCounter =
				selectNotExcludedParkingsCounterResult.data.result;

			const selectAllParkingsList = selectAllParkingsListResult.data.result.map(
				item => {
					return {
						id: item._id,
						name: item.name,
						excluded: item.excluded,
						created_at: `${moment(item.createdAt).format(
							'DD/MM/YYYY'
						)} às ${moment(item.createdAt).format('HH:mm')}h`
					};
				}
			);

			setAllParkingsList(selectAllParkingsList);
			setAllParkingsCounter(selectAllParkingsCounter);
			setExcludedParkingsCounter(selectExcludedParkingsCounter);
			setNotExcludedParkingsCounter(selectNotExcludedParkingsCounter);

			handleLoader(false);
		}

		getItems();
	}, []);

	const openExcludeParkingModal = id => {
		setEditParkingModal(true);
		setParkingId(id);
	};

	const openParkingModalInformations = id => {
		setExcludeParkingModal(true);
		setParkingId(id);
	};

	const optionsParkingSpaceHistoricFormatter = cell => {
		return (
			<>
				<button
					type='button'
					className='btn shadow-none mr-2 cursor-context-menu p-0'
				>
					<MdEdit
						size={22.5}
						color='#777777'
						className='cursor-pointer'
						onClick={event => openExcludeParkingModal(cell)}
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

			<EditParkingModal
				show={editParkingModal}
				onHide={() => setEditParkingModal(false)}
				history={history}
				parkingid={parkingId}
			/>

			<NewParkingModal
				show={newParkingModal}
				history={history}
				onHide={() => setNewParkingModal(false)}
			/>

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
										{allParkingsCounter}
									</span>
								</button>

								<button
									type='button'
									className='btn bg-white shadow border ml-3'
								>
									Ativos:
									<span className='badge text-light bg-pro-parking ml-2'>
										{notExcludedParkingsCounter}
									</span>
								</button>

								<button
									type='button'
									className='btn bg-white shadow border ml-3'
								>
									Inativos:
									<span className='badge badge-danger ml-2'>
										{exludedParkingsCounter}
									</span>
								</button>
							</div>
							<div>
								<button
									type='button'
									className='btn btn-sm bg-pro-parking text-light shadow-sm'
									onClick={() => setNewParkingModal(true)}
								>
									<MdAdd
										size={22}
										color='#fff'
										className='pr-1'
									/>
									Novo estacionamento
								</button>
							</div>
						</div>

						<div className='p-3 br-5px bg-white mt-4 shadow border mb-5'>
							<ToolkitProvider
								keyField='id'
								data={allParkingsList}
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
