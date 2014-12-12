//#(c) 2014 Indexia, Inc.

module('Testing WithConfigMixin', {
    setup: function() {
        Em.Config = Em.Eu.Config.create();
        Em.Config.addConfig('default', {
            baseClass: 'foo',
            tabs: {
                inherited: "true"
            }
        });

        View = Em.View.extend(Em.Eu.WithConfigMixin, {
        });
    },

    teardown: function() {
        Em.run(function() {
            if (view && !view.isDestroyed) { view.destroy(); }
        });
    }
});

test('default config', function() {
    ok(Em.Config.getConfig('default'));
    equal(Em.Config.getConfig('default.baseClass'), 'foo');
    view = View.create({
        classNameBindings: ['config.baseClass'],
    });

    equal(view.get('configName'), 'default');
    strictEqual(view.get('config'), Em.Config.getConfig('default'));

    Em.run(function() {
        view.append();
    });

    ok(view.$().hasClass('foo'));
});


test('New Config', function() {
    Em.Config.addConfig('new', {
        advancedClass: 'bar',
        tabs: {
            extended: "now"
        }
    });

    equal(Em.Config.getConfig('default.tabs.inherited'), 'true', 'Ensure deep default properties.');
    equal(Em.Config.getConfig('new.tabs.inherited'), 'true', 'Should deeply inherit from default.');
    equal(Em.Config.getConfig('new.tabs.extended'), 'now', 'Should extend default.');
    ok(!Em.Config.getConfig('default.tabs.extended'), 'Should not extend default config')
    equal(Em.Config.getConfig('new.baseClass'), 'foo', 'Should inherit from default.');
});