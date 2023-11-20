// we have 2 Objects: USSAssembly and Alienship. below are their respectful properties

class Ship{
    constructor (hull,firepower,accuracy,name){
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
        this.name = name
        this.isAlien = name.startsWith('Alien')
        this.emoji = this.isAlien ? "👽" : "🚀"
        // WIN .
        
    }
    attack(target) {
        console.log(`\n${this.emoji} ▫▫▫▫`)
        console.log(`${this.name} is attackng ${target.name}.`)
        if (Math.random() < this.accuracy){
            console.log(`It was a hit!`)
            target.getHit(this)
        } else {
            console.log(`${this.name} missed.`)
            target.attack(this)
        }
    }
    getHit(attacker) {
        console.log(`\n${this.name} was hit by ${attacker.name}.`)
        let originalHull = this.hull.toFixed(2)
        this.hull -= attacker.firepower
        console.log(`The hull of ${this.name} decreased from ${originalHull} to ${this.hull.toFixed(2)}`)
        if (this.hull < 0) {
            console.log(`${this.name} was destroyed!`)
            if (this.isAlien) {
                aliens.shift()
                if (aliens.length > 0) {
                    attacker.attack(aliens[0])
                } else {
                    console.log(`All the aliens are dead. You won!`)
                }
            } else {
                `Game over!`
            }
        } else {
            this.attack(attacker)
        }
    }
}

function randomRange(lo, hi) {
    return (Math.random()*(hi-lo))+lo
}

const ussAssembly= new Ship(20,5,.7,"USS Assembly")
const aliens = []
for(let i = 0; i < 6; i++) {
    let alienHull = randomRange(3, 6)
    let alienFirepower = randomRange(2, 4)
    let alienAccuracy = randomRange(.6, .8)
    let alienName = `Alien ship #${i+1}`
    aliens.push(new Ship(alienHull, alienFirepower, alienAccuracy, alienName))
}

ussAssembly.attack(aliens[0])

// console.log(ussAssembly)
// console.log(aliens)

