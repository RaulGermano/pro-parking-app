import React, { useState, useEffect } from 'react';
import { MdSearch, MdDone, MdClose } from 'react-icons/md';
import Api from '../../../services/Api';
import { Modal, Button, Row, Col, Table, Alert, Form } from 'react-bootstrap';
import { getToken } from '../../../services/Auth';
import jwt from 'jsonwebtoken';
import moment from 'moment-timezone';
import useLoader from '../../../componets/Loader/useLoader';

function InformationsContactForm(props) {
	const [loader, handleLoader] = useLoader();
	const [typeInformations, setTypeInformations] = useState(0);
	const [contactFormInformations, setContactFormInformations] = useState({});
	const [sessionInformations, setSessionInformations] = useState({});

	const [
		disableButtonStartAttendance,
		setDisableButtonStartAttendance
	] = useState(true);

	const [
		disableButtonFinishAttendance,
		setDisableButtonFinishAttendance
	] = useState(true);

	const checkBoxStart = React.createRef();
	const checkBoxFinish = React.createRef();

	const { show, contactformid, history } = props;

	useEffect(() => {
		setTypeInformations(0);

		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		setSessionInformations(informations);

		if (contactformid) {
			const selectSpecificContactFormInformations = async () => {
				const result = await Api.get(
					`/select-specific-contact-form-item/?contactForm_id=${contactformid}`,
					{
						headers: {
							authenticateToken: getToken()
						}
					}
				);

				console.log(result);

				if (result) {
					const contactForm = result.data.result;

					setContactFormInformations(contactForm);
					setTypeInformations(1);
				}
			};

			selectSpecificContactFormInformations();
		}
		handleLoader(false);
	}, [show, contactformid]);

	const changeButtonStartAttendance = value => {
		if (value) {
			setDisableButtonStartAttendance(false);
		} else {
			setDisableButtonStartAttendance(true);
		}
	};

	const changeButtonFinishAttendance = value => {
		if (value) {
			setDisableButtonFinishAttendance(false);
		} else {
			setDisableButtonFinishAttendance(true);
		}
	};

	const startAttendanceContactForm = async () => {
		await Api.put(
			`/update-specific-contact-form-start`,
			{
				contactForm_id: contactformid,
				administratorUser: {
					_id: sessionInformations.id,
					name: sessionInformations.name
				}
			},
			{
				headers: {
					authenticateToken: getToken()
				}
			}
		);

		history.go('/parking-contacts-to-create');
	};
	const finishAttendanceContactForm = async () => {
		await Api.put(
			`/update-specific-contact-form-finish`,
			{
				contactForm_id: contactformid,
				administratorUser: {
					_id: sessionInformations.id,
					name: sessionInformations.name
				}
			},
			{
				headers: {
					authenticateToken: getToken()
				}
			}
		);

		history.go('/parking-contacts-to-create');
	};

	return (
		<>
			<Modal {...props} size='md'>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						<MdSearch
							size={30}
							className='bg-primary rounded-circle p-lg-1 text-light'
						/>
						<span>Sobre o contato selecionado</span>
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
									<div className='text-center py-1'>
										Status
									</div>
									{!contactFormInformations.status ? (
										<div className='text-center fw-700 py-1 bg-pro-parking-secondary br-left-7-5px dangerStatus'>
											Aguardando atentimento
										</div>
									) : (
										<div className='text-center fw-700 py-1 bg-pro-parking-secondary br-left-7-5px warningStatus'>
											Em atendimento
										</div>
									)}
								</Col>
								<Col className='pl-0'>
									<div className='text-center py-1 mx-1'>
										Criado em
									</div>
									<div className='text-center fw-700 py-1 mx-1 bg-pro-parking-secondary br-right-7-5px'>
										{`${moment(
											contactFormInformations.createdAt
										).format('DD/MM/YYYY')} 
										às 
                                        ${moment(
											contactFormInformations.createdAt
										).format('HH:mm')}h`}
									</div>
								</Col>
							</Row>

							<Row className='mt-4'>
								<Col className='pr-0'>
									<div className='text-center py-1'>Nome</div>
									<div className='text-center fw-700 py-1 bg-pro-parking-secondary br-left-7-5px text-capitalize'>
										{contactFormInformations.name}
									</div>
								</Col>
								<Col className='pl-0'>
									<div className='text-center py-1 mx-1'>
										Telefone
									</div>
									<div className='text-center fw-700 py-1 mx-1 bg-pro-parking-secondary br-right-7-5px'>
										{`(${contactFormInformations.telephone.ddd}) ${contactFormInformations.telephone.number}`}
									</div>
								</Col>
							</Row>

							<Row className='mt-4'>
								<Col>
									<div className='text-center py-1'>
										E-mail
									</div>
									<div className='text-center fw-700 py-1 bg-pro-parking-secondary br-7-5px'>
										{contactFormInformations.email}
									</div>
								</Col>
							</Row>

							<p className='mt-5 fw-700 fs-15pt'>Endereço</p>
							<Table striped bordered hover size='md'>
								<tbody>
									<tr>
										<td className='fw-600'>CEP</td>
										<td className='text-capitalize'>
											{
												contactFormInformations.address
													.zip_code
											}
										</td>
									</tr>
									<tr>
										<td className='fw-600'>Estado</td>
										<td className='text-capitalize'>
											{
												contactFormInformations.address
													.state
											}
										</td>
									</tr>
									<tr>
										<td className='fw-600'>Cidade</td>
										<td className='text-capitalize'>
											{
												contactFormInformations.address
													.city
											}
										</td>
									</tr>
								</tbody>
							</Table>

							<p className='mt-5 fw-700 fs-15pt'>Descrição</p>
							{!contactFormInformations.description ? (
								<Alert variant='secondary'>
									Não há uma descrição
								</Alert>
							) : (
								<p className='bg-pro-parking-secondary-low p-2 br-7-5px'>
									{contactFormInformations.description}
								</p>
							)}

							<hr className='my-5' />

							<div className=''>
								{!contactFormInformations.status ? (
									<div className='align-items-center bg-danger br-7-5px d-flex justify-content-between p-2 text-light'>
										<Form.Check
											custom
											ref={checkBoxStart}
											type='checkbox'
											id='custom-checkbox'
											label='Deseja realmente prosseguir?'
											defaultChecked={false}
											onChange={() =>
												changeButtonStartAttendance(
													checkBoxStart.current
														.checked
												)
											}
										/>
										<Button
											type='button'
											variant='danger'
											size='sm'
											disabled={
												disableButtonStartAttendance
											}
											onClick={startAttendanceContactForm}
										>
											Iniciar
										</Button>
									</div>
								) : (
									<>
										<div className='align-items-center bg-pro-parking-secondary br-7-5px d-flex justify-content-between p-2 mb-3'>
											<p className='m-0 my-1 text-capitalize'>
												{
													contactFormInformations
														.start.startedBy.name
												}
											</p>
											<p className='m-0 my-1'>
												{`${moment(
													contactFormInformations
														.start.createdAt
												).format('DD/MM/YYYY')} 
										às 
                                        ${moment(
											contactFormInformations.start
												.createdAt
										).format('HH:mm')}h`}
											</p>
										</div>
										<div className='align-items-center bg-success br-7-5px d-flex justify-content-between p-2 text-light'>
											<Form.Check
												custom
												ref={checkBoxFinish}
												type='checkbox'
												className='text-light'
												id='custom-checkbox'
												label='Deseja realmente prosseguir?'
												isValid={true}
												defaultChecked={false}
												onChange={() =>
													changeButtonFinishAttendance(
														checkBoxFinish.current
															.checked
													)
												}
											/>
											<Button
												type='button'
												variant='success'
												size='sm'
												disabled={
													disableButtonFinishAttendance
												}
												onClick={
													finishAttendanceContactForm
												}
											>
												Finalizar
											</Button>
										</div>
									</>
								)}
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
				</Modal.Footer>
				{loader}
			</Modal>
		</>
	);
}

export default InformationsContactForm;
