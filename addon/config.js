import Em from 'ember';

/*
Maintain a list of configuration within an Ember Namespace,
*/
export default Em.Namespace.extend({
  _configs: Em.Object.create(),
  getConfig: function(name) {
    var config;
    config = this._configs.get(name);
    return config;
  },
  addConfig: function(name, config) {
    var defaultConfig, newConfig;
    defaultConfig = this._configs.get('default');
    newConfig = Em.Object.create(defaultConfig, config);
    return this._configs.set(name, newConfig);
  }
});
