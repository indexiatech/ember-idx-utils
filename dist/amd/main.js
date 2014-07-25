define(
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