type ExplicitContent = {
	filter_enabled: boolean
	filter_locked: boolean
}

type ExternalUrls = {
	spotify: string
}

type Follower = {
	href: string | null
	total: number
}

type Image = {
	url: string
	height: number
	width: number
}

export type UserData = {
	country: string
	display_name: string
	email: string
	explicit_content: ExplicitContent
	external_urls: ExternalUrls
	followers: Follower
	href: string
	id: string
	images: Image[]
	product: string
	type: string
	uri: string
}
