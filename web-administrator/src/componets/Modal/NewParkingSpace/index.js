import React, { useState, useEffect } from 'react';
import { MdFlag } from 'react-icons/md';
import { Modal, Button, Form } from 'react-bootstrap';
import Api from '../../../services/Api';
import { getToken } from '../../../services/Auth';
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';

function NewParkingSpaceModal(props) {
	const [parkingSpaceName, setParkingSpaceName] = useState('');
	const [parkingSpaceValue, setParkingSpaceValue] = useState('');
	const [accessibilityDescription, setAccessibilityDescription] = useState(
		false
	);
	const [coveredDescription, setCoveredDescription] = useState(false);
	const [servicesDescription, setServicesDescription] = useState(false);
	const [disableButtonComplete, setDisableButtonComplete] = useState(true);
	const [sessionInformations, setSessionInformations] = useState({});

	const { show, history } = props;

	useEffect(() => {
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
	}, [show]);

	const tryCreateParkingSpace = async event => {
		event.preventDefault();

		const name = parkingSpaceName;
		const value = parkingSpaceValue;

		const description = {
			accessibility: accessibilityDescription,
			covered: coveredDescription,
			services: servicesDescription
		};

		const { parking_id: id } = sessionInformations;

		const result = await Api.post(
			'/create-parking-space',
			{
				value,
				name,
				id,
				description
			},
			{
				headers: {
					authenticateToken: getToken()
				}
			}
		);

		console.log(result);

		history.go('/parking-space');
	};

	const changeDescriptionAccessibility = value => {
		setAccessibilityDescription(value);
	};

	const changeDescriptionCovered = value => {
		setCoveredDescription(value);
	};

	const changeDescriptionServicesCheck = value => {
		setServicesDescription(value);
	};

	const changeParkingSpaceName = value => {
		setParkingSpaceName(value);

		if (value.length && parkingSpaceValue.length !== 0) {
			setDisableButtonComplete(false);
		} else {
			setDisableButtonComplete(true);
		}
	};
	const changeParkingSpaceValue = value => {
		setParkingSpaceValue(value);

		if (parkingSpaceName.length && value.length !== 0) {
			setDisableButtonComplete(false);
		} else {
			setDisableButtonComplete(true);
		}
	};

	const accessibilityCheck = React.createRef();
	const coveredCheck = React.createRef();
	const servicesCheck = React.createRef();

	return (
		<Modal
			{...props}
			size='md'
			aria-labelledby='contained-modal-title-vcenter'
		>
			<form onSubmit={tryCreateParkingSpace}>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						<MdFlag
							size={30}
							className='bg-primary rounded-circle p-lg-1 text-light'
						/>
						<span>Nova vaga</span>
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div className='mx-3'>
						<div className='form-row'>
							<div className='d-flex flex-column col-6 mb-5'>
								<div>
									<span className='fw-600'>Nome</span>
									<span className='ml-1 text-black-50'>
										(Visivel para o cliente)
									</span>
								</div>
								<input
									type='text'
									id='name-user'
									className='form-control shadow-sm'
									placeholder='Obrigatório'
									onChange={event =>
										changeParkingSpaceName(
											event.target.value
										)
									}
									required={false}
									value={parkingSpaceName}
								/>
							</div>

							<div className='d-flex flex-column col-6'>
								<div>
									<span className='fw-600'>
										Valor da hora
									</span>
									<span className='ml-1 text-black-50'>
										(Visivel para o cliente)
									</span>
								</div>
								<input
									type='number'
									id='name-user'
									className='form-control shadow-sm'
									placeholder='Obrigatório'
									onChange={event =>
										changeParkingSpaceValue(
											event.target.value
										)
									}
									required={false}
									value={parkingSpaceValue}
								/>
							</div>

							<div>
								<div>
									<span className='fw-600'>Descrição</span>
									<span className='ml-1 text-black-50'>
										(Visivel para o cliente)
									</span>
								</div>
								<div>
									<Form.Check
										custom
										type='checkbox'
										ref={accessibilityCheck}
										onChange={() =>
											changeDescriptionAccessibility(
												accessibilityCheck.current
													.checked
											)
										}
										id='accessibility-checkbox'
										label='Suporte a acessebilidade para cadeirantes'
									/>

									<Form.Check
										custom
										type='checkbox'
										ref={coveredCheck}
										onChange={() =>
											changeDescriptionCovered(
												coveredCheck.current.checked
											)
										}
										id='covered-checkboxs'
										label='Coberta'
									/>

									<Form.Check
										custom
										type='checkbox'
										ref={servicesCheck}
										onChange={() =>
											changeDescriptionServicesCheck(
												servicesCheck.current.checked
											)
										}
										id='services-checkbox'
										label='Serviços adicionais'
									/>
								</div>
							</div>
						</div>
					</div>
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
						onClick={props.action}
						variant='primary'
						size='sm'
						disabled={disableButtonComplete}
					>
						Cadastrar
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default NewParkingSpaceModal;
