import store from '@/store'
import axios from 'axios'
import qs from 'qs'

const clientId = process.env.VUE_APP_CLIENT_ID
const redirectUri = process.env.VUE_APP_REDIRECT_URI
const refreshTokenUrl = 'https://accounts.spotify.com/api/token'

export const generateCodeVerifier = () => {
	return generateRandomString(128)
}

export const generateCodeChallenge = async codeVerifier => {
	const encoder = new TextEncoder()
	const data = encoder.encode(codeVerifier)
	const hash = await crypto.subtle.digest('SHA-256', data)
	return btoa(String.fromCharCode(...new Uint8Array(hash)))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '')
}

export const generateRandomString = length => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let result = ''
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return result
}

export const exchangeCodeForTokens = async (code: string, expectedState: string) => {
	const storedState = localStorage.getItem('spotify_auth_state')
	if (expectedState !== storedState) {
		throw new Error('State mismatch')
	}

	const codeVerifier = localStorage.getItem('spotify_code_verifier')
	if (!codeVerifier) {
		throw new Error('Code Verifier not found')
	}

	try {
		const data = qs.stringify({
			client_id: clientId,
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: redirectUri,
			code_verifier: codeVerifier,
		})

		const options = {
			method: 'post',
			url: 'https://accounts.spotify.com/api/token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			data: data,
		}

		const response = await axios(options)
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

	const codeVerifier = generateCodeVerifier()
	localStorage.setItem('spotify_code_verifier', codeVerifier)

	const codeChallenge = await generateCodeChallenge(codeVerifier)
	const scope = 'user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-top-read playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public'
	const queryParams = qs.stringify({
		response_type: 'code',
		client_id: clientId,
		scope,
		redirect_uri: redirectUri,
		state,
		code_challenge_method: 'S256',
		code_challenge: codeChallenge,
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
			},
			data: qs.stringify({
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
				client_id: clientId,
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
