import { Platform, PixelRatio } from 'react-native';

const PixelSize = pixels => {
	return Platform.select({
		ios: pixels,
		android: PixelRatio.getPixelSizeForLayoutSize(pixels)
	});
};

export default PixelSize;
