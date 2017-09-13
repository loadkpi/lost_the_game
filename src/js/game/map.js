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
  static indexes_interval(x1, y1, x2, y2) {
    let ii = [];
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        ii.push( GameMapHelper.x_y_to_index(x, y) );
      }
    }
    return ii;
  }
}

var GameMapClass = BaseClass.extend({
  cells: new Map(),

  init() {
    this.clear_cells();
  },
  
  get(x, y) {
    return this.cells.get(this.x_y_to_index(x, y));  
  },
  set(x, y, val) {
    this.cells.set_by_index(this.x_y_to_index(x, y), val);
  },
  set_by_index(index, val) {
    this.cells.set(index, this.cells.get(index).add(val));
  },
  get_by_index(index) {
    return this.cells.get(index);
  },

  clear_cells() {
    this.cells.clear();
    for(let i = 0; i < 48; i++) {
      this.cells.set(i, new Set());
    }
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
    let d = new GameMapDisplay(this);
    d.render();
  }
});


var GameMapDisplay  = BaseClass.extend({
  init(map) {
    this.base = map;
    this.name = 'map'
    this.element = document.getElementsByClassName(this.name)[0];
  },
  render() {
    this.element.innerHTML = '';
    for(let i = 0; i <= 6; i++) {
        let tr = this.element.insertRow();
        for(let j = 0; j <= 6; j++) {
          let index = this.base.x_y_to_index(i, j);
          let td = tr.insertCell();
          td.setAttribute('data-index', index);

          let mapElement = this.base.cells.get(index);
          if ( mapElement ) {
            let tdHtml = '';
            mapElement.forEach( el => tdHtml += `<div class="mapel${el.name}">${el.name}</div>`)
            td.innerHTML = tdHtml;
          }
        }
    }

    this.base.cells.forEach( (value, key, map) => {
      if (value != null) {

      }
    });
  }
});
const GameMap = new GameMapClass();

export {GameMapHelper};
export default GameMap;