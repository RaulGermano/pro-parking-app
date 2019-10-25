import React from 'react';
import { MdClose } from 'react-icons/md';
import { FaSignOutAlt } from 'react-icons/fa';

export default function NewReleaseParkingSpaceModal({ ParkingSpace }) {
	return (
		<div
			className='modal fade show'
			id='modalNewEReleaseParkingSpace'
			role='dialog'
			aria-hidden='true'
		>
			<div className='modal-dialog modal-md' role='document'>
				<div className='modal-content'>
					<div className='modal-header p-2'>
						<h5 className='modal-title' id='exampleModalLabel'>
							<FaSignOutAlt
								size={30}
								color='#fff'
								className='bg-primary rounded-circle p-lg-1 mr-2'
							/>
							<span>Realizar saída</span>
						</h5>
						<button
							type='button'
							className='close'
							data-dismiss='modal'
							aria-label='Fechar'
						>
							<MdClose />
						</button>
					</div>
					<div className='modal-body pb-2 pt-3 d-flex form-row mb-4'>
						<span>{ParkingSpace}</span>
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
