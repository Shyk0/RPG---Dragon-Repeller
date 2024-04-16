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
const button2 = document.querySelector("#button2"); //accedemos al boton con ID #button2
const button3 = document.querySelector("#button3"); //accedemos al boton con ID #button3

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];

const monsters = [
  { name: "slime", level: 2, health: 15 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 }
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

//Inicializacion de los botones
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//Funciones
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0]; //Se llama a la funcion location y nos metemos en la propiedad button text, luego le especificamos que parte del array queremos.
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0]; //Se llama a la funcion location y nos metemos en la propiedad button functions, luego le especificamos que parte del array queremos.
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text; //Se llama a la funcion location y nos metemos en la propiedad text.
}

function goTown() {
  update(locations[0]); //llamamos a la funcion update con la constate locations, y le decimos que nada mas queremos el primer bloque de codigo
}

function goStore() {
  update(locations[1]); //llamamos a la funcion update con la constate locations, y le decimos que nada mas queremos el segundo bloque de codigo
}

function goCave() {
  update(locations[2]); //llamamos a la funcion update con la constate locations, y le decimos que nada mas queremos el tercero bloque de codigo
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10; //cuando el player de click sobre la funcion se descuentan 10 de oro y suma 10 de PH
    health += 10; //diferentes formas de realizar operaciones matematicas
    goldText.innerText = gold; //Actualizamos el texto de la variable gold
    healthText.innerText = health; //Actualizamos el texto de la variable health
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) { //Verificamos si el currentWeapon tiene un numero que no sobre pase weapons
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++; //Cuando el player ejecute esta funcion cambiara en +1 en las armas.
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon); //Agregamos al final del array de invetory usando el metodo push
      text.innerText += " In your inventory you have: " + inventory + ".";
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift; //Borra el primer elemento del array y lo retorna
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health; //Accedemos al array de los monsters y buscamos la propiedad health
  monsterStats.style.display = "block"; //Cuando el jugador ejecute esta funcion las monsterstats se mostraran en pantalla
  monsterName.innerText = monsters[fighting].name; //Accedemos al array monsters y buscamos el nombre y el health
  monsterHealthText.innerText = monsters[fighting].health;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks"; //Accedemos al array monsters y busca el nombre del monster
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level); //Obtenemos el valor de getMonsterAttack y pasa el nivel como un argumento.
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; //genera un número entero aleatorio entre 1 y xp, ambos inclusive.
  } else {
    text.innerText += " You miss.";
  }
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks."; //hay un 10% de que esto suceda haciendo asi que el arma se rompa.
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp)); //Esto hará que el ataque del monstruo sea cinco veces su nivel menos un número aleatorio entre 0 y el xp del jugador.
  console.log(hit);
  return hit > 0 ? hit : 0; // Es una forma abreviada de garantizar que el valor retornado sea al menos cero si hit es negativo o cero.
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20; //Si Math.random es mayor a 0.2 o si el jugador tiene menos de 20 HP, devolvera true, lo cual se hara el golpe.
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7); //Actualizamos el valor de gold sumando el lvl del monster y multiplicado por 6.7. Esto se suma al valor actual de gold; La funcion Math.floor se encarga de redondear el numero para abajo.
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ['stick'];
  goldText.innerText = gold;
  xpText.innerText = xp;
  healthText.innerText = health;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11)); //pusheamos un numero random entre 0 y 10 para el final del array de numbers
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++){
    text.innerText += numbers[i] + "\n";
  }
  if(numbers.includes(guess)){
    text.innerText = "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  }
  else{
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
  }
  if(health <= 0){
    lose()
  }
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}
