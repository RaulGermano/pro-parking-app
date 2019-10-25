import React, { useState } from 'react';
import { MdCall } from 'react-icons/md';
import { Modal, Button } from 'react-bootstrap';

function NewFoneModal(props) {
	const [nameUser, setNameUser] = useState('');

	return (
		<Modal
			{...props}
			size='md'
			aria-labelledby='contained-modal-title-vcenter'
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					<MdCall
						size={30}
						className='bg-primary rounded-circle p-lg-1 text-light'
					/>
					<span>Novo telefone</span>
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<div className='d-flex'>
					<div className='d-flex flex-column col-3 pr-0'>
						<label for-html='name-user'>DDD</label>
						<input
							type='text'
							id='name-user'
							className='form-control shadow-sm'
							placeholder='Obrigatório'
							onChange={event => setNameUser(event.target.value)}
							disabled={true}
							required={false}
							value={nameUser}
						/>
					</div>

					<div className='d-flex flex-column col-9'>
						<label for-html='name-user'>Número</label>
						<input
							type='text'
							id='name-user'
							className='form-control shadow-sm'
							placeholder='Obrigatório'
							onChange={event => setNameUser(event.target.value)}
							disabled={true}
							required={false}
							value=''
						/>
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

export default NewFoneModal;
