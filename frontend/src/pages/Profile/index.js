import React, { useState } from 'react';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import { MdCreate, MdCached } from 'react-icons/md';

export default function Main({ match }) {
	const [nameUser, setNameUser] = useState('');
	const [disabledField, setDisabledField] = useState(true);

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
						<div className='p-3 br-5px bg-white shadow border mt-4 mb-5'>
							<div className='d-flex justify-content-between'>
								<div className='d-flex'>
									{/* <div className='image-profile bg-pro-parking'></div> */}
									<div className='align-self-center ml-1'>
										<h5 className='mb-1 h2'>
											Raul Germano
										</h5>
										<p className='m-0'>Administrador</p>
									</div>
								</div>
								<div className='align-self-center'>
									<button
										className='btn btn-sm btn-light text-secondary border mr-2'
										onClick={() => setDisabledField(false)}
									>
										<MdCached
											size={22}
											className='pr-1 text-secondary'
										/>
										Alterar senha
									</button>

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
								</div>
							</div>

							<hr />

							<div className='my-5'>
								<h1 className='h4 text-black-50 fw-400 mb-4'>
									Dados pessoais
								</h1>

								<div className='form-row ml-1'>
									<div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0 pr-2 '>
										<label for-html='name-user'>
											Nome completo
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
											Data de nascimento
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

									<div className='col-sm-12 col-md-6 col-lg-3 col-xl-3 p-0 pr-2 '>
										<label for-html='name-user'>CPF</label>
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
								<h1 className='h4 titulo-pagina text-black-50 fw-400 mb-4'>
									Dados de usuário
								</h1>

								<div className='form-row ml-1'>
									<div className='col-sm-12 col-md-6 col-lg-4 col-xl-4 p-0 pr-2 '>
										<label for-html='name-user'>
											e-mail
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

									<div className='col-sm-12 col-md-6 col-lg-4 col-xl-4 p-0 pr-2 '>
										<label for-html='name-user'>
											login
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

									<div className='col-sm-12 col-md-6 col-lg-4 col-xl-4 p-0 pr-2 '>
										<label for-html='name-user'>
											Nível de acesso
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
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
