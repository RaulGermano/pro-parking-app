import axios from 'axios';

const Api = axios.create({
	// Unifunec lab 3
	baseURL: 'http://192.168.5.27:8888/DataBase/services/',

	// Unifunec sala 30
	// baseURL: 'http://192.168.0.103:8888/DataBase/services/',

	// 4G
	// baseURL: 'http://172.20.10.6:8888/DataBase/services/',

	// Casa
	// baseURL: 'http://192.168.0.104:8888/DataBase/services/',

	timeout: 15000
});

export default Api;
