<template>
  <div class="outBox" ref="scrollDiv">
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
        <div v-for="(item,index) in messageList" :key="index"  class="messageWrapper" :class="item.type===0?'robotWrapper':'personWrapper'">
          <div class="messageContentBox" v-if="item.content!==''">{{item.content}}</div>
          <div class="messageTime" v-if="item.content!==''">{{item.createTime}}</div>
        </div>
        <el-alert v-show="alertShow" :class="alertClass" title="正在思考..." :closable="false" type="warning" center show-icon />
      </div>
    </div>
    <div class="inputBox">
      <div class="inputArea">
        <el-input @keydown="handleKeyDown" v-model:value="text" :disabled="inputDisabled" input-style="padding:20px;border-radius:20px;box-sizing:border-box;font-size:16px;box-shadow: rgba(191, 191, 193, 0.6) 5px 5px 30px;" placeholder="给Even发送消息" type="textarea" resize="none" v-model="text" :autosize="{ minRows: 2, maxRows: 3 }" />
        <el-button @click="sendMessage" style="height: 50px;width: 50px;border-radius: 25px;margin-left: 15px" type="primary" round :icon="ArrowUpBold" color="#4363f5" :disabled="btnDisabled" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="index">
// 接收会话ID
import {useRoute} from "vue-router";
import {type Ref, ref, watch, nextTick, onMounted, watchEffect} from "vue";
import {useSessionStore} from "@/stores/sessionStore.ts";
import {getSessionByIdApi} from "@/api/sessionApi.ts";
import type {Message, Model, Result, UserInfo} from "@/data/model.ts";
import {ElMessage} from "element-plus";
import {ArrowUpBold, Tools} from "@element-plus/icons-vue";
import {getModelByIdApi, modelListApi} from "@/api/modelApi.ts";
import {getMessageBySessionIdApi, insertMessageApi} from "@/api/messageApi.ts";
import type {MessageRequest} from "@/data/requestModel.ts";
import {SSE} from "sse.js";
import router from "@/router";
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
  getMessageList();
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
  // isBtnDisabled();
}
// 根据模型ID查询模型信息
const getModelById = (modelId:string) => {
  getModelByIdApi(modelId).then((res:Result) => {
    if (res.code === 200) {
      currentModel.value = res.data;
      // isBtnDisabled();
      return;
    }
    ElMessage.error(res.message);
  })
}

// 获取聊天信息列表
let messageList:Ref<Message[]> = ref([]);
const getMessageList =  async (loading:boolean = true) => {
  await getMessageBySessionIdApi(sessionId.value,loading).then((res:Result) => {
    if (res.code === 200) {
      messageList.value = res.data;
      scrollToBottom();
      return;
    }
    ElMessage.error(res.message);
  })
}
getMessageList();

// 输入框内容
let text = ref('');
// 是否正在回答
let isAnswering = ref(false);
// 发送按钮是否禁用
let btnDisabled:Ref<boolean> = ref(true);
const isBtnDisabled = () => {
  if (currentModel.value===null || text.value.trim().length===0 || isAnswering.value) {
    btnDisabled.value = true;
  }else {
    btnDisabled.value = false;
  }
}
watchEffect(() => {
  isBtnDisabled();
});

let alertClass = ref('animate__animated animate__fadeInDown');
// 输入框是否禁用
let inputDisabled = ref(false);
// 正在思考是否显示
let alertShow = ref(false);

// 发送消息
const sendMessage = async () => {
  const params:MessageRequest = {
    sessionId:sessionId.value,
    content:text.value,
    modelId:currentModel.value?.id
  }

  inputDisabled.value = true;
  isAnswering.value = true;
  const res: Result = await insertMessageApi(params);
  if (res.code !== 200){
    ElMessage.error(res.message);
    inputDisabled.value = false;
    isAnswering.value = false;
    return;
  }
  await getMessageList();
  const now = new Date();
  const format = now.getFullYear()+'-'+(parseInt(String(now.getMonth()))+1)+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()
  text.value = "";
  messageList.value.push({
    content:'',
    tokens:0,
    deleted:0,
    sessionId:sessionId.value,
    createTime:format,
    type:0
  });
  alertClass.value = 'animate__animated animate__fadeInDown';
  alertShow.value = true;
  scrollToBottom()
  inputDisabled.value = false;

  const eventSource = new SSE(import.meta.env.VITE_APP_BASE_URL + "/message/chat", {
    withCredentials:true,
    start:false,
    headers : {'Content-Type':'application/json;charset=UTF-8','Authorization':'Bearer '+localStorage.getItem("token") as string},
    payload: JSON.stringify(params),
    method: 'POST'
  })
  let first = 0;
  eventSource.addEventListener('message', (event:any) => {
    if (event.data.startsWith('服务器异常')||event.data.startsWith('请求超时')){
      ElMessage.error(event.data);
      eventSource.close();
      alertClass.value = 'animate__animated animate__fadeOutDown';
      alertShow.value = false;
      isAnswering.value = false;
      getMessageList(false);
      return;
    }
    if (first === 0){
      first = 1;
      alertClass.value = 'animate__animated animate__fadeOutDown';
      alertShow.value = false;
      scrollToBottom();
    }
    const data = event.data
    if (data === '[DONE]') {
      eventSource.close();
      isAnswering.value = false;
      getMessageList(false);
      return;
    }
    messageList.value[messageList.value.length-1]!.content = messageList.value[messageList.value.length-1]!.content + data;
    const nowR = new Date();
    const formatR = nowR.getFullYear()+'-'+(parseInt(String(nowR.getMonth()))+1)+'-'+nowR.getDate()+' '+nowR.getHours()+':'+nowR.getMinutes()+':'+nowR.getSeconds()
    messageList.value[messageList.value.length-1]!.createTime = formatR;
    checkAndScroll();
  })
  eventSource.addEventListener('error', (event:any) => {
    const tokenErrorCode:number[] = [401,1003,1004,1005,1006,1007,1008];
    let response = JSON.parse(event.data);
    if (response.code in tokenErrorCode) {
      ElMessage.error(response.message);
      localStorage.removeItem("login_user");
      localStorage.removeItem("token");
      eventSource.close();
      isAnswering.value = false;
      router.push("/login");
      alertClass.value = 'animate__animated animate__fadeOutDown';
      alertShow.value = false;
      return;
    }
    // 刷新Token
    if (response['Fresh-Token']!==undefined) {
      localStorage.setItem("token", response['Fresh-Token']);
      let loginUser:UserInfo = JSON.parse(<string>localStorage.getItem("login_user"));
      loginUser.token = response['Fresh-Token'];
      localStorage.setItem("login_user", JSON.stringify(loginUser));
    }
    ElMessage.error(event.data);
    eventSource.close();
    isAnswering.value = false;
    alertClass.value = 'animate__animated animate__fadeOutDown';
    alertShow.value = false;
    getMessageList(false);
  })
  eventSource.stream();
}

const checkAndScroll = () => {
  // 获取滚动容器（可能是窗口或特定元素）
  const container = scrollDiv.value || document.documentElement;
  const scrollTop = container === document.documentElement ? window.pageYOffset : container.scrollTop;
  const clientHeight = container === document.documentElement ? window.innerHeight : container.clientHeight;
  const scrollHeight = container.scrollHeight;

  const threshold = 50; // 距离底部50像素内就自动滚动
  console.log(scrollHeight - (scrollTop + clientHeight))
  if (scrollHeight - (scrollTop + clientHeight) <= threshold) {
    scrollToBottom();
  }
};

// 处理按键按下事件
const handleKeyDown = (event:any) => {
  if (event.key === 'Enter' && event.shiftKey) {
    return
  }
  // 单独按 Enter 键
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

// 页面滚动到底部
const scrollDiv:any = ref(null)
const scrollToBottom = () => {
  nextTick(() => {
    if (scrollDiv) {
      scrollDiv.value.scrollTo({
        top: scrollDiv.value.scrollHeight,
        behavior: 'smooth'
      });
    }
  });
};

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

.messageWrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.robotWrapper {
  align-items: flex-start;
}

.robotWrapper .messageContentBox {
  width: auto;
  max-width: 55%;
  background-color: bisque;
  word-break: break-word;
  padding: 10px 15px 10px 15px;
  border-radius: 10px;
  box-sizing: border-box;
}

.robotWrapper .messageTime {
  font-size: 12px;
  color: #666;
  text-align: left;
  margin-top: 5px;
  margin-left: 5px;
}

.personWrapper {
  align-items: flex-end;
}

.personWrapper .messageContentBox {
  width: auto;
  max-width: 55%;
  background-color: #4363f5;
  color: white;
  word-break: break-word;
  padding: 10px 15px 10px 15px;
  border-radius: 10px;
  box-sizing: border-box;
}

.personWrapper .messageTime {
  font-size: 12px;
  color: #666;
  text-align: right;
  margin-top: 5px;
  margin-right: 5px;
}
</style>