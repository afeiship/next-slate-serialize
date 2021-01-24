/*!
 * name: @jswork/next-slate-serialize
 * description: Serializing/deserializing html/text for slate.
 * homepage: https://github.com/afeiship/next-slate-serialize
 * version: 1.0.1
 * date: 2021-01-24 18:28:08
 * license: MIT
 */

(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var isPlainObject = nx.isPlainObject || require('@jswork/next-is-plain-object');
  var DEFAULT_OPTIONS = { process: nx.stubValue, joined: '\n' };
  var isText = function (value) {
    return isPlainObject(value) && typeof value.text === 'string';
  };

  var NxSlateSerialize = nx.declare('nx.SlateSerialize', {
    statics: {
      serialize: function (inNode, inOptions) {
        var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        if (isText(inNode)) return inNode.text;
        var children = inNode.children
          .map(function (n) {
            return this.serialize(n, options);
          }, this)
          .join(options.joined);
        return options.process(inNode, children);
      },
      deserialize: function (inElement, inOptions) {
        var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        var self = this;
        var el = inElement || document.body;
        var children = [];
        if (el.nodeType === 3) return el.textContent;
        if (el.nodeType !== 1) return null;

        children = nx.slice(el.childNodes).map(function (node) {
          return self.deserialize(node, options);
        });
        return options.process(el, children);
      },
      stringify: function (inNodes, inOptions) {
        var self = this;
        var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        return inNodes
          .map(function (node) {
            return self.serialize(node, inOptions);
          })
          .join(options.joined);
      },
      parse: function (inString, inOptions) {
        var document = new DOMParser().parseFromString(inString, 'text/html');
        return this.deserialize(document.body, inOptions);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSlateSerialize;
  }
})();
