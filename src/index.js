(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var slate = global.slate || require('slate');
  var Text = slate.Text;
  var DEFAULT_OPTIONS = {
    process: function (node, children) {
      if (children) {
        return nx.stubValue(node);
      }
      return node.text;
    },
    joined: '\n'
  };

  var NxSlateSerialize = nx.declare('nx.SlateSerialize', {
    statics: {
      parse: function (inNodes, inOptions) {
        var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        var fn = function (node) { return serializeNode(node, options); };
        var serializeNode = (node, opt) => {
          if (Text.isText(node)) return opt.process(node, null);
          var children = node.children.map(fn).join(opt.joined);
          return opt.process(node, children);
        };

        return inNodes.map(fn).join(options.joined);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSlateSerialize;
  }
})();
