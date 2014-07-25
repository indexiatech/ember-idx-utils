"use strict";
var Mixin = require("ember").Mixin;

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

exports["default"] = WithConfigMixin;