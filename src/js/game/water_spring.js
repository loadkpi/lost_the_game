import BaseClass from './../lib/base.js';

import {GameMapHelper} from './map.js';
import Element from './element.js';

var WaterSpring = Element.extend({
  name: 'wspring',

  init(type = 1) {
    let vars = [];
    if (type == 1) {
      vars = vars.concat(GameMapHelper.indexes_interval(4, 1, 4, 4));
      vars = vars.concat(GameMapHelper.indexes_interval(1, 4, 4, 4));
    } else {
      vars = vars.concat(GameMapHelper.indexes_interval(5, 1, 5, 5));
      vars = vars.concat(GameMapHelper.indexes_interval(1, 5, 5, 5));
    }
    this.generate_coordinate(vars);
  }
});

export default WaterSpring;