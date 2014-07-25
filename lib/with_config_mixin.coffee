#(c) 2014 Indexia, Inc.

`import {Mixin} from 'ember';`

WithConfigMixin = Mixin.create
    configName: (->
        config  = @nearestWithProperty 'configName'
        if config then return config.get('configName') else return 'default'
    ).property()

    config: (->
        Em.Config.getConfig(@get('configName'));
    ).property('configName')

`export default WithConfigMixin`

