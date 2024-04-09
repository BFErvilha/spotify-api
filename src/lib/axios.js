import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: process.env.VUE_APP_API,
})

axiosInstance.interceptors.request.use(config => {
	let token = localStorage.getItem('tokenCB')

	if (token) {
		token = token.replace(/^"|"$/g, '')
		config.headers.Authorization = `Bearer ${token}`
	}
	if (config.data instanceof FormData) {
		config.headers['Accept'] = '*/*'
	}
	return config
})

export { axiosInstance }
