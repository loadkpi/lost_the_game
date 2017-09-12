import BaseClass from './../lib/base.js';

import {GameMapHelper} from './map.js';
import Element from './element.js';

var FruitLand = Element.extend({
  name: 'fruitland',

  init(type = 1) {
    let vars = [];
    if (type == 1) {
      vars = vars.concat(GameMapHelper.indexes_interval(5, 0, 5, 5));
      vars = vars.concat(GameMapHelper.indexes_interval(0, 5, 5, 5));
    } else {
      vars = vars.concat(GameMapHelper.indexes_interval(6, 1, 6, 5));
      vars = vars.concat(GameMapHelper.indexes_interval(1, 6, 5, 6));
    }
    this.generate_coordinate(vars);
  }
});

export default FruitLand;