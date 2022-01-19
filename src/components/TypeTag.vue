<template>
	<div
		class="type"
		:class="{
			normal: pokemonType === 'normal',
			fire: pokemonType === 'fire',
			water: pokemonType === 'water',
			electric: pokemonType === 'electric',
			grass: pokemonType === 'grass',
			ice: pokemonType === 'ice',
			fighting: pokemonType === 'fighting',
			poison: pokemonType === 'poison',
			ground: pokemonType === 'ground',
			flying: pokemonType === 'flying',
			psychic: pokemonType === 'psychic',
			bug: pokemonType === 'bug',
			rock: pokemonType === 'rock',
			ghost: pokemonType === 'ghost',
			dragon: pokemonType === 'dragon',
			dark: pokemonType === 'dark',
			steel: pokemonType === 'steel',
			fairy: pokemonType === 'fairy',
		}"
	>
		{{ pokemonType }}
	</div>
</template>

<script>
	export default {
		props: {
			pokemonType: String,
		},
		created() {
			// console.log(this.pokemonType);
		},
	};
</script>

<style scoped>
	.type {
		text-transform: uppercase;
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 4px;
		color: white;
		text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.7);
		text-align: center;
		font-size: 14px;
		padding: 4px 2px;
		margin-right: 6px;
		width: 66px;
		box-shadow: 2px 2px 4px rgba(155, 155, 155, 0.5);
	}

	.normal {
		background-color: #aa9;
	}
	.fire {
		background-color: #f42;
	}
	.water {
		background-color: #39f;
	}
	.electric {
		background-color: #fc3;
	}
	.grass {
		background-color: #7c5;
	}

	.ice {
		background-color: #6cf;
	}
	.fighting {
		background-color: #b54;
	}
	.poison {
		background-color: #a59;
	}
	.ground {
		background-color: #db5;
	}
	.flying {
		background-color: #89f;
	}

	.psychic {
		background-color: #f59;
	}
	.bug {
		background-color: #ab2;
	}
	.rock {
		background-color: #ba6;
	}
	.ghost {
		background-color: #66b;
	}
	.dragon {
		background-color: #76e;
	}

	.dark {
		background-color: #754;
	}
	.steel {
		background-color: #aab;
	}
	.fairy {
		background-color: #e9e;
	}
</style>
