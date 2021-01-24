/*!
 * name: @jswork/next-slate-serialize
 * description: Serializing/deserializing html/text for slate.
 * homepage: https://github.com/afeiship/next-slate-serialize
 * version: 1.0.0
 * date: 2021-01-24 17:26:09
 * license: MIT
 */

(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var slate = require('slate');
  var Text = slate.Text;
  var DEFAULT_OPTIONS = {
    process: function (node, children) {
      return node.text;
    },
    joined: '\n'
  };

  var NxSlateSerialize = nx.declare('nx.SlateSerialize', {
    statics: {
      serialize: function (inNode, inOptions) {
        var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        if (Text.isText(inNode)) return inNode.text;

        const children = inNode.children
          .map(function (n) {
            return this.serialize(n, options);
          }, this)
          .join(options.joined);

        return options.process(inNode, children);
      },
      stringify: function (inNodes, inOptions) {
        var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        return inNodes
          .map(function (node) {
            return this.serialize(node, options);
          }, this)
          .join(options.joined);
      },
      parse: function (inString) {}
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSlateSerialize;
  }
})();
