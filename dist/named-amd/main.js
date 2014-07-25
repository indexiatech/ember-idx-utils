define("ember-utils/config",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Namespace = __dependency1__.Namespace;

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

    __exports__["default"] = Config;
  });
define("ember-utils/hotkeys_bindings_mixin",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Mixin = __dependency1__.Mixin;
    var debug = __dependency1__.debug;


    /**
     * A mixin to enhance an `Ember.View` with hotkey support.
     * 
     * To use, inherit this mixin in your view:
     *
     * ```javascript
     * MyView = Em.View.extend(HotkeysMixin, {
     *   hotkeysBindings: ['ctrl-a']
     *
     *   actions: {
     *       'ctrl-a': function() {
     *           console.log("Ctrl-a was pressed!");
     *       }
     *   }
     * });
     * ```
     *
     * @class HotkeysMixin
     */
    var HotkeysMixin;

    HotkeysMixin = Mixin.create({

      /**
       * Add `hotkeysBindings` property as a `concatenatedProperties`.
       * @property concatenatedProperties
       * @type array
       */
      concatenatedProperties: ['hotkeysBindings'],
      keyMap: {
        8: "backspace",
        9: "tab",
        13: "return",
        16: "shift",
        17: "ctrl",
        18: "alt",
        224: "meta",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12"
      },
      keyPressHandler: function(e) {
        var command;
        command = "";
        if (e.ctrlKey) {
          command += "ctrl+";
        }
        if (e.altKey) {
          command += "alt+";
        }
        if (e.shiftKey) {
          command += "shift+";
        }
        if (e.metaKey) {
          command += "meta+";
        }
        if (this.keyMap[e.which]) {
          command += this.keyMap[e.which];
        } else {
          command += String.fromCharCode(e.which).toLowerCase();
        }
        debug("hotkey command: " + command);
        return this.send(command);
      },
      keyDown: function(e) {
        return this.keyPressHandler(e);
      },
      keyUp: function(e) {
        return this.keyPressHandler(e);
      },
      keyPress: function(e) {
        return this.keyPressHandler(e);
      }
    });

    __exports__["default"] = HotkeysMixin;;
  });
define("ember-utils",
  ["./style_bindings_mixin","./with_config_mixin","./hotkeys_bindings_mixin","./config","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var StyleBindingsMixin = __dependency1__["default"] || __dependency1__;

    var WithConfigMixin = __dependency2__["default"] || __dependency2__;

    var HotkeysBindingsMixin = __dependency3__["default"] || __dependency3__;

    var Config = __dependency4__["default"] || __dependency4__;

    __exports__.StyleBindingsMixin = StyleBindingsMixin;
    __exports__.WithConfigMixin = WithConfigMixin;
    __exports__.HotkeysBindingsMixin = HotkeysBindingsMixin;
    __exports__.Config = Config;
  });
define("ember-utils/style_bindings_mixin",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Mixin = __dependency1__.Mixin;


    /**
     * Provides styleBindings property to bind style 
     * properties based on object properties.
     * @class StyleBindingsMixin
     */
    var StyleBindingsMixin;

    StyleBindingsMixin = Mixin.create({

      /**
       * Add `styleBindings` property as a `concatenatedProperties`.
       * @property concatenatedProperties
       * @type array
       */
      concatenatedProperties: ['styleBindings'],

      /**
       * Apply the `style` attribute to the DOM element.
       * @property attributeBindings
       * @type array
       */
      attributeBindings: ['style'],

      /**
       * The default unit for numbered value.
       */
      unit: 'px',

      /**
       * Build a style property and its value as a string.
       * @method buildStyleString
       * @param {String} style property name
       * @param {String} property name in the current object that should be resolved as the
       * value of the style property.
       * @private
       */
      buildStyleString: function(styleName, property) {
        var value;
        value = this.get(property);
        if (value === void 0) {
          return;
        }
        if (Ember.typeOf(value) === "number") {
          value = value + this.get("unit");
        }
        return styleName + ":" + value + ";";
      },

      /**
       * Apply the style bindings during the view `init` phase.
       *
       * This method assumes that the attribute `styleBindings` is defined as an array of strings where
       * each string is a property name that should be resolved as a style option.
       *
       * @method applyBindings
       * @private
       */
      applyBindings: (function() {
        var lookup, properties, styleBindingsstyleBindings, styleComputed, styles;
        if (!(styleBindingsstyleBindings = this.styleBindings)) {
          return;
        }
        lookup = {};
        this.styleBindings.forEach(function(binding) {
          var propArr, property, style;
          propArr = binding.split(":");
          property = propArr[0];
          style = propArr[1];
          return lookup[style || property] = property;
        });
        styles = Em.keys(lookup);
        properties = styles.map(function(style) {
          return lookup[style];
        });
        styleComputed = Em.computed(function() {
          var styleString, styleTokens;
          styleTokens = styles.map((function(_this) {
            return function(style) {
              return _this.buildStyleString(style, lookup[style]);
            };
          })(this));
          styleString = styleTokens.join("");
          if (styleString.length !== 0) {
            return styleString;
          }
        });
        styleComputed.property.apply(styleComputed, properties);
        return Em.defineProperty(this, "style", styleComputed);
      }).on('init')
    });

    __exports__["default"] = StyleBindingsMixin;
  });
define("ember-utils/with_config_mixin",
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