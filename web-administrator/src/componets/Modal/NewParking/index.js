import React, { useState, useEffect } from 'react';
import { MdPerson, MdCreate } from 'react-icons/md';
import { getToken } from '../../../services/Auth';
import GoogleMapReact from 'google-map-react';
// import { Image } from 'react-bootstrap';
// import markerImage from '../../../images/marker.png';
import jwt from 'jsonwebtoken';
import Api from '../../../services/Api';
import { Modal, Button, Form } from 'react-bootstrap';

import Marker from '../../Marker';

function NewParkingModal(props) {
	const [parkingCity, setParkingCity] = useState('');
	const [parkingState, setParkingState] = useState('');
	const [parkingStreet, setParkingStreet] = useState('');
	const [parkingNeighborhood, setParkingNeighborhood] = useState('');
	const [administratorUserName, setAdministratorUserName] = useState('');
	const [administratorUserEmail, setAdministratorUserEmail] = useState('');
	const [administratorUserLogin, setAdministratorUserLogin] = useState('');
	const [parkingZipCode, setParkingZipCode] = useState(0);
	const [parkingTelphoneDdd, setParkingTelphoneDdd] = useState(0);
	const [parkingHouseNumber, setParkingHouseNumber] = useState(0);
	const [administratorUserSex, setAdministratorUserSex] = useState(0);
	const [parkingTelphoneNumber, setParkingTelphoneNumber] = useState(0);
	const [parkingEditTelephone, setParkingEditTelephone] = useState(false);
	const [disabledButtonConfirm, setDisabledsetButtonConfirm] = useState(true);
	const [sessionInformations, setSessionInformations] = useState({});

	const [
		parkingCoordinatesLatitude,
		setParkingCoordinatesLatitude
	] = useState(0);

	const [
		parkingCoordinatesLongitude,
		setParkingCoordinatesLongitude
	] = useState(0);

	const [parkingCoordinates, setParkingCoordinates] = useState({
		lat: 0,
		lng: 0
	});

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

		navigator.geolocation.getCurrentPosition(async pos => {
			const lat = pos.coords.latitude;
			const lon = pos.coords.longitude;

			setParkingCoordinatesLatitude(lat);
			setParkingCoordinatesLongitude(lon);
		});

		setSessionInformations(informations);
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

	const renderMarkers = (map, maps) => {
		console.log(maps);

		const marker = new maps.Marker({
			position: {
				lat: parkingCoordinatesLatitude,
				lng: parkingCoordinatesLongitude
			},
			map,
			color: 'blue',
			title: 'Hello World!'
		});
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
						<span>Novo Estacionamento</span>
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div className='mx-3'>
						<h1 className='h4 text-black-50 fw-400 mb-4'>
							Dados cadastrais
						</h1>
						<div className='form-row'>
							<div className='d-flex flex-column col-8'>
								<div>
									<label for-html='name-user'>
										Nome fantasia
									</label>
									<span className='ml-1 text-black-50 fs-10pt'>
										(Visivel para o cliente)
									</span>
								</div>
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
								<label for-html='name-user'>CNPJ</label>
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
						</div>

						<hr />

						<div className='my-5'>
							<h1 className='h4 text-black-50 fw-400 mb-4'>
								Telefone
								<span className='ml-1 text-black-50 fs-10pt'>
									(Visivel para o cliente)
								</span>
							</h1>
							<div className='form-row ml-1'>
								<div className='col-lg-1 col-sm-12 col-md-4 col-xl-1 p-0 pr-2'>
									<label for-html='parking-telphone-ddd'>
										<span className='fw-600'>DDD</span>
									</label>
									<input
										type='text'
										id='parking-telphone-ddd'
										className='form-control shadow-sm'
										placeholder='(00)'
										value={parkingTelphoneDdd}
										onChange={() => {}}
									/>
								</div>

								<div className='col-lg-3 col-sm-12 col-md-4 col-xl-3 p-0 pr-2'>
									<label for-html='parking-telphone-number'>
										<span className='fw-600'>Número</span>
									</label>
									<div className='d-flex'>
										<input
											type='text'
											id='parking-telphone-number'
											className='form-control shadow-sm'
											placeholder='(00000-0000)'
											value={parkingTelphoneNumber}
											onChange={() => {}}
										/>
									</div>
								</div>
							</div>
						</div>

						<hr />

						<div className='my-5'>
							<h1 className='h4 text-black-50 fw-400 mb-4'>
								Endereço
								<span className='text-black-50 fs-10pt'>
									(Visivel para o cliente)
								</span>
							</h1>
							<div className='form-row'>
								<div className='col-4'>
									<label for-html='parking-address-stace'>
										<span className='fw-600'>Estado</span>
									</label>
									<input
										type='text'
										id='parking-address-stace'
										className='form-control shadow-sm text-capitalize'
										placeholder='Estado'
										value={parkingState}
										onChange={() => {}}
									/>
								</div>

								<div className='col-2'>
									<label for-html='parking-address-zip-code'>
										<span className='fw-600'>CEP</span>
									</label>
									<input
										type='text'
										id='parking-address-zip-code'
										className='form-control shadow-sm'
										placeholder='CEP'
										value={parkingZipCode}
										onChange={() => {}}
									/>
								</div>

								<div className='col-6'>
									<label for-html='parking-addess-city'>
										<span className='fw-600'>Cidade</span>
									</label>
									<input
										type='text'
										id='parking-addess-city'
										className='form-control shadow-sm text-capitalize'
										placeholder='Cidade'
										value={parkingCity}
										onChange={() => {}}
									/>
								</div>
							</div>

							<div className='form-row mt-4'>
								<div className='col-5'>
									<label for-html='parking-addess-neighborhood'>
										<span className='fw-600'>Bairro</span>
									</label>
									<input
										type='text'
										id='parking-addess-neighborhood'
										className='form-control shadow-sm text-capitalize'
										placeholder='Bairro'
										value={parkingNeighborhood}
										onChange={() => {}}
									/>
								</div>

								<div className='col-5'>
									<label for-html='parking-address-street'>
										<span className='fw-600'>Rua</span>
									</label>
									<input
										type='text'
										id='parking-address-street'
										className='form-control shadow-sm text-capitalize'
										placeholder='Rua'
										value={parkingStreet}
										onChange={() => {}}
									/>
								</div>

								<div className='col-2'>
									<label for-html='parking-address-house-number'>
										<span className='fw-600'>Número</span>
									</label>
									<input
										type='text'
										id='parking-address-house-number'
										className='form-control shadow-sm'
										placeholder='Número'
										value={parkingHouseNumber}
										onChange={() => {}}
									/>
								</div>
							</div>
						</div>

						<hr />

						<div className='my-5'>
							<h1 className='h4 text-black-50 fw-400 mb-4'>
								Representação geográfica
								<span className='ml-1 text-black-50 fs-10pt'>
									(Visivel para o cliente)
								</span>
							</h1>
							<div className='form-row my-4'>
								<div className='col-4'>
									<label for-html='parking-address-street'>
										<span className='fw-600'>Latitude</span>
									</label>
									<input
										type='text'
										id='parking-address-street'
										className='form-control shadow-sm text-capitalize'
										value={parkingCoordinatesLatitude}
										onChange={event =>
											setParkingCoordinatesLatitude(
												event.target.value
											)
										}
									/>
								</div>

								<div className='col-4'>
									<label for-html='parking-address-house-number'>
										<span className='fw-600'>
											Longitude
										</span>
									</label>
									<input
										type='text'
										id='parking-address-house-number'
										className='form-control shadow-sm'
										value={parkingCoordinatesLongitude}
										onChange={event =>
											setParkingCoordinatesLongitude(
												event.target.value
											)
										}
									/>
								</div>
							</div>

							<div style={{ height: '60vh', width: '100%' }}>
								<GoogleMapReact
									defaultZoom={14}
									yesIWantToUseGoogleMapApiInternals={true}
									center={{
										lat: parkingCoordinatesLatitude,
										lng: parkingCoordinatesLongitude
									}}
									bootstrapURLKeys={{
										key:
											'AIzaSyDqcTeikQQy45rsSbFGwxC1so1-M7X7Ax0',
										language: 'en'
									}}
								>
									<Marker
										lat={parkingCoordinatesLatitude}
										lng={parkingCoordinatesLongitude}
										name='My Marker'
										color='red'
									/>
								</GoogleMapReact>
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
			</form>
		</Modal>
	);
}

export default NewParkingModal;
