
const USSAssembly = {
    hull: 20,
    firepower: 5,
    accuracy: .7,
    attack(alien) {
       //use for loop
       for (let i=this.hull; i>= 0; i++) {

       
        let ranNum = Math.random();
        console.log(`Accuracy threshold is ${ranNum}`);
        if (ranNum < this.accuracy) {
            console.log(`It's a direct hit!! Well done Capitan!`);
            alien.hull = alien.hull - this.firepower;
            console.log(`alien has ${alien.hull} hull points left.`);
        //  if (alien.hull <= 0) {
        //         console.log(`Alien ship is destroyed you have saved the Universe from complete destruction!!`);

            }
        else {
            console.log(`you missed! wait for the counter attack`);
// if the uss misses the alien, then we should call the function alien attack: the alien in return should uss.

        }


    }
}

const Alienship = {
    hull: Math.round((Math.random() * (6 - 3)) + 3), // to get a random number from two different number:(Math.random() * (max - min)) + min). to round the number use math.round
    firepower: Math.round((Math.random() * (4 - 2)) + 2),
    accuracy: (Math.random() * (.8 - .6)) + .6, //for later figure out a way to make it to the hundredth?
    attack(uss) {
        for (let i=this.hull; i>= 0; i++) {

        let ranNum = Math.random();
        console.log(`Accuracy threshold is ${ranNum}`);
        if (ranNum < this.accuracy) {
            console.log(`You've been hit!`);
            uss.hull = uss.hull - this.firepower;
            console.log(`hero has ${uss.hull} hull points left.`);
            if (uss.hull <= 0) {
                console.log(`You have died, your people will now be used as cattle for the CRAVERSSS!!! GRRZZT ZOIK!`);

            }
        } else {
            console.log(`You dodged the attack!`);
        }
    }
}
console.log(Alienship);
console.log(USSAssembly);