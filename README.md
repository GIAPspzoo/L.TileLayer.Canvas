# L.TileLayer.Canvas
Render Leaflet's tiles as `<canvas>` elements.

## Why?
If your project has a lot of layers, sometimes performance issues related to GPU may occurred. In our case the easiest way to avoid them is displaying map's tiles not as `<img>` elements, but draw their on the `<canvas>`. Just look:
<p align="center">
  <img src="preview.png" alt="If L.TileLayer.Canvas is not applied GPU consumption is 512MB/512MB, if is - 154MB/512MB">
</p>

## How to use it?
It's very simple - include `L.TileLayer.Canvas`'s .js file and on your map use `L.tileLayer.canvas` instead of `L.tileLayer`. That's it!

## License
MIT