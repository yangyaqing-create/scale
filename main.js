import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { MousePosition, defaults } from 'ol/control';
import { createStringXY } from 'ol/coordinate';
import PluggableMap from 'ol/PluggableMap';

PluggableMap.prototype.getEventPixel = function (event) {
  const viewportPosition = this.viewport_.getBoundingClientRect();
  let size = [viewportPosition.width, viewportPosition.height];
  const view = this.getView();
  if (view) {
    size = view.getViewportSize_();
  }
  const eventPosition =
    //FIXME Are we really calling this with a TouchEvent anywhere?
    'changedTouches' in event
      ? /** @type {TouchEvent} */ (event).changedTouches[0]
      : /** @type {MouseEvent} */ (event);

  return [
    ((eventPosition.clientX - viewportPosition.left) * size[0]) /
      viewportPosition.width,
    ((eventPosition.clientY - viewportPosition.top) * size[1]) /
      viewportPosition.height
  ];
};

var mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position'),
  undefinedHTML: '&nbsp;'
});

var map = new Map({
  controls: defaults({
    attributionOptions: {
      collapsible: false
    }
  }).extend([mousePositionControl]),
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map',
  view: new View({
    projection: 'EPSG:4326',
    center: [116.3913, 39.9074],
    zoom: 18
  })
});
// error example
var mousePositionControl2 = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position2'),
  undefinedHTML: '&nbsp;'
});

var map2 = new Map({
  controls: defaults({
    attributionOptions: {
      collapsible: false
    }
  }).extend([mousePositionControl2]),
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map2',
  view: new View({
    projection: 'EPSG:4326',
    center: [116.3913, 39.9074],
    zoom: 18
  })
});
