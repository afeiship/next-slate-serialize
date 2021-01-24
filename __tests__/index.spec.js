(function () {
  const NxSlateSerialize = require('../src');

  describe('NxSlateSerialize.methods', function () {
    test('serialize is text node', function () {
      var node = { text: 'a node' };
      expect(NxSlateSerialize.serialize(node)).toBe('a node');
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
  });
})();
