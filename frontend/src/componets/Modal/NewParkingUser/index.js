import React, { useState, useEffect } from 'react';
import { MdPerson } from 'react-icons/md';
import { getToken } from '../../../services/Auth';
import jwt from 'jsonwebtoken';
import Api from '../../../services/Api';
import {
	Modal,
	Button,
	Form,
	ToggleButton,
	ToggleButtonGroup
} from 'react-bootstrap';

function NewParkingUserModal(props) {
	const [parkingUserName, setParkingUserName] = useState('');
	const [parkingUserEmail, setParkingUserEmail] = useState('');
	const [parkingUserLogin, setParkingUserLogin] = useState('');
	const [parkingUserPassword, setParkingUserPassword] = useState('');
	const [parkingUserSex, setParkingUserSex] = useState(0);
	const [parkingUserAccessLevel, setParkingUserAccessLevel] = useState(0);
	const [
		parkingUserPasswordConfirm,
		setParkingUserPasswordConfirm
	] = useState('');
	const [disabledButtonConfirm, setDisabledsetButtonConfirm] = useState(true);
	const [sessionInformations, setSessionInformations] = useState({});

	const { show, reservationid, history } = props;

	useEffect(() => {
		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		setSessionInformations(informations);
	}, [show]);

	const changeParkingUserAccessLevel = value => {
		setParkingUserAccessLevel(value);

		if (
			parkingUserSex !== 0 &&
			parkingUserName.length !== 0 &&
			parkingUserEmail.length !== 0 &&
			parkingUserLogin.length !== 0 &&
			parkingUserPassword.length !== 0 &&
			value !== 0 &&
			parkingUserPasswordConfirm.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingUserName = value => {
		setParkingUserName(value);

		if (
			parkingUserSex !== 0 &&
			value.length !== 0 &&
			parkingUserEmail.length !== 0 &&
			parkingUserLogin.length !== 0 &&
			parkingUserPassword.length !== 0 &&
			parkingUserAccessLevel !== 0 &&
			parkingUserPasswordConfirm.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingUserSex = value => {
		setParkingUserSex(Number(value));
		if (
			value !== 0 &&
			parkingUserName.length !== 0 &&
			parkingUserEmail.length !== 0 &&
			parkingUserLogin.length !== 0 &&
			parkingUserPassword.length !== 0 &&
			parkingUserAccessLevel !== 0 &&
			parkingUserPasswordConfirm.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingUserLogin = value => {
		setParkingUserLogin(value);

		if (
			parkingUserSex !== 0 &&
			parkingUserName.length !== 0 &&
			parkingUserEmail.length !== 0 &&
			value.length !== 0 &&
			parkingUserPassword.length !== 0 &&
			parkingUserAccessLevel !== 0 &&
			parkingUserPasswordConfirm.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingUserEmail = value => {
		setParkingUserEmail(value);

		if (
			parkingUserSex !== 0 &&
			parkingUserName.length !== 0 &&
			value.length !== 0 &&
			parkingUserLogin.length !== 0 &&
			parkingUserPassword.length !== 0 &&
			parkingUserAccessLevel !== 0 &&
			parkingUserPasswordConfirm.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingUserPassword = value => {
		setParkingUserPassword(value);

		if (
			parkingUserSex !== 0 &&
			parkingUserName.length !== 0 &&
			parkingUserEmail.length !== 0 &&
			parkingUserLogin.length !== 0 &&
			value.length !== 0 &&
			parkingUserAccessLevel !== 0 &&
			parkingUserPasswordConfirm.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingUserPasswordConfirm = value => {
		setParkingUserPasswordConfirm(value);

		if (
			parkingUserSex !== 0 &&
			parkingUserName.length !== 0 &&
			parkingUserEmail.length !== 0 &&
			parkingUserLogin.length !== 0 &&
			parkingUserPassword.length !== 0 &&
			parkingUserAccessLevel !== 0 &&
			value.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const tryCreateParkingUser = async event => {
		event.preventDefault();

		await Api.post(
			'/create-parking-user',
			{
				login: parkingUserLogin,
				password: parkingUserPassword,
				email: parkingUserEmail,
				name: parkingUserName,
				accessLevel: parkingUserAccessLevel,
				sex: parkingUserSex,
				parking_id: sessionInformations.parking
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
			<form onSubmit={tryCreateParkingUser}>
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
									value={parkingUserName}
									required={false}
									onChange={event =>
										changeParkingUserName(
											event.target.value
										)
									}
								/>
							</div>

							<div className='d-flex flex-column col-4'>
								<Form.Group
									controlId='Sexo'
									onChange={event =>
										changeParkingUserSex(event.target.value)
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
									value={parkingUserLogin}
									onChange={event =>
										changeParkingUserLogin(
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
									value={parkingUserEmail}
									onChange={event =>
										changeParkingUserEmail(
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
									value={parkingUserPassword}
									onChange={event =>
										changeParkingUserPassword(
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
									value={parkingUserPasswordConfirm}
									onChange={event =>
										changeParkingUserPasswordConfirm(
											event.target.value
										)
									}
								/>
							</div>
						</div>

						<div className='form-row mt-5'>
							<span>Nível de acesso</span>

							<ToggleButtonGroup
								type='radio'
								name='options'
								className='input-group mb-4'
								onChange={changeParkingUserAccessLevel}
							>
								<ToggleButton
									value={2}
									variant='secondary'
									className='btn btn-sm btn-block font-weight-bold mt-2 gb-gray-light-2 parking-lot-not-reserved shadow-sm col-3 mr-2'
								>
									Comum
								</ToggleButton>
								<ToggleButton
									value={1}
									variant='primary'
									className='btn btn-sm btn-block font-weight-bold mt-2 gb-gray-light-2 parking-lot-not-reserved shadow-sm col-3'
								>
									Administrador
								</ToggleButton>
							</ToggleButtonGroup>
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
			</form>
		</Modal>
	);
}

export default NewParkingUserModal;
