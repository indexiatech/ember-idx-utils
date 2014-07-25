define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Namespace = __dependency1__.Namespace;

    var Config;

    Config = Namespace.extend({
      _configs: Em.Object.create(),
      getConfig: function(name) {
        var config;
        config = this._configs.get(name);
        return config;
      },
      addConfig: function(name, config) {
        var defaultConfig, newConfig;
        defaultConfig = this._configs.get('default');
        newConfig = Em.Object.create(config);
        newConfig = Em.$.extend(true, newConfig, defaultConfig);
        return this._configs.set(name, newConfig);
      }
    });

    __exports__["default"] = Config;
  });