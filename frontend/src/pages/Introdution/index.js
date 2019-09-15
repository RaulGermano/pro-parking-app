import React from 'react';
import Header from '../../componets/Header';
import SideBar from '../../componets/SideBar';
import DefaultTitle from '../../componets/DefaultTitle';

export default function Main({ match }) {
	return (
		<>
			<Header />
			<div className='container-fluid'>
				<div className='row'>
					<SideBar route={match} />
					<main
						role='main'
						className='col-md-9 ml-sm-auto col-lg-10 px-4'
					>
						<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3'>
							<DefaultTitle title='Iníciando com o Portal PRO Parking' />
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
