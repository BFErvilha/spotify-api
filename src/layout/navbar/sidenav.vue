<template>
	<div :class="['sidebar', { collapsed: !isCollapsed }]">
		<div class="logo">
			<img class="logo" src="@/assets/images/spotify-logo.png" />
		</div>
		<button @click="toggle" class="sidebar-toggle"></button>
		<div class="sidebar-content">
			<ul class="sidebar-menu">
				<li v-for="(item, index) in menu" :key="index">
					<router-link :to="item.url" class="sidebar-link">
						<menu-icons :icon="item.icon" />
						<span v-if="isCollapsed">{{ item.title }}</span>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { menu } from './menuList'
import menuIcons from '@/components/spotify/menu-icons.vue'

export default defineComponent({
	name: 'SideNav',
	components: {
		menuIcons,
	},
	props: {
		isCollapsed: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['update:isCollapsed'],

	setup(props, { emit }) {
		const toggle = () => {
			emit('update:isCollapsed', !props.isCollapsed)
		}

		return {
			menu,
			toggle,
		}
	},
})
</script>

<style lang="scss" scoped>
.sidebar {
	position: fixed;
	top: 0;
	left: 0;
	width: 250px;
	height: 100%;
	background-color: #000000;
	transition: width 0.3s ease;
}

.logo {
	margin: 20px auto;
	width: 100%;
	text-align: center;
	img {
		width: 164px;
		height: 50px;
	}
}

.collapsed {
	width: 70px;

	.logo {
		img {
			width: 60px;
			height: 50px;
			object-fit: cover;
			object-position: -3% 0;
		}
	}
}

.sidebar-toggle {
	display: block;
	cursor: pointer;
	position: absolute;
	z-index: 1010;
	top: 15px;
	right: 10px;
}

.sidebar-content {
	transition: opacity 0.3s ease;
	opacity: 1;
}

.is-active {
	opacity: 0.5;
}

.sidebar-menu {
	list-style: none;
	padding-left: 20px;

	li {
		margin-bottom: 16px;
		.sidebar-link {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			span {
				margin-left: 16px;
				font-size: 19px;
				font-weight: 700;
				line-height: 24.74px;
				letter-spacing: -0.06em;
				text-align: left;
				color: #949ea2;
			}

			&.active {
				color: white;
			}
		}
	}
}

@media (max-width: 768px) {
	.sidebar {
		z-index: 1000;
		transform: translateX(-100%);
	}
	.collapsed {
		transform: translateX(0);
	}
}
</style>