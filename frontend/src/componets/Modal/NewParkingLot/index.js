import React, { useState } from 'react';
import { MdFlag } from 'react-icons/md';
import { Modal, Button } from 'react-bootstrap';

function NewParkingSpaceModal(props) {
	const [nameUser, setNameUser] = useState('');

	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					<MdFlag
						size={30}
						className='bg-primary rounded-circle p-lg-1 text-light'
					/>
					<span>Nova vaga</span>
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<div className='mx-3'>
					<div className='form-row'>
						<div className='d-flex flex-column col-4'>
							<span className='fw-600'>Nome</span>
							<span className='ml-1 text-black-50'>
								(Visivel para o cliente)
							</span>
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
							<span className='fw-600'>Valor da hora</span>
							<span className='ml-1 text-black-50'>
								(Visivel para o cliente)
							</span>
							<input
								type='number'
								id='name-user'
								className='form-control shadow-sm'
								placeholder='Obrigatório'
								onChange={event =>
									setNameUser(event.target.value)
								}
								required={false}
								value={nameUser}
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

export default NewParkingSpaceModal;
