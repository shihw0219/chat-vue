<template>
  <div class="outBox">
    {{sessionId}}
  </div>
</template>

<script setup lang="ts" name="index">
// 接收会话ID
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute();
const sessionId = route.params.id;
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
