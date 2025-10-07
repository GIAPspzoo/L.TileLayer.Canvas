L.TileLayer.Canvas = L.TileLayer.extend({
  _delays: {},
  _delaysForZoom: null,
  createCanvas: function (tile, coords, done) {
    let err;
    const ctx = tile.getContext("2d");
    const { doubleSize } = this.options;

    const { x: width, y: height } = this.getTileSize();
    tile.width = doubleSize ? width * 2 : width;
    tile.height = doubleSize ? height * 2 : height;

    const img = new Image();
    img.onerror = this._tileOnError.bind(this, done, img);
    img.onload = () => {
      try {
        ctx.drawImage(img, 0, 0);
        tile.complete = true;
      } catch (e) {
        err = e;
      } finally {
        done(err, tile);
      }
    };

    const tileZoom = this._getZoomForUrl();
    img.src = isNaN(tileZoom) ? '' : this.getTileUrl(coords);
    img.crossOrigin = 'anonymous';

    const key = this._tileCoordsToKey(coords);
    this._tilesImages[key] = img;
  },
  createTile: function (coords, done) {
    const { timeout } = this.options;
    const { z: zoom } = coords;
    const tile = document.createElement("canvas");

    if (timeout) {
      if (zoom !== this._delaysForZoom) {
        this._clearDelaysForZoom();
        this._delaysForZoom = zoom;
      }

      if (!this._delays[zoom]) this._delays[zoom] = [];

      this._delays[zoom].push(setTimeout(() => {
        this.createCanvas(tile, coords, done);
      }, timeout));
    } else {
      this.createCanvas(tile, coords, done);
    }

    return tile;
  },
  onAdd: function() {
    this._initContainer();

    this._levels = {};
    this._tiles = {};
    this._tilesImages = {};

    this._resetView();
    this._update();
  },
  _clearDelaysForZoom: function() {
    const prevZoom = this._delaysForZoom;
    const delays = this._delays[prevZoom];

    if (!delays) return;

    delays.forEach((delay, index) => {
      clearTimeout(delay);
      delete delays[index];
    });

    delete this._delays[prevZoom];
  },
  _abortLoading: function() {
    var i, tile, img;
    for (i in this._tiles) {
      if (this._tiles[i].coords.z !== this._tileZoom) {
        img = this._tilesImages[i] || {};
        tile = this._tiles[i].el;

        img.onload = L.Util.falseFn;
        img.onerror = L.Util.falseFn;

        if (!tile.complete) {
          img.src = L.Util.emptyImageUrl;
          L.DomUtil.remove(img);
          delete this._tilesImages[i];
          delete this._tiles[i];
        }
      }
    }
  }
});

L.tileLayer.canvas = function tileLayerCanvas(url, options) {
  options = options || {};
  if (typeof options.doubleSize == 'undefined') {
    options.doubleSize = L.Browser.retina;
  }

  return new L.TileLayer.Canvas(url, options);
};
