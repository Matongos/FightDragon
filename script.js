let xp =0;
let health= 100;
let gold =50;
let currentWeapon =0;

let fighting;
let monsterHealth;
let inventory= ["stick"];

const button1= document.querySelector("#button1");
const button2= document.querySelector("#button2");
const button3= document.querySelector("#button3");
const text= document.querySelector("#text");
const xpText= document.querySelector("#xpText");
const healthtext= document.querySelector("#healthtext");
const goldtext= document.querySelector("#goldText");
const monsterStats= document.querySelector("#monsterStats");
const monsterNameText= document.querySelector("#monsterNameText");
const monsterHealthText= document.querySelector("#monsterHealthText");
const weapons =[
    {
        name:"stick",
        power: 5,
    },
    {
        name: "dagger",
        power: 50,

    },
    {
        name: "claw hammer",
        power:50
    },
     {
        name : "sword",
        power: 100
     }

];
const monsters=[
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged Beast",
        level: 8,
        health: 300,
    },
    {
        name: "dragon ",
        level: 20,
        health: 300,
    }


]




const locations=[
    {
        name: "town Square",
        "button text": ['Go to store','Go to cave', 'Fight Dragon'],
        "button functions":[goStore, goTown, fightDragon],
        text: "you are in the town square. You see a sign that says \"store\"."

    },
    {
        name: "store",
        "button text": ['buy 10 health ( 10 gold )','buy weapon (30 gold)', 'Go to town Square'],
        "button functions":[buyHealth, buyWeapon, goTown],
        text:"You enter the store ",
    },
    {
        name: "cave",
        "button text": ['fight slime','fight fanged beast', 'go to town square'],
        "button functions":[fightSlime, fightBeast, goTown],
        text:"You enter the store, you see some monsters",
    },
    {
        name: "fight",
        "button text": ['attack','Dodge', 'Run'],
        "button functions":[attack, dodge, goTown],
        text:"You are fighting monsters",
    },
    {
        name: "kill monster",
        "button text": ['go to town square','Go to town square', 'Go to town square'],
        "button functions":[goTown,goTown,goTown],
        text:'The monster screams as it dies "arg" "arg" You gained experince, points and find gold ',
    },
    {
        name: "lose",
        "button text": ['REPLAY','REPLAY', 'REPLAY'],
        "button functions":[restart,restart,restart],
        text:'you die ',
    },
    {
        name: "win",
        "button text": ['REPLAY','REPLAY', 'REPLAY'],
        "button functions":[restart,restart,restart],
        text:'youdefeat the dragon  you win the game',
    },
    

];
// initilise buttons 
button1.onclick= goStore;
button2.onclick=goCave;
button3.onclick= fightDragon;



function update(location){
    monsterStats.style.display="none";
    button1.innerText= location["button text"][0];
    button2.innerText= location["button text"][1];
    button3.innerText= location["button text"][2];
    button1.onclick= location["button functions"][0];
    button2.onclick= location["button functions"][1];
    button3.onclick= location["button functions"][2];
    text.innerText=location.text; 
    // another way to write the above line 
    // text.innerText=locaton['text']
}


function goTown(){
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
  
}


function goCave(){
    update(locations[2]);
    console.log("Going to cave")
}



function buyHealth(){
    if (gold<10){
        text.innerText="Not enough gold to buy health"
    }
    else {
        gold -=10 ;
        health +=10;
        goldtext.innerText= gold;
        healthtext.innerText = health;

    }
    
}

function buyWeapon(){
    if (currentWeapon< weapons.length-1){
        if (gold>=30){
            gold-=30;
            currentWeapon++;
            goldtext.innerText= gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText="You now have "+ newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText= "in your inventory you have :"+ inventory;
    
    
    
        }
        else{
             text.innerText= "you do not have enough gold gold to buy weapon";
        }

    }
    else{
        text.innerText= "You have already the most powerful weapon!";
        button2.innerText= "Sell weapon for 15 gold"
        button2.onclick= sellWeapon;

    }
    


}

function sellWeapon(){
    if (inventory.length>1){
        gold +=15
        goldtext.innerText=gold;
        let currentWeapon= inventory.shift();
        text.innerText="you sold a "+ currentWeapon + ".";
        text.innerText= "in your inventory you have "+ inventory;
    }
    else{
        Text.innerText="You cant sell your only weapon!";
    }
}
function fightSlime(){
    fighting = 0
    goFight();

}

function fightBeast(){
    fighting = 1;
    goFight();

}

function fightDragon(){
    console.log("Fighting Dragon")
    fighting =2;
    goFight();
}
function goFight(){
    update(locations[3]);
    monsterHealth= monsters[fighting].health;
    monsterStats.style.display= "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealth.innerText= monsterHealth;


}
function attack (){
    text.innerText= "The"+ monsters[fighting].name + "attacks.",
    text.innerText+= "you attack it with your "+ weapons [currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth-= weapons [currentWeapon].power + Math.foor(Math.random() * xp)+ 1;
    healthtext.innerText= health;
    monsterHealthText.innerText=monsterHealth;

    if (health<=0){
        lose();

    }
    else if (monsterHealth<=0){
        fighting===2?winGame(): defeatMonster();
    }


}

function lose(){
    update(locations[5])

}
function winGame(){
    update(location[6]);
}



 function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldtext.innerText=gold;
    xpText.innerText=xp;
    update(location[4]);

 }


 function dodge (){
    text.innerText= "You dodge the attack from the "+ monsters[fighting].name + "."

 }


function restart(){

}





