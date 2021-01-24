# next-slate-serialize
> Serializing/deserializing html/text for slate.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-slate-serialize
```

## apis
| api         | params               | description                           |
| ----------- | -------------------- | ------------------------------------- |
| serialize   | inNode, inOptions    | Transform node to html.               |
| deserialize | inElement, inOptions | Transform el(DOMParser) to node json. |
| stringify   | inNodes, inOptions   | Transform nodes to html.              |
| parse       | inString, inOptions  | Transform string to nodes json.       |

## usage
```js
import NxSlateSerialize from '@jswork/next-slate-serialize';

// apis
NxSlateSerialize.serialize
NxSlateSerialize.deserialize
NxSlateSerialize.stringify
NxSlateSerialize.parse
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-slate-serialize/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-slate-serialize
[version-url]: https://npmjs.org/package/@jswork/next-slate-serialize

[license-image]: https://img.shields.io/npm/l/@jswork/next-slate-serialize
[license-url]: https://github.com/afeiship/next-slate-serialize/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-slate-serialize
[size-url]: https://github.com/afeiship/next-slate-serialize/blob/master/dist/next-slate-serialize.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-slate-serialize
[download-url]: https://www.npmjs.com/package/@jswork/next-slate-serialize
