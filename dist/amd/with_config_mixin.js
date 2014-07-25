define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Mixin = __dependency1__.Mixin;

    var WithConfigMixin;

    WithConfigMixin = Mixin.create({
      configName: (function() {
        var config;
        config = this.nearestWithProperty('configName');
        if (config) {
          return config.get('configName');
        } else {
          return 'default';
        }
      }).property(),
      config: (function() {
        return Em.Config.getConfig(this.get('configName'));
      }).property('configName')
    });

    __exports__["default"] = WithConfigMixin;
  });