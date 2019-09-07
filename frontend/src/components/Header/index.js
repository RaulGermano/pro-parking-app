import React from 'react';
import { Container } from './styles';
import { MdMenu, MdNotifications } from 'react-icons/md';
// import { FaBars } from 'react-icons/fa';

function Header() {
	return (
		<Container>
			<div>
				<MdMenu size='25' />
			</div>

			<div>
				<input type='text' placeholder='Pesquise...' />
			</div>

			<div>
				<MdNotifications size='25' />
				<img
					src='https://s3.amazonaws.com/igd-wp-uploads-pluginaws/wp-content/uploads/2016/05/30105213/Qual-e%CC%81-o-Perfil-do-Empreendedor.jpg'
					width='100'
					height='100'
					alt='Logo'
				/>
			</div>
		</Container>
	);
}

export default Header;
