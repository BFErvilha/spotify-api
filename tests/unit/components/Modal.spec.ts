import { mount } from '@vue/test-utils'
import Modal from '@/components/Modal.vue'

describe('Modal.vue', () => {
	it('is visible when mounted', () => {
		const wrapper = mount(Modal)
		expect(wrapper.vm.visible).toBe(true)
		expect(wrapper.find('.modal-backdrop').exists()).toBe(true)
	})

	it('emits close event when close button is clicked', async () => {
		const wrapper = mount(Modal)
		await wrapper.find('.close-button').trigger('click')
		expect(wrapper.emitted()).toHaveProperty('close')
		expect(wrapper.vm.visible).toBe(false)
	})

	it('emits request event with playlist name when create button is clicked', async () => {
		const wrapper = mount(Modal)
		const playlistName = 'My New Playlist'
		await wrapper.setData({ playlistName })
		await wrapper.find('.create-button').trigger('click')
		expect(wrapper.emitted()).toHaveProperty('request')
		expect(wrapper.emitted('request')![0]).toEqual([playlistName])
	})

	it('closes the modal when modal backdrop is clicked', async () => {
		const wrapper = mount(Modal)
		await wrapper.find('.modal-backdrop').trigger('click')
		expect(wrapper.vm.visible).toBe(false)
		expect(wrapper.emitted()).toHaveProperty('close')
	})
})
