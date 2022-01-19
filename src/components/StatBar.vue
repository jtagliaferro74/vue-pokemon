<template>
	<div class="stat">
		<p class="stat-name">{{ formattedLabel }}</p>
		<k-progress-v3
			:line-height="12"
			:format="formatStat"
			:percent="getStatPercentage(stat)"
			:color="getStatColor(stat)"
		></k-progress-v3>
	</div>
</template>

<script>
	export default {
		computed: {
			formattedLabel: function () {
				let formattedLabel = this.label;
				switch (this.label) {
					case "hp":
						formattedLabel = "HP";
						break;
					case "attack":
						formattedLabel = "Attack";
						break;
					case "defense":
						formattedLabel = "Defense";
						break;
					case "special-attack":
						formattedLabel = "Sp. Atk";
						break;
					case "special-defense":
						formattedLabel = "Sp. Def";
						break;
					case "speed":
						formattedLabel = "Speed";
						break;

					default:
						break;
				}
				return formattedLabel;
			},
		},
		props: {
			label: String,
			stat: Number,
		},
		methods: {
			getStatPercentage(stat) {
				// console.log(val);
				let percentVal = (stat / 255.0) * 100;
				// console.log(percentVal);

				return percentVal;
			},
			formatStat(stat) {
				return Math.round((stat / 100) * 255).toString();
			},
			getStatColor(val) {
				let color = "#f34444";
				if (val <= 30) {
					color = "#f34444";
				} else if (val <= 60) {
					color = "#ff7f0f";
				} else if (val <= 89) {
					color = "#ffdd57";
				} else if (val <= 119) {
					color = "#23cd5e";
				} else if (val <= 149) {
					color = "#00c2b8";
				} else {
					// color = "#409eff";
					color = "#40e2ff";
				}
				return color;
			},
		},
	};
</script>

<style>
	.k-progress-text {
		font-size: 16px;
		/* margin-right: 100px; */
		padding-left: 20px;
		/* color: blue; */
	}
	.stat-name {
		font-size: 16px;
		color: #606266;
	}
</style>
