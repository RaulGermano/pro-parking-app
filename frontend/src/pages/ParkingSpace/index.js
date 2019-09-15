import React, { useState } from 'react';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import BootstrapTable from 'react-bootstrap-table-next';
import { FaCircle, FaBookOpen, FaSignOutAlt } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import NewParkingSpaceModal from '../../componets/Modal/NewParkingLot';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const { SearchBar } = Search;

export default function ParkingLots({ match }) {
	const [modalShow, setModalShow] = useState(false);

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

	function optionsUserStatusFormatter(cell) {
		return cell ? (
			<FaCircle size={10} className='align-baseline ml-3 text-primary' />
		) : (
			<FaCircle size={10} className='align-baseline ml-3 text-danger' />
		);
	}

	function optionsUserCounterFormatter(rowIndex) {
		return ++rowIndex;
	}

	function optionsUserTypeFormatter(cell) {
		return cell ? (
			<FaCircle size={10} className='align-baseline ml-3 text-warning' />
		) : (
			<FaCircle
				size={10}
				className='align-baseline ml-3 text-dark opacity-3'
			/>
		);
	}

	const parked = [
		{
			id: 0,
			nome: 'VGE1',
			valor: 3.23,
			ativa: true,
			status: true
		},
		{
			id: 1,
			nome: 'VGE2',
			valor: 4.4,
			ativa: false,
			status: true
		},
		{
			id: 2,
			nome: 'VGE3',
			valor: 2.3,
			ativa: true,
			status: false
		}
	];

	const columnsParked = [
		{
			dataField: 'option',
			text: 'N',

			formatter: (cell, row, rowIndex) =>
				optionsUserCounterFormatter(rowIndex),

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
			dataField: 'nome',
			text: 'Nome',

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
			dataField: 'valor',
			text: 'Valor por hora',

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
			dataField: 'ativa',
			text: 'Ativa',

			formatter: optionsUserTypeFormatter,

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
			dataField: 'status',
			text: 'Status',

			formatter: optionsUserStatusFormatter,

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
			dataField: 'id',
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
										{5}
									</span>
								</button>

								<button
									type='button'
									className='btn bg-white shadow border ml-3'
								>
									Ativos:
									<span className='badge text-light bg-pro-parking ml-2'>
										{5}
									</span>
								</button>

								<button
									type='button'
									className='btn bg-white shadow border ml-3'
								>
									Inativos:
									<span className='badge badge-danger ml-2'>
										{0}
									</span>
								</button>

								<button
									type='button'
									className='btn bg-white shadow border ml-3'
								>
									Reservadas:
									<span className='badge badge-warning ml-2'>
										{0}
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

								<NewParkingSpaceModal
									show={modalShow}
									onHide={() => setModalShow(false)}
								/>
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
		</>
	);
}
