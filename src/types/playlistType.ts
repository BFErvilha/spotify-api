export type Playlist = {
	collaborative: boolean
	description: string
	external_urls: ExternalUrls
	href: string
	id: string
	images: Image[]
	name: string
	owner: Owner
	primary_color: null | string
	public: boolean
	snapshot_id: string
	tracks: Tracks
	type: string
	uri: string
}

type ExternalUrls = {
	spotify: string
}

type Image = {
	height: null | number
	url: string
	width: null | number
}

type Owner = {
	display_name: string
	external_urls: ExternalUrls
	href: string
	id: string
	type: string
	uri: string
}

type Tracks = {
	href: string
	total: number
}
