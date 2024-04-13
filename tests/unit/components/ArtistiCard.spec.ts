import { createRouter, createWebHistory } from 'vue-router'
import { mount } from '@vue/test-utils'
import ArtistCard from '@/components/ArtistCard.vue'
import moment from 'moment'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: { template: '<div>Home</div>' } },
		{ path: '/artists', component: { template: '<div>Artists</div>' } },
		{ path: '/artists/:id', component: { template: '<div>Artist Detail</div>' } },
	],
})

describe('ArtistCard.vue', () => {
	const mountComponent = options => {
		return mount(ArtistCard, {
			global: {
				plugins: [router],
			},
			...options,
		})
	}

	it('renders a router-link for artists with correct props', async () => {
		const artist = { id: '1', name: 'Test Artist', images: [{ url: 'test-artist-image.jpg' }] }
		const wrapper = mountComponent({
			props: { artist, view: 'artists' },
		})

		const routerLink = wrapper.findComponent({ name: 'RouterLink' })
		expect(routerLink.exists()).toBe(true)
		expect(routerLink.props('to')).toBe('/artists/1')
		expect(wrapper.text()).toContain('Test Artist')
		expect(wrapper.find('img').attributes('src')).toBe('test-artist-image.jpg')
	})

	it('renders album information with formatted date', () => {
		const album = { id: '2', name: 'Test Album', images: [{ url: 'test-album-image.jpg' }], release_date: '2020-01-01' }
		const wrapper = mountComponent({
			props: { album, view: 'albums' },
		})

		expect(wrapper.text()).toContain('Test Album')
		expect(wrapper.find('.date').text()).toBe(moment('2020-01-01').format('DD/MM/YYYY'))
		expect(wrapper.find('img').attributes('src')).toBe('test-album-image.jpg')
	})
})
