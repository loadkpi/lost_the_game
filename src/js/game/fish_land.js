import BaseClass from './../lib/base.js';

import {GameMapHelper} from './map.js';
import Element from './element.js';

var FishLand = Element.extend({
  name: 'fishland',

  init(exceptCoord = false) {
    this.generate_coordinate(exceptCoord);
  },
  generate_coordinate(exceptCoord = false) {
    let vars = [];
    vars = vars.concat(GameMapHelper.indexes_interval(0, 0, 0, 4));
    vars = vars.concat(GameMapHelper.indexes_interval(0, 0, 4, 0));
    
    let varsSet = new Set(vars);
    if (exceptCoord != false) {
      varsSet.delete(exceptCoord)
    }
    vars = [ ...varsSet ];

    this.coordinate = vars[ parseInt(Math.random() * vars.length) ]
  }
});

export default FishLand;