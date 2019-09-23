import React, { useState } from 'react';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';

export default function Settings({ match }) {
	const [nameUser, setNameUser] = useState('');
	const [disabledField] = useState(true);

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
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
