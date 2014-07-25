//#(c) 2014 Indexia, Inc.

var set = Ember.set, get = Ember.get;
var View, view, willDestroyCalled, childView;

module('Testing Style Bindings Mixin', {
    setup: function() {
        View = Em.View.extend(Em.Eu.StyleBindingsMixin, {
        });
    },

    teardown: function() {
        Em.run(function() {
            if (!view.isDestroyed) { view.destroy(); }
        });
    }
});



test('basic', function() {
    view = View.create({
        styleBindings: ['color', 'width', 'height'],
        color: 'blue',
        width: 400,
        height: '100',
    });

    Em.run(function() {
        view.append();
    });

    equal(view.$().attr('style'), 'color:blue;width:400px;height:100;', 'Style property should be rendered properly.');
});
