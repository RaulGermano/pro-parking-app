import React, { useState } from 'react';
import Loader from './loader';

function useLoader(props) {
	const [visible, setVisible] = useState(true);

	const handleLoader = value => {
		setVisible(value);
	};

	const loader = visible ? <Loader /> : null;

	return [loader, handleLoader];
}

export default useLoader;
