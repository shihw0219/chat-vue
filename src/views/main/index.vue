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
              @click="toIndex"
            />
          </el-col>
        </el-row>
        <el-row class="button-row">
          <el-col :span="24">
            <el-button @click="toIndex" type="primary" plain round icon="Plus" class="start-btn hvr-wobble-top">
              开启新对话
            </el-button>
          </el-col>
        </el-row>
      </div>
      <el-row class="history-row">
        <el-col :span="24">
          <div class="history-list">
            <div 
              v-for="item in sessionHistory"
              :key="item.id" 
              class="history-item"
              :class="{ active: item.id === activeChatId,top:item.isTop===1 }"
              @click="selectChat(item)"
              @mouseenter="currentHover=item.id"
              @mouseleave="currentHover=null"
            >
              <span class="history-title">
                {{item.title}}
                <el-icon v-if="item.isTop===1" color="#4c88f4"><Flag /></el-icon>
              </span>
              <el-dropdown 
                placement="bottom-start"
                trigger="hover"
                style="width: 20%;"
              >
                <transition name="el-fade-in-linear">
                  <el-button size="small" v-if="currentHover===item.id || activeChatId===item.id" class="more">···</el-button>
                </transition>
                <template #dropdown>
                  <el-dropdown-menu  @mouseenter="currentHover=item.id" @mouseleave="currentHover=null">
                    <el-dropdown-item>
                      <el-icon :size="18" color="#606266">
                        <EditPen />
                      </el-icon>
                      重命名
                    </el-dropdown-item>
                    <el-dropdown-item v-if="item.isTop === 0">
                      <el-icon :size="18" color="#606266">
                        <Upload />
                      </el-icon>
                      置顶
                    </el-dropdown-item>
                    <el-dropdown-item v-else>
                      <el-icon :size="18" color="#606266">
                        <Download />
                      </el-icon>
                      取消置顶
                    </el-dropdown-item>

                    <el-dropdown-item>
                      <el-icon :size="18" color="#e55765">
                        <Delete/>
                      </el-icon>
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-dropdown
          placement="bottom-start"
          trigger="click"
      >
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
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon :size="18" color="#606266">
                <User />
              </el-icon>
              个人信息
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon :size="18" color="#606266">
                <Edit />
              </el-icon>
              修改密码
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon :size="18" color="#e55765">
                <SwitchButton />
              </el-icon>
              <span style="color: #ec5445">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-aside>

    <el-main class="main">
      <!--<router-view class="animate__animated animate__headShake"/>-->
      <router-view/>

    </el-main>
  </el-container>
</template>

<script setup lang="ts" name="main">
import {type Ref, ref} from 'vue'
import type {Result, Session, UserInfo} from "@/data/model.ts";
import {Edit} from '@element-plus/icons-vue'
import router from "@/router";
import {sessionListApi} from "@/api/sessionApi.ts";
import {ElMessage} from "element-plus";

// 加载用户信息
let currentHover:Ref<string|null> = ref(null)
let user:UserInfo = JSON.parse(<string>localStorage.getItem("login_user"));


// 获取聊天列表
const sessionHistory:Ref<Session[]> = ref([])
const getSessionList = () => {
  sessionListApi().then((res:Result) => {
    if (res.code !== 200) {
      ElMessage({
        message: res.message,
        type: 'error',
      })
      return;
    }
    sessionHistory.value = res.data;
  })
}
getSessionList();


// 当前选中的聊天ID
const activeChatId = ref("")

// 选择聊天
const selectChat = (chat: { id: string }) => {
  activeChatId.value = chat.id;
  router.push(`/main/chat/${chat.id}`);
  // router.push(
  //     {
  //       name: 'chat',
  //       params: {
  //         id: chat.id,
  //       },
  //     }
  // );
}


const toIndex = () => {
  router.push('/');
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
  width: 0px;
  background: transparent;
}

.history-row::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0);
  border-radius: 0px;
}

.history-row::-webkit-scrollbar-track {
  background-color: transparent;
}

.top {
  background-color: #edeff1;
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
  transition: all 0.2s ease;
  position: relative;
}

.history-title {
  width:80%;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  font-size: 18px;
  font-weight: 600;
  background-color: #e7eaea;
  border-radius: 5px;
  text-align: center;
  transition: all 0.3s ease;
  display: inline-block;
  border: 0px;
  outline: none;
  box-shadow: none;
}

.more:hover, .more:focus {
  color: #1f2937;
  background-color: #d8d8d8;
  border: 0px;
  outline: none;
  box-shadow: none;
}

.user-info {
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #e5e7eb;
  padding: 15px 10px;
  background-color: #f9fafb;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.user-info:hover {
  background-color: #eeefef;
  border-top: 1px solid #e5e7eb;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  .avatar {
    background-color: #d8d8d8 !important;
  }
}

.user-info:focus {
  border-top: 1px solid #e5e7eb;
  outline: none;
  box-shadow: none;
  cursor: pointer;
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
  overflow: hidden;
}
</style>