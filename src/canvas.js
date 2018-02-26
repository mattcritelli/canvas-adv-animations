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
  let radius = randomIntFromRange(20, 20)
  let x = randomIntFromRange(radius, innerWidth - radius)
  let y = randomIntFromRange(radius, innerHeight - radius)
  const color = 'blue'
  return new Particle(x, y, radius, color)
}

// Objects
function Particle(x, y, radius, color) {
  this.x = x
  this.y = y
  this.velocity = {
    x: Math.random() - 0.5,
    y: Math.random() - 0.5
  }
  this.radius = radius
  this.color = color
}

// Don't use ES6 arrow function, binds 'this' to window
Particle.prototype.update = function(particles) {
  this.draw()
  for(let i = 0; i < particles.length; i++){
    if (this === particles[i]) {
      continue
    } else {
      let distance = getDistance(this.x, this.y, particles[i].x, particles[i].y)
      if(distance - (this.radius + particles[i].radius) < 0){
        console.log('has collided')
      }
    }
  }

  this.x += this.velocity.x
  this.y += this.velocity.y


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

  for(let i = 0; i < 50; i++){
    let newParticle = generateParticle()

    if (i !== 0){
      for(let j = 0; j < particles.length; j++){
        let distance = getDistance(newParticle.x, newParticle.y, particles[j].x, particles[j].y)
        if(distance - (newParticle.radius + particles[j].radius) < 0 ){
          newParticle.x = randomIntFromRange(newParticle.radius, innerWidth - newParticle.radius)
          newParticle.y = randomIntFromRange(newParticle.radius, innerHeight - newParticle.radius)
          j = -1
        }
      }
    }
    particles.push(newParticle)
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach(particle => {
    particle.update(particles)
  })

}

init()
animate()
