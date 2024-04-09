import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'login',
		meta: { layout: 'full' },
		component: () => import(/* webpackChunkName: "about" */ '../views/LoginScreen.vue'),
	},
	{
		path: '/auth',
		name: 'auth',
		meta: { layout: 'full' },
		component: () => import(/* webpackChunkName: "about" */ '../views/AuthScreen.vue'),
	},
	{
		path: '/home',
		name: 'home',
		meta: { layout: 'vertical' },
		component: HomeView,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
