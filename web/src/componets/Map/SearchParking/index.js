import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

function MapSearchParking() {
	return (
		<GoogleMap
			defaultZoom={10}
			defaultCenter={{
				lat: -20.2110316,
				lng: -50.9480994
			}}
		/>
	);
}

export default withScriptjs(withGoogleMap(MapSearchParking));
