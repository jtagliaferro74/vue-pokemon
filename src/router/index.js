import { createWebHistory, createRouter } from "vue-router";
import { nextTick } from "vue";
import PokemonDetails from "../views/PokemonDetails.vue";

const routes = [
	{
		path: "/",
		name: "Home | Vue Pokemon",
		component: PokemonDetails,
	},
	{
		path: "/:id",
		name: "Details | Vue Pokemon",
		component: PokemonDetails,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.afterEach((to) => {
	nextTick(() => {
		document.title = to.name || "UB Solutions";
	});
});

export default router;
