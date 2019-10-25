import React from 'react';
import { MdExitToApp, MdNotifications } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<div>
			<nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow'>
				<Link
					to='./main'
					className='navbar-brand col-sm-3 col-md-2 mr-0 pro-parking p-2'
				>
					<span className='pro mr-1'>PRO</span>
					<span className='parking'>Parking</span>
				</Link>

				<ul className='navbar-nav px-3'>
					<li className='nav-item text-nowrap d-flex'>
						<div className='nav-link' id='notifications-page'>
							<MdNotifications
								size={20}
								className='mr-4 text-nowrap'
							/>
						</div>
						<Link to='./' className='nav-link'>
							Sair
							<MdExitToApp
								size={20}
								className='ml-2 text-nowrap'
							/>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Header;
