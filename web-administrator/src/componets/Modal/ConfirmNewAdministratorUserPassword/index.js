import React, { useState, useEffect } from 'react';
import { MdLock } from 'react-icons/md';
import Api from '../../../services/Api';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from 'react-bootstrap';
import { getToken } from '../../../services/Auth';
import useLoader from '../../../componets/Loader/useLoader';

function ConfirmNewAdministratorUserPasswordModal(props) {
	const [loader, handleLoader] = useLoader();
	const [disableButtonComplete, setDisableButtonComplete] = useState(true);

	const { show, administratoruserid } = props;

	const textInput = React.createRef();

	useEffect(() => {
		setDisableButtonComplete(true);

		handleLoader(false);
	}, [show]);

	const SendEmailInformation = () =>
		toast.info(
			'Enviamos um e-mail de confirmação. Em instantes, será possível continuar o processo.'
		);

	const SendEmailError = () =>
		toast.error('O E-Mail digitado, não encontrado. Tente novamente.');

	const sendEmail = async event => {
		handleLoader(true);

		event.preventDefault();

		const administratorUserInformations = await Api.get(
			`/select-specific-administrator-user-informations/?administratorUser_id=${administratoruserid}`,
			{
				headers: {
					authenticateToken: getToken()
				}
			}
		);

		const { email } = administratorUserInformations.data.result;

		const result = await Api.post(
			'/send-email-administrator-user-update-password',
			{ email }
		);

		handleLoader(false);

		if (result.data.response) {
			SendEmailInformation();
		} else {
			SendEmailError();
		}
	};

	const changeButtonComplete = value => {
		if (value) {
			setDisableButtonComplete(false);
		} else {
			setDisableButtonComplete(true);
		}
	};

	return (
		<Modal {...props} size='md'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					<MdLock
						size={30}
						className='bg-primary rounded-circle p-lg-1 text-light'
					/>
					<div>
						<span>Confirmar requisição</span>
						<span className='fs-10pt fw-400 d-flex'>
							Alteração de senha
						</span>
					</div>
				</Modal.Title>
			</Modal.Header>
			<form onSubmit={sendEmail}>
				<Modal.Body>
					<div className='container'>
						<p className='mb-5'>
							Em instantes o usuário selecionado receberá um
							e-mail para alterar a senha do perfil.
						</p>

						<Form.Check
							custom
							ref={textInput}
							type='checkbox'
							id='custom-checkbox'
							label='Deseja realmente prosseguir?'
							defaultChecked={false}
							onChange={() =>
								changeButtonComplete(textInput.current.checked)
							}
						/>
					</div>
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
						disabled={disableButtonComplete}
						variant='primary'
						size='sm'
					>
						Enviar e-mail
					</Button>
				</Modal.Footer>
			</form>
			{loader}
		</Modal>
	);
}

export default ConfirmNewAdministratorUserPasswordModal;
