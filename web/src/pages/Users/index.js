import React, { useState, useEffect } from 'react';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import BootstrapTable from 'react-bootstrap-table-next';
import { FaCircle } from 'react-icons/fa';
import { MdAdd, MdEdit, MdMail } from 'react-icons/md';
import NewParkingUserModal from '../../componets/Modal/NewParkingUser';
import InformationsParkingUserModal from '../../componets/Modal/InformationsParkingUser';
import EditParkingUserModal from '../../componets/Modal/EditParkingUser';
import ConfirmNewParkingUserPasswordModal from '../../componets/Modal/ConfirmNewParkingUserPassword';
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
	const [parkingUserId, setPakingUserId] = useState('');

	const [totalParkingUsers, setTotalParkingUsers] = useState(0);
	const [totalExcludedParkingUsers, setTotalExcludedParkingUsers] = useState(
		0
	);
	const [
		totalNotExcludedParkingUsers,
		setTotalNotExcludedParkingUsers
	] = useState(0);

	const [modalConfirmate, setModalConfirmate] = useState(false);
	const [modalParkingUserEdit, setModalParkingUserEdit] = useState(false);
	const [modalParkingUserCreate, setModalParkingUserCreate] = useState(false);
	const [
		modalParkingUserInformations,
		setModalParkingUserInformations
	] = useState(false);

	const [parkingUsersList, setParkingUsersList] = useState([{}]);

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
			const totalParkingUsersResult = await Api.get(
				`/select-counter-specific-parking-users/?parking_id=${parking}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const totalExcludedParkingUsersResult = await Api.get(
				`/select-counter-excluded-specific-parking-users/?parking_id=${parking}&excluded=${true}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const totalNotExcludedParkingUsersResult = await Api.get(
				`/select-counter-excluded-specific-parking-users/?parking_id=${parking}&excluded=${false}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const parkingUsersListResult = await Api.get(
				`/select-specific-parking-users/?parking_id=${parking}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const parkingUsers = totalParkingUsersResult.data.result;

			const excludedParkingUsers =
				totalExcludedParkingUsersResult.data.result;

			const notExcludedParkingUsers =
				totalNotExcludedParkingUsersResult.data.result;

			const parkingUsersList = parkingUsersListResult.data.result.map(
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

			setTotalParkingUsers(parkingUsers);
			setTotalExcludedParkingUsers(excludedParkingUsers);
			setTotalNotExcludedParkingUsers(notExcludedParkingUsers);
			setParkingUsersList(parkingUsersList);

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
		setPakingUserId(id);
		setModalConfirmate(true);
	}

	function openModalParkingUserCreate(id) {
		setPakingUserId(id);
		setModalParkingUserEdit(true);
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
			<FaCircle size={10} className='align-baseline text-danger' />
		) : (
			<FaCircle size={10} className='align-baseline text-primary' />
		);
	}

	function optionsUserCounterFormatter(rowIndex) {
		return ++rowIndex;
	}

	function optionsUserTypeFormatter(cell) {
		return cell === 1 ? (
			<span className='fw-600'>Administrador</span>
		) : (
			<span>Padrão</span>
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
			align: 'center',
			formatter: optionsUserStatusFormatter,
			headerAlign: (column, colIndex) => 'center',
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		},
		{
			dataField: 'id',
			text: 'Ações',
			formatter: optionsParkingSpaceHistoricFormatter,
			style: (cell, row, rowIndex, colIndex) => rowStyles(rowIndex)
		}
	];

	const testess = () => {
		console.log(123);
	};

	return (
		<>
			<Header />

			<ToastContainer />

			<NewParkingUserModal
				show={modalParkingUserCreate}
				onHide={() => setModalParkingUserCreate(false)}
				history={history}
				parkinguserid={parkingUserId}
			/>

			<InformationsParkingUserModal
				show={modalParkingUserInformations}
				onHide={() => setModalParkingUserInformations(false)}
				history={history}
				parkinguserid={parkingUserId}
			/>

			<EditParkingUserModal
				show={modalParkingUserEdit}
				onHide={() => setModalParkingUserEdit(false)}
				history={history}
				parkinguserid={parkingUserId}
			/>

			<ConfirmNewParkingUserPasswordModal
				show={modalConfirmate}
				onHide={() => setModalConfirmate(false)}
				parkinguserid={parkingUserId}
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
										{totalParkingUsers}
									</span>
								</button>

								<button
									type='button'
									className='btn btn-light bg-white shadow border ml-3'
								>
									Ativos:
									<span className='badge text-light bg-pro-parking ml-2'>
										{totalNotExcludedParkingUsers}
									</span>
								</button>

								<button
									type='button'
									className='btn btn-light bg-white shadow border ml-3'
								>
									Inativos:
									<span className='badge badge-danger ml-2'>
										{totalExcludedParkingUsers}
									</span>
								</button>
							</div>
							<div>
								<button
									className='btn btn-sm bg-pro-parking text-light shadow-sm'
									onClick={() => {
										setModalParkingUserCreate(true);
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
								data={parkingUsersList}
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
