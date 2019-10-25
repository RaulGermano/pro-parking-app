import React, { useState, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import Api from '../../../services/Api';
import { Modal, Button } from 'react-bootstrap';
import { getToken } from '../../../services/Auth';
import jwt from 'jsonwebtoken';

function EditParkingTelphone(props) {
	const [typeReservation, setTypeReservation] = useState(0);
	const [parkingTelphoneDdd, setParkingTelphoneDdd] = useState(0);
	const [parkingTelphoneNumber, setParkingTelphoneNumber] = useState(0);
	const [disableButtonComplete, setDisableButtonComplete] = useState(true);
	const [sessionInformations, setSessionInformations] = useState({});

	const { show, history, parkingid } = props;

	useEffect(() => {
		setTypeReservation(0);
		setDisableButtonComplete(true);

		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		setSessionInformations(informations);

		if (parkingid) {
			const selectParkingInformations = async () => {
				const result = await Api.get(
					`/select-specific-parkings/?parking_id=${parkingid}`,
					{
						headers: {
							authenticateToken: getToken()
						}
					}
				);

				const { ddd, number } = result.data.result.telephone;

				setParkingTelphoneDdd(ddd);
				setParkingTelphoneNumber(number);
				setTypeReservation(1);
			};

			selectParkingInformations();
		}
	}, [show, parkingid]);

	const tryAlterParkingSpace = async event => {
		event.preventDefault();

		const { parking: parking_id } = sessionInformations;

		const result = await Api.put(
			'/update-parking-telephone',
			{
				telephone: {
					ddd: parkingTelphoneDdd,
					number: parkingTelphoneNumber
				},
				parking_id
			},
			{
				headers: {
					authenticateToken: getToken()
				}
			}
		);

		history.go('/parking');
	};

	const changeParkingTelephoneDdd = value => {
		setParkingTelphoneDdd(value);

		if (value.length !== 0 && parkingTelphoneNumber.length !== 0) {
			setDisableButtonComplete(false);
		} else {
			setDisableButtonComplete(true);
		}
	};

	const changeParkingTelephoneNumber = value => {
		setParkingTelphoneNumber(value);

		if (parkingTelphoneDdd.length !== 0 && value.length !== 0) {
			setDisableButtonComplete(false);
		} else {
			setDisableButtonComplete(true);
		}
	};

	return (
		<Modal {...props} size='md'>
			<form onSubmit={tryAlterParkingSpace}>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						<MdEdit
							size={30}
							className='bg-primary rounded-circle p-lg-1 text-light'
						/>
						<span>Editar a vaga selecionada</span>
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
								<div className='d-flex flex-column col-4'>
									<span className='fw-600'>DDD</span>
									<input
										type='text'
										id='parking-telphone-ddd'
										className='form-control shadow-sm'
										placeholder='(00)'
										value={parkingTelphoneDdd}
										onChange={event =>
											changeParkingTelephoneDdd(
												event.target.value
											)
										}
									/>
									<span className='ml-1 text-black-50'>
										(Visivel para o cliente)
									</span>
								</div>

								<div className='d-flex flex-column col-8'>
									<span className='fw-600'>Telefone</span>
									<input
										type='text'
										id='parking-telphone-number'
										className='form-control shadow-sm'
										placeholder='(00000-0000)'
										value={parkingTelphoneNumber}
										onChange={event =>
											changeParkingTelephoneNumber(
												event.target.value
											)
										}
									/>
									<span className='ml-1 text-black-50'>
										(Visivel para o cliente)
									</span>
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
						disabled={disableButtonComplete}
					>
						Confirmar
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default EditParkingTelphone;
