//(c) 2014 Indexia, Inc.
import Em from 'ember';
import { test, moduleFor } from 'ember-qunit';

var set = Ember.set, get = Ember.get;
var View, view, willDestroyCalled, childView;
var trigger = function(type, keyCode, someKey) {
    var e = jQuery.Event(type);
    e.which = keyCode;

    if (someKey) {
        e[someKey + "Key"] = true;
    }

    return e;
};

module('Testing Hotkeys Bindings Mixin', {
    setup: function() {
        Em.run(function() {
            //without initializing app events won't be fired when triggering events on views such as
            //keypress
            App = Em.Application.create();
            App.injectTestHelpers();
        });
        View = Em.View.extend(Em.Eu.HotkeysBindingsMixin, {
        });
    },

    teardown: function() {
        Em.run(function() {
            //if (!view.isDestroyed) { view.destroy(); }
        });
    }
});

test('basic', function() {
    viewDef = View.extend({
        hotkeysBindings: ['ctrl-a'],

        actions: {
            'ctrl+a': function() {
                this.set('last', 'ctrl+a');
            },

            'shift+r': function() {
                this.set('last', 'shift+r');
            },

            'alt+f10': function() {
                this.set('last', 'alt+f10');
            },

            'alt+b': function() {
                this.set('last', 'alt+b');
            },

            'meta+f12': function() {
                this.set('last', 'meta+f12');
            }
        }
    });

    view = viewDef.create();

    Em.run(function() {
        view.append();
    });
    
    var e = trigger("keypress", 65, "ctrl");
    view.$().trigger(e);
    equal(view.get('last'), "ctrl+a");

    var e = trigger("keypress", 82, "shift");
    view.$().trigger(e);
    equal(view.get('last'), "shift+r");

    var e = trigger("keypress", 121, "alt");
    view.$().trigger(e);
    equal(view.get('last'), 'alt+f10');

    var e = trigger("keydown", 66, "alt");
    view.$().trigger(e);
    equal(view.get('last'), 'alt+b');

    var e = trigger("keyup", 123, "meta");
    view.$().trigger(e);
    equal(view.get('last'), "meta+f12");
});