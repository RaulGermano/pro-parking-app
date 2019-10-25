import React, { useState } from 'react';
import { MdLock } from 'react-icons/md';
import Api from '../../../services/Api';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

function ForgotPasswordModal(props) {
	const [email, setEmail] = useState('');

	const SendEmailInformation = () =>
		toast.info(
			'Enviamos um e-mail de confirmação. Em instantes, será possível contunuar o processo.'
		);

	const SendEmailError = () =>
		toast.error('O E-Mail digitado, não encontrado. Tente novamente.');

	const sendEmail = async event => {
		event.preventDefault();

		setEmail('');

		const result = await Api.post('/send-email-update-password', { email });

		if (result.data.response) {
			SendEmailInformation();
		} else {
			SendEmailError();
		}
	};

	return (
		<Modal {...props} size='md'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					<MdLock
						size={30}
						className='bg-primary rounded-circle p-lg-1 text-light'
					/>
					<span>Alteração de senha</span>
				</Modal.Title>
			</Modal.Header>

			<form onSubmit={sendEmail}>
				<Modal.Body>
					<div className='col'>
						<label htmlFor='input-vehicle-plate'>E-mail</label>
						<div className='input-group'>
							<input
								type='email'
								className='form-control'
								id='input-vehicle-plate'
								aria-describedby='small-vehicle-plate'
								placeholder='Digite o E-Mail..'
								value={email}
								onChange={event => setEmail(event.target.value)}
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={props.onHide}
						variant='secondary'
						size='sm'
					>
						Fechar
					</Button>

					<Button
						type='submit'
						disabled={email.length > 0 ? false : true}
						variant='primary'
						size='sm'
					>
						Enviar e-mail
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default ForgotPasswordModal;
