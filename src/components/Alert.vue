<template>
	<div v-if="visible" class="alert" :class="`alert-${type}`" @click="closeAlert">
		<span>{{ message }}</span>
	</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
	message: String,
	type: {
		type: String,
		default: 'info',
	},
	visible: Boolean,
})

const emit = defineEmits(['update:visible'])

const closeAlert = () => {
	emit('update:visible', false)
}
</script>

<style lang="scss" scoped>
.alert {
	position: fixed;
	top: 20px;
	right: 20px;
	padding: 10px 20px;
	border-radius: 5px;
	background-color: #1e1e1e;
	cursor: pointer;
	z-index: 1000;
}
.alert-info {
	color: rgba(0, 123, 255, 0.5);
}
.alert-success {
	color: rgba(40, 167, 69, 0.5);
}
.alert-warning {
	color: rgba(255, 193, 7, 0.5);
}
.alert-error {
	color: rgba(220, 53, 69, 0.5);
}
</style>
