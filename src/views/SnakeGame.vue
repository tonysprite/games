<template>
  <div class="snake-game">
    <h1>贪吃蛇游戏</h1>
    <div class="game-container">
      <canvas ref="gameCanvas" width="400" height="400"></canvas>
      <div class="game-controls">
        <p>得分: {{ score }}</p>
        <el-button @click="startGame" type="primary">{{ gameRunning ? '重新开始' : '开始游戏' }}</el-button>
        <p v-if="gameOver" class="game-over">游戏结束！最终得分: {{ score }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const gameCanvas = ref(null)
const ctx = ref(null)
const snake = ref([{x: 10, y: 10}])
const food = ref({x: 15, y: 15})
const direction = ref('right')
const nextDirection = ref('right')
const score = ref(0)
const gameRunning = ref(false)
const gameOver = ref(false)

const GRID_SIZE = 20
const GRID_COUNT = 20

onMounted(() => {
  ctx.value = gameCanvas.value.getContext('2d')
  document.addEventListener('keydown', handleKeyPress)
})

const startGame = () => {
  snake.value = [{x: 10, y: 10}]
  direction.value = 'right'
  nextDirection.value = 'right'
  score.value = 0
  gameRunning.value = true
  gameOver.value = false
  gameLoop()
}

const gameLoop = () => {
  if (!gameRunning.value) return

  moveSnake()
  checkCollision()
  checkFood()
  draw()
  setTimeout(gameLoop, 200)
}

const moveSnake = () => {
  direction.value = nextDirection.value
  const head = {...snake.value[0]}

  switch(direction.value) {
    case 'up': head.y--; break
    case 'down': head.y++; break
    case 'left': head.x--; break
    case 'right': head.x++; break
  }

  snake.value.unshift(head)
  snake.value.pop()
}

const checkCollision = () => {
  const head = snake.value[0]
  
  if (head.x < 0 || head.x >= GRID_COUNT || 
      head.y < 0 || head.y >= GRID_COUNT) {
    gameOver.value = true
    gameRunning.value = false
    return
  }

  for (let i = 1; i < snake.value.length; i++) {
    if (head.x === snake.value[i].x && head.y === snake.value[i].y) {
      gameOver.value = true
      gameRunning.value = false
      return
    }
  }
}

const checkFood = () => {
  const head = snake.value[0]
  if (head.x === food.value.x && head.y === food.value.y) {
    score.value += 10
    snake.value.push({})
    generateFood()
  }
}

const generateFood = () => {
  food.value = {
    x: Math.floor(Math.random() * GRID_COUNT),
    y: Math.floor(Math.random() * GRID_COUNT)
  }
}

const draw = () => {
  ctx.value.fillStyle = '#f0f0f0'
  ctx.value.fillRect(0, 0, 400, 400)

  // 绘制食物
  ctx.value.fillStyle = '#ff0000'
  ctx.value.fillRect(
    food.value.x * GRID_SIZE,
    food.value.y * GRID_SIZE,
    GRID_SIZE - 2,
    GRID_SIZE - 2
  )

  // 绘制蛇
  snake.value.forEach((segment, index) => {
    ctx.value.fillStyle = index === 0 ? '#4a9' : '#2a7'
    ctx.value.fillRect(
      segment.x * GRID_SIZE,
      segment.y * GRID_SIZE,
      GRID_SIZE - 2,
      GRID_SIZE - 2
    )
  })
}

const handleKeyPress = (e) => {
  if (!gameRunning.value) return

  switch(e.key) {
    case 'ArrowUp':
      if (direction.value !== 'down') nextDirection.value = 'up'
      break
    case 'ArrowDown':
      if (direction.value !== 'up') nextDirection.value = 'down'
      break
    case 'ArrowLeft':
      if (direction.value !== 'right') nextDirection.value = 'left'
      break
    case 'ArrowRight':
      if (direction.value !== 'left') nextDirection.value = 'right'
      break
  }
}
</script>

<style scoped>
.snake-game {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  height: 70vh;
  gap: 20px;
}

canvas {
  width: 100% !important;
  height: auto !important;
  aspect-ratio: 1/1;
  max-width: 600px;
}

.game-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.game-over {
  color: #f56c6c;
  font-weight: bold;
}

/* 添加在.game-controls样式之后 */
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.game-controls p:first-child {
  font-size: 1.5em;
  font-weight: 900;
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 
    0 0 10px rgba(255,107,107,0.8),
    0 0 20px rgba(255,142,83,0.6);
  animation: breathe 2s ease-in-out infinite;
}
</style>