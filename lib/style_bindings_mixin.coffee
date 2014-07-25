#(c) 2014 Indexia, Inc.

`import {Mixin} from 'ember';`

###*
# Provides styleBindings property to bind style 
# properties based on object properties.
#
# @class StyleBindingsMixin
# @public
###
StyleBindingsMixin = Mixin.create
    ###*
    # Add `styleBindings` property as a `concatenatedProperties`.
    # @property concatenatedProperties
    # @type array
    ###
    concatenatedProperties: ['styleBindings']

    ###*
    # Apply the `style` attribute to the DOM element.
    # @property attributeBindings
    # @type array
    ####
    attributeBindings: ['style']

    ###*
    # The default unit for numbered value.
    # @property unit
    # @type string
    ###
    unit: 'px'

    ###*
    # Build a style property and its value as a string.
    # @method buildStyleString
    # @param {String} style property name
    # @param {String} property name in the current object that should be resolved as the
    # value of the style property.
    # @private
    ###
    buildStyleString: (styleName, property) ->
        value = @get(property)
        return if value is undefined
        value = value + @get("unit") if Ember.typeOf(value) is "number"
        styleName + ":" + value + ";"

    ###*
    # Apply the style bindings during the view `init` phase.
    #
    # This method assumes that the attribute `styleBindings` is defined as an array of strings where
    # each string is a property name that should be resolved as a style option.
    #
    # @method applyBindings
    # @private
    ###
    applyBindings: (->
        return unless styleBindingsstyleBindings = @styleBindings
        lookup = {}
        @styleBindings.forEach (binding) ->
            propArr = binding.split(":")
            property = propArr[0]
            style = propArr[1]
            lookup[style or property] = property
        styles = Em.keys(lookup)
        properties = styles.map((style) ->
            lookup[style]
        )
        styleComputed = Em.computed(->
            styleTokens = styles.map((style) =>
                @buildStyleString style, lookup[style]
            )
            styleString = styleTokens.join("")
            styleString  if styleString.length isnt 0
        )
        styleComputed.property.apply styleComputed, properties
        Em.defineProperty @, "style", styleComputed
    ).on 'init'

`export default StyleBindingsMixin`

