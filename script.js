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

// move paddle
function movePaddle() {
  paddle.x += paddle.dx

  // wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w
  } else if (paddle.x < 0) {
    paddle.x = 0
  }
}

// move ball
function moveBall() {
  ball.x += ball.dx
  ball.y += ball.dy

  // wall collision (x)
  if (ball.x + ball.size > canvas.width || ball.x + ball.size < 0) {
    ball.dx *= -1
  }

  // wall collision (y)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1
  }

  // paddle collision
  if (ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
    ball.dy = -ball.speed
  }

  // bricks collision
  bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (ball.x - ball.size > brick.x &&
          ball.x + ball.size < brick.x + brick.w &&
          ball.y - ball.size < brick.y + brick.h &&
          ball.y + ball.size > brick.y
        ) {
          ball.dy *= -1
          brick.visible = false
          score++
        }
      }
    })
  })
}

// draw everything 
function draw() {
  // clear before draw new content
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawPaddle()
  drawBall()
  drawScore()
  drawBricks()
}

// keyboard events
function keydown(e) {
  if (e.key === 'right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed
  } else if (e.key === 'left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed
  }
}

function keyup(e) {
  if (e.key === 'right' || e.key === 'ArrowRight' || e.key === 'left' || e.key === 'ArrowLeft') {
    paddle.dx = 0
  }
}

// keyboard events hanlder
document.addEventListener('keydown', keydown)
document.addEventListener('keyup', keyup)

// Rules and Close event listener
rulesBtn.addEventListener('click', () => {
  rules.classList.add('show')
})

closeBtn.addEventListener('click', () => {
  rules.classList.remove('show')
})

// update canvas
function update() {
  movePaddle()
  moveBall()
  draw()
  requestAnimationFrame(update)
}

update() 