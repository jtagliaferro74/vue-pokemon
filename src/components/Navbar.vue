<template>
	<nav id="navbar">
		<div id="logo">
			<p>Pok&eacute;mon</p>
		</div>
		<div class="nav-item-container">
			<div id="random" class="nav-item" @click="randomize()">
				<span>Random</span>
				<div class="unicon-container">
					<unicon name="sync" fill="white" width="20" height="20"></unicon>
				</div>
			</div>
			<div id="searchbar">
				<input
					type="text"
					class="search"
					placeholder="Search Pok&eacute;mon..."
					v-on:keyup.enter="search"
					v-model="searchVal"
				/>
			</div>
		</div>
	</nav>
</template>

<script>
	export default {
		created() {
			this.$watch(
				() => this.$route.params,
				(toParams, previousParams) => {
					// toParams = "";
					// previousParams = "";
					console.log(toParams, previousParams);
					this.$router.go(0);
				}
			);
		},
		data() {
			return {
				searchVal: "",
			};
		},
		methods: {
			randomize() {
				// this.$emit("randomize");
				let ran = Math.floor(Math.random() * 898 + 1);
				this.$router.push(`/${ran}`);
			},
			search() {
				this.$router.push(`/${this.searchVal}`);
			},
		},
	};
</script>

<style scoped>
	#navbar {
		background-color: rgb(173, 6, 6);
		display: flex;
		justify-content: space-between;
		/* position: fixed; */
		/* top: -120px; */
		/* left: 0; */
		width: 100%;
		/* margin: auto; */
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
		z-index: 9;
		min-height: 52px;
		/* padding: 5px; */
	}

	#random {
		cursor: pointer;
	}
	.nav-item {
		display: flex;
		padding: 0px 20px;
		color: white;
		justify-content: center;
		align-items: center;
	}

	#searchbar {
		display: flex;
		padding: 0px 20px;
		color: white;
		justify-content: center;
		align-items: center;
		width: 40%;
	}
	.search {
		padding: 8px;
		border-radius: 4px;
		border: 1px solid rgb(156, 20, 20);
		width: 100%;
	}

	.nav-item:hover {
		background-color: rgb(197, 36, 36);
	}

	.nav-item-container {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.unicon-container {
		padding-top: 4px;
		padding-left: 4px;
	}

	#logo {
		color: white;
		padding: 0 32px;
		font-size: 1.05rem;
	}

	@media screen and (max-width: 768px) {
		#random {
			/* display: none; */
		}

		#logo {
			display: none;
		}
		#searchbar {
			width: 50%;
		}

		.nav-item-container {
			justify-content: space-between;
		}
	}
</style>
