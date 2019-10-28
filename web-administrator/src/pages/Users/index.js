import React, { useState, useEffect } from 'react';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import BootstrapTable from 'react-bootstrap-table-next';
import { FaCircle } from 'react-icons/fa';
import { MdAdd, MdEdit, MdMail } from 'react-icons/md';
import ConfirmNewAdministratorUserPasswordModal from '../../componets/Modal/ConfirmNewAdministratorUserPassword';
import EditAdministratorUserModal from '../../componets/Modal/EditAdministratorUser';
import NewAdministratorUserModal from '../../componets/Modal/NewAdministratorUser';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Api from '../../services/Api';
import useLoader from '../../componets/Loader/useLoader';
import moment from 'moment-timezone';
import { getToken } from '../../services/Auth';
import jwt from 'jsonwebtoken';
import { ToastContainer } from 'react-toastify';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const { SearchBar } = Search;

export default function Main(props) {
	const { match, history } = props;

	const [loader, handleLoader] = useLoader();
	const [administratorUserId, setAdministratorUserId] = useState('');
	const [administratorUsersList, setAdministratorUsersList] = useState([{}]);

	const [
		allAdministratorUsersCounter,
		setAllAdministratorUsersCounter
	] = useState(0);

	const [
		excludedAdministratorUsersCounter,
		setExcludedAdministratorUsersCounter
	] = useState(0);

	const [
		notExcludedAdministratorUsersCounter,
		setNotExcludedAdministratorUsersCounter
	] = useState(0);

	const [
		modalConfirmChangePassword,
		setModalConfirmChangePassword
	] = useState(false);

	const [
		modalAdministratorUserEdit,
		setModalAdministratorUserEdit
	] = useState(false);

	const [
		modalAdministratorUserCreate,
		setModalAdministratorUserCreate
	] = useState(false);

	useEffect(() => {
		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		const { parking } = informations;

		async function getItems() {
			const allAdministratorUsersListResult = await Api.get(
				`/select-all-administrator-users-list`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const allAdministratorUsersCounterResult = await Api.get(
				`/select-all-administrator-users-counter`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const specificNotExcludedAdministratorUsersCounterResult = await Api.get(
				`/select-specific-excluded-administrator-users-counter/?excluded=${false}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const specificExcludedAdministratorUsersCounterResult = await Api.get(
				`/select-specific-excluded-administrator-users-counter/?excluded=${true}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const allAdministratorUsersCounter =
				allAdministratorUsersCounterResult.data.result;

			const specificNotExcludedAdministratorUsersCounter =
				specificNotExcludedAdministratorUsersCounterResult.data.result;

			const specificExcludedAdministratorUsersCounter =
				specificExcludedAdministratorUsersCounterResult.data.result;

			const allAdministratorUsersList = allAdministratorUsersListResult.data.result.map(
				item => {
					return {
						id: item._id,
						name: item.name,
						email: item.email,
						excluded: item.excluded,
						userType: item.accessLevel,
						created_at: `${moment(item.createdAt).format(
							'DD/MM/YYYY'
						)} às ${moment(item.createdAt).format('HH:mm')}h`
					};
				}
			);

			setAdministratorUsersList(allAdministratorUsersList);
			setAllAdministratorUsersCounter(allAdministratorUsersCounter);

			setNotExcludedAdministratorUsersCounter(
				specificNotExcludedAdministratorUsersCounter
			);

			setExcludedAdministratorUsersCounter(
				specificExcludedAdministratorUsersCounter
			);

			handleLoader(false);
		}

		getItems();
	}, []);

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

	function openModalParkingUserInformations(id) {
		setAdministratorUserId(id);
		setModalConfirmChangePassword(true);
	}

	function openModalParkingUserCreate(id) {
		setAdministratorUserId(id);
		setModalAdministratorUserEdit(true);
	}

	function optionsParkingSpaceHistoricFormatter(cell) {
		return (
			<>
				<button
					type='button'
					className='btn shadow-none mr-2 cursor-context-menu p-0'
				>
					<MdMail
						size={17.5}
						color='#777777'
						className='cursor-pointer'
						onClick={event =>
							openModalParkingUserInformations(cell)
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
						onClick={event => openModalParkingUserCreate(cell)}
					/>
				</button>
			</>
		);
	}

	function optionsUserStatusFormatter(cell) {
		return cell ? (
			<FaCircle size={10} className='align-baseline ml-3 text-danger' />
		) : (
			<FaCircle size={10} className='align-baseline ml-3 text-success' />
		);
	}

	function optionsUserCounterFormatter(rowIndex) {
		return ++rowIndex;
	}

	function optionsUserTypeFormatter(cell) {
		return cell === 1 ? (
			<span className='fw-600'>Administrador</span>
		) : (
			<span>Comum</span>
		);
	}

	const columnsParked = [
		{
			dataField: 'option',
			text: 'N',
			formatter: (cell, row, rowIndex) =>
				optionsUserCounterFormatter(rowIndex),
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'name',
			text: 'Nome',
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'userType',
			text: 'Tipo de usuário',
			formatter: optionsUserTypeFormatter,
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'email',
			text: 'E-Mail',
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'excluded',
			text: 'Status',
			formatter: optionsUserStatusFormatter,
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

			<ToastContainer />

			<ConfirmNewAdministratorUserPasswordModal
				show={modalConfirmChangePassword}
				onHide={() => setModalConfirmChangePassword(false)}
				history={history}
				administratoruserid={administratorUserId}
			/>

			<EditAdministratorUserModal
				show={modalAdministratorUserEdit}
				onHide={() => setModalAdministratorUserEdit(false)}
				history={history}
				administratoruserid={administratorUserId}
			/>

			<NewAdministratorUserModal
				show={modalAdministratorUserCreate}
				onHide={() => setModalAdministratorUserCreate(false)}
				history={history}
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
										{allAdministratorUsersCounter}
									</span>
								</button>

								<button
									type='button'
									className='btn btn-light bg-white shadow border ml-3'
								>
									Ativos:
									<span className='badge text-light bg-success ml-2'>
										{notExcludedAdministratorUsersCounter}
									</span>
								</button>

								<button
									type='button'
									className='btn btn-light bg-white shadow border ml-3'
								>
									Inativos:
									<span className='badge badge-danger ml-2'>
										{excludedAdministratorUsersCounter}
									</span>
								</button>
							</div>
							<div>
								<button
									className='btn btn-sm bg-pro-parking text-light shadow-sm'
									onClick={() => {
										setModalAdministratorUserCreate(true);
									}}
								>
									<MdAdd
										size={27}
										className='pr-1 text-light'
									/>
									Novo usuário
								</button>
							</div>
						</div>

						<div className='p-3 br-5px bg-white mt-4 shadow border mb-5'>
							<ToolkitProvider
								keyField='id'
								data={administratorUsersList}
								columns={columnsParked}
								search
								filter={filterFactory()}
							>
								{props => (
									<>
										<div className='d-flex justify-content-between mb-4'>
											<h1 className='h4 text-black-50 fw-400 mb-4'>
												Usuários
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
