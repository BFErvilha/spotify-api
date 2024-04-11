type ExternalUrls = {
	spotify: string
}

type Followers = {
	href: null
	total: number
}

type Image = {
	height: number
	url: string
	width: number
}

export type Artist = {
	external_urls: ExternalUrls
	followers: Followers
	genres: string[]
	href: string
	id: string
	images: Image[]
	name: string
	popularity: number
	type: string
	uri: string
}
type AlbumArtist = {
	external_urls: ExternalUrls
	href: string
	id: string
	name: string
	type: string
	uri: string
}

type Album = {
	album_group: string
	album_type: string
	artists: AlbumArtist[]
	available_markets: string[]
	external_urls: ExternalUrls
	href: string
	id: string
	images: Image[]
	name: string
	release_date: string
	release_date_precision: string
	total_tracks: number
	type: string
	uri: string
}

export type ArtistDetail = {
	artist: Artist | null
	albums: Album | any
	topTracks: topTracks[] | null
	relatedArtists: any
}

type topTracks = {
	album: topTrackAlbum
	artists: AlbumArtist[]
	disc_number: number
	duration_ms: number
	explicit: boolean
	external_ids: {
		isrc: string
	}
	external_urls: ExternalUrls
	href: string
	id: string
	is_local: boolean
	is_playable: boolean
	name: string
	popularity: number
	preview_url: string
	track_number: number
	type: string
	uri: string
}

type topTrackAlbum = {
	album_type: string
	artists: AlbumArtist[]
	external_urls: ExternalUrls
	href: string
	id: string
	images: Image[]
	is_playable: boolean
	name: string
	release_date: string
	release_date_precision: string
	total_tracks: number
	type: string
	uri: string
}
