import React from 'react';
import { Link } from 'react-router-dom';

function SideBarItem({ title, active, link, icon }) {
	return (
		<div>
			<li className='nav-item'>
				{active ? (
					<Link to={link} className='nav-link active'>
						{icon}
						<span className='font-weight-bold'>{title}</span>
					</Link>
				) : (
					<Link to={link} className='nav-link text-muted'>
						{icon}
						<span className='font-weight-bold'>{title}</span>
					</Link>
				)}
			</li>
		</div>
	);
}

export default SideBarItem;
