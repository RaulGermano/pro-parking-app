import React from 'react';
import { MdSearch, MdClose } from 'react-icons/md';
import MapSearchParking from '../../Map/SearchParking';

function SearchParking() {
	return (
		<div
			className='modal fade'
			id='modal-search-parking'
			role='dialog'
			aria-labelledby='modal-search-parking-text'
			aria-hidden='true'
		>
			<div className='modal-dialog modal-xl' role='document'>
				<div className='modal-content'>
					<div className='modal-header p-2'>
						<h5
							className='modal-title'
							id='modal-search-parking-text'
						>
							<MdSearch
								size={30}
								color='#fff'
								className='bg-primary rounded-circle p-lg-1 mr-2'
							/>
							<span>Pesquisar estacionamento</span>
						</h5>
						<button
							type='button'
							className='close'
							data-dismiss='modal'
							aria-label='Close'
						>
							<MdClose />
						</button>
					</div>
					<div className='modal-body pb-5 pt-3'>
						<MapSearchParking
							style={{ width: '100vw', height: '100vh' }}
							googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
							loadingElement={<div style={{ height: `100%` }} />}
							containerElement={
								<div style={{ height: `100%` }} />
							}
							mapElement={<div style={{ height: `100%` }} />}
						/>
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-sm btn-secondary'
							data-dismiss='modal'
						>
							Fechar
						</button>

						<button
							type='button'
							className='btn btn-sm btn-primary'
							disabled={true}
						>
							Liberar entrada
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default SearchParking;
