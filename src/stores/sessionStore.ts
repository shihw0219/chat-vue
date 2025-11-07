import { defineStore } from "pinia";
import type {Session} from "@/data/model.ts";

interface SessionState {
    currentSessionId: string;
}

export const useSessionStore = defineStore('session', {
    state: (): SessionState => ({
        currentSessionId: ''
    }),
    persist: {
        storage: sessionStorage
    }
});