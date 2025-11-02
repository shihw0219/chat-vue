<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-container">
        <el-image
            src="https://image0219.oss-cn-hangzhou.aliyuncs.com/images/logo_1.png"
            class="logo"
        />
        <h2>用户登录</h2>
      </div>
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="input-group">
          <input
              v-model="loginForm.username"
              type="text"
              placeholder=" "
              required
          />
          <label>用户名</label>
        </div>

        <div class="input-group">
          <input
              v-model="loginForm.password"
              type="password"
              placeholder=" "
              required
          />
          <label>密码</label>
        </div>

        <div class="input-group captcha-group">
          <input
              v-model="loginForm.code"
              type="text"
              placeholder=" "
              required
          />
          <label>验证码</label>
          <div class="captcha-container">
            <el-image @click="getCaptcha" style="width: 100px;height: 38px;" :src="captchaUrl"/>
          </div>
        </div>

        <div class="form-options">
          <div class="remember-me">
            <input
                id="remember"
                v-model="loginForm.remember"
                type="checkbox"
            />
            <label for="remember">记住我</label>
          </div>
          <el-text class="forgot-password" @click="toReset">忘记密码？</el-text>
        </div>

        <button
            class="login-button"
            type="submit"
            :disabled="loading"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <div class="register-link">
        <p>还没有账号？
          <el-text class="registerText" @click="toRegister">立即注册</el-text>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
import {ref, reactive, onMounted} from 'vue'
import {getCaptchaApi} from "@/api/captchaApi.ts";
import type {Result} from "@/data/model.ts";
import {ElMessage} from "element-plus";
import router from "@/router";

// 图片验证码
let captchaUrl = ref('');
const getCaptcha = () => {
  getCaptchaApi().then((res: Result) => {
    if (res.code !== 200) {
      ElMessage({
        message: res.message,
        type: 'error',
      })
    } else {
      captchaUrl.value = res.data.imageBase64;
      loginForm.captchaId = res.data.imageId;
    }
  })
}
onMounted(() => {
  getCaptcha();
})

// 加载状态
const loading = ref(false)

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  code: '',
  captchaId: '',
  remember: false
})
// 登录
const handleLogin = () => {

}

// 跳转到注册页面
const toRegister = () => {
  router.push('/register');
}

// 跳转到重置密码页面
const toReset = () => {
  router.push('/reset');
}

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.login-card {
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  padding: 30px 25px;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
}

.logo-container {
  text-align: center;
  margin-bottom: 25px;
}

.logo {
  width: 90px;
  height: 70px;
  margin-bottom: 15px;
}

.logo-container h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

.login-form {
  margin-bottom: 20px;
}

.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-group input {
  width: 100%;
  padding: 14px 12px 14px;
  border: none;
  border-bottom: 1px solid #ddd;
  background: transparent;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.input-group input:focus {
  border-bottom: 1px solid #667eea;
}

.input-group label {
  position: absolute;
  top: 14px;
  left: 12px;
  color: #999;
  pointer-events: none;
  transition: all 0.3s ease;
}

.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label {
  top: -10px;
  left: 0;
  font-size: 12px;
  color: #667eea;
}

.captcha-group {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.captcha-group input {
  flex: 1;
}

.captcha-container {
  width: 100px;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 13px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
}

.remember-me input {
  width: auto;
  transform: scale(0.9);
}

.remember-me label {
  margin-bottom: 0;
  color: #666;
  cursor: pointer;
}

.forgot-password {
  color: #667eea;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #764ba2;
  cursor: pointer;
}

.login-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  margin-bottom: 15px;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.register-link {
  text-align: center;
  color: #666;
  font-size: 13px;
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
  .login-container {
    padding: 15px;
  }

  .login-card {
    padding: 25px 20px;
  }

  .logo {
    width: 60px;
    height: 60px;
  }

  .logo-container h2 {
    font-size: 20px;
  }

  .captcha-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .captcha-container {
    width: 100%;
    margin-top: 10px;
  }
}
</style>