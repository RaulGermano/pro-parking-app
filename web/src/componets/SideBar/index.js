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
						desabled={false}
						icon={<MdHome size={22} className='mr-2 align-top' />}
					/>

					<SideBarItem
						title='Dashboard'
						active={path === '/dashboard' ? true : false}
						link='/dashboard'
						desabled={true}
						icon={
							<MdShowChart size={22} className='mr-2 align-top' />
						}
					/>
					<SideBarItem
						title='Vagas'
						active={path === '/parking-space' ? true : false}
						link='/parking-space'
						icon={<MdFlag size={22} className='mr-2 align-top' />}
					/>
					<SideBarItem
						title='Clientes'
						active={path === '/customers' ? true : false}
						link='/customers'
						desabled={false}
						icon={
							<MdReceipt size={22} className='mr-2 align-top' />
						}
					/>
					<SideBarItem
						title='Usuários'
						active={path === '/users' ? true : false}
						link='/users'
						desabled={false}
						icon={<MdPeople size={22} className='mr-2 align-top' />}
					/>
					<SideBarItem
						title='Perfil'
						active={path === '/profile' ? true : false}
						link='/profile'
						desabled={false}
						icon={<MdPerson size={22} className='mr-2 align-top' />}
					/>
					<SideBarItem
						title='Estacionamento'
						active={path === '/parking' ? true : false}
						link='/parking'
						desabled={false}
						icon={
							<MdAssignment
								size={22}
								className='mr-2 align-top'
							/>
						}
					/>
					<SideBarItem
						title='Passo a passo'
						active={path === '/introdution' ? true : false}
						link='/introdution'
						desabled={true}
						icon={
							<MdBookmark size={22} className='mr-2 align-top' />
						}
					/>
					<SideBarItem
						title='Sobre o PRO Parking'
						active={path === '/about' ? true : false}
						link='/about'
						desabled={true}
						icon={<MdInfo size={22} className='mr-2 align-top' />}
					/>

					<SideBarItem
						title='Suporte'
						active={path === '/help' ? true : false}
						link='/help'
						desabled={true}
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
