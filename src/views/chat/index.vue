<template>
  <div class="outBox">
    <div class="title">
      <el-input class="titleInput" v-model="sessionTitle" />
      <el-dropdown
          placement="bottom-start"
          trigger="click"
          class="modelDrop"
      >
        <el-button class="modelBtn" type="warning" round :icon="Tools" color="#eef3fd">模型</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changeModel(item)" v-for="item in modelList" :key="item.id" :disabled="item.enabled===0">
              {{item.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="contentBox">
      <div class="content">
        <div>aaaa</div>
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
        <div>11</div>
        <div>11</div>
        <div>11</div>
        <div>11</div>
        <div>11</div>
        <div>11</div>
        <div>11</div>
        <div>cccc</div>
      </div>
    </div>
    <div class="inputBox">
      <div class="inputArea">
        <el-input @input="inputChange" input-style="padding:20px;border-radius:20px;box-sizing:border-box;font-size:16px;box-shadow: rgba(191, 191, 193, 0.6) 5px 5px 30px;" placeholder="给Even发送消息" type="textarea" resize="none" v-model="text" :autosize="{ minRows: 2, maxRows: 3 }" />
        <el-button style="height: 50px;width: 50px;border-radius: 25px;margin-left: 15px" type="primary" round :icon="ArrowUpBold" color="#4363f5" :disabled="btnDisabled" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="index">
// 接收会话ID
import {useRoute} from "vue-router";
import {onUpdated, type Ref, ref, watch} from "vue";
import {useSessionStore} from "@/stores/sessionStore.ts";
import {storeToRefs} from "pinia";
import {getSessionByIdApi} from "@/api/sessionApi.ts";
import type {Model, Result, Session} from "@/data/model.ts";
import {ElMessage} from "element-plus";
import router from "@/router";
import {ArrowUpBold, Tools} from "@element-plus/icons-vue";
import {modelListApi} from "@/api/modelApi.ts";
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

let text = ref('');

let currentModel:Ref<Model|null> = ref(null);
let modelList:Ref<Model[]> = ref([]);
const getModelList = () => {
  modelListApi().then((res:Result) => {
    if (res.code === 200) {
      modelList.value = res.data;
      if (modelList.value.length > 0 && modelList.value[0]!==undefined) {
        modelList.value.forEach(item => {
          if (item.enabled===1) {
            currentModel.value = item;
            isBtnDisabled();
          }
        })
      }
      return;
    }
    ElMessage.error(res.message);
  })
}
getModelList();
// 切换模型
const changeModel = (model:Model) => {
  currentModel.value = model;
}

// 发送按钮是否禁用
let btnDisabled:Ref<boolean> = ref(true);
const isBtnDisabled = () => {
  if (currentModel===null || text.value.trim().length===0) {
    btnDisabled.value = true;
  }else {
    btnDisabled.value = false;
  }
}
const inputChange = () => {
  isBtnDisabled();
}

</script>

<style scoped>
.outBox {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 0;
  overflow-y: auto; /* 页面级滚动条 */
}

.title {
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.97);
  z-index: 999;
  box-sizing: border-box;
  padding: 0 10%; /* 使用内边距控制内容区域 */
}

.contentBox {
  width: 100%;
  min-height: calc(100vh - 180px); /* 视口高度减去标题和输入框高度 */
  box-sizing: border-box;
  padding: 0 10%; /* 与标题和输入框的内边距保持一致 */
}

.content {
  width: 100%;
  min-height: 100%;
  background-color: #e0e2e6;
  box-sizing: border-box;
  padding: 15px;
}

.inputBox {
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10%; /* 与标题和内容区域的内边距保持一致 */
}
.inputArea {
  display: flex;
  width: 100%;
  min-height: 100%;
  background-color: rgba(255, 255, 255, 0.97);
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
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

/* 自定义页面滚动条样式 */
.outBox::-webkit-scrollbar {
  width: 8px;
}

.outBox::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.outBox::-webkit-scrollbar-thumb {
  background: #a8a8a8;
  border-radius: 4px;
}

.outBox::-webkit-scrollbar-thumb:hover {
  background: #787fef;
}
.modelDrop {
  position: relative;
  left: 35%;
  width: 12%;
  height: 40px;
}
.modelBtn {
  height: 40px;
  width: 100%;
  transition: all 0.3s ease;
}
.modelBtn:hover {
  box-shadow: 0px 0px 30px 1px rgba(0,0,0,0.1);
}
</style>