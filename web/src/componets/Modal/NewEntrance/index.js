import React, { useState, useEffect } from 'react';
import { MdAssistantPhoto, MdSearch, MdDone, MdClose } from 'react-icons/md';
import Api from '../../../services/Api';
import { getToken } from '../../../services/Auth';
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';
import {
	Modal,
	Button,
	ToggleButtonGroup,
	ToggleButton,
	Badge,
	Table
} from 'react-bootstrap';

export default function NewEntranceModal(props) {
	const [searchPlate, setSearchPlate] = useState('');
	const [reservationId, setReservationId] = useState('');
	const [parkingSpaceSelectedId, setParkingSpaceSelectedId] = useState('');
	const [parkingSpace, setParkingSpace] = useState('- -');
	const [searchResult, setSearchResult] = useState(0);
	const [endButton, setEndButton] = useState(true);
	const [parkingSpaceSelected, setParkingSpaceSelected] = useState(false);
	const [accessibilityValue, setAccessibilityValue] = useState(false);
	const [coveredValue, setCoveredValue] = useState(false);
	const [servicesValue, setServicesValue] = useState(false);
	const [sessionInformations, setSessionInformations] = useState({});
	const [availableParkingSpace, setAvailableParkingSpace] = useState({});

	const dateNow = moment().utc();

	const { show } = props;

	useEffect(() => {
		setSearchPlate('');
		setSearchResult(0);

		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		const { id: parkingUser_id, name, parking: parking_id } = informations;

		setSessionInformations({
			parkingUser_id,
			parking_id,
			name
		});

		const selectParkingSpaces = async () => {
			const parkingSpace = await Api.get(
				`/select-all-parking-spaces/?parking_id=${parking_id}`,
				{
					headers: {
						authenticateToken: getToken()
					}
				}
			);

			const parkingSpaces = parkingSpace.data.result;

			const availableParkingSpaces = parkingSpaces.filter(
				({ available }) => available === true
			);

			const disabledParkingSpaces = parkingSpaces.filter(
				({ available }) => available === false
			);

			const allParkingSpaces = [
				...availableParkingSpaces,
				...disabledParkingSpaces
			];

			setAvailableParkingSpace(allParkingSpaces);
		};

		selectParkingSpaces();
	}, [show]);

	const verifyEntrence = async () => {
		setSearchResult(0);
		setParkingSpaceSelected(false);

		const result = await Api.get(
			`/select-vehicle-client-reservations/?parking_id=${sessionInformations.parking_id}&vehicle_plate=${searchPlate}`,
			{
				headers: {
					authenticateToken: getToken()
				}
			}
		);

		const { status } = result.data;

		if (status === 1) {
			const {
				parking: {
					space: { _id: parkingSpace_id },
					space: { name: parkingSpace_name }
				} = '- -',
				reservation_id
			} = result.data;

			setEndButton(false);
			setParkingSpaceSelectedId(parkingSpace_id);
			setParkingSpace(parkingSpace_name);
			setReservationId(reservation_id);
		} else if (status === 2) {
			setEndButton(true);
		}

		setSearchResult(status);
	};

	const changeParkingInformations = async val => {
		setEndButton(true);
		setParkingSpaceSelected(false);
		setParkingSpaceSelectedId(val);

		const parkingSpace = await Api.get(
			`/select-specific-parking-space/?parking_id=${sessionInformations.parking_id}&parkingSpace_id=${val}`,
			{
				headers: {
					authenticateToken: getToken()
				}
			}
		);

		const {
			accessibility,
			covered,
			services
		} = parkingSpace.data.result[0].parkingSpace.description;

		setAccessibilityValue(accessibility);
		setCoveredValue(covered);
		setServicesValue(services);

		setParkingSpaceSelected(true);
		setEndButton(false);
	};

	const changeIconStatusDescription = value => {
		if (value) {
			return <MdDone size={25} color='#3566c6' />;
		} else {
			return <MdClose size={25} color='#ff014c' />;
		}
	};

	const tryNewEntrance = async event => {
		event.preventDefault();

		const result = await Api.get(
			`/select-specific-parking-space/?parking_id=${sessionInformations.parking_id}&parkingSpace_id=${parkingSpaceSelectedId}`,
			{
				headers: {
					authenticateToken: getToken()
				}
			}
		);

		const {
			name: parkingSpaceName,
			value
		} = result.data.result[0].parkingSpace;

		try {
			if (parkingSpaceSelected) {
				const teste = {
					client: {
						vehicle: {
							plate: searchPlate
						}
					},
					parking: {
						_id: sessionInformations.parking_id,
						space: {
							_id: parkingSpaceSelectedId,
							name: parkingSpaceName,
							value: value
						}
					},
					period: {
						check_in: {
							user: {
								_id: sessionInformations.parkingUser_id,
								name: sessionInformations.name
							},
							moment: dateNow
						}
					}
				};

				await Api.post(
					`/create-checkin-reservation-undefined-client/`,
					teste,
					{
						headers: {
							authenticateToken: getToken()
						}
					}
				);

				props.history.go('/main');
			} else {
				await Api.post(
					`/create-checkin-reservation/`,
					{
						reserve_id: reservationId,
						user_id: sessionInformations.parkingUser_id,
						user_name: sessionInformations.name
					},
					{
						headers: {
							authenticateToken: getToken()
						}
					}
				);

				props.history.go('/main');
			}
		} catch (error) {
			console.log('Erro: ', error);
		}
	};

	return (
		<Modal {...props} size='md'>
			<form onSubmit={tryNewEntrance}>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						<MdAssistantPhoto
							size={30}
							color='#fff'
							className='bg-primary rounded-circle p-lg-1 mr-2'
						/>
						<span>Nova entrada</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='container d-flex mb-4'>
						<div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 p-0 pr-2'>
							<label htmlFor='input-vehicle-plate'>
								Verificar placa
							</label>
							<div className='input-group'>
								<input
									type='text'
									className='form-control'
									id='input-vehicle-plate'
									aria-describedby='small-vehicle-plate'
									placeholder='Digite a placa..'
									value={searchPlate}
									onChange={event =>
										setSearchPlate(event.target.value)
									}
								/>
								<div className='input-group-append'>
									<button
										className='btn btn-primary p-0 px-2'
										type='button'
										onClick={verifyEntrence}
										disabled={
											searchPlate.length > 0
												? false
												: true
										}
									>
										<MdSearch size={25} color='#fff' />
									</button>
								</div>
							</div>
						</div>

						{searchResult === 0 ? (
							<div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 form-control align-self-end bg-light border-dashed-gray-light pl-2'>
								<span className='text-black-50'>
									Resultado de pesquisa.
								</span>
							</div>
						) : searchResult === 1 ? (
							<div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 form-control align-self-end bg-success border-success pl-2'>
								<span className='text-light'>
									Vaga reservada:{' '}
									<Badge variant='light'>
										<b className='text-success'>
											{parkingSpace}.
										</b>
									</Badge>
								</span>
							</div>
						) : (
							<div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 form-control align-self-end bg-danger border-danger pl-2'>
								<span className='text-light'>
									Não há reservas.
								</span>
							</div>
						)}
					</div>

					{searchResult > 1 ? (
						<>
							<hr className='my-4 mt-auto' />

							<label
								htmlFor='input-vehicle-plate'
								className='px-3'
							>
								Escolha uma vaga
							</label>

							<div className='container'>
								<ToggleButtonGroup
									type='radio'
									name='options'
									className='input-group mb-4'
									onChange={changeParkingInformations}
								>
									{availableParkingSpace.map(item => {
										return item.available ? (
											<ToggleButton
												key={item._id}
												value={item._id}
												variant='secondary'
												className='btn btn-sm btn-block font-weight-bold mt-2 gb-gray-light-2 parking-lot-not-reserved shadow-sm col-4'
											>
												{item.name.toUpperCase()} - R$
												{item.value.toFixed(2)}
											</ToggleButton>
										) : (
											<ToggleButton
												key={item._id}
												value={item._id}
												disabled={true}
												variant='secondary'
												className='btn btn-sm btn-block font-weight-bold mt-2 gb-gray-light-2 parking-lot-not-reserved shadow-sm col-4'
											>
												{item.name.toUpperCase()} - R$
												{item.value.toFixed(2)}
											</ToggleButton>
										);
									})}
								</ToggleButtonGroup>
							</div>

							<hr className='my-4 mt-auto' />

							<div className='container'>
								{parkingSpaceSelected ? (
									<div>
										<label
											htmlFor='input-vehicle-plate'
											className=''
										>
											Descrição da vaga
										</label>

										<Table striped bordered hover size='md'>
											<tbody>
												<tr>
													<td className='fw-600'>
														Acessibilidade para
														cadeirantes
													</td>
													<td>
														{changeIconStatusDescription(
															accessibilityValue
														)}
													</td>
												</tr>
												<tr>
													<td className='fw-600'>
														Cobertura
													</td>
													<td>
														{changeIconStatusDescription(
															coveredValue
														)}
													</td>
												</tr>
												<tr>
													<td className='fw-600'>
														Serviços adicionais
													</td>
													<td>
														{changeIconStatusDescription(
															servicesValue
														)}
													</td>
												</tr>
											</tbody>
										</Table>
									</div>
								) : (
									<div className='col-12 form-control align-self-end bg-light border-dashed-gray-light pl-2 d-flex justify-content-lg-around height-75 align-items-center'>
										<p className='text-black-50 m-0'>
											Informações da vaga selecionada.
										</p>
									</div>
								)}
							</div>
						</>
					) : null}
				</Modal.Body>

				<Modal.Footer>
					<Button
						onClick={props.onHide}
						variant='secondary'
						size='sm'
					>
						Fechar
					</Button>

					<Button
						type='submit'
						disabled={endButton}
						variant='primary'
						size='sm'
					>
						Liberar entrada
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}
