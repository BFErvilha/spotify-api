import { createRouter, createWebHistory } from 'vue-router'
import { mount } from '@vue/test-utils'
import DetailsHeader from '@/components/DetailsHeader.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
})

describe('DetailsHeader.vue', () => {
	const mountComponentWithRouter = options => {
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

	it('renders props.name when passed', async () => {
		const name = 'Nome do Artista Teste'
		const wrapper = mountComponentWithRouter({
			props: { name, image: 'test-image.jpg' },
		})

		expect(wrapper.text()).toMatch(name)
	}, 10000)

	it('renders props.image as src for the image', async () => {
		const image = 'test-image.jpg'
		const wrapper = mountComponentWithRouter({
			props: { name: 'Nome do Artista Teste', image },
		})

		const img = wrapper.find('img')
		expect(img.attributes('src')).toBe(image)
	}, 10000)
})
