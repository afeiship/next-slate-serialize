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
    joined: ''
  };

  var NxSlateSerialize = nx.declare('nx.SlateSerialize', {
    statics: {
      parse: function (inNodes, inOptions) {
        var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        var serializeNode = (node) => {
          if (Text.isText(node)) return options.process(node, null);
          var children = node.children.map(serializeNode).join(options.joined);
          return options.process(node, children);
        };
        return inNodes.map(serializeNode).join(options.joined);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSlateSerialize;
  }
})();
