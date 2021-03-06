# shortcut

Keyboard shortcuts emitter

## Install

    $ component install bojs/shortcut

## Objetivos

Debe permitir definir eventos para combinaciones

    shortcut.on('alt+shift+o', function () { doSomething(); });

Esto implica:

*   Etiquetar cada keyCode

    *   Printables: a, b, c, 1, 2, 3, ...
    *   No printables: ctrl, alt, shift, leftshift, rightshift
    *   Hay etiquetas que necesitarán chequeos personalizados, por ejemplo
        shift, que requerirá comprobar (leftshift || rightshift)
    *   Estos mapeos deben ser externos al componente, ya que diferentes
        teclados podrán tener distribuciones de teclas diferentes (pueden 
        influir a ello el fabricante del teclado y la configuración del sistema
        operativo)
    *   Se parseará el texto recibido como nombre de evento separando los
        nombres de etiqueta mediante el caracter `+`:
        'alt+shift+o' => (ctrl && (leftshift || rightshift) && o)

**Update:**

En realidad, en chromium, `shift` no existe. `leftshift` y `rightshift` tienen
el mismo código, pero difieren en la propiedad keyLocation

*   `keyLocation === 0`: esta tecla no tiene multiples posiciones en el teclado
*   `keyLocation === 1`: tecla izquierda
*   `keyLocation === 2`: tecla derecha

# Implementado

*   Se puede usar la nomenclatura mencionada, con los siguientes tags

    *   `enter, `space`
    *   `ctrl, `alt, `shift`
    *   `up, `down, `left, `right`

*   Mantener la combinación de teclas presionada sólo generará una llamada al
    _handler_
*   Se puede encadenar un método `onEnd(endHandler)` que llamara a
    _endHandler_ cuando el combo deje de estar presionado

