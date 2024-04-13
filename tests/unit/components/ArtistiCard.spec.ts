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
	const montarComponente = options => {
		return mount(ArtistCard, {
			global: {
				plugins: [router],
			},
			...options,
		})
	}

	it('renderiza um router-link para artistas com as props corretas', async () => {
		const artista = { id: '1', name: 'Artista Teste', images: [{ url: 'imagem-artista-teste.jpg' }] }
		const wrapper = montarComponente({
			props: { artist: artista, view: 'artists' },
		})

		const routerLink = wrapper.findComponent({ name: 'RouterLink' })
		expect(routerLink.exists()).toBe(true)
		expect(routerLink.props('to')).toBe('/artists/1')
		expect(wrapper.text()).toContain('Artista Teste')
		expect(wrapper.find('img').attributes('src')).toBe('imagem-artista-teste.jpg')
	})

	it('renderiza informações do álbum com data formatada', () => {
		const album = { id: '2', name: 'Álbum Teste', images: [{ url: 'imagem-album-teste.jpg' }], release_date: '2020-01-01' }
		const wrapper = montarComponente({
			props: { album, view: 'albums' },
		})

		expect(wrapper.text()).toContain('Álbum Teste')
		expect(wrapper.find('.date').text()).toBe(moment('2020-01-01').format('DD/MM/YYYY'))
		expect(wrapper.find('img').attributes('src')).toBe('imagem-album-teste.jpg')
	})
})
