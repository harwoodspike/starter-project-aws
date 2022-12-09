import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// @ts-ignore
import config from '@/aws-exports.js';
import { Amplify } from "aws-amplify";

const pinia = createPinia()
Amplify.configure(config)

createApp(App)
    .use(pinia)
    .mount('#app')
