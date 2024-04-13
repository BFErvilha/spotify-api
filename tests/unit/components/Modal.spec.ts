import { mount } from '@vue/test-utils'
import Modal from '@/components/Modal.vue'

describe('Modal.vue', () => {
	it('está visível quando montado', () => {
		const wrapper = mount(Modal)
		expect(wrapper.vm.visible).toBe(true)
		expect(wrapper.find('.modal-backdrop').exists()).toBe(true)
	})

	it('emite evento de fechamento quando o botão de fechar é clicado', async () => {
		const wrapper = mount(Modal)
		await wrapper.find('.close-button').trigger('click')
		expect(wrapper.emitted()).toHaveProperty('close')
		expect(wrapper.vm.visible).toBe(false)
	})

	it('emite evento de solicitação com o nome da playlist quando o botão de criar é clicado', async () => {
		const wrapper = mount(Modal)
		const playlistName = 'Minha Nova Playlist'
		await wrapper.setData({ playlistName })
		await wrapper.find('.create-button').trigger('click')
		expect(wrapper.emitted()).toHaveProperty('request')
		const requestEvents = wrapper.emitted('request')
		if (requestEvents) {
			expect(requestEvents[0]).toEqual([playlistName])
		} else {
			fail('Evento "request" não foi emitido')
		}
	})

	it('fecha o modal quando o fundo do modal é clicado', async () => {
		const wrapper = mount(Modal)
		await wrapper.find('.modal-backdrop').trigger('click')
		expect(wrapper.vm.visible).toBe(false)
		expect(wrapper.emitted()).toHaveProperty('close')
	})
})
