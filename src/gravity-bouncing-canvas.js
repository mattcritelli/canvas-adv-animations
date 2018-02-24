// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Variables
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

const gravity = 1
const friction = 0.95

// Event Listeners
addEventListener('mousemove', event => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click', () =>{
  init()
})

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Objects
function Ball(x, y, dx, dy, radius, color) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.color = color
}

Ball.prototype.update = function() {
  // Wall bounce pseudocode
  // if ball location is < 0 || ball location is > canvas.width
  //   then reverse the direction
  // else
  //   add one to the velocity
  // on every iteration add the velocity to x location

  if((this.x - this.radius < 0) || (this.x + this.radius + this.dx > canvas.width)) {
    this.dx = -this.dx
  }
  this.x += this.dx

  // Gravity pseudocode
  // if ball location is at or below the ground
  //   then reverse the direction
  // else increase velocity by one
  // on every iteration, add velocity to y (ball location)

  if(this.y + this.radius + this.dy > canvas.height){
    this.dy = -this.dy * friction
  } else {
    this.dy += gravity
  }
  this.y += this.dy
  this.draw()
}

Ball.prototype.draw = function() {
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fillStyle = this.color
  c.fill()
  c.closePath()
}

// Implementation
let ball
let ballArray;

function init() {
  ballArray = []
  for(let i = 0; i < 5; i++){
    let radius = randomIntFromRange(10, 30)
    ballArray.push(
      new Ball(
      randomIntFromRange(radius, canvas.width - radius),
      randomIntFromRange(radius, canvas.height - radius),
      randomIntFromRange(-2, 2),
      randomIntFromRange(-2, 2),
      radius,
      randomColor(colors)
      )
    )
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  for(let i = 0; i < ballArray.length; i++){
    ballArray[i].update()
  }

  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update();
  // });
}

init()
animate()
