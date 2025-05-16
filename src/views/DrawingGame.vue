<template>
  <div class="drawing-game">
    <div class="toolbar">
      <el-color-picker v-model="currentColor"/>
      <el-slider
        v-model="lineWidth"
        :min="1"
        :max="20"
        style="width: 150px"
      />
      <el-button-group>
        <el-button
          v-for="shape in shapes"
          :key="shape"
          @click="selectShape(shape)"
        >
          {{ shape }}
        </el-button>
      </el-button-group>
    </div>
    
    <div class="canvas-container">
      <svg
        ref="canvas"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
      >
        <!-- 动态生成矢量图形 -->
        <g
          v-for="(item, index) in drawings"
          :key="index"
          :transform="item.transform"
        >
          <path
            v-if="item.type === 'path'"
            :d="item.data"
            :stroke="item.color"
            :stroke-width="item.width"
            fill="none"
          />
          <rect
            v-if="item.type === 'rect'"
            :x="item.x"
            :y="item.y"
            :width="item.width"
            :height="item.height"
            :stroke="item.color"
            :stroke-width="item.lineWidth"
            fill="none"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentColor = ref('#000000')
const lineWidth = ref(3)
const selectedShape = ref('free')
const isDrawing = ref(false)
const startPoint = ref({ x: 0, y: 0 })
const currentPath = ref('')
const drawings = ref([])
const shapes = ['free', 'rect', 'circle', 'triangle']

const startDrawing = (e) => {
  isDrawing.value = true
  const rect = e.target.getBoundingClientRect()
  startPoint.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
  
  if(selectedShape.value === 'free') {
    currentPath.value = `M ${startPoint.value.x} ${startPoint.value.y} `
  }
}

const draw = (e) => {
  if (!isDrawing.value) return
  
  const rect = e.target.getBoundingClientRect()
  const currentX = e.clientX - rect.left
  const currentY = e.clientY - rect.top
  
  if(selectedShape.value === 'free') {
    currentPath.value += `L ${currentX} ${currentY} `
    const tempDraw = {
      type: 'path',
      data: currentPath.value,
      color: currentColor.value,
      width: lineWidth.value,
      transform: ''
    }
    
    if(drawings.value.length === 0) {
      drawings.value.push(tempDraw)
    } else {
      drawings.value.splice(-1, 1, tempDraw)
    }
  }
}

const stopDrawing = () => {
  isDrawing.value = false
  if(selectedShape.value !== 'free') {
    createShape()
  }
}

const selectShape = (shape) => {
  selectedShape.value = shape
}

const createShape = () => {
  // 实现预设形状创建逻辑
}
</script>

<style scoped>
.drawing-game {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.toolbar {
  padding: 10px;
  background: #f5f5f5;
  display: flex;
  gap: 20px;
  align-items: center;
}

.canvas-container {
  flex: 1;
  overflow: hidden;
}

svg {
  width: 100%;
  height: 100%;
  touch-action: none;
}
</style>