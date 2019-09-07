import React, { useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { Modal, Button } from 'react-bootstrap';

function NewUserModal(props) {
	const [nameUser, setNameUser] = useState('');

	return (
		<Modal
			{...props}
			size='xl'
			aria-labelledby='contained-modal-title-vcenter'
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					<MdPerson
						size={30}
						className='bg-primary rounded-circle p-lg-1 text-light'
					/>
					<span>Novo usuário</span>
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<div className='mx-3'>
					<div className='form-row'>
						<div className='d-flex flex-column col-4'>
							<label for-html='name-user'>Nome completo</label>
							<input
								type='text'
								id='name-user'
								className='form-control shadow-sm'
								placeholder='Obrigatório'
								onChange={event =>
									setNameUser(event.target.value)
								}
								required={false}
								value=''
							/>
						</div>

						<div className='d-flex flex-column col-3'>
							<label for-html='name-user'>CPF</label>
							<input
								type='number'
								id='name-user'
								className='form-control shadow-sm'
								placeholder='Obrigatório'
								onChange={event =>
									setNameUser(event.target.value)
								}
								required={false}
								value=''
							/>
						</div>

						<div className='d-flex flex-column col-3'>
							<label for-html='name-user'>
								Data de nascimento
							</label>
							<input
								type='date'
								id='name-user'
								className='form-control shadow-sm'
								placeholder='Obrigatório'
								onChange={event =>
									setNameUser(event.target.value)
								}
								required={false}
								value=''
							/>
						</div>

						<div className='d-flex flex-column col-2'>
							<label for-html='name-user'>Sexo</label>
							<input
								type='date'
								id='name-user'
								className='form-control shadow-sm'
								placeholder='Obrigatório'
								onChange={event =>
									setNameUser(event.target.value)
								}
								required={false}
								value=''
							/>
						</div>
					</div>

					<div className='form-row mt-5'>
						<div className='d-flex flex-column col-4 pr-0'>
							<label for-html='name-user'>Login</label>
							<input
								type='text'
								id='name-user'
								className='form-control shadow-sm'
								placeholder='Obrigatório'
								onChange={event =>
									setNameUser(event.target.value)
								}
								required={false}
								value=''
							/>
						</div>

						<div className='d-flex flex-column col-8'>
							<label for-html='name-user'>E-Mail</label>
							<input
								type='email'
								id='name-user'
								className='form-control shadow-sm'
								placeholder='Obrigatório'
								onChange={event =>
									setNameUser(event.target.value)
								}
								required={false}
								value=''
							/>
						</div>
					</div>

					<div className='form-row mt-5'>
						<div className='d-flex flex-column col-6'>
							<label for-html='name-user'>Senha</label>
							<input
								type='password'
								id='name-user'
								className='form-control shadow-sm'
								placeholder='Obrigatório'
								onChange={event =>
									setNameUser(event.target.value)
								}
								required={false}
								value=''
							/>
						</div>

						<div className='d-flex flex-column col-6'>
							<label for-html='name-user'>Confirmar senha</label>
							<input
								type='password'
								id='name-user'
								className='form-control shadow-sm'
								placeholder='Obrigatório'
								onChange={event =>
									setNameUser(event.target.value)
								}
								required={false}
								value=''
							/>
						</div>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide} variant='secondary' size='sm'>
					Fechar
				</Button>

				<Button onClick={props.action} variant='primary' size='sm'>
					Cadastrar
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default NewUserModal;
