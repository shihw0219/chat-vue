<template>
  <div class="reset-password-container">
    <div class="reset-password-card">
      <div class="reset-password-header">
        <el-image
            src="https://image0219.oss-cn-hangzhou.aliyuncs.com/images/logo_1.png"
            class="logo"
        />
        <h2>重置密码</h2>
      </div>

      <form class="reset-password-form" @submit.prevent="handleResetPassword">
        <div class="input-group">
          <input
              v-model="resetForm.username"
              type="text"
              placeholder=" "
              required
              maxlength="30"
          />
          <label>用户名</label>
        </div>

        <div class="input-group">
          <input
              v-model="resetForm.password"
              type="password"
              placeholder=" "
              required
              maxlength="40"
          />
          <label>新密码</label>
        </div>

        <div class="input-group">
          <input
              v-model="resetForm.confirmPassword"
              type="password"
              placeholder=" "
              required
              maxlength="40"
          />
          <label>确认密码</label>
        </div>

        <div class="input-group captcha-group">
          <input
              v-model="resetForm.code"
              type="text"
              placeholder=" "
              required
          />
          <label>邮箱验证码</label>
          <el-button
              type="primary"
              plain
              class="captcha-button"
              :disabled="isCountingDown"
              @click="getEmailCode"
          >
            {{ isCountingDown ? `${countDown}s` : '获取' }}
          </el-button>
        </div>

        <button
            class="reset-button"
            type="submit"
            :disabled="loading"
        >
          {{ loading ? '重置中...' : '重置密码' }}
        </button>
      </form>

      <div class="login-link">
        <p><el-text class="resetText" @click="toLogin">返回登录</el-text></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="reset">
import {ref, reactive, onBeforeUnmount} from 'vue'
import router from "@/router";
import {ElMessage} from "element-plus";
import {sendResetPasswordCodeApi} from "@/api/mailApi.ts";
import type {Result} from "@/data/model.ts";
import type {UserRest} from "@/data/requestModel.ts";
import {resetPasswordApi} from "@/api/userApi.ts";

// 倒计时相关
const isCountingDown = ref(false)
const countDown = ref(60)
let timer:any = null;

// 获取邮箱验证码
const getEmailCode = () => {
  if (resetForm.username === '') {
    ElMessage.error('请输入用户名');
    return;
  }
  isCountingDown.value = true
  timer = setInterval(() => {
    if (isCountingDown.value && countDown.value > 0) {
      countDown.value--
    } else if (countDown.value === 0) {
      isCountingDown.value = false
      countDown.value = 60
      clearInterval(timer)
    }
  }, 1000);
  sendResetPasswordCodeApi(resetForm.username).then((res: Result) => {
    if (res.code !== 200) {
      ElMessage({
        message: res.message,
        type: 'error',
      })
      return;
    }
    ElMessage({
      message: res.message,
      type: 'success',
    })
  })
}

onBeforeUnmount(() => {
  clearInterval(timer);
})

// 加载状态
const loading = ref(false)

// 重置密码表单数据
const resetForm:UserRest = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  code: ''
})

// 处理重置密码逻辑
const handleResetPassword = () => {
  let isValid = validateForm();
  if (!isValid) {
    return;
  }
  resetPasswordApi(resetForm).then((res: Result) => {
    if (res.code !== 200) {
      ElMessage({
        message: res.message,
        type: 'error',
      })
      return;
    }
    ElMessage({
      message: res.message,
      type: 'success',
    })
    resetForm.username = '';
    resetForm.password = '';
    resetForm.confirmPassword = '';
    resetForm.code = '';
    clearInterval(timer);
    toLogin();
  })
}

// 验证表单数据
const validateForm = () => {
  if (!resetForm.username || resetForm.username.length < 3) {
    ElMessage.error('用户名至少3个字符')
    return false;
  }
  if (!resetForm.password || resetForm.password.length < 6) {
    ElMessage.error('密码至少6个字符')
    return false;
  }
  if (!validatePassword()) {
    ElMessage.error('密码必须包含大小写字母和数字')
    return false;
  }
  if (resetForm.password !== resetForm.confirmPassword) {
    ElMessage.error('两次输入的密码不一致')
    return false;
  }
  if (!resetForm.code || resetForm.code.length === 0) {
    ElMessage.error('请输入邮箱验证码')
    return false;
  }
  return true;
}

// 验证密码强度
const validatePassword = () => {
  const password = resetForm.password
  if (!password) return true
  // 检查是否包含大小写字母和数字
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  return hasUpperCase && hasLowerCase && hasNumber
}

// 跳转到登录页面
const toLogin = () => {
  router.push('/login');
}
</script>

<style scoped>
.reset-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
}

.reset-password-card {
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 25px 20px;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
}

.reset-password-header {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  width: 90px;
  height: 70px;
  margin-bottom: 10px;
}

.reset-password-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.reset-password-form {
  margin-bottom: 15px;
}

.input-group {
  position: relative;
  margin-bottom: 15px;
}

.input-group input {
  width: 100%;
  padding: 12px 10px 12px;
  border: none;
  border-bottom: 1px solid #ddd;
  background: transparent;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.input-group input:focus {
  border-bottom: 1px solid #667eea;
}

.input-group label {
  position: absolute;
  top: 12px;
  left: 10px;
  color: #999;
  pointer-events: none;
  transition: all 0.3s ease;
  font-size: 14px;
}

.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label {
  top: -8px;
  left: 0;
  font-size: 11px;
  color: #667eea;
}

.captcha-group {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.captcha-group input {
  flex: 1;
}

.captcha-button {
  height: 30px;
  width: 80px;
  padding: 0 12px;
  transition: all 0.3s ease;
}

.captcha-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-button {
  width: 100%;
  padding: 10px;
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  margin-bottom: 15px;
}

.reset-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.reset-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.login-link {
  text-align: center;
  color: #666;
  font-size: 12px;
}

.resetText {
  color: #667eea;
  font-weight: 500;
  transition: color 0.3s ease;
}

.resetText:hover {
  color: #764ba2;
  cursor: pointer;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .reset-password-container {
    padding: 10px;
  }

  .reset-password-card {
    padding: 20px 15px;
  }

  .logo {
    width: 50px;
    height: 50px;
  }

  .reset-password-header h2 {
    font-size: 18px;
  }

  .captcha-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .captcha-button {
    width: 100%;
    margin-top: 8px;
  }
}
</style>