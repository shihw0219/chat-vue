<template>
  <div class="outBox">
    <div class="title">
      <el-dropdown
          placement="bottom-start"
          trigger="click"
          class="modelDrop"
      >
        <el-button class="modelBtn" type="warning" round :icon="Tools" color="#eef3fd">{{currentModel===null?'请选择模型':currentModel.name}}</el-button>
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
        <div v-for="item in messageList" :key="item.id" :class="item.type===0?'robotBox':'personBox'">
          <div class="messageContent">{{item.content}}</div>
          <div class="messageTime">{{item.createTime}}</div>
        </div>
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
import {type Ref, ref, watch, nextTick, onMounted} from "vue";
import {useSessionStore} from "@/stores/sessionStore.ts";
import {getSessionByIdApi} from "@/api/sessionApi.ts";
import type {Message, Model, Result} from "@/data/model.ts";
import {ElMessage} from "element-plus";
import {ArrowUpBold, Tools} from "@element-plus/icons-vue";
import {getModelByIdApi, modelListApi} from "@/api/modelApi.ts";
const route = useRoute();
const sessionStore = useSessionStore();

// 获取会话ID
let sessionId:Ref<string> = ref(route.params.id) as Ref<string>;
sessionStore.currentSessionId = sessionId.value;
watch(route, (to, from) => {
  sessionId.value = to.params.id as string;
  getSessionInfoById();
  getModelList();
  text.value = '';
  scrollToBottom();
})

// 获取会话当前模型
const getSessionInfoById = () => {
  getSessionByIdApi(sessionId.value).then((res:Result) => {
    if (res.code === 200) {
      getModelById(res.data.currentModelId);
      return;
    }
    ElMessage.error(res.message);
  })
}
getSessionInfoById();

// 获取模型列表
let modelList:Ref<Model[]> = ref([]);
const getModelList = () => {
  modelListApi().then((res:Result) => {
    if (res.code === 200) {
      modelList.value = res.data;
      return;
    }
    ElMessage.error(res.message);
  })
}
getModelList();

// 模型切换
let currentModel:Ref<Model|null> = ref(null);
const changeModel = (model:Model) => {
  currentModel.value = model;
  isBtnDisabled();
}
// 根据模型ID查询模型信息
const getModelById = (modelId:string) => {
  getModelByIdApi(modelId).then((res:Result) => {
    if (res.code === 200) {
      currentModel.value = res.data;
      isBtnDisabled();
      return;
    }
    ElMessage.error(res.message);
  })
}

// 发送按钮是否禁用
let btnDisabled:Ref<boolean> = ref(true);
const isBtnDisabled = () => {
  if (currentModel.value===null || text.value.trim().length===0) {
    btnDisabled.value = true;
  }else {
    btnDisabled.value = false;
  }
}
const inputChange = () => {
  isBtnDisabled();
}

// 获取聊天信息列表
let messageList:Ref<Message[]> = ref([
    {
      id: '1',
      content: '你好，我需要你的帮助',
      inputTokens: 0,
      outputTokens: 0,
      deleted: 0,
      sessionId: '1f5e1w651e',
      createTime: '2023-07-01 10:00:00',
      updateTime: '2023-07-01 10:00:00',
      type: 1
    },
    {
      id: '2',
      content: '请输入您的疑问',
      inputTokens: 0,
      outputTokens: 0,
      deleted: 0,
      sessionId: '1f5e1w651e',
      createTime: '2023-07-01 10:00:00',
      updateTime: '2023-07-01 10:00:00',
      type: 0
    },
    {
      id: '3',
      content: '今天的天气怎么样',
      inputTokens: 0,
      outputTokens: 0,
      deleted: 0,
      sessionId: '1f5e1w651e',
      createTime: '2023-07-01 10:00:00',
      updateTime: '2023-07-01 10:00:00',
      type: 1
    },
    {
      id: '4',
      content: '今天是星期五，天气晴朗，适合出去玩',
      inputTokens: 0,
      outputTokens: 0,
      deleted: 0,
      sessionId: '1f5e1w651e',
      createTime: '2023-07-01 10:00:00',
      updateTime: '2023-07-01 10:00:00',
      type: 0
    },
    {
      id: '5',
      content: '今天的天气怎么样',
      inputTokens: 0,
      outputTokens: 0,
      deleted: 0,
      sessionId: '1f5e1w651e',
      createTime: '2023-07-01 10:00:00',
      updateTime: '2023-07-01 10:00:00',
      type: 1
    },
    {
      id: '6',
      content: '今天是星期五，天气晴朗，适合出去玩',
      inputTokens: 0,
      outputTokens: 0,
      deleted: 0,
      sessionId: '1f5e1w651e',
      createTime: '2023-07-01 10:00:00',
      updateTime: '2023-07-01 10:00:00',
      type: 0
    },
    {
      id: '7',
      content: '今天的天气怎么样',
      inputTokens: 0,
      outputTokens: 0,
      deleted: 0,
      sessionId: '1f5e1w651e',
      createTime: '2023-07-01 10:00:00',
      updateTime: '2023-07-01 10:00:00',
      type: 1
    },
    {
      id: '8',
      content: '今天是星期五，天气晴朗，适合出去玩',
      inputTokens: 0,
      outputTokens: 0,
      deleted: 0,
      sessionId: '1f5e1w651e',
      createTime: '2023-07-01 10:00:00',
      updateTime: '2023-07-01 10:00:00',
      type: 0
    },
    {
      id: '9',
      content: '今天的天气怎么样',
      inputTokens: 0,
      outputTokens: 0,
      deleted: 0,
      sessionId: '1f5e1w651e',
      createTime: '2023-07-01 10:00:00',
      updateTime: '2023-07-01 10:00:00',
      type: 1
    },
    {
      id: '10',
      content: '今天是星期五，天气晴朗，适合出去玩',
      inputTokens: 0,
      outputTokens: 0,
      deleted: 0,
      sessionId: '1f5e1w651e',
      createTime: '2023-07-01 10:00:00',
      updateTime: '2023-07-01 10:00:00',
      type: 0
    }
]);

// 输入框内容
let text = ref('');

// 页面滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    const outBox = document.querySelector('.outBox');
    if (outBox) {
      outBox.scrollTo({
        top: outBox.scrollHeight,
        // behavior: 'smooth'
      });
    }
  });
};
onMounted(() => {
  scrollToBottom();
});

</script>

<style scoped>
.outBox {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 0;
  overflow-y: auto;
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
  width: auto;
  height: 40px;
}
.modelBtn {
  height: 40px;
  width: auto;
  margin: 0 auto;
  transition: all 0.3s ease;
}
.modelBtn:hover {
  box-shadow: 0px 0px 30px 1px rgba(0,0,0,0.1);
}
.content {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  flex-direction: column;
}
.robotBox {
  display: flex;
  flex-direction: column;
  width: auto;
  max-width: 50%;
  background-color: bisque;
  word-break: break-word;
  padding: 10px 15px 10px 15px;
  border-radius: 10px;
  box-sizing: border-box;
  align-self: flex-start;
  margin-bottom: 10px;
}
.robotBox .messageContent {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 5px;
}
.robotBox .messageTime {
  font-size: 12px;
  color: #666;
  text-align: left;
}

.personBox {
  display: flex;
  flex-direction: column;
  width: auto;
  max-width: 50%;
  background-color: #4363f5;
  color: white;
  word-break: break-word;
  padding: 10px 15px 10px 15px;
  border-radius: 10px;
  box-sizing: border-box;
  margin-left: auto;
  align-self: flex-end;
  margin-bottom: 10px;
}
.personBox .messageContent {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 5px;
}
.personBox .messageTime {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-align: right;
}
</style>