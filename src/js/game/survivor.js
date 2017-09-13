import BaseClass from './../lib/base.js';

import {GameMapHelper} from './map.js';
import Signal from './signal.js';
import Shelter from './shelter.js';

var Survivor = BaseClass.extend({
  element_name: 'survivor',

  is_alive: true,

  name: '',

  health: 100,
  fruit_food: 100,
  fish_food: 100,
  water: 100,

  coordinate: 16,
  targetCoordinate: -1,

  next_events: [],

  is_active: false,

  currentJob: false,
  currentJobTime: 0,

  bagFish: 0,
  bagWater: 0,
  bagFruits: 0,

  init(name) {
    // console.log(`hello, my name is ${name}`);
    this.name = name;
    this.fishing = 1 + parseInt(Math.random() * 3);
    this.fruit_picking = 7 + parseInt(Math.random() * 3);
    // this.hunting = parseInt(Math.random() * 10);
    this.d = new SurvivorDisplay(this);
  },
  display(gmap) {
    this.resetActions();
    gmap.get_by_index(this.coordinate).forEach( ent => {
      console.log(ent.name);
      switch (ent.name) {
        case 'fishland':
          this.canFishing = true;
          break;
        case 'fruitland':
          this.canFruits = true;
          break;
        case 'shelter':
          this.canShelter = true;
          break;
        case 'signal':
          this.canSignal = true;
          break;
        case 'wspring':
          this.canWater = true;
          break;
      }      
    });

    //let d = new SurvivorDisplay(this);

    gmap.set_by_index(this.coordinate, this);
    
    gmap.display();

    this.d.render();
  },
  resetActions() {
    this.canMove    = this.currentJob ? false : true;
    this.canFishing = false;
    this.canFruits  = false;
    this.canShelter = false;
    this.canSignal  = false;
    this.canWater   = false;
  },

  move_to(coord) {
    this.currentJob = 'move';
    this.targetCoordinate = coord;
    console.log('move_to');

    console.log(this.coordinate);
    
    let x = GameMapHelper.index_to_x(coord);
    let y = GameMapHelper.index_to_y(coord); 

    let coord_x = GameMapHelper.index_to_x(this.coordinate);
    let coord_y = GameMapHelper.index_to_y(this.coordinate);

    // console.log(x + ':' + y);
    // console.log(coord_x + ':' + coord_y);

    let plus_coord_x  = GameMapHelper.x_y_to_index(1, 0);
    let minus_coord_x = - plus_coord_x;
    let plus_coord_y  = GameMapHelper.x_y_to_index(0, 1);
    let minus_coord_y = - plus_coord_y;

    if (coord_x < x && coord_y < y) {
      this.next_events.push(() => {this.coordinate += plus_coord_x + plus_coord_y; })
    } else if (coord_x > x && coord_y > y) {
      this.next_events.push(() => {this.coordinate += minus_coord_x + minus_coord_y; })
    } else if (coord_x > x && coord_y < y) {
      this.next_events.push(() => {this.coordinate += minus_coord_x + plus_coord_y; })
    } else if (coord_x < x && coord_y > y) {
      this.next_events.push(() => {this.coordinate += plus_coord_x + minus_coord_y; })    
    } else {
      if (coord_x < x) { 
        this.next_events.push(() => {this.coordinate += plus_coord_x;})
      } else if (coord_x > x) {
        this.next_events.push(() => {this.coordinate -= plus_coord_x;})
      } else if (coord_y < y) {
        this.next_events.push(() => {this.coordinate += plus_coord_y;})
      } else if (coord_y > y) {
        this.next_events.push(() => {this.coordinate -= plus_coord_y;})
      }
    }

    if (x == coord_x && y == coord_y) {
      console.log('stop');
      this.currentJob = false;
      if (coord == 16) {
        this.goShelter();
      }
      //this.targetCoordinate = -1;
    } else {
      // console.log('next move');
      this.next_events.push(() => {this.move_to(coord)});
    }
  },
  goShelter() {
    Shelter.fish   += this.bagFish;
    Shelter.water  += this.bagWater;
    Shelter.fruits += this.bagFruits;

    this.bagFish   = 0;
    this.bagWater  = 0;
    this.bagFruits = 0;
  },


  goFishing() {
    this.currentJob = 'fishing';
    this.currentJobTime = 4;
    this.next_events.push( () => this.checkFishing() );
  },
  checkFishing() {
    if (this.currentJob = 'fishing') {
      if (this.currentJobTime % 2 == 0) {
        this.bagFish += 1;
      }
      if (this.currentJobTime == 0) {
        this.currentJob = false;
      } else {
        this.next_events.push( () => this.checkFishing() );
      }
    }
  },

  goFruits() {
    this.currentJob = 'picking_fruit';
    this.currentJobTime = 2;
    this.next_events.push( () => this.checkFruits() );
  },
  checkFruits() {
    if (this.currentJob = 'picking_fruit') {
      this.bagFruits += 4
      if (this.currentJobTime == 0) {
        this.currentJob = false;
      } else {
        this.next_events.push( () => this.checkFruits() );
      }
    }
  },

  goWater() {
    this.currentJob = 'g_water';
    this.currentJobTime = 1;
    this.next_events.push( () => this.checkWater() );
  },
  checkWater() {
    if (this.currentJob = 'g_water') {
      if (this.currentJobTime == 0) {
        this.bagWater += 16;
        this.currentJob = false;
      } else {
        this.next_events.push( () => this.checkWater  () );
      }
    }
  },

  goSignal() {
    this.currentJob = 'b_signal';
    SignalClass.onFire = true;
    this.next_events.push( () => this.checkSignal() );
  },
  checkSignal() {
    if (this.currentJob = 'b_signal') {
      SignalClass.onFire = true;
      this.next_events.push( () => this.checkSignal() );
    } else {
      if (Math.floor(Math.random() * 3) == 0) {
        SignalClass.onFire = false;
      }
    }
  }
});

var SurvivorDisplay = BaseClass.extend({
  init(survivor) {
    this.base = survivor;
    this.name = `s${this.base.name}`
    this.dom_element = document.getElementById(this.name);
  },
  handleEvent(event) {
    this.target_element = event.target || event.srcElement;
    if (this.target_element.className != 'cancel') {

      document.querySelectorAll('.s').forEach(el => el.classList.remove('active'));

      //temp
      //document.getElementById('map').querySelectorAll('td').forEach(el => el.classList.remove('moveTarget'));
      
      this.dom_element.classList.add('active');

      if (this.mapCellEl && this.mapCellEl.target_element) {
        this.mapCellEl.target_element.classList.add('moveTarget');
      }
      // .is_active ???? 
    }
  },
  render() {
    let html = `<div class="name">${this.base.name}</div>`; 
    html += '<img src="" class="avatar">';
    if (!this.base.is_alive) {
      html += '<div class="dead">DEAD</div>';
    } else {
      html += '<div class="status">';
       html += '<div class="job">Waiting</div>';
       html += `<div class="health">Health: ${this.base.health}</div>`;
       html += `<div class="fruit_food">Wants fruits: ${this.base.fruit_food}</div>`;
       html += `<div class="fish_food">Wants fish: ${this.base.fish_food}</div>`;
       html += `<div class="water">Wants water: ${this.base.water}</div>`;
      html += '</div>';
      html += '<div class="actions">';
       html += '<button class="move">Move</button>';
       html += '<button class="g_water">Water</button>';
       html += '<button class="fishing">Fishing</button>';
       html += '<button class="picking_fruit">Pikcing Fruits</button>';
       html += '<button class="b_shelter" style="display: none">Build Shelter</button>';
       html += '<button class="b_signal">Build Signal</button>';
       html += '<button class="guard" style="display: none">Guard</button>';
       html += '<button class="cancel">Cancel</button>';
      html += '</div>';
      html += '<div class="bag">';
       html += '<div class="bFruits">0</div>'
       html += '<div class="bFish">0</div>'
       html += '<div class="bWater">0</div>'
      html += '</div>';
    }
    this.dom_element.innerHTML = html;
    if (this.base.is_active) {
      this.dom_element.classList.add('active');
    }

    this.reloadActions();
    this.reloadStatus();
    this.reloadBag();

    this.dom_element.addEventListener("click", this);
  },
  reloadBag() {
    this.dom_element.getElementsByClassName('bFruits')[0].textContent = this.base.bagFruits;
    this.dom_element.getElementsByClassName('bFish')[0].textContent = this.base.bagFish;
    this.dom_element.getElementsByClassName('bWater')[0].textContent = this.base.bagWater;
  },
  reloadActions() {
    this.dom_element.querySelectorAll('button').forEach(el => el.setAttribute("disabled", "disabled"));

    if (this.base.currentJob) {
      this.dom_element.getElementsByClassName('cancel')[0].removeAttribute('disabled');
    } else {
      // console.log('can move ' + this.base.canMove)
      // if (this.base.canMove) {
        this.dom_element.getElementsByClassName('move')[0].removeAttribute('disabled');
      // }
      if (this.base.canFishing) {
        this.dom_element.getElementsByClassName('fishing')[0].removeAttribute('disabled');
      }
      if (this.base.canFruits) {
        this.dom_element.getElementsByClassName('picking_fruit')[0].removeAttribute('disabled');
      }
      if (this.base.canShelter) {
        this.dom_element.getElementsByClassName('b_shelter')[0].removeAttribute('disabled');
      }
      if (this.base.canSignal) {
        this.dom_element.getElementsByClassName('b_signal')[0].removeAttribute('disabled');
      }
      if (this.base.canWater) {
        this.dom_element.getElementsByClassName('g_water')[0].removeAttribute('disabled');
      }
    }

    // if (!this.moveButtonEl) {
      this.dom_element.getElementsByClassName('move')[0].removeEventListener("click", this.moveButtonEl);
      this.moveButtonEl = new MoveElementClass(this);
      this.dom_element.getElementsByClassName('move')[0].addEventListener("click", this.moveButtonEl);
      console.log('addEventListener 1');
    // }

    this.dom_element.getElementsByClassName('fishing')[0].removeEventListener("click", this.fishingButtonEl);
    this.fishingButtonEl = new FishingElementClass(this);
    this.dom_element.getElementsByClassName('fishing')[0].addEventListener("click", this.fishingButtonEl);

    this.dom_element.getElementsByClassName('picking_fruit')[0].removeEventListener("click", this.pickFruitsButtonEl);
    this.pickFruitsButtonEl = new PikcingFruitElementClass(this);
    this.dom_element.getElementsByClassName('picking_fruit')[0].addEventListener("click", this.pickFruitsButtonEl);

    this.dom_element.getElementsByClassName('b_shelter')[0].removeEventListener("click", this.bShelterButtonEl);
    this.bShelterButtonEl = new BShelterElementClass(this);
    this.dom_element.getElementsByClassName('b_shelter')[0].addEventListener("click", this.bShelterButtonEl);

    this.dom_element.getElementsByClassName('b_signal')[0].removeEventListener("click", this.bSignalButtonEl);
    this.bSignalButtonEl = new BSignalElementClass(this);
    this.dom_element.getElementsByClassName('b_signal')[0].addEventListener("click", this.bSignalButtonEl);

    this.dom_element.getElementsByClassName('g_water')[0].removeEventListener("click", this.gWaterButtonEl);
    this.gWaterButtonEl = new GWaterElementClass(this);
    this.dom_element.getElementsByClassName('g_water')[0].addEventListener("click", this.gWaterButtonEl);

    this.dom_element.getElementsByClassName('cancel')[0].removeEventListener("click", this.cancelButtonEl);
    this.cancelButtonEl = new CancelElementClass(this);
    this.dom_element.getElementsByClassName('cancel')[0].addEventListener("click", this.cancelButtonEl);
  },
  reloadStatus() {
    let status = '';
    switch (this.base.currentJob) {
      case 'move':
        status = 'Moving';
        if (this.mapCellEl && this.mapCellEl.target_element) {
          this.mapCellEl.target_element = document.getElementById('map').querySelectorAll(`[data-index='${this.base.targetCoordinate}']`)[0];
         this.mapCellEl.target_element.classList.add('moveTarget');
        }
        break;
      case 'fishing':
        status = 'Fishing'
        break;
      case 'picking_fruit':
        status = "Pikcing Fruits";
        break;
      case 'b_shelter':
        status = 'Building Shelter';
        break;
      case 'b_signal':
        status = 'Building Signal';
        break;
      case 'g_water':
        status = 'Getting Water';
        break;
      default:
        status = 'Waiting';
      }
    this.dom_element.getElementsByClassName('job')[0].textContent = status;
  },
  removeMoveTarget() {
    // this.base_element.base.mapCellEl = false;
    //document.getElementById('map').getElementsByClassName('moveTarget')[0].classList.remove('moveTarget');
  }
});

var FishingElementClass = BaseClass.extend({
  init(survivorDisplay) {
    this.base_element = survivorDisplay;
    this.base_dom_element = this.base_element.dom_element;
    this.dom_element = this.base_dom_element.getElementsByClassName('fishing')[0];
  },
  handleEvent(event) {
    if (event.type == 'click') {
      this.base_element.base.goFishing();
      this.base_element.reloadActions();
      this.base_element.reloadStatus();
    }
  }
});

var PikcingFruitElementClass = BaseClass.extend({
  init(survivorDisplay) {
    this.base_element = survivorDisplay;
    this.base_dom_element = this.base_element.dom_element;
    this.dom_element = this.base_dom_element.getElementsByClassName('picking_fruit')[0];
  },
  handleEvent(event) {
    if (event.type == 'click') {
      this.base_element.base.goFruits();
      this.base_element.reloadActions();
      this.base_element.reloadStatus();
    }
  }

});

var BShelterElementClass = BaseClass.extend({

});

var BSignalElementClass = BaseClass.extend({
  init(survivorDisplay) {
    this.base_element = survivorDisplay;
    this.base_dom_element = this.base_element.dom_element;
    this.dom_element = this.base_dom_element.getElementsByClassName('b_signal')[0];
  },
  handleEvent(event) {
    if (event.type == 'click') {
      this.base_element.base.goSignal();
      this.base_element.reloadActions();
      this.base_element.reloadStatus();
    }
  }
});

var GWaterElementClass = BaseClass.extend({
  init(survivorDisplay) {
    this.base_element = survivorDisplay;
    this.base_dom_element = this.base_element.dom_element;
    this.dom_element = this.base_dom_element.getElementsByClassName('g_water')[0];
  },
  handleEvent(event) {
    if (event.type == 'click') {
      this.base_element.base.goWater();
      this.base_element.reloadActions();
      this.base_element.reloadStatus();
    }
  }
});

var CancelElementClass = BaseClass.extend({
  init(survivorDisplay) {
    this.base_element = survivorDisplay;
    this.base_dom_element = this.base_element.dom_element;
    this.dom_element = this.base_dom_element.getElementsByClassName('cancel')[0];
  },
  handleEvent(event) {
    if (event.type == 'click') {
      this.base_element.base.currentJob = false;
      this.base_element.base.currentJobTime = 0;
      this.base_element.base.next_events = [];
      this.base_element.reloadActions();
      this.base_element.reloadStatus();

      //temp
      document.getElementById('map').querySelectorAll('td').forEach(el => el.classList.remove('moveTarget'));

    }
  }
});

var MoveElementClass = BaseClass.extend({
  init(survivorDisplay) {
    this.base_element = survivorDisplay;
    this.base_dom_element = this.base_element.dom_element;
    this.dom_element = this.base_dom_element.getElementsByClassName('move')[0];
  },
  handleEvent(event) {
    console.log(event.type);
    if (event.type == 'click') {
      this.base_element.base.next_events = [];

      this.dom_element.setAttribute("disabled", "disabled");

      //temp
      // this.dom_element.removeEventListener("click", this.base_element.moveButtonEl);

      document.getElementById('map').classList.add('moveOn');
      //temp
      document.getElementById('map').querySelectorAll('td').forEach(el => el.classList.remove('moveTarget'));

      // if (!this.base_element.mapCellEl) {
        // this.dom_element.removeEventListener("click", this.base_element.moveButtonEl);
        document.getElementById('map').querySelectorAll('td').forEach(el => el.removeEventListener("click", this.base_element.mapCellEl));
        this.base_element.mapCellEl = new MapCellElementClass(this.base_element);
        document.getElementById('map').querySelectorAll('td').forEach(el => el.addEventListener("click", this.base_element.mapCellEl));
        console.log('addEventListener 2');
      // }
      
    }
  }
});

var MapCellElementClass = BaseClass.extend({
  init(survivorDisplay) {
    this.base_element = survivorDisplay;
    this.base_dom_element = this.base_element.dom_element;
    this.dom_element_arr = document.getElementById('map').querySelectorAll('td');
  },
  handleEvent(event) {
    console.log(event.type);
    if (event.type == 'click') {
      document.getElementById('map').querySelectorAll('td').forEach(el => el.removeEventListener("click", this.base_element.mapCellEl));

      this.target_element = event.target || event.srcElement;

      document.getElementsByClassName('map')[0].classList.remove('moveOn');
      //temp
      // this.dom_element_arr.forEach(el => el.removeEventListener("click", this.base_element.mapCellEl));

      this.target_element.classList.add('moveTarget');

      //console.log(this.target_element);
      //console.log(this.target_element.getAttribute('data-index'));

      this.base_element.base.move_to(this.target_element.getAttribute('data-index'));
      //this.base_element.reloadActions();
      this.base_dom_element.getElementsByClassName('cancel')[0].removeAttribute('disabled');
      this.base_element.reloadStatus();
    }
  }
});


export default Survivor;