var dictionary = require('dictionary')
    type = require('type');

var Shortcut = function () {};

var shortcut = module.exports = new Shortcut();

Shortcut.prototype.on = function (shortcut, handler) {
  var self = this,
      tags = shortcut.split('+'),
      currKeys = dictionary(),
      handled = false;

  tags.forEach(function (tag) {
    var keyCode = keyMap.get(tag);

    document.body.addEventListener('keydown', function (ev) {
      if (ev.keyCode === keyCode) {
        currKeys.set(tag, true);
        if (currKeys.keys().length === tags.length && !handled) {
          handler();
          handled = true;
        }
      }
    });

    document.body.addEventListener('keyup', function (ev) {
      if (ev.keyCode === keyCode) {
        currKeys.del(tag);
        if (handled) {
          handled = false;
          if (typeof self.endHandlers[shortcut] === 'function') {
            self.endHandlers[shortcut]();
          }
        }
      }
    });
  });
  return this;
};

Shortcut.prototype.onEnd = function (shortcut, handler) {
  this.endHandlers[shortcut] = handler;
  return this;
};

var keyMap = dictionary({
  enter: 13,
  space: 32,

  shift: 16,
  ctrl: 17,
  alt: 18,

  up: 38,
  down: 40,
  left: 37,
  right: 39,
});
