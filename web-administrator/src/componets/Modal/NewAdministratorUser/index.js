import React, { useState, useEffect } from 'react';
import { MdPerson } from 'react-icons/md';
import { getToken } from '../../../services/Auth';
import jwt from 'jsonwebtoken';
import Api from '../../../services/Api';
import { Modal, Button, Form } from 'react-bootstrap';
import useLoader from '../../../componets/Loader/useLoader';

function NewAdministratorUserModal(props) {
	const [loader, handleLoader] = useLoader();
	const [administratorUserName, setAdministratorUserName] = useState('');
	const [administratorUserEmail, setAdministratorUserEmail] = useState('');
	const [administratorUserLogin, setAdministratorUserLogin] = useState('');
	const [administratorUserSex, setAdministratorUserSex] = useState(0);
	const [disabledButtonConfirm, setDisabledsetButtonConfirm] = useState(true);
	const [sessionInformations, setSessionInformations] = useState({});

	const [administratorUserPassword, setAdministratorUserPassword] = useState(
		''
	);

	const [
		administratorUserPasswordConfirm,
		setAdministratorUserPasswordConfirm
	] = useState('');

	const { show, history } = props;

	useEffect(() => {
		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		setSessionInformations(informations);
		handleLoader(false);
	}, [show]);

	const changeAdministratorUserName = value => {
		setAdministratorUserName(value);

		if (
			administratorUserSex !== 0 &&
			value.length !== 0 &&
			administratorUserEmail.length !== 0 &&
			administratorUserLogin.length !== 0 &&
			administratorUserPassword.length !== 0 &&
			administratorUserPasswordConfirm.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeAdministratorUserSex = value => {
		setAdministratorUserSex(Number(value));

		if (
			Number(value) !== 0 &&
			administratorUserName.length !== 0 &&
			administratorUserEmail.length !== 0 &&
			administratorUserLogin.length !== 0 &&
			administratorUserPassword.length !== 0 &&
			administratorUserPasswordConfirm.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeAdministratorUserLogin = value => {
		setAdministratorUserLogin(value);

		if (
			administratorUserSex !== 0 &&
			administratorUserName.length !== 0 &&
			administratorUserEmail.length !== 0 &&
			value.length !== 0 &&
			administratorUserPassword.length !== 0 &&
			administratorUserPasswordConfirm.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeAdministratorUserEmail = value => {
		setAdministratorUserEmail(value);

		if (
			administratorUserSex !== 0 &&
			administratorUserName.length !== 0 &&
			value.length !== 0 &&
			administratorUserLogin.length !== 0 &&
			administratorUserPassword.length !== 0 &&
			administratorUserPasswordConfirm.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeAdministratorUserPassword = value => {
		setAdministratorUserPassword(value);

		if (
			administratorUserSex !== 0 &&
			administratorUserName.length !== 0 &&
			administratorUserEmail.length !== 0 &&
			administratorUserLogin.length !== 0 &&
			value.length !== 0 &&
			administratorUserPasswordConfirm.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeAdministratorUserPasswordConfirm = value => {
		setAdministratorUserPasswordConfirm(value);

		if (
			administratorUserSex !== 0 &&
			administratorUserName.length !== 0 &&
			administratorUserEmail.length !== 0 &&
			administratorUserLogin.length !== 0 &&
			administratorUserPassword.length !== 0 &&
			value.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const tryCreateAdministratorUser = async event => {
		event.preventDefault();

		await Api.post(
			'/create-administrator-user',
			{
				login: administratorUserLogin,
				password: administratorUserPassword,
				email: administratorUserEmail,
				name: administratorUserName,
				sex: administratorUserSex
			},
			{
				headers: {
					authenticateToken: getToken()
				}
			}
		);

		history.go('/users');
	};

	return (
		<Modal {...props} size='lg'>
			<form onSubmit={tryCreateAdministratorUser}>
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
							<div className='d-flex flex-column col-8'>
								<label for-html='name-user'>
									Nome completo
								</label>
								<input
									type='text'
									id='name-user'
									className='form-control shadow-sm'
									placeholder='Obrigatório'
									value={administratorUserName}
									required={false}
									onChange={event =>
										changeAdministratorUserName(
											event.target.value
										)
									}
								/>
							</div>

							<div className='d-flex flex-column col-4'>
								<Form.Group
									controlId='Sexo'
									onChange={event =>
										changeAdministratorUserSex(
											event.target.value
										)
									}
								>
									<Form.Label>Sexo</Form.Label>
									<Form.Control as='select' defaultValue={0}>
										<option value={0}>- Selecione -</option>
										<option value={1}>Feminino</option>
										<option value={2}>Masculino</option>
									</Form.Control>
								</Form.Group>
							</div>
						</div>

						<div className='form-row mt-5'>
							<div className='d-flex flex-column col-4'>
								<label for-html='name-user'>Login</label>
								<input
									type='text'
									id='name-user'
									className='form-control shadow-sm'
									placeholder='Obrigatório'
									required={false}
									value={administratorUserLogin}
									onChange={event =>
										changeAdministratorUserLogin(
											event.target.value
										)
									}
								/>
							</div>

							<div className='d-flex flex-column col-8'>
								<label for-html='name-user'>E-Mail</label>
								<input
									type='email'
									id='name-user'
									className='form-control shadow-sm'
									placeholder='Obrigatório'
									required={false}
									value={administratorUserEmail}
									onChange={event =>
										changeAdministratorUserEmail(
											event.target.value
										)
									}
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
									required={false}
									value={administratorUserPassword}
									onChange={event =>
										changeAdministratorUserPassword(
											event.target.value
										)
									}
								/>
							</div>

							<div className='d-flex flex-column col-6'>
								<label for-html='name-user'>
									Confirmar senha
								</label>
								<input
									type='password'
									id='name-user'
									className='form-control shadow-sm'
									placeholder='Obrigatório'
									required={false}
									value={administratorUserPasswordConfirm}
									onChange={event =>
										changeAdministratorUserPasswordConfirm(
											event.target.value
										)
									}
								/>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						type={'button'}
						onClick={props.onHide}
						variant='secondary'
						size='sm'
					>
						Fechar
					</Button>

					<Button
						type={'submit'}
						onClick={props.action}
						variant='primary'
						size='sm'
						disabled={disabledButtonConfirm}
					>
						Cadastrar
					</Button>
				</Modal.Footer>
			</form>{' '}
			{loader}
		</Modal>
	);
}

export default NewAdministratorUserModal;
