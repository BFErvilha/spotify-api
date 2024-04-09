const API_URL = process.env.VUE_APP_API

export const loginSpotify = async () => {
	window.location.href = `${API_URL}/login`
}
