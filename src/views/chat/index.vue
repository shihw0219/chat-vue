<template>
  <div class="outBox">
    {{sessionId}}
  </div>
</template>

<script setup lang="ts" name="index">
// 接收会话ID
import {useRoute} from "vue-router";
import {onUpdated, type Ref, ref} from "vue";
import {useSessionStore} from "@/stores/sessionStore.ts";
import {storeToRefs} from "pinia";
// 获取会话ID
const sessionStore = storeToRefs(useSessionStore());
let sessionId:Ref<string> = sessionStore.currentSessionId;

onUpdated(()=> {
  sessionId = sessionStore.currentSessionId;
})
</script>

<style scoped>
.outBox {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  padding: 0;
  margin: 0;
}
</style>
