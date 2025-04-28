<template>
  <div class="math-game">
    <div class="game-header">
      <h2>数学答题游戏</h2>
      <div class="score-board">
        <span>得分：{{ score }}/100</span>
        <span>剩余题目：{{ 20 - currentQuestionIndex }}</span>
      </div>
    </div>

    <div v-if="currentQuestionIndex < 20" class="question-container">
      <el-card class="question-card">
        <h3>第 {{ currentQuestionIndex + 1 }} 题</h3>
        <div class="question">
          {{ currentQuestion.expression }} = ?
        </div>
        <el-input
          v-model="userAnswer"
          type="number"
          placeholder="请输入答案"
          @keyup.enter="checkAnswer"
        >
          <template #append>
            <el-button @click="checkAnswer">提交</el-button>
          </template>
        </el-input>
      </el-card>
    </div>

    <div v-else class="game-over">
      <el-result
        icon="success"
        :title="`游戏结束！最终得分：${score}`"
        :sub-title="getScoreMessage()"
      >
        <template #extra>
          <el-button type="primary" @click="restartGame">重新开始</el-button>
        </template>
      </el-result>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const score = ref(0)
const currentQuestionIndex = ref(0)
const userAnswer = ref('')
const questions = ref([])

// 生成随机数
const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1

// 生成随机运算符
const operators = ['+', '-', '*', '/']
const getRandomOperator = () => operators[Math.floor(Math.random() * operators.length)]

// 生成题目
const generateQuestion = () => {
  let num1, num2, operator, answer
  
  do {
    num1 = getRandomNumber(10000)
    num2 = getRandomNumber(100)
    operator = getRandomOperator()
    
    switch (operator) {
      case '+':
        answer = num1 + num2
        break
      case '-':
        answer = num1 - num2
        break
      case '*':
        answer = num1 * num2
        break
      case '/':
        // 确保除法结果为整数
        num1 = num2 * getRandomNumber(100)
        answer = num1 / num2
        break
    }
  } while (answer > 10000 || answer < 0 || !Number.isInteger(answer))

  return {
    expression: `${num1} ${operator} ${num2}`,
    answer
  }
}

// 生成所有题目
const generateQuestions = () => {
  questions.value = Array(20).fill(null).map(() => generateQuestion())
}

// 获取当前题目
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value] || {})

// 检查答案
const checkAnswer = () => {
  if (!userAnswer.value) {
    ElMessage.warning('请输入答案')
    return
  }

  const answer = parseInt(userAnswer.value)
  if (answer === currentQuestion.value.answer) {
    score.value += 5
    ElMessage.success('回答正确！')
  } else {
    ElMessage.error(`回答错误，正确答案是：${currentQuestion.value.answer}`)
  }

  userAnswer.value = ''
  currentQuestionIndex.value++
}

// 获取得分评价
const getScoreMessage = () => {
  if (score.value === 100) return '太棒了！满分！'
  if (score.value >= 80) return '很好！继续加油！'
  if (score.value >= 60) return '及格了，还需要多练习！'
  return '需要更多练习，加油！'
}

// 重新开始游戏
const restartGame = () => {
  score.value = 0
  currentQuestionIndex.value = 0
  userAnswer.value = ''
  generateQuestions()
}

// 初始化游戏
generateQuestions()
</script>

<style scoped>
.math-game {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.score-board {
  display: flex;
  gap: 20px;
  font-size: 18px;
}

.question-container {
  margin-top: 20px;
}

.question-card {
  text-align: center;
}

.question {
  font-size: 24px;
  margin: 20px 0;
}

.game-over {
  margin-top: 50px;
}
</style>