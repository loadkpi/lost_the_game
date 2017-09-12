import BaseClass from './../lib/base.js';

import {GameMapHelper} from './map.js';

var Element = BaseClass.extend({
  coordinate: -1,

  generate_coordinate(vars, exceptCoord = false) {
    let varsSet = new Set(vars);
    if (exceptCoord != false) {
      varsSet.delete(exceptCoord)
    }
    vars = [ ...varsSet ];

    this.coordinate = vars[ parseInt(Math.random() * vars.length) ]
  },
  display(gmap) {
    gmap.set_by_index(this.coordinate, this);
    gmap.display();
  }
});

export default Element;