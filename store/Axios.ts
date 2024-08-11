import axios from 'axios';

const Axios = axios.create({
	baseURL: '/pages/api',
});

export default Axios;
