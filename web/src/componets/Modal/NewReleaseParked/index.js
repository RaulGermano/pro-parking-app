import React, { useState, useEffect } from 'react';
import { MdArrowForward } from 'react-icons/md';
import Api from '../../../services/Api';
import { toast } from 'react-toastify';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { getToken } from '../../../services/Auth';
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';

function NewReleaseParked(props) {
	const [typeReservation, setTypeReservation] = useState(0);
	const [reserveInformations, setReserveInformations] = useState({});
	const [sessionInformations, setSessionInformations] = useState({});
	const [disableButtonComplete, setDisableButtonComplete] = useState(true);

	const { show, reservationid, history } = props;

	useEffect(() => {
		setDisableButtonComplete(true);

		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		setSessionInformations(informations);

		if (reservationid) {
			const selectParkingInformations = async () => {
				const result = await Api.get(
					`/select-specific-reservation-id/?reserve_id=${reservationid}`,
					{
						headers: {
							authenticateToken: getToken()
						}
					}
				);

				if (result) {
					const parkingInformations = result.data.result;

					const informations = filterInformations(
						parkingInformations
					);

					setReserveInformations(informations);
					setTypeReservation(1);
				} else {
					setTypeReservation(0);
				}
			};

			const filterInformations = item => {
				return {
					_id: item._id,
					vehiclePlate: item.client.vehicle.plate,
					parkingSpace: item.parking.space.name,
					checkIn: `${moment(item.period.check_in.moment).format(
						'DD/MM/YYYY'
					)} às ${moment(item.period.check_in.moment).format(
						'HH:mm'
					)}h`
				};
			};

			selectParkingInformations();
		}
	}, [show]);

	const checkoutReserveError = () => toast.error('Teste.');

	const changeButtonComplete = value => {
		if (value) {
			setDisableButtonComplete(false);
		} else {
			setDisableButtonComplete(true);
		}
	};

	const tryCheckoutReserve = async event => {
		event.preventDefault();

		const { id: user_id, name: userName } = sessionInformations;

		await Api.post(
			'/create-checkout-reservation',
			{
				reserve_id: reservationid,
				user_id: user_id,
				user_name: userName
			},
			{
				headers: {
					authenticateToken: getToken()
				}
			}
		);

		history.go('/');
	};

	const textInput = React.createRef();

	return (
		<Modal {...props} size='md'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					<MdArrowForward
						size={30}
						className='bg-primary rounded-circle p-lg-1 text-light'
					/>
					<span>Realizar saída da reserva</span>
				</Modal.Title>
			</Modal.Header>

			<form onSubmit={tryCheckoutReserve}>
				<Modal.Body>
					{typeReservation === 0 ? (
						<div className='container'>
							<div className='col-12 form-control align-self-end bg-light border-dashed-gray-light pl-2 d-flex justify-content-lg-around height-75 align-items-center'>
								<p className='text-black-50 m-0'>
									Aguardando para realizar a saída do veículo.
								</p>
							</div>
						</div>
					) : (
						<div className='container'>
							<Row className='mb-5'>
								<Col className='pr-0'>
									<div className='text-center py-1'>
										Placa do veículo
									</div>
									<div className='text-center fw-700 py-1 bg-pro-parking-secondary br-left-7-5px'>
										{reserveInformations.vehiclePlate}
									</div>
								</Col>
								<Col className='px-0'>
									<div className='text-center py-1 mx-1'>
										Vaga reservada
									</div>
									<div className='text-center fw-700 py-1 mx-1 bg-pro-parking-secondary'>
										{reserveInformations.parkingSpace}
									</div>
								</Col>
								<Col className='pl-0'>
									<div className='text-center py-1'>
										Marcação de entrada
									</div>
									<div className='text-center fw-700 py-1 bg-pro-parking-secondary br-right-7-5px'>
										{reserveInformations.checkIn}
									</div>
								</Col>
							</Row>

							<Form.Check
								custom
								type='checkbox'
								ref={textInput}
								onChange={() =>
									changeButtonComplete(
										textInput.current.checked
									)
								}
								id='custom-checkbox'
								label='Deseja realmente realizar a finalização da reserva selecianda?'
							/>
						</div>
					)}
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
						variant='primary'
						size='sm'
						disabled={disableButtonComplete}
					>
						Finalizar
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default NewReleaseParked;
