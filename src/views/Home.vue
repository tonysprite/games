<template>
  <div class="home">
    <header class="header">
      <h1>游戏聚合平台</h1>
      <el-menu mode="horizontal" router>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/games">游戏库</el-menu-item>
      </el-menu>
    </header>
    
    <main class="main-content">
      <el-carousel height="400px">
        <el-carousel-item v-for="game in featuredGames" :key="game.id">
          <img :src="game.cover" :alt="game.title">
          <h3>{{ game.title }}</h3>
        </el-carousel-item>
      </el-carousel>
      
      <section class="popular-games">
        <h2>热门游戏</h2>
        <el-row :gutter="20">
          <el-col :span="6" v-for="game in popularGames" :key="game.id">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="game.cover" class="game-cover">
              <div class="game-info">
                <h3>{{ game.title }}</h3>
                <p>{{ game.description }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const featuredGames = ref([
  {
    id: 1,
    title: '示例游戏1',
    cover: 'https://via.placeholder.com/800x400',
  },
  // 添加更多游戏
])

const popularGames = ref([
  {
    id: 1,
    title: '热门游戏1',
    description: '游戏描述',
    cover: 'https://via.placeholder.com/300x200',
  },
  // 添加更多游戏
])
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  margin-bottom: 30px;
}

.game-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.game-info {
  padding: 14px;
}

.popular-games {
  margin-top: 40px;
}
</style>