import React, { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import Api from '../../../services/Api';
import { Modal, Button, Row, Col, Table } from 'react-bootstrap';
import { getToken } from '../../../services/Auth';
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';

function InformationsParked(props) {
	const [typeReservation, setTypeReservation] = useState(0);
	const [reserveInformations, setReserveInformations] = useState({});

	const { show, reservationid } = props;

	useEffect(() => {
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
					clientNumber: item.client.telephone
						? `(${item.client.telephone.ddd}) ${item.client.telephone.number}`
						: false,
					vehiclePlate: item.client.vehicle.plate,
					clientName: item.client.name ? item.client.name : false,
					parkingSpace: item.parking.space.name,
					created_at: `${moment(item.createdAt).format(
						'DD/MM/YYYY'
					)} às ${moment(item.createdAt).format('HH:mm')}h`,
					checkIn: item.period
						? item.period.check_in
							? `${moment(item.period.check_in.moment).format(
									'DD/MM/YYYY'
							  )} às ${moment(
									item.period.check_in.moment
							  ).format('HH:mm')}h`
							: false
						: false
				};
			};

			selectParkingInformations();
		}
	}, [show, reservationid]);

	return (
		<Modal {...props} size='md'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					<MdSearch
						size={30}
						className='bg-primary rounded-circle p-lg-1 text-light'
					/>
					<span>Sobre a reserva</span>
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{typeReservation === 0 ? (
					<div className='container'>
						<div className='col-12 form-control align-self-end bg-light border-dashed-gray-light pl-2 d-flex justify-content-lg-around height-75 align-items-center'>
							<p className='text-black-50 m-0'>
								Informações da reserva selecionada.
							</p>
						</div>
					</div>
				) : (
					<div className='container'>
						<Row>
							<Col className='pr-0'>
								<div className='text-center py-1'>
									Meio mediante
								</div>
								{reserveInformations.clientName ? (
									<div className='text-center fw-700 py-1 bg-pro-parking-secondary br-left-7-5px successStatus'>
										Aplicativo mobile
									</div>
								) : (
									<div className='text-center fw-700 py-1 bg-pro-parking-secondary br-left-7-5px dangerStatus'>
										Outros
									</div>
								)}
							</Col>
							<Col className='px-0'>
								<div className='text-center py-1 mx-1'>
									Status atual
								</div>
								<div className='text-center fw-700 py-1 mx-1 bg-pro-parking-secondary'>
									{reserveInformations.checkIn
										? 'Saída pendente'
										: 'Entrada pendente'}
								</div>
							</Col>
							<Col className='pl-0'>
								<div className='text-center py-1'>
									Criado em
								</div>
								<div className='text-center fw-700 py-1 bg-pro-parking-secondary br-right-7-5px'>
									{reserveInformations.created_at}
								</div>
							</Col>
						</Row>

						<p className='mt-5 fw-700 fs-15pt'>Cliente</p>
						<Table striped bordered hover size='md'>
							<tbody>
								{reserveInformations.clientName ? (
									<>
										<tr>
											<td>Nome</td>
											<td className='fw-600'>
												{reserveInformations.clientName}
											</td>
										</tr>
										<tr>
											<td>Telefone</td>
											<td className='fw-600'>
												{
													reserveInformations.clientNumber
												}
											</td>
										</tr>
									</>
								) : null}

								<tr>
									<td>Identificação do veículo</td>
									<td className='fw-600'>
										{reserveInformations.vehiclePlate}
									</td>
								</tr>
							</tbody>
						</Table>

						<p className='mt-5 fw-700 fs-15pt'>Estacionamento</p>
						<Table striped bordered hover size='md'>
							<tbody>
								<tr>
									<td>Vaga ocupada</td>
									<td className='fw-600'>
										{reserveInformations.parkingSpace}
									</td>
								</tr>
							</tbody>
						</Table>

						<p className='mt-5 fw-700 fs-15pt'>Registros</p>
						<Table striped bordered hover size='md'>
							<tbody>
								<tr>
									<td>Realização da reserva</td>
									<td className='fw-600'>
										{reserveInformations.created_at}
									</td>
								</tr>
								<tr>
									<td>Marcação de entrada</td>
									{reserveInformations.checkIn ? (
										<td className='fw-600'>
											{reserveInformations.checkIn}
										</td>
									) : (
										<td className='fw-600 bg-pro-parking-secondary'>
											- Aguardando -
										</td>
									)}
								</tr>
								<tr>
									<td>Marcação de saída</td>
									<td className='fw-600 bg-pro-parking-secondary'>
										- Aguardando -
									</td>
								</tr>
							</tbody>
						</Table>
					</div>
				)}
				<div className='col'></div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide} variant='secondary' size='sm'>
					Fechar
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default InformationsParked;
