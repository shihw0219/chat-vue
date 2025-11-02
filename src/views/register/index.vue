<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <el-image
            src="https://image0219.oss-cn-hangzhou.aliyuncs.com/images/logo_1.png"
            class="logo"
        />
        <h2>用户注册</h2>
      </div>

      <form class="register-form" @submit.prevent="handleRegister">
        <div class="input-group">
          <input
              v-model="registerForm.name"
              type="text"
              placeholder=" "
              required
              maxlength="100"
          />
          <label>姓名</label>
        </div>

        <div class="input-group">
          <input
              v-model="registerForm.username"
              type="text"
              placeholder=" "
              required
              maxlength="30"
          />
          <label>用户名</label>
        </div>

        <div class="input-group">
          <input
              v-model="registerForm.password"
              type="password"
              placeholder=" "
              required
              maxlength="20"
          />
          <label>密码</label>
        </div>

        <div class="input-group">
          <input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder=" "
              required
              maxlength="20"
          />
          <label>确认密码</label>
        </div>

        <div class="input-group">
          <input
              v-model="registerForm.email"
              type="email"
              placeholder=" "
              required
              maxlength="100"
          />
          <label>邮箱</label>
        </div>

        <div class="input-group captcha-group">
          <input
              v-model="registerForm.code"
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

        <div class="input-group">
          <input
              v-model="registerForm.phone"
              type="tel"
              placeholder=" "
              maxlength="25"
          />
          <label>手机号（非必填）</label>
        </div>

        <button
            class="register-button"
            type="submit"
            :disabled="loading"
        >
          {{ loading ? '注册中...' : '注册' }}
        </button>
      </form>

      <div class="login-link">
        <p>已有账号？<el-text class="registerText" @click="toLogin">立即登录</el-text></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="register">
import {ref, reactive, onBeforeUnmount} from 'vue'
import router from "@/router";
import {ElMessage} from "element-plus";
import {sendRegisterMailApi} from "@/api/mailApi.ts";
import type {Result, UserRegister} from "@/data/model.ts";
import {registerApi} from "@/api/userApi.ts";

// 倒计时相关
const isCountingDown = ref(false)
const countDown = ref(60)
let timer:any = null;
// 获取邮箱验证码
const getEmailCode = () => {
  if (registerForm.email === '') {
    ElMessage.error('请输入邮箱地址');
    return;
  }
  sendRegisterMailApi(registerForm.email).then((res: Result) => {
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
// 注册表单数据
const registerForm:UserRegister = reactive({
  name: '',
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  code: '',
  phone: ''
})
// 处理注册逻辑
const handleRegister = () => {
  let isValid = validateForm();
  if (!isValid) {
    return;
  }
  registerApi(registerForm).then((res: Result) => {
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
    resetForm();
    clearInterval(timer);
  })
}
// 重置表单
const resetForm = () => {
  registerForm.name = '';
  registerForm.username = '';
  registerForm.password = '';
  registerForm.confirmPassword = '';
  registerForm.email = '';
  registerForm.code = '';
  registerForm.phone = '';
}


// 验证表单数据
const validateForm = () => {
  if (!registerForm.name || registerForm.name.length < 2) {
    ElMessage.error('姓名至少3个字符')
    return false;
  }
  if (!registerForm.username || registerForm.username.length < 3) {
    ElMessage.error('用户名至少3个字符')
    return false;
  }
  if (!registerForm.password || registerForm.password.length < 6) {
    ElMessage.error('密码至少6个字符')
    return false;
  }
  if (!validatePassword()) {
    ElMessage.error('密码必须包含大小写字母和数字')
    return false;
  }
  if (registerForm.password !== registerForm.confirmPassword) {
    ElMessage.error('两次输入的密码不一致')
    return false;
  }
  if (!registerForm.email || registerForm.email.length === 0) {
    ElMessage.error('请输入邮箱地址')
    return false;
  }
  if (!registerForm.code || registerForm.code.length === 0) {
    ElMessage.error('请输入邮箱验证码')
    return false;
  }
  return true;
}
// 验证密码强度
const validatePassword = () => {
  const password = registerForm.password
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
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
}

.register-card {
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 25px 20px;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
}

.register-header {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  width: 90px;
  height: 70px;
  margin-bottom: 10px;
}

.register-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.register-form {
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

.register-button {
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

.register-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.register-button:disabled {
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

.registerText {
  color: #667eea;
  font-weight: 500;
  transition: color 0.3s ease;
}

.registerText:hover {
  color: #764ba2;
  cursor: pointer;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .register-container {
    padding: 10px;
  }

  .register-card {
    padding: 20px 15px;
  }

  .logo {
    width: 50px;
    height: 50px;
  }

  .register-header h2 {
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