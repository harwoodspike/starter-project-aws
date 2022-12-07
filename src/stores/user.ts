import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const user = ref('')

    const setUser = (newUser: any) => {
        user.value = newUser
    }

    return {
        user,
        setUser
    }
})