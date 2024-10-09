<template>
  <div>
    <select v-model="selectedEntity">
      <option value="">Не выбрано</option>
      <option value="leads">Сделка</option>
      <option value="contacts">Контакт</option>
      <option value="companies">Компания</option>
    </select>
    <button :disabled="!selectedEntity" @click="createEntity">
      <span v-if="loading">🔄</span>
      {{ loading ? 'Создание...' : 'Создать' }}
    </button>

    <div v-if="result.length">
      <h3>Созданные сущности:</h3>
      <ul>
        <li v-for="entity in result" :key="entity.id">{{ entity.name }} (ID: {{ entity.id }})</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useStore } from '../stores/useStore';

export default defineComponent({
  setup() {
    const store = useStore();
    const selectedEntity = ref('');
    const loading = ref(false);
    const result = ref<{ id: number; name: string }[]>([]);

    const createEntity = async () => {
      loading.value = true;
      try {
        const response = await axios.post('http://localhost:3000/api/entity', {
          entityType: selectedEntity.value,
        });
        const entity = response.data;
        store.addEntity(entity);
        result.value.push(entity);
      } catch (error) {
        console.error('Ошибка при создании сущности:', error);
      } finally {
        loading.value = false;
      }
    };

    return {
      selectedEntity,
      loading,
      result,
      createEntity,
    };
  },
});
</script>

<style>
button:disabled {
  background-color: white;
  color: gray;
}
button {
  background-color: blue;
  color: white;
}
</style>
