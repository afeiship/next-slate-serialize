(function () {
  const NxSlateSerialize = require('../src');
  const { jsx } = require('slate-hyperscript');

  describe('NxSlateSerialize.methods', function () {
    test('serialize is text node', function () {
      var node = { text: 'a node' };
      var process = (node) => node.text;
      expect(NxSlateSerialize.serialize(node, { process })).toBe('a node');
    });

    test('serialize is text node with mark', function () {
      var node = { text: 'a node', bold: true };
      var process = (node) => {
        if (node.bold) {
          return `<span style="font-weight: bold">${node.text}</span>`;
        }
        return node.text;
      };
      expect(NxSlateSerialize.serialize(node, { process })).toBe(
        '<span style="font-weight: bold">a node</span>'
      );
    });
    test('nested text node for special process', () => {
      var node = {
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
      };

      var options = {
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

      expect(NxSlateSerialize.serialize(node, options)).toBe(
        `<p>An opening paragraph with a <a href="https://example.com">link</a> in it.</p><blockquote><p>A wise quote.</p></blockquote><p>A closing paragraph!</p>`
      );
    });

    test('slate parse(deserialize) html to nodes', () => {
      var process = (el, children) => {
        switch (el.nodeName) {
          case 'BODY':
            return jsx('fragment', {}, children);
          case 'BR':
            return '\n';
          case 'BLOCKQUOTE':
            return jsx('element', { type: 'quote' }, children);
          case 'P':
            return jsx('element', { type: 'paragraph' }, children);
          case 'A':
            return jsx('element', { type: 'link', url: el.getAttribute('href') }, children);
          default:
            return el.textContent;
        }
      };

      var html = `<p>An opening paragraph with a <a href="https://example.com">link</a> in it.</p><blockquote><p>A wise quote.</p></blockquote><p>A closing paragraph!</p>`;
      var nodes = NxSlateSerialize.parse(html, { process });

      expect(nodes).toEqual([
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
          children: [
            {
              type: 'paragraph',
              children: [{ text: 'A wise quote.' }]
            }
          ]
        },
        {
          type: 'paragraph',
          children: [{ text: 'A closing paragraph!' }]
        }
      ]);
    });
  });
})();
