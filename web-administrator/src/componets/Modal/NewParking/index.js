import React, { useState, useEffect } from 'react';
import { MdPerson, MdCreate } from 'react-icons/md';
import { getToken } from '../../../services/Auth';
import { markerImage } from '../../../images/marker.png';
import jwt from 'jsonwebtoken';
import Api from '../../../services/Api';
import { Modal, Button } from 'react-bootstrap';
import { compose, withStateHandlers } from 'recompose';
import useLoader from '../../../componets/Loader/useLoader';
import {
	withGoogleMap,
	withScriptjs,
	GoogleMap,
	Marker
} from 'react-google-maps';

function NewParkingModal(props) {
	const [loader, handleLoader] = useLoader();
	const [parkingName, setParkingName] = useState('');
	const [parkingCity, setParkingCity] = useState('');
	const [parkingState, setParkingState] = useState('');
	const [parkingStreet, setParkingStreet] = useState('');
	const [parkingZipCode, setParkingZipCode] = useState('');
	const [parkingDocument, setParkingDocument] = useState('');
	const [parkingHouseNumber, setParkingHouseNumber] = useState('');
	const [parkingNeighborhood, setParkingNeighborhood] = useState('');
	const [parkingTelephoneDdd, setParkingTelephoneDdd] = useState('');
	const [parkingTelephoneNumber, setParkingTelephoneNumber] = useState('');
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

	const { show, history } = props;

	const Map = compose(
		withStateHandlers(
			() => ({
				isMarkerShown: false,
				markerPosition: {
					lat: parkingCoordinatesLatitude,
					lng: parkingCoordinatesLongitude
				}
			}),
			{
				onMapClick: ({ isMarkerShown }) => e => ({
					teste: setParkingCoordinatesLatitude(e.latLng.lat()),
					outroTeste: setParkingCoordinatesLongitude(e.latLng.lng()),
					isMarkerShown: true,
					markerPosition: e.latLng
				})
			}
		),
		withScriptjs,
		withGoogleMap
	)(props => (
		<GoogleMap
			defaultZoom={8}
			center={{
				lat: parkingCoordinatesLatitude,
				lng: parkingCoordinatesLongitude
			}}
			onClick={props.onMapClick}
		>
			{
				<>
					<Marker
						position={props.markerPosition}
						color='blue'
						image={markerImage}
					/>
				</>
			}
		</GoogleMap>
	));

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
		handleLoader(false);
	}, [show]);

	const changeParkingName = value => {
		setParkingName(value);

		if (
			value.length !== 0 &&
			parkingDocument.length !== 0 &&
			parkingTelephoneDdd.length !== 0 &&
			parkingTelephoneNumber.length !== 0 &&
			parkingCity.length !== 0 &&
			parkingState.length !== 0 &&
			parkingStreet.length !== 0 &&
			parkingNeighborhood.length !== 0 &&
			parkingZipCode.length !== 0 &&
			parkingHouseNumber.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingDocument = value => {
		setParkingDocument(value);

		if (
			parkingName.length !== 0 &&
			value.length !== 0 &&
			parkingTelephoneDdd.length !== 0 &&
			parkingTelephoneNumber.length !== 0 &&
			parkingCity.length !== 0 &&
			parkingState.length !== 0 &&
			parkingStreet.length !== 0 &&
			parkingNeighborhood.length !== 0 &&
			parkingZipCode.length !== 0 &&
			parkingHouseNumber.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingTelephoneDdd = value => {
		setParkingTelephoneDdd(value);

		if (
			parkingName.length !== 0 &&
			parkingDocument.length !== 0 &&
			value.length !== 0 &&
			parkingTelephoneNumber.length !== 0 &&
			parkingCity.length !== 0 &&
			parkingState.length !== 0 &&
			parkingStreet.length !== 0 &&
			parkingNeighborhood.length !== 0 &&
			parkingZipCode.length !== 0 &&
			parkingHouseNumber.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingTelephoneNumber = value => {
		setParkingTelephoneNumber(value);

		if (
			parkingName.length !== 0 &&
			parkingDocument.length !== 0 &&
			parkingTelephoneDdd.length !== 0 &&
			value.length !== 0 &&
			parkingCity.length !== 0 &&
			parkingState.length !== 0 &&
			parkingStreet.length !== 0 &&
			parkingNeighborhood.length !== 0 &&
			parkingZipCode.length !== 0 &&
			parkingHouseNumber.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingState = value => {
		setParkingState(value);

		if (
			parkingName.length !== 0 &&
			parkingDocument.length !== 0 &&
			parkingTelephoneDdd.length !== 0 &&
			parkingTelephoneNumber.length !== 0 &&
			parkingCity.length !== 0 &&
			value.length !== 0 &&
			parkingStreet.length !== 0 &&
			parkingNeighborhood.length !== 0 &&
			parkingZipCode.length !== 0 &&
			parkingHouseNumber.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingZipCode = value => {
		setParkingZipCode(value);

		if (
			parkingName.length !== 0 &&
			parkingDocument.length !== 0 &&
			parkingTelephoneDdd.length !== 0 &&
			parkingTelephoneNumber.length !== 0 &&
			parkingCity.length !== 0 &&
			parkingState.length !== 0 &&
			parkingStreet.length !== 0 &&
			parkingNeighborhood.length !== 0 &&
			value.length !== 0 &&
			parkingHouseNumber.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingCity = value => {
		setParkingCity(value);

		if (
			parkingName.length !== 0 &&
			parkingDocument.length !== 0 &&
			parkingTelephoneDdd.length !== 0 &&
			parkingTelephoneNumber.length !== 0 &&
			value.length !== 0 &&
			parkingState.length !== 0 &&
			parkingStreet.length !== 0 &&
			parkingNeighborhood.length !== 0 &&
			parkingZipCode.length !== 0 &&
			parkingHouseNumber.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingNeighborhood = value => {
		setParkingNeighborhood(value);

		if (
			parkingName.length !== 0 &&
			parkingDocument.length !== 0 &&
			parkingTelephoneDdd.length !== 0 &&
			parkingTelephoneNumber.length !== 0 &&
			parkingCity.length !== 0 &&
			parkingState.length !== 0 &&
			parkingStreet.length !== 0 &&
			value.length !== 0 &&
			parkingZipCode.length !== 0 &&
			parkingHouseNumber.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingStreet = value => {
		setParkingStreet(value);

		if (
			parkingName.length !== 0 &&
			parkingDocument.length !== 0 &&
			parkingTelephoneDdd.length !== 0 &&
			parkingTelephoneNumber.length !== 0 &&
			parkingCity.length !== 0 &&
			parkingState.length !== 0 &&
			value.length !== 0 &&
			parkingNeighborhood.length !== 0 &&
			parkingZipCode.length !== 0 &&
			parkingHouseNumber.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const changeParkingHouseNumber = value => {
		setParkingHouseNumber(value);

		if (
			parkingName.length !== 0 &&
			parkingDocument.length !== 0 &&
			parkingTelephoneDdd.length !== 0 &&
			parkingTelephoneNumber.length !== 0 &&
			parkingCity.length !== 0 &&
			parkingState.length !== 0 &&
			parkingStreet.length !== 0 &&
			parkingNeighborhood.length !== 0 &&
			parkingZipCode.length !== 0 &&
			value.length !== 0
		) {
			setDisabledsetButtonConfirm(false);
		} else {
			setDisabledsetButtonConfirm(true);
		}
	};

	const tryCreateParking = async event => {
        event.preventDefault();
        
        console.log(parkingCoordinatesLatitude)

		await Api.post(
			'/create-parking',
			{
				name: parkingName,
				cnpj: parkingDocument,
				telephone: {
					ddd: parkingTelephoneDdd,
					number: parkingTelephoneNumber
				},
				address: {
					zip_code: parkingZipCode,
					state: parkingState,
					city: parkingCity,
					neighborhood: parkingNeighborhood,
					street: parkingStreet,
					number_house: parkingHouseNumber,
                    coordinates: {
                        latitude: parkingCoordinatesLatitude,
                        longitude: parkingCoordinatesLongitude
                    }
				},
			},
			{
				headers: {
					authenticateToken: getToken()
				}
			}
		);

		history.go('/parking-created');
	};

	return (
		<Modal {...props} size='lg'>
			<form onSubmit={tryCreateParking}>
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
						<div className='form-row mb-5'>
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
									value={parkingName}
									required={false}
									onChange={event =>
										changeParkingName(event.target.value)
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
									value={parkingDocument}
									required={false}
									onChange={event =>
										changeParkingDocument(
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
										value={parkingTelephoneDdd}
										onChange={event =>
											changeParkingTelephoneDdd(
												event.target.value
											)
										}
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
											value={parkingTelephoneNumber}
											onChange={event =>
												changeParkingTelephoneNumber(
													event.target.value
												)
											}
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
										onChange={event =>
											changeParkingState(
												event.target.value
											)
										}
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
										onChange={event =>
											changeParkingZipCode(
												event.target.value
											)
										}
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
										onChange={event =>
											changeParkingCity(
												event.target.value
											)
										}
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
										onChange={event =>
											changeParkingNeighborhood(
												event.target.value
											)
										}
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
										onChange={event =>
											changeParkingStreet(
												event.target.value
											)
										}
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
										onChange={event =>
											changeParkingHouseNumber(
												event.target.value
											)
										}
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
												parseFloat(event.target.value)
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
												parseFloat(event.target.value)
											)
										}
									/>
								</div>
							</div>

							<div style={{ height: '60vh', width: '100%' }}>
								<Map
									googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyDqcTeikQQy45rsSbFGwxC1so1-M7X7Ax0'
									loadingElement={
										<div style={{ height: `100%` }} />
									}
									containerElement={
										<div style={{ height: `400px` }} />
									}
									mapElement={
										<div style={{ height: `100%` }} />
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

export default NewParkingModal;
