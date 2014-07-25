#(c) 2014 Indexia, Inc.

`import {Namespace} from 'ember';`

Config = Namespace.extend
    _configs: Em.Object.create()

    getConfig: (name) ->
        config = @_configs.get name
        #Ember.assert "Config #{name} doesnt exist.", config
        config

    addConfig: (name, config) ->
        defaultConfig = @_configs.get 'default'
        newConfig = Em.Object.create(config)
        newConfig = Em.$.extend true, newConfig, defaultConfig
        @_configs.set name, newConfig

`export default Config`
