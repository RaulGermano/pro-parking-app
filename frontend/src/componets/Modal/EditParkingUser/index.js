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

function EditParkingSpace(props) {
	const [parkingUserName, setParkingUserName] = useState('');
	const [parkingUserEmail, setParkingUserEmail] = useState('');
	const [parkingUserLogin, setParkingUserLogin] = useState('');
	const [parkingUserCreatedAt, setParkingUserCreatedAt] = useState('');
	const [parkingUserAccessLevel, setParkingUserAccessLevel] = useState('');
	const [parkingUserSex, setParkingUserSex] = useState(0);
	const [typeReservation, setTypeReservation] = useState(0);
	const [parkingUserExcluded, setParkingUserExcluded] = useState(false);
	const [disabledButtonConfirm, setDisabledsetButtonConfirm] = useState(true);
	const [sessionInformations, setSessionInformations] = useState({});

	const { show, history, parkinguserid } = props;

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

		if (parkinguserid) {
			const selectParkingUserInformations = async () => {
				const result = await Api.get(
					`/select-specific-parking-user/?parkingUser_id=${parkinguserid}`,
					{
						headers: {
							authenticateToken: getToken()
						}
					}
				);

				console.log(result);

				const parkingInformations = result.data.result;

				const {
					accessLevel,
					createdAt,
					excluded,
					email,
					login,
					name,
					sex
				} = parkingInformations;

				console.log(accessLevel);

				const created_at = `${moment(createdAt).format(
					'DD/MM/YYYY'
				)} às ${moment(createdAt).format('HH:mm')}h`;

				setParkingUserSex(sex);
				setParkingUserName(name);
				setParkingUserEmail(email);
				setParkingUserLogin(login);
				setParkingUserExcluded(excluded);
				setParkingUserCreatedAt(created_at);
				setParkingUserAccessLevel(accessLevel);

				setTypeReservation(1);
			};

			selectParkingUserInformations();
		}
	}, [show, parkinguserid]);

	const changeParkingUserAccessLevel = value => {
		setParkingUserAccessLevel(String(value));

		if (
			parkingUserSex !== 0 &&
			parkingUserName.length !== 0 &&
			value !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingUserExcluded = value => {
		setParkingUserExcluded(value);

		if (
			parkingUserSex !== 0 &&
			parkingUserName.length !== 0 &&
			value !== 0 &&
			parkingUserAccessLevel !== 0
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
			parkingUserAccessLevel !== 0
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
			parkingUserAccessLevel !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const tryAlterParkingSpace = async event => {
		event.preventDefault();

		const teste = await Api.put(
			'/update-parking-user-informations',
			{
				name: parkingUserName,
				sex: Number(parkingUserSex),
				accessLevel: Number(parkingUserAccessLevel),
				excluded: parkingUserExcluded,
				user_id: parkinguserid,
				parking_id: sessionInformations.parking
			},
			{
				headers: {
					authenticateToken: getToken()
				}
			}
		);

		console.log(teste);

		history.go('/users');
	};

	return (
		<Modal {...props} size='lg'>
			<form onSubmit={tryAlterParkingSpace}>
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
									Informações da vaga de estacionamento
									selecionada.
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
											changeParkingUserSex(
												event.target.value
											)
										}
									>
										<Form.Label>Sexo</Form.Label>
										<Form.Control
											as='select'
											defaultValue={parkingUserSex}
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
										value={parkingUserLogin}
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
										value={parkingUserEmail}
										disabled={true}
									/>
								</div>
							</div>

							<div className='d-flex justify-content-between mt-5'>
								<div className='col-6 p-0 mr-1'>
									<span>Nível de acesso</span>
									<ToggleButtonGroup
										type='radio'
										name='options-access-level'
										className='input-group'
										onChange={changeParkingUserAccessLevel}
										defaultValue={parkingUserAccessLevel}
									>
										<ToggleButton
											value={2}
											variant='secondary'
											className='btn btn-sm btn-block font-weight-bold mt-2 gb-gray-light-2 parking-lot-not-reserved shadow-sm col-6'
										>
											Comum
										</ToggleButton>
										<ToggleButton
											value={1}
											variant='primary'
											className='btn btn-sm btn-block font-weight-bold mt-2 gb-gray-light-2 parking-lot-not-reserved shadow-sm col-6'
										>
											Administrador
										</ToggleButton>
									</ToggleButtonGroup>
								</div>

								<div className='col-6 p-0  ml-1'>
									<span>Disponibilidade</span>

									<ToggleButtonGroup
										type='radio'
										name='options-'
										className='input-group mb-4'
										onChange={changeParkingUserExcluded}
										defaultValue={parkingUserExcluded}
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

export default EditParkingSpace;
