// select all DOM elements
const rulesBtn = document.getElementById('show-rules')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// init variables
let score = 0
const brickRow = 9
const brickColumn = 5

// Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
}

// create paddle on canvas
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  dx: 0,
  speed: 8
}

function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
  ctx.fillStyle = '#0095dd'
  ctx.fill()
  ctx.closePath()
}

// draw ball on canvas
function drawBall() {
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
  ctx.fillStyle = '#0095dd'
  ctx.fill()
  ctx.closePath()
}

// draw score on canvas
function drawScore() {
  ctx.font = '20px Arial'
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

// create bricks
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
}

const bricks = []
for (let i = 0; i < brickRow; i++) {
  bricks[i] = []
  for (let j = 0; j < brickColumn; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
    bricks[i][j] = { x, y, ...brickInfo }
  }
}

// draw bricks
function drawBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath()
      ctx.rect(brick.x, brick.y, brick.w, brick.h)
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent'
      ctx.fill()
      ctx.closePath()
    })
  })
}

// draw everything 
function draw() {
  drawPaddle()
  drawBall()
  drawScore()
  drawBricks()
}

// Rules and Close event listener
rulesBtn.addEventListener('click', () => {
  rules.classList.add('show')
})

closeBtn.addEventListener('click', () => {
  rules.classList.remove('show')
})

draw()