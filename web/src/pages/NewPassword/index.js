import React, { useState, useEffect } from 'react';
import logo from '../../images/logo.png';
import useLoader from '../../componets/Loader/useLoader';
import Api from '../../services/Api';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function NewPassword(props) {
	useEffect(() => {
		handleLoader(false);
	});

	const { history: historic, match } = props;

	const [confirmPassword, setConfirmPassword] = useState('');
	const [password, setPassword] = useState('');
	const [loader, handleLoader] = useLoader();

	const notifyError = () => toast.error('Erro!');
	const notifyDifferentPassword = () =>
		toast.error('Usuário ou senha, estão incorretos!');

	async function tryAlterPassword(event) {
		event.preventDefault();

		if (password !== confirmPassword) {
			notifyDifferentPassword();
		} else {
			try {
				await Api.put('/update-password-parking-user', {
					_id: match.params.parkingId,
					password
				});

				historic.push('/');
			} catch (error) {
				setPassword('');
				setConfirmPassword('');
				notifyError();
			}
		}
	}

	return (
		<div className='containerLogin'>
			<ToastContainer />
			<form className='login-form' onSubmit={tryAlterPassword}>
				<div className='image'>
					<img src={logo} className='mb-4' alt='PRO Parking logo' />
				</div>
				<input
					type='password'
					value={password}
					id='input-password'
					className='form-control shadow-sm mb-2'
					placeholder='Senha'
					autoComplete='off'
					required
					onChange={event => setPassword(event.target.value)}
				/>
				<input
					type='password'
					value={confirmPassword}
					id='input-confirm-password'
					className='form-control shadow-sm mb-2'
					placeholder='Confirme a nova senha'
					autoComplete='off'
					required
					onChange={event => setConfirmPassword(event.target.value)}
				/>
				<button
					type='submit'
					className='btn btn-md btn-primary-pro-parking text-light font-weight-bold mt-4 shadow-sm'
					id='btn-entrar'
				>
					Confirmar
				</button>
			</form>
			{loader}
		</div>
	);
}

export default NewPassword;
