import React from 'react';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import BootstrapTable from 'react-bootstrap-table-next';
import { FaCircle, FaBookOpen } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';

import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const { SearchBar } = Search;

export default function Vehicle({ match }) {
	function openModalReleaseParked(id) {
		console.log(id);
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
			id: 2,
			vaga: 'ASPJ2',
			veiculo: 'ASD-1234',
			app: true,
			cliente: 'Raul Germano',
			entrada: '12/08/2019 14:54h',
			saida: '12/08/2019 14:54h',
			opcoes: 2
		},
		{
			id: 3,
			vaga: 'ASPJ2',
			veiculo: 'ASD-1234',
			app: true,
			cliente: 'Raul Germano',
			entrada: '12/08/2019 14:54h',
			saida: '12/08/2019 14:54h',
			opcoes: 2
		},
		{
			id: 4,
			vaga: 'ASPJ2',
			veiculo: 'ASD-1234',
			app: true,
			cliente: 'Raul Germano',
			entrada: '12/08/2019 14:54h',
			saida: '12/08/2019 14:54h',
			opcoes: 2
		},
		{
			id: 5,
			vaga: 'ASPJ2',
			veiculo: 'ASD-1234',
			app: false,
			cliente: null,
			entrada: '12/08/2019 14:54h',
			saida: '12/08/2019 14:54h',
			opcoes: 2
		},
		{
			id: 6,
			vaga: 'ASPJ2',
			veiculo: 'ASD-1234',
			app: true,
			cliente: 'Raul Germano',
			entrada: '12/08/2019 14:54h',
			saida: '12/08/2019 14:54h',
			opcoes: 2
		},
		{
			id: 7,
			vaga: 'ASPJ2',
			veiculo: 'ASD-1234',
			app: false,
			cliente: null,
			entrada: '12/08/2019 14:54h',
			saida: '12/08/2019 14:54h',
			opcoes: 2
		},
		{
			id: 8,
			vaga: 'ASPJ2',
			veiculo: 'ASD-1234',
			app: true,
			cliente: 'Raul Germano',
			entrada: '12/08/2019 14:54h',
			saida: '12/08/2019 14:54h',
			opcoes: 2
		},
		{
			id: 9,
			vaga: 'ASPJ2',
			veiculo: 'ASD-1234',
			app: false,
			cliente: null,
			entrada: '12/08/2019 14:54h',
			saida: '12/08/2019 14:54h',
			opcoes: 2
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
						<div className='mt-4 d-flex justify-content-between'>
							<div>
								<button
									type='button'
									className='btn btn-light bg-white shadow border'
								>
									Total:
									<span className='badge badge-secondary ml-2'>
										{9}
									</span>
								</button>

								<button
									type='button'
									className='btn btn-light bg-white shadow border ml-3'
								>
									Ativos:
									<span className='badge text-light bg-pro-parking ml-2'>
										{7}
									</span>
								</button>

								<button
									type='button'
									className='btn btn-light bg-white shadow border ml-3'
								>
									Inativos:
									<span className='badge badge-danger ml-2'>
										{2}
									</span>
								</button>
							</div>
							<div>
								<button
									type='button'
									className='btn btn-sm bg-pro-parking text-light shadow-sm'
									data-toggle='modal'
									data-target='#modalNewUser'
								>
									<MdAdd
										size={22}
										color='#fff'
										className='pr-1'
									/>
									Nova entrada
								</button>
							</div>
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
		</>
	);
}
