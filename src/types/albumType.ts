type ExternalUrls = {
	spotify: string
}

type Artist = {
	external_urls: ExternalUrls
	href: string
	id: string
	name: string
	type: string
	uri: string
}

type Image = {
	height: number
	url: string
	width: number
}

type Copyright = {
	text: string
	type: string
}

type ExternalIds = {
	upc: string
}

export type Track = {
	artists: Artist[]
	available_markets: string[]
	disc_number: number
	duration_ms: number
	explicit: boolean
	external_urls: ExternalUrls
	href: string
	id: string
	is_local: boolean
	name: string
	preview_url: string | null
	track_number: number
	type: string
	uri: string
}

type Tracks = {
	href: string
	items: Track[]
	limit: number
	next: null | string
	offset: number
	previous: null | string
	total: number
}

export type Album = {
	album_type: string
	artists: Artist[]
	available_markets: string[]
	copyrights: Copyright[]
	external_ids: ExternalIds
	external_urls: ExternalUrls
	genres: string[]
	href: string
	id: string
	images: Image[]
	label: string
	name: string
	popularity: number
	release_date: string
	release_date_precision: string
	total_tracks: number
	tracks: Tracks
	type: string
	uri: string
}
