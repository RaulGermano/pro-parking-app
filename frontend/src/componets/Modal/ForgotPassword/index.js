import React, { useState } from 'react';
import { MdAssistantPhoto, MdClose } from 'react-icons/md';

export default function ForgotPasswordModal() {
	const [email, setEmail] = useState('');

	const sendEmail = event => {
		event.preventDefault();

		setEmail('');

		console.log(email);
	};

	return (
		<div
			className='modal fade'
			id='modalForgotPassword'
			role='dialog'
			aria-labelledby='modalForgotPasswordLabel'
			aria-hidden='true'
		>
			<form onSubmit={sendEmail}>
				<div className='modal-dialog modal-md' role='document'>
					<div className='modal-content'>
						<div className='modal-header p-2'>
							<h5
								className='modal-title'
								id='modalForgotPasswordLabel'
							>
								<MdAssistantPhoto
									size={30}
									color='#fff'
									className='bg-primary rounded-circle p-lg-1 mr-2'
								/>
								<span>Alterar a senha</span>
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
						<div className='modal-body pb-2 pt-3 d-flex form-row mb-4 m-2'>
							<div className='col'>
								<label htmlFor='input-vehicle-plate'>
									E-mail
								</label>
								<div className='input-group'>
									<input
										type='email'
										className='form-control'
										id='input-vehicle-plate'
										aria-describedby='small-vehicle-plate'
										placeholder='Digite o E-Mail..'
										value={email}
										onChange={event =>
											setEmail(event.target.value)
										}
									/>
								</div>
							</div>
						</div>

						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-sm btn-secondary'
								data-dismiss='modal'
							>
								Fechar
							</button>

							<button
								type='submit'
								className='btn btn-sm btn-primary'
								disabled={email.length > 0 ? false : true}
							>
								Enviar solicitação
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
