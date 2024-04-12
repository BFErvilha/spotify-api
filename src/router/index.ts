import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'login',
		meta: { layout: 'full' },
		component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
	},
	{
		path: '/auth',
		name: 'auth',
		meta: { layout: 'full' },
		component: () => import(/* webpackChunkName: "auth" */ '../views/auth/Auth.vue'),
	},
	{
		path: '/home',
		name: 'home',
		meta: { layout: 'vertical', menu: 'home' },
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
	},
	{
		path: '/artists',
		component: () => import(/* webpackChunkName: "artists-root" */ '@/views/Root.vue'),
		meta: { layout: 'vertical' },
		children: [
			{
				path: '',
				name: 'artists',
				meta: { menu: 'artists' },
				component: () => import(/* webpackChunkName: "artists" */ '../views/artist/list.vue'),
			},
			{
				path: ':id',
				name: 'artist-details',
				meta: { menu: 'artists' },
				component: () => import(/* webpackChunkName: "artist-details" */ '../views/artist/details.vue'),
			},
		],
	},
	{
		path: '/playlists',
		component: () => import(/* webpackChunkName: "artists-root" */ '@/views/Root.vue'),
		meta: { layout: 'vertical' },
		children: [
			{
				path: '',
				name: 'playlists',
				meta: { menu: 'playlists' },
				component: () => import(/* webpackChunkName: "playlist" */ '../views/playlist/list.vue'),
			},
		],
	},
	{
		path: '/profile',
		name: 'profile',
		meta: { layout: 'vertical', menu: 'profile' },
		component: () => import(/* webpackChunkName: "home" */ '../views/profile.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
