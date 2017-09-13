import BaseClass from './../lib/base.js';

import {GameMapHelper} from './map.js';

var ShelterClass = BaseClass.extend({
  name: 'shelter',
  coordinate: 16,

  fish: 0,
  fruits: 0,
  water: 0,

  display(gmap) {
    gmap.set_by_index(this.coordinate, this);
    gmap.display();
  }
});
var Shelter = new ShelterClass();
export default Shelter;