import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/about',
		name: 'about',
		component: function() {
			return import('../views/About.vue')
		}
	},
	{
		path: '/login',
		name: 'login',
		component: function() {
			return import('../login/login.vue')
		}
	},
	{
		path: '/register',
		name: 'register',
		component: function() {
			return import('../login/register.vue')
		}
	},
]

const router = new VueRouter({
	routes
})

export default router