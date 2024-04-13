//Variables
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ['stick'];

//Botones
const button1 = document.querySelector('#button1'); //accedemos al boton con ID #button1
const button2 = document.querySelector('#button2'); //accedemos al boton con ID #button2
const button3 = document.querySelector('#button3'); //accedemos al boton con ID #button3

const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
const weapons = [{
  name: 'stick',
  power: 5
  },
  {
    name: 'dagger',
    power: 30
  },
  {
    name: 'claw hammer',
    power: 50
  },
  {
    name: 'sword',
    power: 100
  }
]
const locations = [{
    name: 'town square',
    'button text': ['Go to store','Go to cave','Fight dragon'],
    'button function': [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says \"Store\".'
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: 'cave',
    'button text': ['Fight slime', 'Fight fanged beast', 'Go to town square'],
    'button functions': [fightSlime, fightBeast, goTown],
    text: 'You enter the cave. You see some monsters.'       
  },
  {
    name: "fight",
    "button text": [],
    "button functions":; 
  }
];


//Inicializacion de los botones
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//Funciones
function update(location){
    button1.innerText = location['button text'][0]; //Se llama a la funcion location y nos metemos en la propiedad button text, luego le especificamos que parte del array queremos.
    button2.innerText = location['button text'][1];
    button3.innerText = location['button text'][2];
    button1.onclick = location['button functions'][0];//Se llama a la funcion location y nos metemos en la propiedad button functions, luego le especificamos que parte del array queremos.
    button2.onclick = location['button functions'][1];
    button3.onclick = location['button functions'][2];
    text.innerText = location.text;//Se llama a la funcion location y nos metemos en la propiedad text.
}

function goTown(){
    update(locations[0]); //llamamos a la funcion update con la constate locations, y le decimos que nada mas queremos el primer bloque de codigo
}

function goStore(){
    update(locations[1]);//llamamos a la funcion update con la constate locations, y le decimos que nada mas queremos el segundo bloque de codigo
}

function goCave(){
    update(locations[2]);//llamamos a la funcion update con la constate locations, y le decimos que nada mas queremos el tercero bloque de codigo
}

function fightDragon(){
    console.log('Fighting dragon.');
}

function buyHealth(){
  if (gold >= 10){
      gold = gold - 10; //cuando el player de click sobre la funcion se descuentan 10 de oro y suma 10 de PH
      health += 10;   //diferentes formas de realizar operaciones matematicas
      goldText.innerText = gold;//Actualizamos el texto de la variable gold
      healthText.innerText = health;//Actualizamos el texto de la variable health
    }
    else{
      text.innerText = 'You do not have enough gold to buy health.';
    }
  }

function buyWeapon(){
    if(gold >= 30){
      gold -= 30;
      currentWeapon++; //Cuando el player ejecute esta funcion cambiara en +1 en las armas.
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = 'You now have a new weapon.';
      text.innerText="You now have a " + newWeapon + ".";
    }
}

function fightSlime(){

}

function fightBeast(){

}




