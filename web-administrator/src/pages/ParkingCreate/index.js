import React, { useState, useEffect } from 'react';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import BootstrapTable from 'react-bootstrap-table-next';
import { FaCircle, FaBookOpen } from 'react-icons/fa';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import InformationsContactForm from '../../componets/Modal/InformationsContactForm';
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
	const [contactFormId, setContactFormId] = useState('');

	const [allContactFormCounter, setAllContactFormCounter] = useState(0);

	const [
		notStartedContactFormCounter,
		setNotStartedContactFormCounter
	] = useState(0);

	const [startedContactFormCounter, setStartedContactFormCounter] = useState(
		0
	);

	const [
		finishedContactFormCounter,
		setFinishedContactFormCounter
	] = useState(0);

	const [informationsContactForm, setInformationsContactForm] = useState(
		false
	);

	const [sessionInformations, setSessionInformations] = useState({});

	const [
		notFinishedContactFormList,
		setNotFinishedContactFormList
	] = useState([{}]);

	useEffect(() => {
		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		const { id: administratorUser_id, administratorName } = informations;

		setSessionInformations({
			administratorUser_id,
			administratorName
		});

		console.log(informations);

		async function getItems() {
			const selectNotStartedContactFormListResult = await Api.get(
				`/select-specific-status-contact-form-list/?status=${0}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectStartedContactFormListResult = await Api.get(
				`/select-specific-status-contact-form-list/?status=${1}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectAllContactFormCounterResult = await Api.get(
				`/select-all-contact-form-counter`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectNotStartedContactFormCounterResult = await Api.get(
				`/select-specific-status-contact-form-counter/?status=${0}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectStartedContactFormCounterResult = await Api.get(
				`/select-specific-status-contact-form-counter/?status=${1}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectFinishedContactFormCounterResult = await Api.get(
				`/select-specific-status-contact-form-counter/?status=${2}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const selectAllContactFormCounter =
				selectAllContactFormCounterResult.data.result;

			const selectNotStartedContactFormCounter =
				selectNotStartedContactFormCounterResult.data.result;

			const selectStartedContactFormCounter =
				selectStartedContactFormCounterResult.data.result;

			const selectFinishedContactFormCounter =
				selectFinishedContactFormCounterResult.data.result;

			const selectNotStartedContactFormList = selectNotStartedContactFormListResult.data.result.map(
				item => {
					return {
						id: item._id,
						name: item.name,
						email: item.email,
						status: item.status,
						telephone: `(${item.telephone.ddd}) ${item.telephone.number}`,
						created_at: `${moment(item.createdAt).format(
							'DD/MM/YYYY'
						)} às ${moment(item.createdAt).format('HH:mm')}h`
					};
				}
			);

			const selectStartedContactFormList = selectStartedContactFormListResult.data.result.map(
				item => {
					return {
						id: item._id,
						name: item.name,
						email: item.email,
						status: item.status,
						telephone: `(${item.telephone.ddd}) ${item.telephone.number}`,
						created_at: `${moment(item.createdAt).format(
							'DD/MM/YYYY'
						)} às ${moment(item.createdAt).format('HH:mm')}h`
					};
				}
			);

			const selectNotFinishedContactFormList = [
				...selectNotStartedContactFormList,
				...selectStartedContactFormList
			];

			setAllContactFormCounter(selectAllContactFormCounter);
			setNotStartedContactFormCounter(selectNotStartedContactFormCounter);
			setStartedContactFormCounter(selectStartedContactFormCounter);
			setFinishedContactFormCounter(selectFinishedContactFormCounter);
			setNotFinishedContactFormList(selectNotFinishedContactFormList);

			handleLoader(false);
		}

		getItems();
	}, []);

	const openModalInformationsContactForm = id => {
		setInformationsContactForm(true);
		setContactFormId(id);
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
							openModalInformationsContactForm(cell)
						}
					/>
				</button>
			</>
		);
	};

	const optionsUserFormatter = rowIndex => {
		return ++rowIndex;
	};

	const optionsUserStatusFormatter = cell => {
		return cell ? (
			<FaCircle size={10} className='align-baseline text-warning' />
		) : (
			<FaCircle size={10} className='align-baseline text-primary' />
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
			dataField: 'telephone',
			text: 'Telefone',
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'email',
			text: 'E-Mail',
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'status',
			text: 'Status',
			align: 'center',
			formatter: optionsUserStatusFormatter,
			headerAlign: (column, colIndex) => 'center',
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'created_at',
			text: 'Criado em',
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

			<InformationsContactForm
				show={informationsContactForm}
				onHide={() => setInformationsContactForm(false)}
				history={history}
				contactformid={contactFormId}
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
										{allContactFormCounter}
									</span>
								</button>

								<button
									type='button'
									className='btn btn-light bg-white shadow border ml-3'
								>
									Aguardando:
									<span className='badge badge-danger ml-2'>
										{notStartedContactFormCounter}
									</span>
								</button>

								<button
									type='button'
									className='btn btn-light bg-white shadow border ml-3'
								>
									Iniciados:
									<span className='badge badge-warning ml-2'>
										{startedContactFormCounter}
									</span>
								</button>

								<button
									type='button'
									className='btn btn-light bg-white shadow border ml-3'
								>
									Finalizados:
									<span className='badge badge-success ml-2'>
										{finishedContactFormCounter}
									</span>
								</button>
							</div>
						</div>

						<div className='p-3 br-5px bg-white mt-4 shadow border mb-5'>
							<ToolkitProvider
								keyField='id'
								data={notFinishedContactFormList}
								columns={columnsParked}
								search
								filter={filterFactory()}
							>
								{props => (
									<>
										<div className='d-flex justify-content-between mb-4'>
											<h1 className='h4 text-black-50 fw-400 mb-4'>
												Pendentes
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
