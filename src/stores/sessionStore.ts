import { defineStore } from "pinia";
import type {Session} from "@/data/model.ts";

interface SessionState {
    currentSessionId: string;
    currentContent: string;
}

export const useSessionStore = defineStore('session', {
    state: (): SessionState => ({
        currentSessionId: '',
        currentContent: ''
    }),
    persist: {
        storage: sessionStorage
    }
});