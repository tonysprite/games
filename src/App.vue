<script setup>
import { useUserStore } from './stores/user'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ArrowDown } from '@element-plus/icons-vue'

const userStore = useUserStore()
const router = useRouter()
const { token, userInfo } = storeToRefs(userStore)

const handleCommand = (command) => {
  if (command === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <nav>
          <router-link to="/">首页</router-link> |
          <router-link to="/games">游戏列表</router-link>
          <div class="user-info" v-if="token">
            <el-dropdown @command="handleCommand">
              <span class="user-name">
                {{ userInfo?.username || '用户' }}
                <el-icon><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </nav>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style>
.user-info {
  float: right;
  cursor: pointer;
}

.user-name {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>