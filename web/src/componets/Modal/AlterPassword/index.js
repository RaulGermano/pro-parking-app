import React, { useState } from 'react';
import { MdAssistantPhoto } from 'react-icons/md';
import { Modal, Button, Alert } from 'react-bootstrap';
import Api from '../../../services/Api';
import { toast } from 'react-toastify';

export default function AlterPasswordModel(props) {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const { parking_user_id: _id, historic } = props;

	const notifyDifferentPassword = () =>
		toast.error('As senhas não correspondem. Tente novamente.');

	const notifyPasswordUpdated = () =>
		toast.info('A senha foi alterada com sucesso!');

	async function AlterToNewPassword(event) {
		event.preventDefault();

		if (password !== confirmPassword) {
			notifyDifferentPassword();
			setPassword('');
			setConfirmPassword('');
		} else {
			try {
				await Api.put('/update-password-parking-user', {
					_id,
					password
				});

				notifyPasswordUpdated();
				setPassword('');
				setConfirmPassword('');

				historic.go('/');

				console.log(props);
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<form>
			{/* <ToastContainer /> */}
			<Modal {...props} size='md'>
				<Modal.Header closeButton>
					<Modal.Title>
						<MdAssistantPhoto
							size={30}
							color='#fff'
							className='bg-primary rounded-circle p-lg-1 mr-2'
						/>
						Aviso!
					</Modal.Title>
				</Modal.Header>

				<Modal.Body className='m-md-4'>
					<Alert variant='secondary' className='mb-4'>
						Detectamos que é seu primeiro acesso. Por favor, defina
						uma senha nova
					</Alert>
					<label for-html='name-user'>Nova senha</label>
					<input
						type='password'
						value={password}
						id='input-new-password'
						className='form-control shadow-sm mb-4'
						placeholder='Senha'
						autoComplete='off'
						required
						onChange={event => setPassword(event.target.value)}
					/>
					<label for-html='name-user'>Confirme a nova senha</label>
					<input
						type='password'
						value={confirmPassword}
						id='input-confirm-new-password'
						className='form-control shadow-sm mb-2'
						placeholder='Confirme a nova senha'
						autoComplete='off'
						required
						onChange={event =>
							setConfirmPassword(event.target.value)
						}
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant='primary'
						size='sm'
						type='submit'
						disabled={
							password.length && confirmPassword.length > 0
								? false
								: true
						}
						onClick={AlterToNewPassword}
					>
						Confirmar
					</Button>
				</Modal.Footer>
			</Modal>
		</form>
	);
}
