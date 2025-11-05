<template>
  <div class="outDiv">
    <div class="mainDiv">
      <div class="titleBox">
        <el-image style="width: 50px; " src="https://image0219.oss-cn-hangzhou.aliyuncs.com/images/logo_1.png" fit="fill" />
        <h2>我们一起来探索奥秘吧？</h2>
      </div>
      <div class="inputBox">
        <el-input input-style="padding:20px;border-radius:20px;box-sizing:border-box;font-size:16px;box-shadow: rgba(191, 191, 193, 0.6) 5px 5px 30px;" placeholder="给Even发送消息" type="textarea" resize="none" v-model="text" :autosize="{ minRows: 3, maxRows: 6 }" />
      </div>
      <div class="btnBox">
        <el-tag size="large" class="tag">deepseek r1</el-tag>
        <el-dropdown
            placement="bottom-start"
            trigger="click"
            class="modelDrop"
        >
          <el-button class="modelBtn" type="warning" round :icon="Tools" color="#eef3fd">模型</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in modelList" :key="item.id" :disabled="item.enabled===0">
                {{item.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button class="sendBtn" type="primary" round :icon="ArrowUpBold" color="#4363f5">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="index">
import {ref} from "vue";
import {ArrowUpBold, Edit, Tools} from "@element-plus/icons-vue";

let text = ref('');

let modelList = ref([
  {
    id: 'jifoew',
    name: 'gpt-3.5-turbo',
    modelId: 'gpt-3.5-turbo',
    enabled: 1
  },
  {
    id: '6f156we',
    name: 'gpt-4',
    modelId: 'gpt-4',
    enabled: 0
  },
  {
    id: '51f5e165',
    name: 'gpt-4',
    modelId: 'gpt-4',
    enabled: 0
  },
  {
    id: '1gre65g1e5',
    name: 'gpt-4',
    modelId: 'gpt-4',
    enabled: 1
  }
]);

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
