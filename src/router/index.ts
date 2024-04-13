import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'

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
		meta: { requiresAuth: true, layout: 'vertical', menu: 'home' },
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
	},
	{
		path: '/artists',
		component: () => import(/* webpackChunkName: "artists-root" */ '@/views/Root.vue'),
		meta: { requiresAuth: true, layout: 'vertical' },
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
		meta: { requiresAuth: true, layout: 'vertical' },
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
		meta: { requiresAuth: true, layout: 'vertical', menu: 'profile' },
		component: () => import(/* webpackChunkName: "home" */ '../views/profile.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeEach(async (to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
	if (requiresAuth) {
		let token = store.getters['spotify/accessToken']
		if (!token) {
			token = localStorage.getItem('tokenSpotify')
		}
		if (!token) {
			next('/')
		} else {
			next()
		}
	} else {
		next()
	}
})

// router.afterEach((to, from) => {
// 	Sentry.captureEvent({
// 		message: `Navegação de ${from.path} para ${to.path}`,
// 		level: 'info',
// 		extra: {
// 			to: to.path,
// 			from: from.path,
// 		},
// 	})
// })

export default router
