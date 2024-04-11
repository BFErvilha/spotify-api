export function urlString(params) {
	if (!params) {
		return ''
	}

	if (!(params instanceof Object)) {
		return params
	}

	let url = ''

	Object.keys(params).forEach(key => {
		if (!params[key] && (params[key] !== 0 || params[key] !== false)) return ''
		if (Array.isArray(params[key])) {
			url += arrayToUrl(params[key], key)
		} else {
			if (params[key] === 'active') {
				url += `&${key}=${true}`
			} else if (params[key] === 'inactive') {
				url += `&${key}=${false}`
			} else {
				url += `&${key}=${params[key]}`
			}
		}
	})

	return url
}

const arrayToUrl = (params, key) => {
	let url = ''
	params = params.filter(item => item)
	params.forEach(item => {
		url += `&${key}=${item}`
	})

	return url
}
