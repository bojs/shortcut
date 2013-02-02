var Shortcut = function () {};

module.exports = new Shortcut();

/**
 * Crear componente diccionario tal y como se explica en eloquent
 * y que muestre longitud como Array.length
 * 
 * Implementar keyMap y currKeys con diccionario
 */
var keyMap = {
  enter: 13,
  space: 32,

  shift: 16,
  ctrl: 17,
  alt: 18,

  up: 38,
  down: 40,
  left: 37,
  right: 39,
};

Shortcut.prototype.on = function (shortcut, handler) {
  var tags = shortcut.split('+'),
      currKeys = {},
      handled = false,
      endHandler;
  
  var onEnd = function (handler) {
    endHandler = handler;
  };

  tags.forEach(function (tag) {
    var keyCode = keyMap[tag];

    document.body.addEventListener('keydown', function (ev) {
      if (ev.keyCode === keyCode) {
        /* cualquier valor wserviria en lugar de true */
        currKeys[tag] = true;
        if (Object.keys(currKeys).length === tags.length && !handled) {
          handler();
          handled = true;
        }
      }
    });

    document.body.addEventListener('keyup', function (ev) {
      if (ev.keyCode === keyCode) {
        delete currKeys[tag];
        if (handled) {
          handled = false;
          if (typeof endHandler === 'function') {
            endHandler();
          }
        }
      }
    });
  });

  return {
    onEnd: onEnd
  };
};
