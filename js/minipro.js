const ussAssemblyEl = document.querySelector('#uss-assembly')
const aliensEl = document.querySelector('#aliens')
const outputEl = document.querySelector('#output')
const attackBtn = document.querySelector('#attack')
const retreatBtn = document.querySelector('#retreat')
const controlsEl = document.querySelector('#controls')

// we have 2 Objects: USSAssembly and Alienship. below are their respectful properties

class Ship{
    constructor (hull,firepower,accuracy,name){
        this.hull = hull
        this.initialHull = hull
        this.firepower = firepower
        this.accuracy = accuracy
        this.name = name
        this.isAlien = name.startsWith('Alien')
        this.emoji = this.isAlien ? "👽" : "🚀"
    }
    async attack(target) {
        await output(`\n${this.emoji} ▫▫▫▫`)
        await output(`${this.name} is attackng ${target.name}.`)
        // IF IT HIT
        if (Math.random() < this.accuracy){
            await output(`It was a hit!`)
            setTimeout(() => {
                target.getHit(this)
            }, 1000);
        // IF IT MISSED
        } else {
            await output(`${this.name} missed.`)
            // IF YOU SHOT
            if (target.isAlien) {
                setTimeout(() => {
                    target.attack(this)
                }, 1000);
            // IF THE ALIEN SHOT
            } else {
                promptUser()
            }
        }
    }
    async getHit(attacker) {
        await output(`\n${this.name} was hit by ${attacker.name}.`)
        let originalHull = this.hull.toFixed(2)
        this.hull -= attacker.firepower
        renderAllShips()
        await output(`The hull of ${this.name} decreased from ${originalHull} to ${this.hull.toFixed(2)}`)
        if (this.hull < 0) {
            await output(`${this.name} was destroyed!`)
            // IF YOU DESTROYED A SHIP
            if (this.isAlien) {
                aliens.shift()
                renderAllShips()
                if (aliens.length > 0) {
                    setTimeout(() => {
                        promptUser()
                    }, 1000);
                } else {
                    output(`All the aliens are dead. You won!`)
                }
                // IF YOU WERE DESTROYED
            } else {
                `Game over!`
            }
        } else { 
            // IF SURVIVED
            // IF ALIEN WAS HIT
            if (this.isAlien) {
                setTimeout(() => {
                    this.attack(attacker)
                }, 1000);

            } else {
                // IF YOU WERE HIT
                promptUser()
            }
        }
    }
}

function randomRange(lo, hi) {
    return (Math.random()*(hi-lo))+lo
}

function renderHull(ship) {
    let shipHull = document.createElement('div')
    shipHull.classList = 'hull'
    shipHull.innerText = ship.hull.toFixed(2) + " / " + ship.initialHull.toFixed(2)
    shipHull.innerHTML += `<div class="hp" style="width: ${ship.hull/ship.initialHull*100}%;"></div>`
    return shipHull
}

function renderShip(ship, url, parent) {
    let shipEl = document.createElement('div')
    shipEl.classList = 'ship'
    let shipLabel = document.createElement('h3')
    shipLabel.innerText = ship.name
    let shipHull = renderHull(ship)
    let shipImage = document.createElement('img')
    shipImage.src = url
    shipEl.append(shipImage)
    shipEl.append(shipLabel)
    shipEl.append(shipHull)
    parent.append(shipEl)
}

function renderAllShips() {
    ussAssemblyEl.innerHTML = ""
    aliensEl.innerHTML = ""

    renderShip(ussAssembly, './images/spaceship.png', ussAssemblyEl)
    aliens.forEach(alien => {
        renderShip(alien, './images/ufo.png', aliensEl)
    })
}

function output(message) {
    outputEl.innerText = message
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 1000);
    })
}

function promptUser() {
    output('Will you attack or retreat?')
    showControls()
}

function initGame() {
    renderAllShips()
    promptUser()
}

function hideControls() {
    controlsEl.style.visibility = 'hidden'
}
function showControls() {
    controlsEl.style.visibility = 'visible'
}

const ussAssembly= new Ship(20,5,.7,"USS Assembly")
const aliens = []
for(let i = 0; i < 6; i++) {
    let alienHull = randomRange(3.5, 7)
    let alienFirepower = randomRange(2, 4)
    let alienAccuracy = randomRange(.6, .8)
    let alienName = `Alien ship #${i+1}`
    aliens.push(new Ship(alienHull, alienFirepower, alienAccuracy, alienName))
}

attackBtn.addEventListener('click', ()=>{
    hideControls()
    ussAssembly.attack(aliens[0])
})

retreatBtn.addEventListener('click', () => {
    hideControls()
    output("You lost!")
})

initGame()

// ussAssembly.attack(aliens[0])

// console.log(ussAssembly)
// console.log(aliens)

// document.body.append('hi')= add (hi)
// document.body.innerHTML = "<h1>Hello</h1>"