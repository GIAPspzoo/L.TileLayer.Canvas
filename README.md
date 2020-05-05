# L.TileLayer.Canvas
Render Leaflet's tiles as canvas elements.

## Why?
If your project has a lot of layers, sometimes performance issues related to GPU may occurred. In our case the easiest way to avoid them is displaying map's tiles not as <img> elements, but draw their on the <canvas>.

## How to use it?
It's very simple - include `L.TileLayer.Canvas`'s .js file and on your map use `L.tileLayer.canvas` instead of `L.tileLayer`. That's it!

## License
MIT