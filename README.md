# L.TileLayer.Canvas
Render Leaflet's tiles as `<canvas>` elements.

## Why?
If your project has a lot of layers, sometimes performance issues related to GPU may occurred. In our case the easiest way to avoid them is displaying map's tiles not as `<img>` elements, but draw their on the `<canvas>`. Just look:
<p align="center">
  <img src="preview.png" alt="If L.TileLayer.Canvas is not applied GPU consumption is 512MB/512MB, if is - 154MB/512MB">
</p>

## How to use it?
You can install it via package manager:
```
npm install tilelayer-canvas
```
or
```
yarn add tilelayer-canvas
```
or just copy `index.min.js` from this repository and include it by `<script>` tag:
```js
<script src="./path/to/index.min.js"></script>
```

Then in your project use `L.tileLayer.canvas` instead of `L.tileLayer`. That's it! [See an example](./example/index.html).

## Changelog
09/06/2020 - 1.0.2
* Added `complete` attribute to `<canvas>` element (fixed blinked zoom issue).

06/09/2020 - 1.0.1
* Fixed npm package name.

## License
MIT