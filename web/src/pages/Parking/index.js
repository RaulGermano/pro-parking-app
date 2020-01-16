import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import StarRatings from 'react-star-ratings';
import GoogleMapReact from 'google-map-react';
import markerImage from '../../images/marker.png';
import Api from '../../services/Api';
import { getToken } from '../../services/Auth';
import { MdCreate } from 'react-icons/md';
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';
import EditParkingTelphone from '../../componets/Modal/EditParkingTelephone';
import useLoader from '../../componets/Loader/useLoader';

export default function Settings(props) {
	const [loader, handleLoader] = useLoader();
	const [parkingName, setParkingName] = useState('');
	const [parkingCreatedAt, setParkingCreatedAt] = useState('');
	const [parkingNeighborhood, setParkingNeighborhood] = useState('');
	const [parkingCity, setParkingCity] = useState('');
	const [parkingState, setParkingState] = useState('');
	const [parkingStreet, setParkingStreet] = useState('');
	const [parkingHouseNumber, setParkingHouseNumber] = useState(0);
	const [parkingZipCode, setParkingZipCode] = useState(0);
	const [parkingCnpj, setParkingCnpj] = useState(0);
	const [parkingTelphoneDdd, setParkingTelphoneDdd] = useState(0);
	const [parkingTelphoneNumber, setParkingTelphoneNumber] = useState(0);
	const [parkingQualification, setParkingQualification] = useState(0);
	const [parkingEditTelephone, setParkingEditTelephone] = useState(false);
	const [sessionInformations, setSessionInformations] = useState({});
	const [parkingCoordinates, setParkingCoordinates] = useState({
		lat: 0,
		lng: 0
	});

	const { match, history } = props;

	useEffect(() => {
		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		setSessionInformations(informations);

		console.log(informations);

		if (informations) {
			const selectParkingUserInformations = async () => {
				const parkingInformationsResult = await Api.get(
					`/select-specific-parkings/?parking_id=${informations.parking}`,
					{
						headers: {
							authenticateToken: getToken()
						}
					}
				);

				const parkingQualificationsResult = await Api.get(
					`/select-specific-parking-qualification-average/?parking_id=${informations.parking}`,
					{
						headers: {
							authenticateToken: getToken()
						}
					}
				);

				const qualification = parkingQualificationsResult.data.result;

				const {
					name,
					cnpj,
					createdAt,
					telephone: { ddd },
					telephone: { number },
					address: {
						coordinates: { latitude: lat, longitude: lng },
						neighborhood,
						number_house,
						zip_code,
						street,
						state,
						city
					}
				} = parkingInformationsResult.data.result;

				const created_at = `${moment(createdAt).format(
					'DD/MM/YYYY'
				)} às ${moment(createdAt).format('HH:mm')}h`;

				setParkingName(name);
				setParkingCnpj(cnpj);
				setParkingCreatedAt(created_at);
				setParkingQualification(4);
				setParkingTelphoneDdd(ddd);
				setParkingTelphoneNumber(number);
				setParkingCoordinates({ lat, lng });
				setParkingNeighborhood(neighborhood);
				setParkingHouseNumber(number_house);
				setParkingZipCode(zip_code);
				setParkingStreet(street);
				setParkingState(state);
				setParkingCity(city);
			};

			selectParkingUserInformations();

			handleLoader(false);
		}
	}, [match]);

	return (
		<>
			<Header />

			<EditParkingTelphone
				show={parkingEditTelephone}
				onHide={() => setParkingEditTelephone(false)}
				history={history}
				parkingid={sessionInformations.parking}
			/>

			<div className='container-fluid'>
				<div className='row'>
					<SideBar route={match} />
					<main
						role='main'
						className='col-md-9 ml-sm-auto col-lg-10 px-4'
					>
						<div className='p-3 br-5px bg-white shadow-sm border mt-4 mb-5'>
							<div className='d-flex justify-content-between align-items-center'>
								<div>
									{/* <div className='image-profile bg-pro-parking'></div> */}
									<div className='align-self-center ml-1'>
										<h5 className='mb-1 h2 text-capitalize'>
											{parkingName}
										</h5>
									</div>
								</div>
								<StarRatings
									rating={parkingQualification}
									starRatedColor='#3769cc'
									numberOfStars={5}
									starDimension='30px'
									starSpacing='1px'
									name='rating'
								/>
							</div>

							<hr />

							<div className='my-5'>
								<h1 className='h4 text-black-50 fw-400 mb-4'>
									Dados cadastrais
								</h1>

								<div className='form-row ml-1 mb-5'>
									<div className='col-6 p-0 pr-2'>
										<label for-html='parking-name'>
											<span className='fw-600'>
												Nome comercial
											</span>
											<span className='ml-1 text-black-50 fs-10pt'>
												(Visivel para o cliente)
											</span>
										</label>
										<input
											type='text'
											id='parking-name'
											className='form-control shadow-sm text-capitalize'
											placeholder='Obrigatório'
											disabled={true}
											value={parkingName}
											onChange={() => {}}
										/>
									</div>

									<div className='col-3 p-0 pr-2'>
										<label for-html='parking-cnpj'>
											<span className='fw-600'>CNPJ</span>
										</label>
										<input
											type='text'
											id='parking-cnpj'
											className='form-control shadow-sm'
											placeholder='Obrigatório'
											disabled={true}
											value={parkingCnpj}
											onChange={() => {}}
										/>
									</div>

									<div className='col-3 p-0 pr-2'>
										<label for-html='parking-created-at'>
											<span className='fw-600'>
												Criado em
											</span>
										</label>
										<input
											type='text'
											id='parking-created-at'
											className='form-control shadow-sm'
											placeholder='Obrigatório'
											disabled={true}
											value={parkingCreatedAt}
											onChange={() => {}}
										/>
									</div>
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
											disabled={true}
											value={parkingTelphoneDdd}
											onChange={() => {}}
										/>
									</div>

									<div className='col-lg-3 col-sm-12 col-md-4 col-xl-3 p-0 pr-2'>
										<label for-html='parking-telphone-number'>
											<span className='fw-600'>
												Número
											</span>
										</label>
										<div className='d-flex'>
											<input
												type='text'
												id='parking-telphone-number'
												className='form-control shadow-sm'
												placeholder='(00000-0000)'
												disabled={true}
												value={parkingTelphoneNumber}
												onChange={() => {}}
											/>
											<button
												type='button'
												className='btn btn-sm bg-pro-parking text-light d-flex ml-2'
												onClick={() =>
													setParkingEditTelephone(
														true
													)
												}
											>
												<MdCreate
													size={22}
													className='pr-1 text-light'
												/>
												Editar
											</button>
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
									<div className='col-3'>
										<label for-html='parking-address-stace'>
											<span className='fw-600'>
												Estado
											</span>
										</label>
										<input
											type='text'
											id='parking-address-stace'
											className='form-control shadow-sm text-capitalize'
											placeholder='Estado'
											disabled={true}
											value={parkingState}
											onChange={() => {}}
										/>
									</div>

									<div className='col-3'>
										<label for-html='parking-address-zip-code'>
											<span className='fw-600'>CEP</span>
										</label>
										<input
											type='text'
											id='parking-address-zip-code'
											className='form-control shadow-sm'
											placeholder='CEP'
											disabled={true}
											value={parkingZipCode}
											onChange={() => {}}
										/>
									</div>

									<div className='col-3'>
										<label for-html='parking-addess-city'>
											<span className='fw-600'>
												Cidade
											</span>
										</label>
										<input
											type='text'
											id='parking-addess-city'
											className='form-control shadow-sm text-capitalize'
											placeholder='Cidade'
											disabled={true}
											value={parkingCity}
											onChange={() => {}}
										/>
									</div>

									<div className='col-3'>
										<label for-html='parking-addess-neighborhood'>
											<span className='fw-600'>
												Bairro
											</span>
										</label>
										<input
											type='text'
											id='parking-addess-neighborhood'
											className='form-control shadow-sm text-capitalize'
											placeholder='Bairro'
											disabled={true}
											value={parkingNeighborhood}
											onChange={() => {}}
										/>
									</div>
								</div>

								<div className='form-row mt-4'>
									<div className='col-3'>
										<label for-html='parking-address-street'>
											<span className='fw-600'>Rua</span>
										</label>
										<input
											type='text'
											id='parking-address-street'
											className='form-control shadow-sm text-capitalize'
											placeholder='Rua'
											disabled={true}
											value={parkingStreet}
											onChange={() => {}}
										/>
									</div>

									<div className='col-3'>
										<label for-html='parking-address-house-number'>
											<span className='fw-600'>
												Número
											</span>
										</label>
										<input
											type='text'
											id='parking-address-house-number'
											className='form-control shadow-sm'
											placeholder='Número'
											disabled={true}
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
								<div style={{ height: '60vh', width: '100%' }}>
									<GoogleMapReact
										center={parkingCoordinates}
										defaultZoom={14}
										bootstrapURLKeys={{
											key:
												'AIzaSyDqcTeikQQy45rsSbFGwxC1so1-M7X7Ax0'
										}}
									>
										<Image
											lat={parkingCoordinates.lat}
											lng={parkingCoordinates.lng}
											width={25}
											src={markerImage}
											alt='Logo'
										/>
									</GoogleMapReact>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
			{loader}
		</>
	);
}
