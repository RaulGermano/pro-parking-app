export const isAuthenticated = () =>
	localStorage.getItem('USER_TOKEN') !== null;

export const getToken = () => localStorage.getItem('USER_TOKEN');

export const userLogin = token => {
	localStorage.setItem('USER_TOKEN', token);
};

export const userLogout = () => {
	localStorage.removeItem('USER_TOKEN');
};
