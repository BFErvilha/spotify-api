import axios from 'axios'

const client_id = process.env.VUE_APP_CLIENT_ID
const client_secret = process.env.VUE_APP_SECRET_KEY

export const loginSpotify = async () => {
	const authOptions = {
		method: 'post',
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		data: 'grant_type=client_credentials',
	}

	try {
		const response = await axios(authOptions)
		if (response.status === 200) {
			const token = response.data.access_token
			console.log('Token de acesso:', token)
			return token
		}
	} catch (error) {
		console.error('Erro ao autenticar:', error)
		throw error
	}
}
