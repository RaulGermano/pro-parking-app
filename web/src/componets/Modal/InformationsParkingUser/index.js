import React, { useState, useEffect } from 'react';
import { MdSearch, MdDone, MdClose } from 'react-icons/md';
import Api from '../../../services/Api';
import { Modal, Button, Row, Col, Table, Alert } from 'react-bootstrap';
import { getToken } from '../../../services/Auth';
import jwt from 'jsonwebtoken';
import moment from 'moment-timezone';

function InformationsParkingSpace(props) {
	const [typeInformations, setTypeInformations] = useState(0);
	const [parkingUserInformations, setParkingUserInformations] = useState({});

	const { show, parkingspaceid } = props;

	useEffect(() => {
		setTypeInformations(0);

		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		if (parkingspaceid) {
			const selectParkingInformations = async () => {
				const result = await Api.get(
					`/select-specific-parking-space/?parking_id=${informations.parking}&parkingSpace_id=${parkingspaceid}`,
					{
						headers: {
							authenticateToken: getToken()
						}
					}
				);

				if (result) {
					const parkingInformations =
						result.data.result[0].parkingSpace;

					setParkingUserInformations(parkingInformations);
					setTypeInformations(1);
				}
			};

			selectParkingInformations();
		}
	}, [show, parkingspaceid]);

	const changeIconStatusDescription = value => {
		if (value) {
			return <MdDone size={25} color='#3566c6' />;
		} else {
			return <MdClose size={25} color='#ff014c' />;
		}
	};

	return (
		<Modal {...props} size='md'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					<MdSearch
						size={30}
						className='bg-primary rounded-circle p-lg-1 text-light'
					/>
					<span>Sobre a vaga selecionada</span>
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{typeInformations === 0 ? (
					<div className='container'>
						<div className='col-12 form-control align-self-end bg-light border-dashed-gray-light pl-2 d-flex justify-content-lg-around height-75 align-items-center'>
							<p className='text-black-50 m-0'>
								Informações da vaga de estacionamento
								selecionada.
							</p>
						</div>
					</div>
				) : (
					<div className='container'>
						<Row>
							<Col className='pr-0'>
								<div className='text-center py-1'>Nome</div>
								<div className='text-center fw-700 py-1 bg-pro-parking-secondary br-left-7-5px'>
									{/* {parkingSpaceInformations.name} */}
								</div>
							</Col>
							<Col className='px-0'>
								<div className='text-center py-1 mx-1'>
									Valor
								</div>
								<div className='text-center fw-700 py-1 mx-1 bg-pro-parking-secondary'>
									R$
									{/* {parkingSpaceInformations.value
										.toFixed(2)
										.replace('.', ',')} */}
								</div>
							</Col>
							<Col className='pl-0'>
								<div className='text-center py-1'>
									Criado em
								</div>
								<div className='text-center fw-700 py-1 bg-pro-parking-secondary br-right-7-5px'>
									{/* {`${moment(
										parkingSpaceInformations.createdAt
									).format('DD/MM/YYYY')} às ${moment(
										parkingSpaceInformations.createdAt
									).format('HH:mm')}h`} */}
								</div>
							</Col>
						</Row>

						<p className='mt-5 fw-700 fs-15pt'>Descrição</p>
						<Table striped bordered hover size='md'>
							<tbody>
								<tr>
									<td className='fw-600'>
										Acessibilidade para cadeirantes
									</td>
									<td>
										{/* {changeIconStatusDescription(
											parkingSpaceInformations.description
												.accessibility
										)} */}
									</td>
								</tr>
								<tr>
									<td className='fw-600'>Cobertura</td>
									<td>
										{/* {changeIconStatusDescription(
											parkingSpaceInformations.description
												.covered
										)} */}
									</td>
								</tr>
								<tr>
									<td className='fw-600'>
										Serviços adicionais
									</td>
									<td>
										{/* {changeIconStatusDescription(
											parkingSpaceInformations.description
												.services
										)} */}
									</td>
								</tr>
							</tbody>
						</Table>

						<p className='mt-5 fw-700 fs-15pt'>Histórico</p>
						<Alert variant='secondary'>
							- Em desenvolvimento -
						</Alert>
					</div>
				)}
				<div className='col'></div>
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
			</Modal.Footer>
		</Modal>
	);
}

export default InformationsParkingSpace;
