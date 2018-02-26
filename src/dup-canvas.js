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

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1
  let yDistance = y2 - y1

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

function generateParticle(){
  const x = Math.random() * innerWidth
  const y = Math.random() * innerHeight
  const radius = 10
  const color = 'blue'
  return new Particle(x, y, radius, color)
}

// Objects
function Particle(x, y, radius, color) {
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
}

Particle.prototype.update = function() {
  this.draw()
}

Particle.prototype.draw = function() {
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.strokeStyle = this.color
  c.stroke()
  c.closePath()
}

// Implementation

let particles
function init() {
  particles = []

  for(let i = 0; i < 400; i++){
    let newParticle = generateParticle()

    if(particles.length === 0){
      particles.push(newParticle)
    }

    if(particles.length > 0){
      particles.forEach(particle => {
        let distance = getDistance(particle.x, particle.y, newParticle.x, newParticle.y)
        if (distance - (particle.radius + newParticle.radius) < 0){
          return
        } else {
          particles.push(newParticle)
        }
      })
    }
    console.log(particles)
  }
}


let particles
function init() {
  particles = []

  for(let i = 0; i < 400; i++){
    const x = Math.random() * innerWidth
    const y = Math.random() * innerHeight
    const radius = 10
    const color = 'blue'
    particles.push(new Particle(x, y, radius, color))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  // particles.forEach(particle => {
  //   particle.update()
  // })

  // let distance = getDistance(circle1.x, circle1.y, circle2.x, circle2.y)
  // if(distance < circle1.radius + circle2.radius){
  //   circle1.color = 'blue'
  // } else {
  //   circle1.color = 'black'
  // }

}

init()
animate()
