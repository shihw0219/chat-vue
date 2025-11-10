<template>
  <div class="outDiv">
    <div class="mainDiv">
      <div class="titleBox">
        <el-image style="width: 50px; " src="https://image0219.oss-cn-hangzhou.aliyuncs.com/images/logo_1.png" fit="fill" />
        <h2>我们一起来探索奥秘吧？</h2>
      </div>
      <div class="inputBox">
        <el-input @keydown="handleKeyDown" :disabled="inputDisabled" input-style="padding:20px;border-radius:20px;box-sizing:border-box;font-size:16px;box-shadow: rgba(191, 191, 193, 0.6) 5px 5px 30px;" placeholder="给Even发送消息" type="textarea" resize="none" v-model="text" :autosize="{ minRows: 3, maxRows: 6 }" />
      </div>
      <div class="btnBox">
        <el-tag size="large" v-if="currentModel!==null" class="tag">{{currentModel.name}}</el-tag>
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
        <el-button class="sendBtn" @click="send" type="primary" round :icon="ArrowUpBold" color="#4363f5" :disabled="btnDisabled">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="index">
import {inject, nextTick, type Ref, ref, watch, watchEffect} from "vue";
import {ArrowUpBold, Edit, Tools} from "@element-plus/icons-vue";
import {modelListApi} from "@/api/modelApi.ts";
import type {Model, Result} from "@/data/model.ts";
import {ElMessage} from "element-plus";
import {useSessionStore} from "@/stores/sessionStore.ts";
import router from "@/router";
import {createSessionApi} from "@/api/sessionApi.ts";
const getSessionList = inject('getSessionList') as (loading: boolean) => void
// 删除当前选中会话
const sessionStore = useSessionStore();
sessionStore.currentSessionId = '';
// 模型列表
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
  if (currentModel===null || text.value.trim().length===0 || isAnswering.value) {
    btnDisabled.value = true;
  }else {
    btnDisabled.value = false;
  }
}

let text = ref('');
watchEffect(() => {
  isBtnDisabled();
});
let inputDisabled = ref(false);
let isAnswering = ref(false);

// 发送按钮点击
const send = async () => {
  inputDisabled.value = true;
  isAnswering.value = true;
  try {
    console.log(currentModel.value!.id)
    const result: Result = await createSessionApi(currentModel.value!.id);
    if (result.code === 200) {
      await getSessionList(false);
      inputDisabled.value = false;
      sessionStore.currentContent = text.value;
      text.value = '';
      isAnswering.value = false;
      await nextTick();
      router.push({
        path: `/main/chat/${result.data}`
      });
    }else {
      inputDisabled.value = false;
      isAnswering.value = false;
      ElMessage.error(result.message);
    }
  } catch (e:any) {
    inputDisabled.value = false;
    isAnswering.value = false;
  }
}

// 处理按键按下事件
const handleKeyDown = (event:any) => {
  if (event.key === 'Enter' && event.shiftKey) {
    return
  }
  // 单独按 Enter 键
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    send();
  }
}

</script>

<style scoped>
.outDiv {
  width: 100%;
  height: 100%;
}
.mainDiv {
  width: 66%;
  height: 40%;
  margin-left: 17%;
  margin-top: 15%;
}
.titleBox {
  display: flex;
  max-height: 20%;
  justify-content: center;
  align-items: center;
}
.inputBox {
  display: flex;
  max-height: 72%;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
}
.btnBox {
  display: flex;
  justify-content: right;
  align-items: center;
  box-sizing: border-box;
  margin-top: 2%;
  min-height: 18%;
  max-height: 18%;
  width: 100%;
}
.sendBtn {
  height: 40px;
  width: 12%
}
.modelDrop {
  height: 40px;
  width: 12%;
  margin-right: 2%;
}
.modelBtn {
  height: 40px;
  width: 100%;
}
.tag {
  margin-right: 2%;
  font-size: 16px;
  padding: 5px;
}
</style>
