import React, { useState, useEffect } from 'react';
import logo from '../../images/logo.png';
import useLoader from '../../componets/Loader/useLoader';
import Api from '../../services/Api';
import { userLogin, userLogout } from '../../services/Auth';
import { ToastContainer, toast } from 'react-toastify';
import AlterPasswordModel from '../../componets/Modal/AlterPassword';
import ForgotPasswordModal from '../../componets/Modal/ForgotPassword';

import 'react-toastify/dist/ReactToastify.css';

function Login({ history: historic }) {
	useEffect(() => {
		userLogout();
		handleLoader(false);
	});

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [userId, setUserId] = useState('');
	const [loader, handleLoader] = useLoader();
	const [alterPasswordState, setAlterPasswordState] = useState(false);

	const notify = () => toast.error('Senha ou usuários incorretos!');

	async function tryAuthentication(event) {
		event.preventDefault();

		try {
			const userInformations = await Api.post('/auth-parking-user', {
				login,
				password
			});

			const { token, firstAccess } = userInformations.data;
			const { _id } = userInformations.data.parkingUser;

			if (firstAccess) {
				setUserId(_id);
				setAlterPasswordState(true);

				return;
			} else {
				userLogin(token);

				console.log(userInformations);

				historic.push('/main');
			}
		} catch (error) {
			setLogin('');
			setPassword('');
			notify();
		}
	}

	return (
		<>
			<ForgotPasswordModal />
			<div className='containerLogin'>
				<ToastContainer />

				{alterPasswordState ? (
					<AlterPasswordModel historic={historic} userId={userId} />
				) : null}

				<form className='login-form' onSubmit={tryAuthentication}>
					<div className='image'>
						<img
							src={logo}
							className='mb-4'
							alt='PRO Parking logo'
						/>
					</div>
					<input
						type='text'
						value={login}
						id='input-login'
						className='form-control mb-2 shadow-sm mt-2'
						placeholder='Login'
						required
						onChange={event => setLogin(event.target.value)}
					/>
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
					<button
						type='submit'
						className='btn btn-md btn-primary-pro-parking text-light font-weight-bold mt-4 shadow-sm'
						id='btn-entrar'
					>
						Entrar
					</button>
					<button
						type='button'
						className='btn mt-3 text-black-50 shadow-none'
						data-toggle='modal'
						data-target='#modalForgotPassword'
					>
						Alterar a senha
					</button>
				</form>
				{loader}
			</div>
		</>
	);
}

export default Login;
