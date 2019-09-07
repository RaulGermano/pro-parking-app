import React, { useState } from 'react';
import logo from '../../images/logo.png';
import useLoader from '../../componets/Loader/useLoader';

function Login({ history: historic }) {
	// useEffect(() => {
	// 	effect;
	// 	return () => {
	// 		cleanup;
	// 	};
	// }, [input]);

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	async function tryAuthentication(event) {
		event.preventDefault();

		await historic.push('/main');
	}

	const [loader, handleLoader] = useLoader();

	setTimeout(() => handleLoader(false), 500);

	return (
		<div className='containerLogin'>
			<form onSubmit={tryAuthentication}>
				<div className='image'>
					<img src={logo} className='mb-4' alt='PRO Parking logo' />
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
					onClick={() => {
						console.log(123);
					}}
					className='btn btn-md btn-primary-pro-parking text-light font-weight-bold mt-4 shadow-sm'
					id='btn-entrar'
				>
					Entrar
				</button>

				<a href='teste'>Alterar a senha</a>
			</form>
			{loader}
		</div>
	);
}

export default Login;
