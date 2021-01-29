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
| api | params             | description              |
| --- | ------------------ | ------------------------ |
| do  | inNodes, inOptions | Transform nodes to html. |

## usage
```js
import NxSlateSerialize from '@jswork/next-slate-serialize';

// apis
const nodes = [
  {
    children: [
      {
        type: 'paragraph',
        children: [
          { text: 'An opening paragraph with a ' },
          {
            type: 'link',
            url: 'https://example.com',
            children: [{ text: 'link' }]
          },
          { text: ' in it.' }
        ]
      },
      {
        type: 'quote',
        children: [{ text: 'A wise quote.' }]
      },
      {
        type: 'paragraph',
        children: [{ text: 'A closing paragraph!' }]
      }
    ]
  }
];

const options = {
  process: (node, children) => {
    if (!children) return node.text;
    switch (node.type) {
      case 'quote':
        return `<blockquote><p>${children}</p></blockquote>`;
      case 'paragraph':
        return `<p>${children}</p>`;
      case 'link':
        return `<a href="${node.url}">${children}</a>`;
      default:
        return children;
    }
  },
  joined: ''
};

const html = NxSlateSerialize.do(nodes, options);
// <p>An opening paragraph with a <a href="https://example.com">link</a> in it.</p><blockquote><p>A wise quote.</p></blockquote><p>A closing paragraph!</p>
```

## resources
- https://docs.slatejs.org/concepts/09-serializing

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
