L.TileLayer.Canvas = L.TileLayer.extend({
  createCanvas: function (tile, coords, done) {
    let err;
    const ctx = tile.getContext("2d");

    const { x: width, y: height } = this.getTileSize();
    tile.width = width;
    tile.height = height;

    const img = new Image();
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
    img.src = this.getTileUrl(coords);
    img.crossOrigin = "anonymous";
  },
  createTile: function (coords, done) {
    const { timeout, delay } = this.options;
    const tile = document.createElement("canvas");

    if (timeout) {
      setTimeout(() => {
        this.createCanvas(tile, coords, done);
      }, delay || 1000);
    } else {
      this.createCanvas(tile, coords, done);
    }

    return tile;
  },
});

L.tileLayer.canvas = function tileLayerCanvas(url, options) {
  return new L.TileLayer.Canvas(url, options);
};
