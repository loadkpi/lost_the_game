import BaseClass from './../lib/base.js';

class GameMapHelper {
  static x_y_to_index(x, y) {
    return x * 7  + y;
  }
  static index_to_x(index) {
    return Math.floor(index / 7);
  }
  static index_to_y(index) {
    return index % 7;
  }
}

var GameMapClass = BaseClass.extend({
  cells: new Map(),
  //elements: new Map();

  init() {
    //this.cells = new Map();
    //let map = new Map();
    for(let i = 0; i < 48; i++) {
      this.cells[i] = null;
    }
  },
  
  get(x, y) {
    this.cells.get(this.x_y_to_index(x, y));  
  },
  set(x, y, val) {
    this.cells.set(this.x_y_to_index(x, y), val);
  },
  set_by_index(index, val) {
    this.cells.set(index, val);
  },

  clear_cells() {
    this.cells.clear();
  },

  x_y_to_index(x, y) {
    return GameMapHelper.x_y_to_index(x, y);
  },
  index_to_x(index) {
    return GameMapHelper.index_to_x(index);
  },
  index_to_y(index) {
    return GameMapHelper.index_to_y(index);
  },

  display() {
    console.log('display');
    let d = new GameMapDisplay(this);
    d.render();
  }
});


//console.log(GameMapHelper.index_to_x(100000000000000));

var GameMapDisplay  = BaseClass.extend({
  init(map) {
    //console.log('map');
    this.base = map;
    this.name = 'map'
    this.element = document.getElementsByClassName(this.name)[0];
  },
  render() {
    //var body = document.body,
    //let tbl  = document.createElement('table');
    //tbl.style.width  = '600px';
    //tbl.style.border = '1px solid black';
    //tbl.id = 'tbl';
    this.element.innerHTML = '';
    //console.log(this.element);
    for(let i = 0; i <= 6; i++) {
        let tr = this.element.insertRow();
        for(let j = 0; j <= 6; j++) {
          let index = this.base.x_y_to_index(i, j);
          let td = tr.insertCell();
          td.setAttribute('data-index', index);

          let mapElement = this.base.cells.get(index);
          if ( mapElement != null ) {
            //console.log(11);
            //console.log(index);
            //console.log(mapElement);
            td.innerHTML = `<div class="mapel${mapElement.name}">${mapElement.name}</div>`;
          }
        }
    }

    this.base.cells.forEach( (value, key, map) => {
      //alert(`${key}: ${value}`);
      if (value != null) {

      }
    });

    //body.appendChild(tbl);
  }
});
const GameMap = new GameMapClass();

export {GameMapHelper};
export default GameMap;