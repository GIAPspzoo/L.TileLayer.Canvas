# L.TileLayer.Canvas
Render Leaflet tiles using `<canvas>` elements.

## Why?
If your project has a lot of layers, performance issues related to the GPU may sometimes occur. In our case, the easiest way to avoid them is to display map tiles not as `<img>` elements, but by drawing them on a `<canvas>`. Just take a look.
<p align="center">
  <img src="preview.png" alt="If L.TileLayer.Canvas is not applied GPU consumption is 512MB/512MB, if is - 154MB/512MB">
</p>

## How to use it?
You can install it via a package manager:
```
npm install tilelayer-canvas
```
or
```
yarn add tilelayer-canvas
```
or just copy `index.min.js` from this repository and include it using a `<script>` tag:
```js
<script src="./path/to/index.min.js"></script>
```

Then in your project use `L.tileLayer.canvas` instead of `L.tileLayer`. That's it! [See an example](./example/index.html).

## Options
| Name         | Required | Default value                                                             | Description                  |
|--------------|----------|---------------------------------------------------------------------------|------------------------------|
| `timeout`    | No       | `undefined`                                                               | Zoom debounce time.          |
| `doubleSize` | No       | [`L.Browser.retina`](https://leafletjs.com/reference.html#browser-retina) | Set to true if tiles are 2x. |

## Changelog
Check the [CHANGELOG.md](CHANGELOG.md) file.

## License
MIT
