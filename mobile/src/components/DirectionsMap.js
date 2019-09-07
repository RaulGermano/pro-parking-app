import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const DirectionsMap = ({ destination, origin, onReady }) => {
	return (
		<MapViewDirections
			destination={destination}
			origin={origin}
			onReady={onReady}
			apikey='AIzaSyDqcTeikQQy45rsSbFGwxC1so1-M7X7Ax0'
			strokeWidth={3}
			strokeColor='#3769cc'
		/>
	);
};

export default DirectionsMap;
