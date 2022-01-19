<template>
	<div id="pokemon-details">
		<!-- <Navbar @randomize="getRandomId()" /> -->
		<Navbar />
		<div v-if="!error" class="content">
			<div class="adjacent-pokewmon-link-row">
				<router-link v-if="pokemon.id > 1" :to="`/${pokemon.id - 1}`">
					<div class="unicon-container">
						<unicon name="angle-left-b" fill="#808080"></unicon>
					</div>
					Prev
				</router-link>
				<router-link v-if="pokemon.id < 898" :to="`/${pokemon.id + 1}`">
					Next
					<div class="unicon-container">
						<unicon name="angle-right-b" fill="#808080"></unicon>
					</div>
				</router-link>
			</div>
			<div class="heading">
				<h1 v-if="pokemon.name">
					{{ capitalizedName }}
					<span class="dex-num">#{{ formattedId }}</span>
				</h1>
			</div>
			<!-- <p>hello</p> -->
			<div class="type-container">
				<!-- <div v-for="(type, i) in pokemon.types" :key="i" class="type">
					{{ pokemon.types[i].type.name }}
				</div> -->

				<TypeTag
					v-for="(type, i) in pokemon.types"
					:key="i"
					:pokemonType="pokemon.types[i].type.name"
				/>
			</div>
			<div v-if="species_data" class="pokemon-row">
				<div class="pokemon-col">
					<div v-if="pokemonDescription" class="description">
						<p>"{{ pokemonDescription }}"</p>
					</div>
					<div v-if="pokemon.stats" class="stats">
						<h2>Base Stats:</h2>

						<StatBar
							v-for="(stat, i) in pokemon.stats"
							:key="i"
							:label="stat.stat.name"
							:stat="stat.base_stat"
						/>
					</div>
				</div>

				<div v-if="pokemon.sprites" class="sprite-container">
					<img
						class="sprite"
						:src="pokemon.sprites.front_default"
						alt=""
						draggable="false"
					/>
				</div>
			</div>
			<h3 v-if="evolution_chain_data.evolves_to">Evolution Chain</h3>
			<div v-if="evolution_chain_data.evolves_to" class="evolution-chain">
				<div
					class="evolution-chain-item"
					v-for="(pokemon_data, i) in getCleanedEvolutionChain(evolution_chain_data)"
					:key="i"
					@click="this.$router.push(`/${pokemon_data.id}`)"
				>
					<img class="evolution-chain-sprite" :src="pokemon_data.img_url" alt="" />
					<span>{{ capitalize(pokemon_data.name) }}</span>
					<span v-if="pokemon_data.min_level" class="evolution-chain-item-desc">
						Level {{ pokemon_data.min_level }}
					</span>
				</div>
			</div>
		</div>
		<div v-if="error" class="error">
			<h1>Oh No! There's been an Error!</h1>
			<p>Maybe the Pokemon you were looking for doesn't exist...</p>
			<!-- <router-link>Try Another</router-link> -->
		</div>
	</div>
</template>

<script>
	import Navbar from "../components/Navbar.vue";
	import TypeTag from "../components/TypeTag.vue";
	import StatBar from "../components/StatBar.vue";
	import axios from "axios";
	export default {
		name: "PokemonDetails",
		components: {
			Navbar,
			TypeTag,
			StatBar,
		},
		async created() {
			// Send GET request to database
			if (this.$route.params.id) {
				this.pokemon_id = this.$route.params.id;
			}
			this.getPokemon(this.pokemon_id);
			this.getPokemonSpeciesData(this.pokemon_id);
		},
		data() {
			return {
				error: false,
				pokemon_id: 1,
				pokemon: {},
				species_data: {},
				evolution_chain_data: {},
				base_url: "https://pokeapi.co/api/v2",
			};
		},
		computed: {
			capitalizedName: function () {
				return this.pokemon ? this.capitalize(this.pokemon.name) : "";
			},
			pokemonDescription: function () {
				if (this.species_data.flavor_text_entries) {
					let descriptions = this.species_data
						? this.species_data.flavor_text_entries
						: null;
					let len = descriptions.length;
					// return last (most recent) description
					return descriptions[len - 1].flavor_text;
				}
				return "";
			},
			formattedId: function () {
				return this.pokemon.id.toString().padStart(3, "0");
			},
		},
		methods: {
			async getPokemon(id) {
				try {
					axios
						.get(`${this.base_url}/pokemon/${id}`)
						.then((response) => {
							this.pokemon = response.data;
							console.log("pokemon data", response);
							document.title = `${this.capitalize(this.pokemon.name)} | Pokemon`;
						})
						.catch((err) => {
							console.log(err);
							this.error = true;
						});
				} catch (error) {
					console.log(error);
				}
			},

			async getPokemonSpeciesData(id) {
				try {
					axios
						.get(`${this.base_url}/pokemon-species/${id}`)
						.then((response) => {
							this.species_data = response.data;
							this.filterLanguage("en", this.species_data);
							console.log("species data", response);
							this.getEvolutionChainData(this.species_data.evolution_chain.url);
						})
						.catch((err) => {
							console.log(err);
						});
				} catch (error) {
					console.log(error);
				}
			},
			async getEvolutionChainData(url) {
				try {
					axios
						.get(url)
						.then((response) => {
							this.evolution_chain_data = response.data.chain;
							// this.filterLanguage("en", this.species_data);
							console.log("evolution chain data", this.evolution_chain_data);
						})
						.catch((err) => {
							console.log(err);
						});
				} catch (error) {
					console.log(error);
				}
			},
			capitalize(str) {
				// capitalises a string
				return str[0].toUpperCase() + str.slice(1);
			},
			filterLanguage(language, data) {
				// go through each text entry and remove the ones not in given language
				for (let i = 0; i < data.flavor_text_entries.length; i++) {
					if (data.flavor_text_entries[i].language.name !== language) {
						data.flavor_text_entries.splice(i, 1);
						i--; // have to decrement here or else we'd skip entries
					}
				}
				return;
			},

			getCleanedEvolutionChain(chainData) {
				let evoData = chainData;
				let evoChain = [];

				do {
					let numberOfEvolutions = evoData.evolves_to.length;
					let evoDetails = evoData.evolution_details[0];

					evoChain.push({
						name: evoData.species.name,
						min_level: !evoDetails ? 1 : evoDetails.min_level,
						// trigger_name: !evoDetails ? null : evoDetails.trigger.name,
						id: this.getDexNumberFromSpeciesURL(evoData.species.url),
						img_url: this.getImageFromDexNumber(
							this.getDexNumberFromSpeciesURL(evoData.species.url)
						),
					});

					if (numberOfEvolutions > 1) {
						for (let i = 1; i < numberOfEvolutions; i++) {
							evoChain.push({
								name: evoData.evolves_to[i].species.name,
								min_level: !evoData.evolves_to[i]
									? 1
									: evoData.evolves_to[i].min_level,
								id: this.getDexNumberFromSpeciesURL(
									evoData.evolves_to[i].species.url
								),
								img_url: this.getImageFromDexNumber(
									this.getDexNumberFromSpeciesURL(
										evoData.evolves_to[i].species.url
									)
								),
							});
						}
					}

					evoData = evoData.evolves_to[0];
				} while (!!evoData && Object.prototype.hasOwnProperty.call(evoData, "evolves_to"));
				return evoChain;
			},

			getDexNumberFromSpeciesURL(url) {
				url = url.slice(0, -1);
				return url.substring(url.lastIndexOf("/") + 1);
				// console.log(dexNo);
			},
			getImageFromDexNumber(num) {
				return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`;
			},
		},
	};
</script>

<style>
	.error,
	.content {
		/* width: 90%; */
		margin: auto;
		/* margin-top: 54px; */
		padding: 24px 32px;
		max-width: 1300px;
	}

	.pokemon-row {
		display: flex;

		justify-content: space-between;
		/* align-items: center; */
	}

	.pokemon-col {
		display: flex;
		justify-content: flex-start;
		/* align-items: center; */
		flex-direction: column;
		margin-right: 50px;
		/* order: 2; */
	}
	.stats {
		/* max-width: 50%; */
	}

	.stats p {
		margin-bottom: 0;
	}

	.sprite-container {
		/* max-width: 50%; */
		/* margin: 40px; */

		border-radius: 16px;

		transition: all 0.3s ease-out;
		overflow: hidden;
		/* order: 1; */
	}
	.sprite-container:hover {
		box-shadow: 4px 4px 20px 8px rgba(128, 128, 128, 0.25);
	}

	.sprite,
	.evolution-chain-sprite {
		image-rendering: pixelated;
		image-rendering: -moz-crisp-edges;
		image-rendering: crisp-edges;
	}
	.sprite {
		position: relative;

		min-height: 400px;
		/* transform: scale(5); */
		max-height: 400px;
		/* height: 100%; */

		width: 100%;
		object-fit: contain;
		transition: transform 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6);
	}
	.sprite:hover {
		transform: scale(1.1);
	}

	.description {
		/* margin-top: 16px; */
		/* margin-right: 50px; */
		color: rgb(110, 110, 110);
		font-style: italic;
	}

	.evolution-chain-item-desc {
		color: #a0a0a0;
	}

	.type-container {
		display: flex;
	}

	h1 {
		color: #353535;
		font-size: 3rem;
		margin-top: 0px;
		margin-bottom: 16px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		/* text-align: center; */
	}

	.error h1 {
		color: #353535;
		font-size: 2.5rem;
		margin-top: 0px;
		margin-bottom: 16px;
		border-bottom: none;
	}

	h2,
	h3 {
		/* padding-bottom: 16px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2); */
		font-size: 1.4rem;
		color: #353535;
	}

	.dex-num {
		font-size: 1.5rem;
		color: rgb(163, 163, 163);
		/* background-color: #40e2ff; */
	}

	.evolution-chain {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		width: 75%;
		margin: auto;
		/* border-bottom: 1px solid rgba(0, 0, 0, 0.5); */
	}

	.evolution-chain-item {
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
		transition: transform 0.1s ease-out;
	}

	.evolution-chain-item:hover {
		transform: scale(1.1);
	}

	.adjacent-pokewmon-link-row {
		display: flex;
		justify-content: space-between;
	}

	.adjacent-pokewmon-link-row a {
		font-size: 1.2rem;
		text-decoration: none;
		display: flex;
		color: gray;
	}

	.adjacent-pokewmon-link-row a:hover {
		text-decoration: underline;
	}

	.unicon-container {
	}

	@media screen and (max-width: 900px) {
		.pokemon-row {
			flex-direction: column;
		}
		.pokemon-col {
			margin: 0;
			order: 2;
		}
		.sprite-container {
			order: 0;
		}
	}
</style>
