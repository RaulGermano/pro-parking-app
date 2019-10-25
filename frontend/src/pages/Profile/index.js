import React, { useState, useEffect } from 'react';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import { MdCreate, MdCached } from 'react-icons/md';
import Api from '../../services/Api';
import { getToken } from '../../services/Auth';
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';
import useLoader from '../../componets/Loader/useLoader';
import { Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

export default function Main({ match, history }) {
	const [loader, handleLoader] = useLoader();
	const [parkingUserName, setParkingUserName] = useState('');
	const [parkingUserEmail, setParkingUserEmail] = useState('');
	const [parkingUserLogin, setParkingUserLogin] = useState('');
	const [parkingUserCreatedAt, setParkingUserCreatedAt] = useState('');
	const [parkingUserAccessLevel, setParkingUserAccessLevel] = useState('');
	const [parkingUserSex, setParkingUserSex] = useState(0);
	const [typeParkingUser, setTypeParkingUser] = useState(0);
	const [editButtonEnable, setEditButtonEnable] = useState(false);
	const [parkingUserExcluded, setParkingUserExcluded] = useState(false);
	const [disabledButtonConfirm, setDisabledButtonConfirm] = useState(true);

	const [editParkingUserDisabled, setEditParkingUserDisabled] = useState(
		true
	);
	const [sessionInformations, setSessionInformations] = useState({});

	useEffect(() => {
		setDisabledButtonConfirm(true);
		setEditParkingUserDisabled(true);

		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		console.log(informations);

		setSessionInformations(informations);

		if (informations) {
			const selectParkingUserInformations = async () => {
				const result = await Api.get(
					`/select-specific-parking-user/?parkingUser_id=${informations.id}`,
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
			};

			selectParkingUserInformations();

			handleLoader(false);
		}
	}, [match]);

	const changeParkingUserName = value => {
		setParkingUserName(value);

		if (parkingUserSex !== 0 && value.length !== 0) {
			setEditParkingUserDisabled(false);
		} else {
			setEditParkingUserDisabled(true);
		}
	};

	const EnableEditPArkingUserInformations = () => {
		setEditButtonEnable(true);
		setEditParkingUserDisabled(false);
	};

	const tryAlterParkingSpace = async event => {
		event.preventDefault();

		const teste = await Api.put(
			'/update-parking-user-informations',
			{
				name: parkingUserName,
				user_id: sessionInformations.id,
				parking_id: sessionInformations.parking
			},
			{
				headers: {
					authenticateToken: getToken()
				}
			}
		);

		console.log(teste);

		// history.go('/users');
	};

	return (
		<>
			<Header />
			<div className='container-fluid'>
				<div className='row'>
					<SideBar route={match} />
					<main
						role='main'
						className='col-md-9 ml-sm-auto col-lg-10 px-4'
					>
						<div className='p-3 br-5px bg-white shadow border mt-4 mb-5'>
							<div className='d-flex justify-content-between'>
								<div className='d-flex'>
									{/* <div className='image-profile bg-pro-parking'></div> */}
									<div className='align-self-center ml-1'>
										<h5 className='mb-1 h2 text-capitalize'>
											{parkingUserName}
										</h5>
										<p className='m-0'>
											{parkingUserAccessLevel === 1
												? 'Administrador'
												: 'Comum'}
										</p>
									</div>
								</div>
								{/* <div className='align-self-center'>
									<button
										className='btn btn-sm btn-light text-secondary border mr-2'
										onClick={() =>
											setEditParkingUserDisabled(false)
										}
									>
										<MdCached
											size={22}
											className='pr-1 text-secondary'
										/>
										Alterar senha
									</button>

									<button
										className='btn btn-sm bg-pro-parking text-light'
										disabled={editButtonEnable}
										onClick={() =>
											setEditParkingUserDisabled(false)
										}
									>
										<MdCreate
											size={22}
											className='pr-1 text-light'
										/>
										Editar
									</button>
								</div> */}
							</div>

							<hr />

							<form onSubmit={tryAlterParkingSpace}>
								<div className='my-5'>
									<h1 className='h4 text-black-50 fw-400 mb-4'>
										Dados pessoais e cadastrais
									</h1>

									<div className='form-row ml-1'>
										<div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0 pr-2 '>
											<label for-html='name-user'>
												Nome completo
											</label>
											<input
												type='text'
												id='name-user'
												className='form-control shadow-sm'
												placeholder='Obrigatório'
												value={parkingUserName}
												disabled={
													editParkingUserDisabled
												}
												required={
													editParkingUserDisabled
												}
												onChange={event =>
													changeParkingUserName(
														event.target.value
													)
												}
											/>
										</div>

										<div className='col-sm-12 col-md-6 col-lg-3 col-xl-3 p-0 pr-2'>
											<label for-html='name-user'>
												Nome completo
											</label>
											<input
												type='text'
												id='name-user'
												className='form-control shadow-sm'
												placeholder='Obrigatório'
												disabled={true}
												onChange={() => {}}
												value={
													parkingUserSex === 1
														? 'Feminino'
														: 'Masculino'
												}
											/>
										</div>

										<div className='col-sm-12 col-md-6 col-lg-3 col-xl-3 p-0 pr-2'>
											<label for-html='name-user'>
												Criado em
											</label>
											<input
												type='text'
												id='name-user'
												className='form-control shadow-sm'
												placeholder='Obrigatório'
												disabled={true}
												value={parkingUserCreatedAt}
												onChange={event =>
													setParkingUserCreatedAt(
														event.target.value
													)
												}
												required={
													editParkingUserDisabled
												}
											/>
										</div>
									</div>
								</div>

								<hr />

								<div className='my-5'>
									<h1 className='h4 titulo-pagina text-black-50 fw-400 mb-4'>
										Dados de usuário
									</h1>

									<div className='form-row ml-1'>
										<div className='col-4 p-0 pr-2 '>
											<label for-html='name-user'>
												login
											</label>
											<input
												type='text'
												id='name-user'
												className='form-control shadow-sm'
												placeholder='Obrigatório'
												disabled={true}
												required={false}
												value={parkingUserLogin}
												onChange={event =>
													setParkingUserLogin(
														event.target.value
													)
												}
											/>
										</div>

										<div className='col-8 p-0 pr-2 '>
											<label for-html='name-user'>
												e-mail
											</label>
											<input
												type='text'
												id='name-user'
												className='form-control shadow-sm'
												placeholder='Obrigatório'
												disabled={true}
												required={false}
												value={parkingUserEmail}
												onChange={event =>
													setParkingUserEmail(
														event.target.value
													)
												}
											/>
										</div>
									</div>
								</div>
								{editParkingUserDisabled ? null : (
									<div className='d-flex justify-content-end'>
										<button
											type='button'
											className='btn btn-sm btn-light text-secondary border mr-2'
											onClick={() =>
												history.go('/profile')
											}
										>
											Cancelar
										</button>

										<button
											type='submit'
											className='btn btn-sm bg-pro-parking text-light'
											disabled={disabledButtonConfirm}
											onClick={() =>
												EnableEditPArkingUserInformations
											}
										>
											Concluír
										</button>
									</div>
								)}
							</form>
						</div>
					</main>
				</div>
			</div>
			{loader}
		</>
	);
}
