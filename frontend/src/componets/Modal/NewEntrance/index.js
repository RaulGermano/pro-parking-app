import React from 'react';
import { MdAssistantPhoto, MdSearch, MdClose } from 'react-icons/md';

export default function NewEntranceModal() {
	const vagas = [{ id: 1, nome: 'VAGA1', valorHora: 2.9, qualificacao: 3 }];

	return (
		<div
			className='modal fade'
			id='modalNewEntrance'
			role='dialog'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'
		>
			<div className='modal-dialog modal-md' role='document'>
				<div className='modal-content'>
					<div className='modal-header p-2'>
						<h5 className='modal-title' id='exampleModalLabel'>
							<MdAssistantPhoto
								size={30}
								color='#fff'
								className='bg-primary rounded-circle p-lg-1 mr-2'
							/>
							<span>Nova entrada</span>
						</h5>
						<button
							type='button'
							className='close'
							data-dismiss='modal'
							aria-label='Fechar'
						>
							<MdClose />
						</button>
					</div>
					<div className='modal-body pb-2 pt-3 d-flex form-row mb-4'>
						<div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 p-0 pr-2'>
							<label htmlFor='input-vehicle-plate'>
								Verificar placa
							</label>
							<div className='input-group'>
								<input
									type='text'
									className='form-control'
									id='input-vehicle-plate'
									aria-describedby='small-vehicle-plate'
									placeholder='Digite a placa..'
								/>
								<div className='input-group-append'>
									<button
										className='btn btn-primary p-0 px-2'
										type='button'
									>
										<MdSearch size={25} color='#fff' />
									</button>
								</div>
							</div>
						</div>

						{1 == 1 ? (
							<div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 form-control align-self-end bg-success border-success pl-2'>
								<span className='text-light'>
									Vaga reservada: <b>ASDF32</b>
								</span>
							</div>
						) : 1 == 12 ? (
							<div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 form-control align-self-end bg-danger border-danger pl-2'>
								<span className='text-light'>
									Não há reserva
								</span>
							</div>
						) : 1 == 2 ? (
							<div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 form-control align-self-end bg-light border-dashed-gray-light pl-2'>
								<span className='text-black-50'>
									Resultado de pesquisa
								</span>
							</div>
						) : null}
					</div>

					{1 == 12 ? (
						<>
							<hr className='my-4 mt-auto' />
							<div>
								<label
									htmlFor='input-vehicle-plate'
									className='px-3'
								>
									Escolha uma vaga
								</label>
								<div className='form-row mb-2 px-3'>
									{vagas.map(item => {
										return (
											<div
												key={item.id}
												className='col-xl-3 col-lg-3 col-md-4 col-sm-6'
											>
												<button
													type='submit'
													className='btn btn-sm btn-block font-weight-bold my-1 gb-gray-light-2 parking-lot-not-reserved shadow-sm'
												>
													{item.nome}
												</button>
											</div>
										);
									})}
								</div>
							</div>
						</>
					) : null}

					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-sm btn-secondary'
							data-dismiss='modal'
						>
							Fechar
						</button>

						<button
							type='button'
							className='btn btn-sm btn-primary'
							disabled={true}
						>
							Liberar entrada
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
