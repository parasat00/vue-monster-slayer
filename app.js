const { createApp } = Vue;

function randomDmg(min, max) {
 return Math.floor(Math.random() * (max - min)) + min;
}

createApp({
 data() {
  return {
   player_health: 100,
   foe_health: 100,
   currentRound: 0,
   winner: null,
   logs: []
  };
 },
 watch: {
  player_health() {
   if(this.player_health <= 0 && this.foe_health <= 0) {
    this.winner = 'draw';
   }
   else if(this.player_health <= 0) {
    this.winner = 'foe';
   }
  },
  foe_health() {
   if(this.foe_health <= 0 && this.player_health <= 0) {
    this.winner = 'draw';
   }
   else if(this.foe_health <= 0) {
    this.winner = 'player';
   }
  }
 },
 computed: {
  foeHealthBar() {
   if(this.foe_health < 0) {
    return { width: '0%' };
   }
   return { width: this.foe_health + '%' };
  },
  playerHealthBar() {
   if(this.player_health < 0) {
    return { width: '0%' };
   }
   return { width: this.player_health + '%' };
  },
  specialAtackable() {
   return this.currentRound % 3 !== 0;
  }
 },
 methods: {
  startGame() {
   this.player_health = 100;
   this.foe_health = 100;
   this.winner = null;
   this.currentRound = 0;
   this.logs = [];
  },
  atackFoe() {
   this.currentRound++;
   const dmg = randomDmg(5, 12);
   this.foe_health -= dmg;
   this.addLog("Player", true, dmg);
   setTimeout(this.atackPlayer, 1000);
  },
  atackPlayer() {
   const dmg = randomDmg(8, 15);
   this.player_health -= dmg;
   this.addLog("Monster", true, dmg);
  },
  specialAtackFoe() {
   this.currentRound++;
   const dmg = randomDmg(10, 25);
   this.foe_health -= dmg;
   this.addLog("Player", true, dmg);
   setTimeout(this.atackPlayer, 1000);
  },
  healPlayer() {
   this.currentRound++;
   const heal = randomDmg(8, 20);
   this.player_health = this.player_health + heal > 100 ? 100 : this.player_health + heal;
   this.addLog("Player", false, heal);
   setTimeout(this.atackPlayer, 1000);
  },
  surrender() {
   this.winner = "foe";
  },
  addLog(who, atack, val) {
   this.logs.unshift({user: who, atack: atack, dmg: val});
  }
 }
}).mount("#game");