import store from '@/store'
import axios from 'axios'
import qs from 'qs'

const clientId = process.env.VUE_APP_CLIENT_ID
const clientSecret = process.env.VUE_APP_CLIENT_SECRET
const redirectUri = process.env.VUE_APP_REDIRECT_URI
const refreshTokenUrl = 'https://accounts.spotify.com/api/token'

export const generateRandomString = (length: number) => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let result = ''
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return result
}

export const getAuthOptions = (code, clientId, clientSecret, redirectUri) => {
	return {
		method: 'post',
		url: 'https://accounts.spotify.com/api/token',
		data: qs.stringify({
			code,
			redirect_uri: process.env.VUE_APP_REDIRECT_URI,
			grant_type: 'authorization_code',
		}),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
		},
	}
}

// Continuação do seu auth.service

export const exchangeCodeForTokens = async (code: string, expectedState: string) => {
	const storedState = localStorage.getItem('spotify_auth_state')
	if (expectedState !== storedState) {
		throw new Error('State mismatch')
	}

	try {
		const response = await axios(getAuthOptions(code, clientId, clientSecret, redirectUri))
		const { access_token, refresh_token } = response.data
		return { accessToken: access_token, refreshToken: refresh_token }
	} catch (error) {
		console.error('Error exchanging code for tokens', error)
		throw new Error('Failed to exchange code for tokens')
	}
}

export const loginSpotify = async () => {
	const state = generateRandomString(16)
	localStorage.setItem('spotify_auth_state', state)
	const scope = 'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-top-read playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public'
	const queryParams = qs.stringify({
		response_type: 'code',
		client_id: clientId,
		scope,
		redirect_uri: redirectUri,
		state,
	})
	window.location.href = `https://accounts.spotify.com/authorize?${queryParams}`
}

export const refreshAccessToken = async () => {
	try {
		const refreshToken = store.getters['spotify/refreshToken'] || localStorage.getItem('tokenRefreshSpotify')
		const authOptions = {
			method: 'post',
			url: refreshTokenUrl,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
			},
			data: qs.stringify({
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
			}),
		}

		const response = await axios(authOptions)
		const { access_token } = response.data

		store.commit('spotify/refreshAccessToken', access_token)
		localStorage.setItem('tokenSpotify', access_token)

		return access_token
	} catch (error) {
		console.error('Erro ao atualizar o token:', error)
		throw error
	}
}
