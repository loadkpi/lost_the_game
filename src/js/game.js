import BaseClass from './lib/base.js';

import GameMap from './game/map.js';
import Survivor from './game/survivor.js';


var GameClass = BaseClass.extend({
  time: 0,
  entities: new Set(),

  next_turn() {
    this.time += 1;

    GameMap.clear_cells();
    
    //this.emit(`h${this.time}`);
    this.entities.forEach( ent => ent.emit(`h${this.time}`) );

    this.entities.forEach( ent => { 
      let events = ent.next_events;
      ent.next_events = [];
      events.forEach( evt => evt() );
      
    });

    console.log('time:' + this.time);
  },
  next_turn_event(fun) {
    //var next_hour = this.time + 1;
    //this.on(`h${next_hour}`, fun);
  },
  event_in(h, fun) {
    //var next_hour = this.time + h;
    //this.on(`h${next_hour}`, fun);
  },

  startGame() {
    this.nextTurnEl = new NextTurnElementClass(this);
    this.nextTurnEl.dom_element.addEventListener("click", this.nextTurnEl);

    Game.entities.add(new Survivor('Bob'));
    //Game.entities.add(new Survivor('Tom'));
    Game.entities.forEach( ent => {
      //console.log(ent);
      ent.display(GameMap);
    });

    GameMap.display();
  }
});
var NextTurnElementClass = BaseClass.extend({
  init(game) {
    this.base_element = game;
    this.dom_element = document.getElementById('nextTurn');
  },
  handleEvent(event) {
    console.log(event.type);
    if (event.type == 'click') {
      this.base_element.next_turn();
    }
  }
});


const Game = new GameClass();

export default Game;