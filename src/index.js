(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');

  var NxSlateSerialize = nx.declare('nx.SlateSerialize', {
    statics: {
      toHtml: function (inNodes) {},
      toText: function (inNodes) {},
      fromHtml: function (inString) {},
      fromText: function (inString) {}
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxSlateSerialize;
  }
})();
