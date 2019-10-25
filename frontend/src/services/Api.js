import axios from 'axios';
import { getToken } from './Auth';

const Api = axios.create({
	baseURL: 'http://localhost:3030',
	timeout: 50000
});

Api.interceptors.request.use(async config => {
	const token = getToken();

	if (token) {
		config.headers.Authorization = token;
	}

	return config;
});

export default Api;
