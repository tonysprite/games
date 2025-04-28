<template>
  <div class="game-list">
    <h2>游戏列表</h2>
    <el-row :gutter="20">
      <el-col :span="6" v-for="game in games" :key="game.id">
        <el-card 
          :body-style="{ padding: '0px' }" 
          class="game-card"
          @click="goToGame(game)">
          <img :src="game.cover" class="game-cover">
          <div class="game-info">
            <h3>{{ game.title }}</h3>
            <p>{{ game.description }}</p>
            <div class="game-meta">
              <span>{{ game.category }}</span>
              <el-rate v-model="game.rating" disabled></el-rate>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const games = ref([
  {
    id: 1,
    title: '五子棋',
    description: '经典的五子棋游戏，支持双人对战',
    cover: 'https://via.placeholder.com/300x200',
    category: '棋牌游戏',
    rating: 4.5,
    route: '/games/gomoku'
  }
])

const goToGame = (game) => {
  if (game.route) {
    router.push(game.route)
  }
}
</script>

<style scoped>
.game-list {
  padding: 20px;
}

.game-card {
  margin-bottom: 20px;
  transition: transform 0.3s;
  cursor: pointer;
}

.game-card:hover {
  transform: translateY(-5px);
}

.game-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.game-info {
  padding: 14px;
}

.game-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>