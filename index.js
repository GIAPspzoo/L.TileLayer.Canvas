L.TileLayer.Canvas = L.TileLayer.extend({
  createTile: function(coords, done) {
    let err;

    const tile = document.createElement('canvas');
    const ctx = tile.getContext('2d');

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
    img.crossOrigin = 'anonymous';

    return tile;
  }
});

L.tileLayer.canvas = function tileLayerCanvas(url, options) {
  return new L.TileLayer.Canvas(url, options);
};
