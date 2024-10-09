import { defineStore } from "pinia";

export const useStore = defineStore ('main',{
    state: ()=>({
        entities: [] as Array<{ id: number; name: string }>,
    }),
    actions: {
        addEntity(entity: { id: number; name: string }) {
            this.entities.push(entity);
          },
    }
}
)