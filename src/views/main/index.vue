<template>
  <el-container class="container">
    <el-aside class="aside">
      <div class="sidebar-header">
        <el-row class="logo-row">
          <el-col class="logo-container" :span="24">
            <el-image 
              src="https://image0219.oss-cn-hangzhou.aliyuncs.com/images/logo_1.png" 
              class="logo hvr-pulse-grow"
              fit="contain"
            />
          </el-col>
        </el-row>
        <el-row class="button-row">
          <el-col :span="24">
            <el-button type="primary" plain round icon="Plus" class="start-btn hvr-wobble-top">
              开启新对话
            </el-button>
          </el-col>
        </el-row>
      </div>
      
      <el-row class="history-row">
        <el-col :span="24">
          <div class="history-list">
            <div 
              v-for="item in chatHistory" 
              :key="item.id" 
              class="history-item"
              :class="{ active: item.id === activeChatId }"
              @click="selectChat(item)"
              @mouseenter="currentHover=item.id"
              @mouseleave="currentHover=null"
            >
              {{ item.title }}
              <transition name="el-fade-in-linear">
                <span v-show="currentHover===item.id" class="more">···</span>
              </transition>
            </div>
          </div>
        </el-col>
      </el-row>
      
      <div class="user-info">
        <el-row class="user-row">
          <el-col :span="6" class="avatar-col">
            <!--<el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />-->
            <el-avatar class="avatar" :size="40">{{user.username.substring(0,1)}}</el-avatar>
          </el-col>
          <el-col :span="18" class="info-col">
            <div class="user-name">{{user.username}}</div>
            <div class="user-email">{{user.email}}</div>
          </el-col>
        </el-row>
      </div>
    </el-aside>
    <el-main class="main">

    </el-main>
  </el-container>
</template>

<script setup lang="ts" name="main">
import {type Ref, ref} from 'vue'
import type {UserInfo} from "@/data/model.ts";
// 加载用户信息
let currentHover:Ref<number|null> = ref(null)
let user:UserInfo = JSON.parse(<string>localStorage.getItem("login_user"));

// 聊天历史数据
const chatHistory = ref([
  { id: 1, title: '对话 1' },
  { id: 2, title: '对话 2' },
  { id: 3, title: '对话 3' },
  { id: 4, title: '技术问题讨论' },
  { id: 5, title: '日常交流' },
  { id: 6, title: '项目规划讨论' },
  { id: 7, title: '学习心得分享' },
  { id: 8, title: '工作安排沟通' },
  { id: 9, title: '产品需求分析' },
  { id: 10, title: '设计方案评审' },
  { id: 10, title: '设计方案评审' },
  { id: 10, title: '设计方案评审' },
  { id: 10, title: '设计方案评审' },
  { id: 10, title: '设计方案评审' },
])

// 当前选中的聊天ID
const activeChatId = ref(1)

// 选择聊天
const selectChat = (chat: { id: number }) => {
  activeChatId.value = chat.id
}
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
}

.aside {
  width: 260px;
  background-color: #f9fafb;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  padding-top: 10px;
  background-color: #f9fafb;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.logo-row {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 60px;
  width: 60px;
}

.logo:hover {
  cursor: pointer;
}

.button-row {
  padding: 10px 20px 20px;
}

.start-btn {
  width: 100%;
  height: 40px;
}

.history-row {
  flex: 1;
  padding: 0 10px 20px 10px;
  overflow-y: auto;
}

.history-row::-webkit-scrollbar {
  width: 6px;
}

.history-row::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0);
  border-radius: 3px;
  transition: background-color 0.2s;
}

.history-row:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}

.history-row::-webkit-scrollbar-track {
  background-color: transparent;
}

.history-list {
  padding: 10px 0;
}

.history-item {
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 5px;
  font-size: 15px;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.2s ease;
}

.history-item:hover {
  background-color: #e5e7eb;
}

.history-item.active {
  background-color: #e0e7ff;
  color: #4f46e5;
  font-weight: 500;
}

.more {
  float: right;
  font-size: 14px;
  background-color: #e7eaea;
  border-radius: 5px;
  width: 35px;
  height: 21px;
  line-height: 21px;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
}
.more:hover {
  background-color: #d8d8d8;
}

.user-info {
  border-top: 1px solid #e5e7eb;
  padding: 15px 10px;
  background-color: #f9fafb;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.user-info:hover {
  background-color: #eeefef;
  cursor: pointer;
  .avatar {
    background-color: #d8d8d8 !important;
  }
}

.user-row {
  display: flex;
  align-items: center;
}

.avatar-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  background-color: #eff0f1;
  color: #000;
  font-size: 18px;
  font-weight: 800;
  transition: all 0.3s ease;
}

.info-col {
  padding-left: 10px;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 2px;
}

.user-email {
  font-size: 12px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.main {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
}
</style>