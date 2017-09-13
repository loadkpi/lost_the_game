import BaseClass from './lib/base.js';

import GameMap from './game/map.js';

import FishLand from './game/fish_land.js';
import FruitLand from './game/fruit_land.js';
import Shelter from './game/shelter.js';
import Signal from './game/signal.js';
import Survivor from './game/survivor.js';
import WaterSpring from './game/water_spring.js';

var GameClass = BaseClass.extend({
  time: 0,
  entities: new Set(),

  next_turn() {
    this.time += 1;

    GameMap.clear_cells();
        this.entities.forEach( ent => ent.emit(`h${this.time}`) );

    this.entities.forEach( ent => {
      if (ent.currentJobTime) {
        ent.currentJobTime -= 1;
      }

      let events = ent.next_events;
      if (events) {
        ent.next_events = [];
        events.forEach( evt => evt() );
      }
      ent.display(GameMap);
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

    

    let f1 = new FishLand();
    Game.entities.add(f1);
    Game.entities.add(new FishLand(f1.coordinate));

    Game.entities.add(Signal);

    Game.entities.add(new FruitLand());
    Game.entities.add(new FruitLand(2));

    Game.entities.add(new WaterSpring());
    Game.entities.add(new WaterSpring(2));

    Game.entities.add(Shelter);

    //survivors
    //should be last
    let s1 = new Survivor('Bob');
    s1.is_active = true;
    Game.entities.add(s1);
    Game.entities.add(new Survivor('Tom'));
    Game.entities.add(new Survivor('Ron'));
    Game.entities.add(new Survivor('Max'));
    
    Game.entities.forEach( ent => {
      ent.display(GameMap);
    });

    GameMap.display();
  },
  reload() {

  }
});
var NextTurnElementClass = BaseClass.extend({
  init(game) {
    this.base_element = game;
    this.dom_element = document.getElementById('nextTurn');
  },
  handleEvent(event) {
    if (event.type == 'click') {
      this.base_element.next_turn();
    }
  }
});


const Game = new GameClass();

export default Game;