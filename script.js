// select all DOM elements
const rulesBtn = document.getElementById('show-rules')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')

// Rules and Close event listener
rulesBtn.addEventListener('click', () => {
  rules.classList.add('show')
})

closeBtn.addEventListener('click', () => {
  rules.classList.remove('show')
})