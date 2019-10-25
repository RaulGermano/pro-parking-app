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
	MdViewList,
	MdHeadsetMic
} from 'react-icons/md';

export default function SideBar({ route }) {
	const { path } = route;

	return (
		<nav className='col-md-2 d-none d-md-block bg-light sidebar'>
			<div className='sidebar-sticky'>
				<ul className='nav flex-column'>
					{/* <SideBarItem
						title='Perfil'
						active={path === '/profile' ? true : false}
						link='/profile'
						desabled={false}
						icon={<MdPerson size={22} className='mr-2 align-top' />}
                    /> */}
					<SideBarItem
						title='Lista de contatos'
						active={
							path === '/parking-contacts-to-create'
								? true
								: false
						}
						link='/parking-contacts-to-create'
						desabled={false}
						icon={
							<MdViewList size={22} className='mr-2 align-top' />
						}
					/>
					<SideBarItem
						title='Estacionamentos'
						active={path === '/parking-created' ? true : false}
						link='/parking-created'
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
						title='Passo a passo'
						active={path === '/introdution' ? true : false}
						link='/introdution'
						desabled={true}
						icon={
							<MdBookmark size={22} className='mr-2 align-top' />
						}
					/>
					<SideBarItem
						title='Suporte'
						active={path === '/help-desk' ? true : false}
						link='/help-desk'
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
