<template>
  <div>
    <!-- 移动端提示 -->
    <div v-if="isMobileDevice" class="mobile-warning">
      <div class="warning-content">
        <div class="warning-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h3>更适合在电脑上使用</h3>
        <p class="desc">为了给您提供最佳的使用体验，请在电脑端访问我们的系统。</p>
        <div class="features">
          <div class="feature-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>更大的屏幕空间</span>
          </div>
          <div class="feature-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>更完整的功能体验</span>
          </div>
          <div class="feature-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>更好的操作效率</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import { isMobile, getDeviceType } from '@/utils/device'
import { onMounted, onUnmounted, ref } from "vue";

const isMobileDevice = ref(false);

const checkDevice = () => {
  isMobileDevice.value = isMobile() || getDeviceType() === 'mobile';
}

onMounted(() => {
  checkDevice();
  window.addEventListener('resize', checkDevice);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkDevice);
});
</script>

<style scoped>
.mobile-warning {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: white;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

.warning-content {
  padding: 40px 30px;
  max-width: 450px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.warning-icon {
  margin-bottom: 20px;
  color: #ffd43b;
}

.mobile-warning h3 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #fff;
  font-weight: 600;
}

.mobile-warning .desc {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.9);
}

.features {
  text-align: left;
  margin-top: 30px;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
}

.feature-item:last-child {
  margin-bottom: 0;
}

.feature-item svg {
  color: #7aff7a;
  margin-right: 10px;
  flex-shrink: 0;
}
</style>

<script lang="ts">
export default {
  name: "App"
}
</script>