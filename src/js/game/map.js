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
  //elements: new Map();

  init() {
    //this.cells = new Map();
    //let map = new Map();
    // for(let i = 0; i < 48; i++) {
    //   this.cells[i] = new Set();
    // }
    this.clear_cells();
  },
  
  get(x, y) {
    this.cells.get(this.x_y_to_index(x, y));  
  },
  set(x, y, val) {
    this.cells.set_by_index(this.x_y_to_index(x, y), val);
  },
  set_by_index(index, val) {
    //console.log(this.cells);
    //console.log(this.cells[16]);
    //console.log(index);
    //console.log(this.cells[index]);
    // console.log('set on ' + index);
    // console.log(val);
    this.cells.set(index, this.cells.get(index).add(val));
  },

  clear_cells() {
    // console.log('clear');
    this.cells.clear();
    for(let i = 0; i < 48; i++) {
      this.cells.set(i, new Set());
    }
    // console.log(this.cells);
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
          if ( mapElement ) {
            let tdHtml = '';
            mapElement.forEach( el => tdHtml += `<div class="mapel${el.name}">${el.name}</div>`)
            //console.log(11);
            //console.log(index);
            //console.log(mapElement);
            td.innerHTML = tdHtml;
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