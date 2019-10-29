import React, { useState, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import Api from '../../../services/Api';
import {
	Modal,
	Button,
	Form,
	ToggleButton,
	ToggleButtonGroup
} from 'react-bootstrap';
import { getToken } from '../../../services/Auth';
import jwt from 'jsonwebtoken';

function EditParkingSpace(props) {
	const [parkingSpaceName, setParkingSpaceName] = useState('');
	const [parkingSpaceValue, setParkingSpaceValue] = useState('');
	const [coveredDescription, setCoveredDescription] = useState(false);
	const [servicesDescription, setServicesDescription] = useState(false);
	const [parkingSpaceExcluded, setParkingSpaceExcluded] = useState(false);
	const [disableButtonComplete, setDisableButtonComplete] = useState(true);
	const [typeReservation, setTypeReservation] = useState(0);
	const [sessionInformations, setSessionInformations] = useState({});

	const [accessibilityDescription, setAccessibilityDescription] = useState(
		false
	);

	const { show, history, parkingspaceid } = props;

	useEffect(() => {
		setTypeReservation(0);

		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		setSessionInformations(informations);

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

				const parkingInformations = result.data.result[0].parkingSpace;
				const name = parkingInformations.name;
				const value = parkingInformations.value.toFixed(2);
				const excluded = parkingInformations.excluded;

				const {
					accessibility,
					covered,
					services
				} = parkingInformations.description;

				setParkingSpaceName(name);
				setParkingSpaceValue(value);
				setParkingSpaceExcluded(excluded);
				setAccessibilityDescription(accessibility);
				setCoveredDescription(covered);
				setServicesDescription(services);

				if (name.length !== 0 && value.length !== 0) {
					setDisableButtonComplete(false);
				} else {
					setDisableButtonComplete(true);
				}

				setTypeReservation(1);
			};

			selectParkingInformations();
		}
	}, [show, parkingspaceid]);

	const tryAlterParkingSpace = async event => {
		event.preventDefault();

		const name = parkingSpaceName;
		const value = parkingSpaceValue;
		const excluded = parkingSpaceExcluded;
		const parkingSpace_id = parkingspaceid;

		const description = {
			accessibility: accessibilityDescription,
			covered: coveredDescription,
			services: servicesDescription
		};

		const { parking: parking_id } = sessionInformations;

		const result = await Api.put(
			'/update-parking-space',
			{
				value,
				name,
				excluded,
				description,
				parking_id,
				parkingSpace_id
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

	const changeParkingInformations = async value => {
		setParkingSpaceExcluded(value);
	};

	const accessibilityCheck = React.createRef();
	const coveredCheck = React.createRef();
	const servicesCheck = React.createRef();

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

								<div className='d-flex flex-column col-6 mb-5'>
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

								<div className='d-flex flex-column col-12 mb-5'>
									<div>
										<span className='fw-600'>
											Descrição
										</span>
										<span className='ml-1 text-black-50'>
											(Visivel para o cliente)
										</span>
									</div>
									<div>
										<Form.Check
											custom
											type='checkbox'
											ref={accessibilityCheck}
											checked={accessibilityDescription}
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
											checked={coveredDescription}
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
											checked={servicesDescription}
											onChange={() =>
												changeDescriptionServicesCheck(
													servicesCheck.current
														.checked
												)
											}
											id='services-checkbox'
											label='Serviços adicionais'
										/>
									</div>
								</div>
								<div className='d-flex flex-column col-12'>
									<span className='fw-600'>
										Disponibilidade
									</span>

									<div>
										<ToggleButtonGroup
											type='radio'
											name='options'
											className='input-group mb-4'
											defaultValue={parkingSpaceExcluded}
											onChange={changeParkingInformations}
										>
											<ToggleButton
												value={true}
												variant='secondary'
												className='btn btn-sm btn-block font-weight-bold mt-2 gb-gray-light-2 parking-lot-not-reserved shadow-sm col-6'
											>
												Inativa
											</ToggleButton>
											<ToggleButton
												value={false}
												variant='primary'
												className='btn btn-sm btn-block font-weight-bold mt-2 gb-gray-light-2 parking-lot-not-reserved shadow-sm col-6'
											>
												Ativa
											</ToggleButton>
										</ToggleButtonGroup>
									</div>
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

export default EditParkingSpace;
