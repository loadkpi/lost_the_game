import BaseClass from './../lib/base.js';

import {GameMapHelper} from './map.js';
import Element from './element.js';

var Signal = Element.extend({
  name: 'signal',

  init() {
    let vars = [];
    vars = vars.concat(GameMapHelper.indexes_interval(1, 1, 1, 3));
    vars = vars.concat(GameMapHelper.indexes_interval(1, 1, 3, 1));
    this.generate_coordinate(vars);
  }
});

export default Signal;