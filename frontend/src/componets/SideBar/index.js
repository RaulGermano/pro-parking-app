import React from 'react';
import SideBarItem from '../SideBarItem';
import {
	MdHome,
	MdFlag,
	MdPeople,
	MdReceipt,
	MdPerson,
	MdShowChart,
	MdBookmark,
	MdInfo,
	MdAssignment,
	MdHeadsetMic
} from 'react-icons/md';

export default function SideBar({ route }) {
	const { path } = route;

	return (
		<nav className='col-md-2 d-none d-md-block bg-light sidebar'>
			<div className='sidebar-sticky'>
				<ul className='nav flex-column'>
					<SideBarItem
						title='Início'
						active={path === '/main' ? true : false}
						link='/main'
						icon={<MdHome size={22} className='mr-2 align-top' />}
					/>

					<SideBarItem
						title='Dashboard'
						active={path === '/dashboard' ? true : false}
						link='/dashboard'
						icon={
							<MdShowChart size={22} className='mr-2 align-top' />
						}
					/>
					<SideBarItem
						title='Vagas'
						active={path === '/parkingLots' ? true : false}
						link='/parkingLots'
						icon={<MdFlag size={22} className='mr-2 align-top' />}
					/>
					<SideBarItem
						title='Clientes'
						active={path === '/customers' ? true : false}
						link='/customers'
						icon={
							<MdReceipt size={22} className='mr-2 align-top' />
						}
					/>
					<SideBarItem
						title='Usuários'
						active={path === '/users' ? true : false}
						link='/users'
						icon={<MdPeople size={22} className='mr-2 align-top' />}
					/>
					<SideBarItem
						title='Perfil'
						active={path === '/profile' ? true : false}
						link='/profile'
						icon={<MdPerson size={22} className='mr-2 align-top' />}
					/>
					<SideBarItem
						title='Estacionamento'
						active={path === '/parking' ? true : false}
						link='/parking'
						icon={
							<MdAssignment
								size={22}
								className='mr-2 align-top'
							/>
						}
					/>
					<SideBarItem
						title='Passo a passo'
						active={path === '/getStarted' ? true : false}
						link='/getStarted'
						icon={
							<MdBookmark size={22} className='mr-2 align-top' />
						}
					/>
					<SideBarItem
						title='Sobre o PRO Parking'
						active={path === '/about' ? true : false}
						link='/about'
						icon={<MdInfo size={22} className='mr-2 align-top' />}
					/>

					<SideBarItem
						title='Suporte'
						active={path === '/about' ? true : false}
						link='/about'
						icon={
							<MdHeadsetMic
								size={22}
								className='mr-2 align-top'
							/>
						}
					/>
				</ul>
			</div>
		</nav>
	);
}
