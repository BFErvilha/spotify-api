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
		component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
	},
	{
		path: '/home',
		name: 'home',
		meta: { layout: 'vertical' },
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
	},
	{
		path: '/artists',
		component: () => import(/* webpackChunkName: "artists-root" */ '@/views/artist/root.vue'),
		meta: { layout: 'vertical' },
		children: [
			{
				path: '',
				name: 'artists',
				component: () => import(/* webpackChunkName: "artists" */ '../views/artist/list.vue'),
			},
			{
				path: ':id',
				name: 'artist-details',
				component: () => import(/* webpackChunkName: "artist-details" */ '../views/artist/details.vue'),
			},
		],
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
