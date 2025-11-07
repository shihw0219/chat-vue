<template>
  <div class="outBox">
    <div class="title">
      <!--<el-text>{{sessionInfo?.title}}</el-text>-->
      <el-input class="titleInput" v-model="sessionTitle" />
    </div>
    <div class="contentBox">
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
      <div>11</div>
    </div>
    <div class="inputBox"> 输入操作 </div>
  </div>
</template>

<script setup lang="ts" name="index">
// 接收会话ID
import {useRoute} from "vue-router";
import {onUpdated, type Ref, ref, watch} from "vue";
import {useSessionStore} from "@/stores/sessionStore.ts";
import {storeToRefs} from "pinia";
import {getSessionByIdApi} from "@/api/sessionApi.ts";
import type {Result, Session} from "@/data/model.ts";
import {ElMessage} from "element-plus";
import router from "@/router";
const route = useRoute();
const sessionStore = useSessionStore();
// 获取会话ID
let sessionId:Ref<string> = ref(route.params.id) as Ref<string>;
sessionStore.currentSessionId = sessionId.value;
watch(route, (to, from) => {
  sessionId.value = to.params.id as string;
  getSessionInfoById();
})

// 获取会话标题
let sessionTitle:Ref<string> = ref('');
const getSessionInfoById = () => {
  getSessionByIdApi(sessionId.value).then((res:Result) => {
    if (res.code === 200) {
      sessionTitle.value = res.data.title;
      return;
    }
    ElMessage.error(res.message);
  })
}
getSessionInfoById();

</script>

<style scoped>
.outBox {
  position: relative;
  width: 60%;
  left: 20%;
  height: 100%;
  padding: 0;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top:0;
  width: 100%;
  height: 5%;
  background-color: #ffffff;
}
.titleInput {
  display: flex;
  width: 15%;
  text-align: center;
  border-radius: 30px;
  transition: box-shadow 0.3s ease;

}
.titleInput:hover {
  border: 1px solid #c7cccc !important;
  box-shadow: 0px 0px 30px 1px rgba(0,0,0,0.1);
}
.titleInput:focus-within {
  border: 1px solid #787fef !important;
}
:deep(.titleInput .el-input__inner) {
  text-align: center;
}
:deep(.titleInput .el-input__wrapper) {
  box-shadow: none !important;
  background: transparent !important;
}

.contentBox {

}
.inputBox {
  display: flex;
  position: absolute;
  bottom:0;
  width: 100%;
  height: 5%;
  background-color: #e6e6ea;
  justify-content: center;
  align-items: center;
}
</style>
