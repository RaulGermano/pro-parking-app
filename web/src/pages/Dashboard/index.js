import React, { useState, useEffect } from 'react';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import DefaultTitle from '../../componets/DefaultTitle';
import { Col, Image } from 'react-bootstrap';
import awaitingImage from '../../images/awaiting.png';
import { getToken } from '../../services/Auth';
import jwt from 'jsonwebtoken';

export default function Main({ match }) {
	const [userSessionInformations, setUserSessionInformations] = useState({});

	useEffect(() => {
		const informations = jwt.verify(
			getToken(),
			'senha_teste',
			(err, decoded) => {
				return decoded;
			}
		);

		setUserSessionInformations(informations);
	}, []);

	return (
		<>
			<Header />
			<div className='container-fluid'>
				<div className='row'>
					<SideBar route={match} />
					<main
						role='main'
						className='col-md-9 ml-sm-auto col-lg-10 px-4 min-vh-100'
					>
						{/* <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3'>
							<DefaultTitle title='Relatórios' />
                        </div> */}

						<div className='d-flex justify-content-center mt-5'>
							<Image
								src={awaitingImage}
								className='shadow-lg my-5'
								width={300}
								alt='Logo'
								roundedCircle
							/>
						</div>
						<p className='d-flex justify-content-center fs-30pt fw-500 text-primary ff-Montserrat-sans-serif text-capitalize'>
							Olá, {userSessionInformations.name}.
						</p>
						<p className='d-flex justify-content-center fs-20pt fw-500 text-primary ff-Montserrat-sans-serif'>
							Logo disponibilizaremos uma nova atualização e te
							avisaremos por e-mail.
						</p>
					</main>
				</div>
			</div>
		</>
	);
}
