import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'https://api.spotify.com/v1',
})

axiosInstance.interceptors.request.use(config => {
	let token = localStorage.getItem('tokenSpotify')

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export { axiosInstance }
