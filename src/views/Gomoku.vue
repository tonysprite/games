<template>
  <div class="gomoku">
    <h2>五子棋</h2>
    <div class="game-info">
      <div class="player-turn" v-if="!winner">当前玩家: {{ currentPlayer === 1 ? '黑棋' : '白棋' }}</div>
      <div class="winner" v-else>{{ winner === 1 ? '黑棋' : '白棋' }}获胜！</div>
      <el-button @click="resetGame">重新开始</el-button>
    </div>
    <div class="board">
      <div v-for="(row, i) in board" :key="i" class="board-row">
        <div v-for="(cell, j) in row" 
             :key="j" 
             class="cell"
             @click="makeMove(i, j)"
             :class="{ 'disabled': winner !== null }">
          <div v-if="cell !== 0" 
               :class="['piece', cell === 1 ? 'black' : 'white']">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const board = ref(Array(15).fill().map(() => Array(15).fill(0)))
const currentPlayer = ref(1)
const winner = ref(null)  // 新增获胜者状态

const makeMove = (row, col) => {
  if (winner.value !== null || board.value[row][col] !== 0) return
  
  board.value[row][col] = currentPlayer.value
  
  if (checkWin(row, col)) {
    winner.value = currentPlayer.value
    ElMessage.success(`${currentPlayer.value === 1 ? '黑棋' : '白棋'}获胜！`)
    return
  }
  
  currentPlayer.value = currentPlayer.value === 1 ? 2 : 1
}

const resetGame = () => {
  board.value = Array(15).fill().map(() => Array(15).fill(0))
  currentPlayer.value = 1
  winner.value = null  // 重置获胜者状态
}

const checkWin = (row, col) => {
  const directions = [
    [[0, 1], [0, -1]], // 水平
    [[1, 0], [-1, 0]], // 垂直
    [[1, 1], [-1, -1]], // 对角线
    [[1, -1], [-1, 1]] // 反对角线
  ]
  
  const player = board.value[row][col]
  
  return directions.some(direction => {
    const count = 1 + direction.reduce((count, [dx, dy]) => {
      let x = row + dx
      let y = col + dy
      let lineCount = 0
      
      while (
        x >= 0 && x < 15 &&
        y >= 0 && y < 15 &&
        board.value[x][y] === player
      ) {
        lineCount++
        x += dx
        y += dy
      }
      
      return count + lineCount
    }, 0)
    
    return count >= 5
  })
}
</script>

<style scoped>
.gomoku {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.game-info {
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.board {
  background-color: #dcb35c;
  padding: 20px;
  border-radius: 4px;
}

.board-row {
  display: flex;
}

.cell {
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.cell.disabled {
  cursor: not-allowed;
}

.piece {
  width: 34px;
  height: 34px;
  border-radius: 50%;
}

.black {
  background-color: #000;
}

.white {
  background-color: #fff;
  border: 1px solid #000;
}

.winner {
  font-size: 1.2em;
  color: #409EFF;
  font-weight: bold;
}
</style>