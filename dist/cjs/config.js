"use strict";
var Namespace = require("ember").Namespace;

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

exports["default"] = Config;