import { Platform, StyleSheet } from 'react-native';

export const MarkerInformationThemeLight = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#ddd',
		marginTop: Platform.select({
			ios: 20,
			android: 30
		}),
		marginLeft: Platform.select({
			ios: 0,
			android: 30
		}),
		fontWeight: '300',
		borderRadius: 10,
		flexDirection: 'row',
		elevation: 5,
		shadowColor: '#333',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.5,
		shadowRadius: 5
	},
	textNameInformation: {
		color: '#333',
		marginVertical: 8,
		marginHorizontal: 10
	}
});

export const MarkerInformationThemeDark = StyleSheet.create({
	container: {
		backgroundColor: '#333',
		borderWidth: 1,
		borderColor: '#222',
		marginTop: Platform.select({
			ios: 20,
			android: 10
		}),
		marginLeft: Platform.select({
			ios: 0,
			android: 10
		}),
		fontWeight: '300',
		borderRadius: 10,
		flexDirection: 'row',
		elevation: 5,
		shadowColor: '#333',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.5,
		shadowRadius: 5
	},
	textNameInformation: {
		color: '#fff',
		marginVertical: 8,
		marginHorizontal: 10
	}
});
