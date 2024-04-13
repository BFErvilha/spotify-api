import { createRouter, createWebHistory } from 'vue-router'
import { mount } from '@vue/test-utils'
import DetailsHeader from '@/components/DetailsHeader.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
})

describe('DetailsHeader.vue', () => {
	const montarComponenteComRouter = options => {
		return mount(DetailsHeader, {
			global: {
				plugins: [router],
				stubs: {
					RouterLink: true,
				},
			},
			...options,
		})
	}

	it('renderiza props.name quando passado', async () => {
		const name = 'Nome do Artista Teste'
		const wrapper = montarComponenteComRouter({
			props: { name, image: 'test-image.jpg' },
		})

		expect(wrapper.text()).toMatch(name)
	}, 10000)

	it('renderiza props.image como src para a imagem', async () => {
		const image = 'test-image.jpg'
		const wrapper = montarComponenteComRouter({
			props: { name: 'Nome do Artista Teste', image },
		})

		const img = wrapper.find('img')
		expect(img.attributes('src')).toBe(image)
	}, 10000)
})
