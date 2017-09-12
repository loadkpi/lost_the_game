import BaseClass from './../lib/base.js';

import {GameMapHelper} from './map.js';


var Survivor = BaseClass.extend({
  element_name: 'survivor',

  is_alive: true,

  name: '',

  health: 100,
  fruit_food: 100,
  fish_food: 100,
  water: 100,

  coordinate: 16,

  next_events: [],


  init(name) {
    console.log(`hello, my name is ${name}`);
    this.name = name;
    this.fishing = 1 + parseInt(Math.random() * 3);
    this.fruit_picking = 7 + parseInt(Math.random() * 3);
    // this.hunting = parseInt(Math.random() * 10);
    //emitter.emit('boom');
    //emitter.emit('boom');
  },
  display(gmap) {
    if (gmap === undefined) {
      gmap = this.gmap;
    }
    this.gmap = gmap;

    //console.log(this);
    let d = new SurvivorDisplay(this);
    d.render();

    //console.log(11);
    gmap.set_by_index(this.coordinate, this);
    gmap.display();
  },

  move_to(coord) {
    console.log('move_to');
    //this.name = 'name ' + parseInt(Math.random(1) * 100);

    //console.log(this.coordinate);
    //console.log(coord);
    //return false;
    
    //this.is_active = true;
    //console.log(GameMapHelper);

    let x = GameMapHelper.index_to_x(coord);
    let y = GameMapHelper.index_to_y(coord); 

    let coord_x = GameMapHelper.index_to_x(this.coordinate);
    let coord_y = GameMapHelper.index_to_y(this.coordinate);

    console.log(x + ':' + y);
    console.log(coord_x + ':' + coord_y);

    let plus_coord_x  = GameMapHelper.x_y_to_index(1, 0);
    let minus_coord_x = - plus_coord_x;
    let plus_coord_y  = GameMapHelper.x_y_to_index(0, 1);
    let minus_coord_y = - plus_coord_y;
    //console.log(GameMapHelper.index_to_x(1));
    //console.log(plus_coord_x + plus_coord_y);

    if (coord_x < x && coord_y < y) {
      this.next_events.push(() => {this.coordinate += plus_coord_x + plus_coord_y; })
      //G.next_turn_event(() => {this.coord_x += 1; this.coord_y += 1});
    } else if (coord_x > x && coord_y > y) {
      this.next_events.push(() => {this.coordinate += minus_coord_x + minus_coord_y; })
      //G.next_turn_event(() => {this.coord_x -= 1; this.coord_y -= 1});
    } else if (coord_x > x && coord_y < y) {
      this.next_events.push(() => {this.coordinate += minus_coord_x + plus_coord_y; })
    } else if (coord_x < x && coord_y > y) {
      this.next_events.push(() => {this.coordinate += plus_coord_x + minus_coord_y; })    
    } else {
      if (coord_x < x) { 
        this.next_events.push(() => {this.coordinate += plus_coord_x;})
        //G.next_turn_event(() => this.coord_x += 1);
      } else if (coord_x > x) {
        this.next_events.push(() => {this.coordinate -= plus_coord_x;})
        //G.next_turn_event(() => this.coord_x -= 1);
      } else if (coord_y < y) {
        this.next_events.push(() => {this.coordinate += plus_coord_y;})
        //G.next_turn_event(() => this.coord_y += 1);
      } else if (coord_y > y) {
        this.next_events.push(() => {this.coordinate -= plus_coord_y;})
        //G.next_turn_event(() => this.coord_y -= 1);
      }
    }
    // if (coord_x < x && coord_y < y) {
    //   this.next_event = () => {this.coord_x += 1; this.coord_y += 1; console.log(this); }
    //   //G.next_turn_event(() => {this.coord_x += 1; this.coord_y += 1});
    // } else if (coord_x > x && coord_y > y) {
    //   this.next_event = () => {this.coord_x -= 1; this.coord_y -= 1}
    //   //G.next_turn_event(() => {this.coord_x -= 1; this.coord_y -= 1});
    // } else {
    //   if (coord_x < x) { 
    //     this.next_event = () => this.coord_x += 1;
    //     //G.next_turn_event(() => this.coord_x += 1);
    //   } else if (coord_x > x) {
    //     this.next_event = () => this.coord_x -= 1;
    //     //G.next_turn_event(() => this.coord_x -= 1);
    //   } else if (coord_y < y) {
    //     this.next_event = () => this.coord_y += 1;
    //     //G.next_turn_event(() => this.coord_y += 1);
    //   } else if (coord_y > y) {
    //     this.next_event = () => this.coord_y -= 1;
    //     //G.next_turn_event(() => this.coord_y -= 1);
    //   }
    // }
    //console.log(x + ':' + y);
    //console.log(coord_x + ':' + coord_y);

    if (x == coord_x && y == coord_y) {
      console.log('stop');
    } else {
      console.log('next move');
      this.next_events.push(() => {this.move_to(coord)});
      this.next_events.push(() => {this.display()});
      //G.next_turn_event(() =>this.move_to(x, y));
    }
  }
});

var SurvivorDisplay = BaseClass.extend({
  init(survivor) {
    this.base = survivor;
    this.name = `s${this.base.name}`
    this.element = document.getElementsByClassName(this.name)[0];
  },
  render() {
    //console.log(this.name);
    //console.log(this.element);
    let html = `<div class="name">${this.base.name}</div>`; 
    html += '<img src="" class="avatar">';
    if (!this.base.is_alive) {
      html += '<div class="dead">DEAD</div>';
    } else {
      html += '<div class="status">';
       html += `<div class="health">Health: ${this.base.health}</div>`;
       html += `<div class="fruit_food">Fruits: ${this.base.fruit_food}</div>`;
       html += `<div class="fish_food">Fish: ${this.base.fish_food}</div>`;
       html += `<div class="water">Water: ${this.base.water}</div>`;
      html += '</div>';
      html += '<div class="actions">';
       html += '<button class="move">Move</button>';
      html += '</div>';
      html += '<div class="bag">';
       html += '<div class="empty">Empty</div>'
      html += '</div>';
    }
    this.element.innerHTML = html;

    this.moveButtonEl = new MoveElementClass(this);
    this.element.getElementsByClassName('move')[0].addEventListener("click", this.moveButtonEl);
  }
});

var MoveElementClass = BaseClass.extend({
  init(survivorDisplay) {
    this.base_element = survivorDisplay;
    this.dom_element = document.getElementsByClassName('move')[0];
  },
  handleEvent(event) {
    console.log(event.type);
    if (event.type == 'click') {
      this.base_element.base.next_events = [];

      this.dom_element.setAttribute("disabled", "disabled");

      this.dom_element.removeEventListener("click", this.base_element.moveButtonEl);

      document.getElementsByClassName('map')[0].classList.add('moveOn');
      document.getElementsByClassName('map')[0].querySelectorAll('td').forEach(el => el.classList.remove('moveTarget'));

      this.base_element.mapCellEl = new MapCellElementClass(this.base_element);
      document.getElementsByClassName('map')[0].querySelectorAll('td').forEach(el => el.addEventListener("click", this.base_element.mapCellEl));
    }
  }
});

var MapCellElementClass = BaseClass.extend({
  init(survivorDisplay) {
    this.base_element = survivorDisplay;
    this.dom_element_arr = document.getElementsByClassName('map')[0].querySelectorAll('td');
  },
  handleEvent(event) {
    console.log(event.type);
    if (event.type == 'click') {
      this.target_element = event.target || event.srcElement;
//        console.log(targetElement);

      document.getElementsByClassName('map')[0].classList.remove('moveOn');
      this.dom_element_arr.forEach(el => el.removeEventListener("click", this.base_element.mapCellEl));

      document.getElementsByClassName('move')[0].removeAttribute('disabled');
      document.getElementsByClassName('move')[0].addEventListener("click", this.base_element.moveButtonEl);

      this.target_element.classList.add('moveTarget');

      //console.log(this.target_element);
      //console.log(this.target_element.getAttribute('data-index'));

      this.base_element.base.move_to(this.target_element.getAttribute('data-index'));
    }
  }
}); 

// function handler() {
//   //alert( 'Спасибо!' );
//   console.log(this);
//   console.log(obj);
//   this.setAttribute("disabled", "disabled");

//   document.getElementsByClassName('move')[0].removeEventListener("click", handler);

//   document.getElementsByClassName('map')[0].classList.add('moveOn');
//   document.getElementsByClassName('map')[0].querySelectorAll('td').forEach(el => el.addEventListener("click", clickHandler));
//   document.getElementsByClassName('map')[0].querySelectorAll('td').forEach(el => el.classList.remove('moveTarget'));
// }

// function clickHandler() {
//   console.log(this);
//   document.getElementsByClassName('map')[0].classList.remove('moveOn');
//   document.getElementsByClassName('map')[0].querySelectorAll('td').forEach(el => el.removeEventListener("click", clickHandler));

//   document.getElementsByClassName('move')[0].removeAttribute('disabled');
//   document.getElementsByClassName('move')[0].addEventListener("click", handler);


//   this.classList.add('moveTarget');
// }

// ....
//document.getElementsByClassName('move')[0].removeEventListener("click", handler);

export default Survivor;