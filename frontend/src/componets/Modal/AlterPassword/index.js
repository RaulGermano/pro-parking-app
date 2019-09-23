import React, { useState } from 'react';
import { MdAssistantPhoto } from 'react-icons/md';
import { Modal, Button } from 'react-bootstrap';
import Api from '../../../services/Api';

export default function AlterPasswordModel({ historic, userId: _id }) {
	const [show] = useState(true);
	const [password, setPassword] = useState('');

	async function AlterToNewPassword(event) {
		event.preventDefault();

		try {
			const result = await Api.put('/update-password-parking-user', {
				_id,
				password
			});

			console.log(result);

			historic.push('/main');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<form>
			<Modal show={show} onHide={() => historic.go('/')}>
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
					É preciso alterar a senha para prosseguir
					<input
						type='password'
						value={password}
						id='input-password'
						className='form-control shadow-sm mb-2'
						placeholder='Nova senha'
						autoComplete='off'
						required
						onChange={event => setPassword(event.target.value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='primary'
						size='sm'
						type='submit'
						disabled={password.length > 0 ? false : true}
						onClick={AlterToNewPassword}
					>
						Confirmar
					</Button>
				</Modal.Footer>
			</Modal>
		</form>
	);
}
