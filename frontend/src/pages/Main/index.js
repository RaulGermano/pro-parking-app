import React, { useState, useEffect } from 'react';
import Api from '../../services/Api';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import NewEntranceModal from '../../componets/Modal/NewEntrance';
import NewReleaseParkingSpaceModal from '../../componets/Modal/NewReleaseParkingSpace';
import { MdAdd } from 'react-icons/md';
import { FaCircle, FaBookOpen, FaSignOutAlt } from 'react-icons/fa';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { Button, Modal } from 'react-bootstrap';

const { SearchBar } = Search;

export default function Main({ match }) {
	const parking_id = '5d80450f3a6e341040fb68c4';

	useEffect(() => {
		async function getItems() {
			const todayTicket = await Api.get(
				`/select-today-ticket-reservations/?parking_id=${parking_id}`
			);

			const TrueAvailableParkingSpace = await Api.get(
				`/select-available-parking-spaces/?parking_id=${parking_id}&available=${true}`
			);

			const AllActiveParkingSpaces = await Api.get(
				`/select-active-parking-spaces/?parking_id=${parking_id}`
			);

			const TodayReservations = await Api.get(
				`/select-today-count-reservations/?parking_id=${parking_id}`
			);

			const trueAvailableParkingsSpace =
				TrueAvailableParkingSpace.data.total;

			const allActiveParkingsSpace = AllActiveParkingSpaces.data.total;

			console.log({
				trueAvailableParkingsSpace,
				allActiveParkingsSpace,
				TodayReservations
			});
		}

		getItems();
	}, []);

	function openModalReleaseParked(id) {
		console.log(id);
	}

	function openModalDetailsParked(id) {
		console.log(id);
	}

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

	const parking = [
		{
			id: 1,
			vaga: 'ASPJ1',
			veiculo: 'ASD-1234',
			app: false,
			cliente: null,
			entrada: '12/08/2019 14:54h',
			opcoes: 1
		},
		{
			id: 2,
			vaga: 'ASPJ2',
			veiculo: 'ASD-1234',
			app: true,
			cliente: 'Raul Germano',
			entrada: '12/08/2019 14:54h',
			opcoes: 2
		}
	];

	const parked = [
		{
			id: 1,
			vaga: 'ASPJ1',
			veiculo: 'ASD-1234',
			app: false,
			cliente: null,
			entrada: '12/08/2019 14:54h',
			saida: '12/08/2019 14:54h',
			opcoes: 1
		},
		{
			id: 10,
			vaga: 'ASPJ2',
			veiculo: 'ASD-1234',
			app: true,
			cliente: 'Raul Germano',
			entrada: '12/08/2019 14:54h',
			saida: '12/08/2019 14:54h',
			opcoes: 2
		}
	];

	const columnsParking = [
		{
			dataField: 'vaga',
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
			dataField: 'veiculo',
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
			dataField: 'cliente',
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
			dataField: 'entrada',
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
			dataField: 'opcoes',
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
			dataField: 'vaga',
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
			dataField: 'veiculo',
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
			dataField: 'cliente',
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
			dataField: 'entrada',
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
			dataField: 'saida',
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
			dataField: 'opcoes',
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
									R$130
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
										23 / 80
									</p>
									<div className='progress flex-grow-1 height-05'>
										<div
											className='progress-bar bg-pro-parking'
											role='progressbar'
											style={{ width: '25%' }}
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
									143
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
									23
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
								data={parking}
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
								data={parked}
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

					{/* <ModalTeste /> */}
					<NewEntranceModal />
					{/* <NewReleaseParkingSpaceModal /> */}
				</div>
			</div>
		</>
	);
}
