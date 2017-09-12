//import $ from './domtastic';

import Game from './game.js';
saass from sfdsf;
//import GameMap from './game/map.js';
//import GameMapHelper from './game/map.js';

//import Survivor from './game/survivor.js';

Game.startGame();
//let gmap = new GameMap();

// let s1 = new Survivor('Bob');
// s1.display(GameMap);
//console.log(s1.object_name);


//m.set(4,6, s);
//m.set(6,6, 10);
//console.log(m.cells);
//console.log(m);
//GameMap.display();


//Game.entities.add(s1);

// function nextTurn() {
//   Game.next_turn();
// }
// document.getElementById('nextTurn').addEventListener("click", nextTurn);


/*
import BaseClass from './lib/base.js';
var Game = BaseClass.extend({
  time: 0,
  entities: new Set(),

  next_turn() {
    this.time += 1;

    gmap.clear_cells();

    //this.emit(`h${this.time}`);
    //console.log(this.entities);
    this.entities.forEach( ent => ent.emit(`h${this.time}`) );

    this.entities.forEach( ent => { 
      //ent.next_event();
      //console.log(ent.name);
      //console.log(ent.next_events);
      //ent.next_event = function(){};
      let events = ent.next_events;
      ent.next_events = [];
      events.forEach( evt => evt() );
      
    });

    //console.log('gmap')
    
    //this.entities.forEach( ent => { 

    //this.entities.forEach( ent => ent.emit(`h${this.time}`) );

    // this.entities.forEach( ent => { 
    //   ent.events_stack.forEach( (event, time, map) => {
    //     this.event_in(time, event);
    //   }); 
    // });

    console.log('time:' + this.time);
  },
  next_turn_event(fun) {
    //var next_hour = this.time + 1;
    //this.on(`h${next_hour}`, fun);
  },
  event_in(h, fun) {
    //var next_hour = this.time + h;
    //this.on(`h${next_hour}`, fun);
  }
});
//console.log(Game.time);
const G = new Game();
G.entities.add(s1);

function nextTurn() {
  G.next_turn();
}
document.getElementById('nextTurn').addEventListener("click", nextTurn);


//console.log(G.time);

// var AClass = BaseClass.extend({
//   z: []
// });
// var A = new AClass();
// console.log(A.z); 

// var C = 111;
// var BClass = BaseClass.extend({
//   z: 1,
//   f() {
//     console.log(C);
//   }
// });
// var B = new BClass();
// console.log(B.z);

// A.z.push(B);
// console.log(A.z[0].z); 

// C = 2222;
// B.z = 2;
// B.f();

// console.log(A.z[0].z); 

/*

import BaseClass from './lib/base.js';

function generateRoute(x, y, survivor, hour = 1) {
  if (survivor.coord_x < x) {
    start_x += 
  G.event_in(hour, function(){ survivor.coord_x += 1});
  } else if (survivor.coord_x > x) {
  G.event_in(hour, function(){ survivor.coord_x -= 1});
  } else if (start_x < end_x) {
  G.event_in(hour, function(){ survivor.coord_x += 1});
  } else if (start_x < end_x) {
  G.event_in(hour, function(){ survivor.coord_x += 1});
  }
}

var Survivor = BaseClass.extend({
  coord_x: 2,
  coord_y: 2,
  is_active: false,
  move_to(x,y) {
      this.is_active = true;
    if (this.coord_x < x && this.coord_y < y) {
    G.next_turn_event(() => {this.coord_x += 1; this.coord_y += 1});
    } else if (this.coord_x > x && this.coord_y > y) {
      G.next_turn_event(() => {this.coord_x -= 1; this.coord_y -= 1});
    } else {
      if (this.coord_x < x) { 
      G.next_turn_event(() => this.coord_x += 1);
      } else if (this.coord_x > x) {
      G.next_turn_event(() => this.coord_x -= 1);
      } else if (this.coord_y < y) {
      G.next_turn_event(() => this.coord_y += 1);
      } else if (this.coord_y > y) {
      G.next_turn_event(() => this.coord_y -= 1);
      }
    }
    if (x == this.coord_x && y == this.coord_y) {
    console.log('stop');
    } else {
      G.next_turn_event(() =>this.move_to(x, y));
    }
  }
});
var Bob = new Survivor();

var Game = BaseClass.extend({
  time: 0,
  next_turn() {
    this.time += 1;
  this.emit(`h${this.time}`);
  },
  next_turn_event(f) {
  console.log('d');
    var next_hour = this.time + 1;
    this.on(`h${next_hour}`, f);
  },
  event_in(h, f) {
  var next_hour = this.time + h;
    this.on(`h${next_hour}`, f);
  }
});
const G = new Game();
//G.on('h0', function(){ console.log(13346) });
//G.on('h1', function(){ console.log(133467) });

//G.next_turn_event( function(){ Bob.coord_x += 10; });
//G.next_turn();
//G.on('h2', function(){ Bob.coord_x += 1; });
//G.next_turn();


Bob.move_to(4, 5);
G.next_turn();
console.log(Bob.coord_x + ':' + Bob.coord_y);
G.next_turn();
console.log(Bob.coord_x + ':' + Bob.coord_y);
G.next_turn();
console.log(Bob.coord_x + ':' + Bob.coord_y);
G.next_turn();
console.log(Bob.coord_x + ':' + Bob.coord_y);
G.next_turn();
console.log(Bob.coord_x + ':' + Bob.coord_y);
G.next_turn();
console.log(Bob.coord_x + ':' + Bob.coord_y);
G.next_turn();
console.log(Bob.coord_x + ':' + Bob.coord_y);


function tableCreate(){
    var body = document.body,
        tbl  = document.createElement('table');
    tbl.style.width  = '600px';
    tbl.style.border = '1px solid black';
  tbl.id = 'tbl';

    for(var i = 0; i < 6; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 6; j++){
            if(false && i == 2 && j == 1){
                break;
            } else {
                var td = tr.insertCell();
                td.appendChild(document.createTextNode('---'));
                td.style.border = '1px solid black';
                if(false && i == 1 && j == 1){
                    td.setAttribute('rowSpan', '2');
                }
            }
        }
    }
    body.appendChild(tbl);
}
tableCreate();

/*
var Survivor = BaseClass.extend({
  name: '',
  health: 100,
  // strenth: 100,
  food: 100,
  water: 100,

  fishing: 0,
  // hunting: 0,
  fruit_picking: 0,

  coord_x: 0,
  coord_y: 0,

  current_work: false,
  current_work_time: 0,

  init(name) {
    console.log(`hello, my name is ${name}`);
    this.name = name;
    this.fishing = 1 + parseInt(Math.random() * 3);
    this.fruit_picking = 7 + parseInt(Math.random() * 3);
    // this.hunting = parseInt(Math.random() * 10);
    emitter.emit('boom');
    emitter.emit('boom');
  },

  sleep() {

  },
  wakeup() {

  }, 

  pick_up_fruits() {
    this.current_work = true;
    this.current_work_time = 8;

  },
  take_fish() {

  },
  get_water() {

  },

  move(x, y) {
    this.coord_x = x;
    this.coord_y = y;
  },

  build_shetler() {

  },
  build_hut() {

  },

  guard_supplies() {

  },

  light_signal_fire() {

  },
  guard_signal_fire() {

  },

  // :(
  die() {

  },
  
  decrease_health(minus_health) {
    this.health -= minus_health;
    if (this.health <= 0) {
       this.health = 0;
       die();
    }
  },
  decrease_water(minus_water) {
    //25 * 4
    this.water -= minus_water;
    if (this.water <= 0) {
      this.water = 0;
      decrease_health(4);
    }
  },
  decrease_food_fruits(minus_fruits) {
    this.food_fruits -= minus_fruits;
    if (this.food_fruits <= 0) {
      this.food_fruits = 0;
      decrease_health(2);
    }    
  },
  decrease_fish_food(minus_fish) {
    this.fish_food -= minus_fish;
    if (this.fish_food <= 0) {
      this.fish_food = 0;
      decrease_health(2);
    }
  }

  next_hour() {
    //work
    if (this.current_work) {
      this.current_work_time -= 1;
      if (this.current_work_time == 0) {
        this.current_work = false;
      }
    }

    decrease_water(4);
    decrease_fish_food(1/12);
    decrease_fruit_food(1/6);
  }

})


var Building = BaseClass.extend({

});
var Shetler = Building.extend({

});
var Hut = Building.extend({

});


var SignalFire = BaseClass.extend({

});

var FishingArea = BaseClass.extend({

});
var FruitsArea = BaseClass.extend({

});


var Time = BaseClass.extend({

});
var Weather = BaseClass.extend({

});

// var Bob = new Survivor();
// Bob.health = 20;
// console.log(Bob.health);
// console.log(Bob.fishing);

import Emitter from './classes/emitter.js';

var Game = new Emitter();

// game.on( 'next',)

var emitter = new Emitter();

// Bind event handler to a given event
emitter.on( 'boom', function() { console.log('it went boom!') } );

// Emit that event
 // 'it went boom!'

var Bob = new Survivor('Bob')
var Tom = new Survivor('Tom');
var Ron = new Survivor('Ron');
var Max = new Survivor('Max');

// Max.on( 'next_turn', () => { 
//   console.log(this) 
// } );
// Max.emit('next_turn');

/*

Игра

Игра.следующий ход
- вызвать для каждого элемента ход

Элемент.ход
- 

*/