import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import KProgress from "k-progress";
import KProgress3 from "k-progress-v3";
import Unicon from "vue-unicons";
import { uniAngleLeftB, uniAngleRightB, uniSync } from "vue-unicons/dist/icons";

Unicon.add([uniAngleLeftB, uniAngleRightB, uniSync]);

createApp(App)
	.component("k-progress", KProgress)
	.component("k-progress-v3", KProgress3)
	.use(router)
	.use(Unicon)
	.mount("#app");
