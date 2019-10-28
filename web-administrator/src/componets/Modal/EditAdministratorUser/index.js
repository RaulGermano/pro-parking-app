import React, { useState, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import Api from '../../../services/Api';
import { getToken } from '../../../services/Auth';
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';
import {
	Modal,
	Button,
	Form,
	ToggleButton,
	ToggleButtonGroup
} from 'react-bootstrap';

function EditAdministratorUserModal(props) {
	const [administratorUserName, setAdministratorUserName] = useState('');
	const [administratorUserEmail, setAdministratorUserEmail] = useState('');
	const [administratorUserLogin, setAdministratorUserLogin] = useState('');
	const [
		administratorUserCreatedAt,
		setAdministratorUserCreatedAt
	] = useState('');
	const [
		administratorUserAccessLevel,
		setAdministratorUserAccessLevel
	] = useState('');
	const [administratorUserSex, setAdministratorUserSex] = useState(0);
	const [typeReservation, setTypeReservation] = useState(0);
	const [administratorUserExcluded, setAdministratorUserExcluded] = useState(
		false
	);
	const [disabledButtonConfirm, setDisabledsetButtonConfirm] = useState(true);
	const [sessionInformations, setSessionInformations] = useState({});

	const { show, history, administratoruserid } = props;

	useEffect(() => {
		setTypeReservation(0);
		setDisabledsetButtonConfirm(true);

		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		setSessionInformations(informations);

		if (administratoruserid) {
			const selectParkingUserInformations = async () => {
				const result = await Api.get(
					`/select-specific-administrator-user-informations/?administratorUser_id=${administratoruserid}`,
					{
						headers: {
							authenticateToken: getToken()
						}
					}
				);

				console.log(result);

				const administratorInformations = result.data.result;

				const {
					accessLevel,
					createdAt,
					excluded,
					email,
					login,
					name,
					sex
				} = administratorInformations;

				const created_at = `${moment(createdAt).format(
					'DD/MM/YYYY'
				)} às ${moment(createdAt).format('HH:mm')}h`;

				setAdministratorUserSex(sex);
				setAdministratorUserName(name);
				setAdministratorUserEmail(email);
				setAdministratorUserLogin(login);
				setAdministratorUserExcluded(excluded);
				setAdministratorUserCreatedAt(created_at);
				setAdministratorUserAccessLevel(accessLevel);

				setTypeReservation(1);
			};

			selectParkingUserInformations();
		}
	}, [show, administratoruserid]);

	const changeAdministratorUserExcluded = value => {
		setAdministratorUserExcluded(value);

		if (
			administratorUserSex !== 0 &&
			administratorUserName.length !== 0 &&
			value !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeAdministratorUserName = value => {
		setAdministratorUserName(value);

		if (administratorUserSex !== 0 && value.length !== 0) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeAdministratorUserSex = value => {
		setAdministratorUserSex(Number(value));

		if (Number(value) !== 0 && administratorUserName.length !== 0) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const tryAlterAdministratorSpace = async event => {
		event.preventDefault();

		await Api.put(
			'/update-administrator-user-informations',
			{
				name: administratorUserName,
				sex: Number(administratorUserSex),
				excluded: administratorUserExcluded,
				user_id: administratoruserid
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
			<form onSubmit={tryAlterAdministratorSpace}>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						<MdEdit
							size={30}
							className='bg-primary rounded-circle p-lg-1 text-light'
						/>
						<span>Editar o usuário selecionado</span>
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					{typeReservation === 0 ? (
						<div className='container'>
							<div className='col-12 form-control align-self-end bg-light border-dashed-gray-light pl-2 d-flex justify-content-lg-around height-75 align-items-center'>
								<p className='text-black-50 m-0'>
									Informações do usuário selecionado.
								</p>
							</div>
						</div>
					) : (
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
										<Form.Control
											as='select'
											defaultValue={administratorUserSex}
										>
											<option value={0}>
												- Selecione -
											</option>
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
										disabled={true}
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
										disabled={true}
									/>
								</div>
							</div>

							<div className='d-flex justify-content-between mt-5'>
								<div className='col-6 p-0  ml-1'>
									<span>Disponibilidade</span>

									<ToggleButtonGroup
										type='radio'
										name='options-'
										className='input-group mb-4'
										onChange={
											changeAdministratorUserExcluded
										}
										defaultValue={administratorUserExcluded}
									>
										<ToggleButton
											value={true}
											variant='secondary'
											className='btn btn-sm btn-block font-weight-bold mt-2 gb-gray-light-2 parking-lot-not-reserved shadow-sm col-6'
										>
											Inativo
										</ToggleButton>
										<ToggleButton
											value={false}
											variant='primary'
											className='btn btn-sm btn-block font-weight-bold mt-2 gb-gray-light-2 parking-lot-not-reserved shadow-sm col-6'
										>
											Ativo
										</ToggleButton>
									</ToggleButtonGroup>
								</div>
							</div>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						type='button'
						onClick={props.onHide}
						variant='secondary'
						size='sm'
					>
						Fechar
					</Button>
					<Button
						type='submit'
						variant='primary'
						size='sm'
						disabled={disabledButtonConfirm}
					>
						Confirmar
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default EditAdministratorUserModal;
