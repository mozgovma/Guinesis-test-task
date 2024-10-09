import { createApp } from 'vue'
import { createPinia } from 'pinia'  // Импортируем Pinia
import './style.css'
import App from './App.vue'

const pinia = createPinia()  // Создаём экземпляр Pinia

createApp(App).use(pinia).mount('#app')