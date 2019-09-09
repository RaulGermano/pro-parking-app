import React, { useState } from 'react';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import { MdLock, MdCreate, MdAdd } from 'react-icons/md';
import { ButtonToolbar, Button } from 'react-bootstrap';
import NewFoneModal from '../../componets/Modal/NewFone';

export default function Settings({ match }) {
	const [nameUser, setNameUser] = useState('');
	const [disabledField, setDisabledField] = useState(true);
	const [modalShow, setModalShow] = useState(false);

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
						<div className='p-3 br-5px bg-white shadow-sm border mt-4 mb-5'>
							<div className='d-flex justify-content-between'>
								<div className='d-flex'>
									{/* <div className='image-profile bg-pro-parking'></div> */}
									<div className='align-self-center ml-1'>
										<h5 className='mb-1 h2'>
											PRO Parking Oficial
										</h5>
									</div>
								</div>
								{/* <div className='align-self-center'>
									<button
										className='btn btn-sm bg-pro-parking text-light'
										onClick={() => setDisabledField(false)}
									>
										<MdCreate
											size={22}
											className='pr-1 text-light'
										/>
										Editar
									</button>
								</div> */}
							</div>

							<hr />

							<div className='my-5'>
								<h1 className='h4 text-black-50 fw-400 mb-4'>
									Dados cadastrais
								</h1>

								<div className='form-row ml-1'>
									<div className='col-lg-9 col-sm-12 col-md-6 col-xl-9  p-0 pr-2 '>
										<label for-html='name-user'>
											<span className='fw-600'>
												Nome comercial
											</span>
											<span className='ml-1 text-black-50 fs-10pt'>
												(Visivel para o cliente)
											</span>
										</label>
										<input
											type='text'
											id='name-user'
											className='form-control shadow-sm'
											placeholder='Obrigatório'
											onChange={event =>
												setNameUser(event.target.value)
											}
											disabled={disabledField}
											required={disabledField}
											value={nameUser}
										/>
									</div>

									<div className='col-sm-12 col-md-6 col-lg-3 col-xl-3 p-0 pr-2 '>
										<label for-html='name-user'>
											<span className='fw-600'>CNPJ</span>
										</label>
										<input
											type='text'
											id='name-user'
											className='form-control shadow-sm'
											placeholder='Obrigatório'
											onChange={event =>
												setNameUser(event.target.value)
											}
											disabled={disabledField}
											required={disabledField}
											value=''
										/>
									</div>
								</div>
							</div>

							<hr />

							<div className='my-5'>
								<h1 className='h4 text-black-50 fw-400 mb-4'>
									Telefone
									<span className='ml-1 text-black-50 fs-10pt'>
										(Visivel para o cliente)
									</span>
								</h1>

								<div className='form-row ml-1'>
									<div className='col-lg-1 col-sm-12 col-md-4 col-xl-1 p-0 pr-2 '>
										<label for-html='name-user'>
											<span className='fw-600'>DDD</span>
										</label>
										<input
											type='text'
											id='name-user'
											className='form-control shadow-sm'
											onChange={event =>
												setNameUser(event.target.value)
											}
											disabled={disabledField}
											required={disabledField}
											value={nameUser}
										/>
									</div>

									<div className='col-lg-3 col-sm-12 col-md-4 col-xl-3 p-0 pr-2 '>
										<label for-html='name-user'>
											<span className='fw-600'>
												Número
											</span>
										</label>
										<input
											type='text'
											id='name-user'
											className='form-control shadow-sm'
											onChange={event =>
												setNameUser(event.target.value)
											}
											disabled={disabledField}
											required={disabledField}
											value=''
										/>
									</div>
								</div>
							</div>

							{/* <hr />
                                
                            <div className='my-5'>
								<div className='d-flex justify-content-between'>
									<h1 className='h4 titulo-pagina text-black-50 fw-400 mb-4'>
										Telefones
									</h1>
									<div>
										<button
											type='button'
											className='btn btn-light bg-white shadow-sm border mr-3'
										>
											Cadastros disponíveis:
											<span className='badge text-light bg-pro-parking ml-2'>
												1
											</span>
										</button>
										<button
											className='btn btn-sm bg-pro-parking text-light shadow-sm'
											onClick={() => {
												setDisabledField(false);
												setModalShow(true);
											}}
										>
											<MdAdd
												size={27}
												className='pr-1 text-light'
											/>
											Novo telefone
										</button>

										<NewFoneModal
											show={modalShow}
											onHide={() => setModalShow(false)}
										/>
									</div>
								</div>

								<div className='form-row ml-1 mt-4'>
									<div className=' align-self-end'>
										<button
											className='btn bg-pro-parking text-light mr-2'
											onClick={() =>
												setDisabledField(false)
											}
										>
											X
										</button>
									</div>

									<div className='col-sm-12 col-md-3 col-lg-1 col-xl-1 p-0 pr-2 '>
										<label for-html='name-user'>
											<span className='fw-600'>DDD</span>
										</label>
										<input
											type='text'
											id='name-user'
											className='form-control shadow-sm'
											placeholder='Obrigatório'
											onChange={event =>
												setNameUser(event.target.value)
											}
											disabled={true}
											required={false}
											value=''
										/>
									</div>

									<div className='col-sm-12 col-md-4 col-lg-3 col-xl-3 p-0 pr-2 '>
										<label for-html='name-user'>
											<span className='fw-600'>
												Número
											</span>
										</label>
										<input
											type='text'
											id='name-user'
											className='form-control shadow-sm'
											placeholder='Obrigatório'
											onChange={event =>
												setNameUser(event.target.value)
											}
											disabled={true}
											required={false}
											value=''
										/>
									</div>
								</div>

								<div className='form-row ml-1 mt-4'>
									<div className=' align-self-end'>
										<button
											className='btn bg-pro-parking text-light mr-2'
											onClick={() =>
												setDisabledField(false)
											}
										>
											X
										</button>
									</div>

									<div className='col-sm-12 col-md-3 col-lg-1 col-xl-1 p-0 pr-2 '>
										<input
											type='text'
											id='name-user'
											className='form-control shadow-sm'
											placeholder='Obrigatório'
											onChange={event =>
												setNameUser(event.target.value)
											}
											disabled={true}
											required={false}
											value=''
										/>
									</div>

									<div className='col-sm-12 col-md-4 col-lg-3 col-xl-3 p-0 pr-2 '>
										<input
											type='text'
											id='name-user'
											className='form-control shadow-sm'
											placeholder='Obrigatório'
											onChange={event =>
												setNameUser(event.target.value)
											}
											disabled={true}
											required={false}
											value=''
										/>
									</div>
								</div>
							</div> */}

							{/* <hr />

							<div className='my-5'>
								<h1 className='h4 titulo-pagina text-black-50 fw-400 mb-4'>
									Revisão
								</h1>

								<div className='form-row ml-1'>
									<div className='col-sm-12 col-md-4 col-lg-3 col-xl-3 p-0 pr-2 '>
										<label for-html='name-user'>
											Criado em
										</label>
										<input
											type='text'
											id='name-user'
											className='form-control shadow-sm'
											placeholder='Obrigatório'
											onChange={event =>
												setNameUser(event.target.value)
											}
											disabled={true}
											required={false}
											value=''
										/>
									</div>

									<div className='col-sm-12 col-md-4 col-lg-3 col-xl-3 p-0 pr-2 '>
										<label for-html='name-user'>
											Última alteração
										</label>
										<input
											type='text'
											id='name-user'
											className='form-control shadow-sm'
											placeholder='Obrigatório'
											onChange={event =>
												setNameUser(event.target.value)
											}
											disabled={true}
											required={false}
											value=''
										/>
									</div>

									<div className='col-sm-12 col-md-4 col-lg-6 col-xl-6 p-0 pr-2 '>
										<label for-html='name-user'>
											Alterado por
										</label>
										<input
											type='text'
											id='name-user'
											className='form-control shadow-sm'
											placeholder='Obrigatório'
											onChange={event =>
												setNameUser(event.target.value)
											}
											disabled={disabledField}
											required={disabledField}
											value=''
										/>
									</div>
								</div>
							</div> */}
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
