import { Sprite, SpriteMaterial, Texture, TextureLoader } from 'three'

function makeTextSprite (message, parameters = {}) {
  const fontface = parameters.hasOwnProperty('fontface')
    ? parameters['fontface'] : 'Arial'

  const fontsize = parameters.hasOwnProperty('fontsize')
    ? parameters['fontsize'] : 18

  const borderThickness = parameters.hasOwnProperty('borderThickness')
    ? parameters['borderThickness'] : 4

  const borderColor = parameters.hasOwnProperty('borderColor')
    ? parameters['borderColor'] : { r: 0, g: 0, b: 0, a: 1.0 }

  const backgroundColor = parameters.hasOwnProperty('backgroundColor')
    ? parameters['backgroundColor'] : { r: 255, g: 255, b: 255, a: 1.0 }

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = 'Bold ' + fontsize + 'px ' + fontface

  // get size data (height depends only on font size)
  const metrics = context.measureText(message)
  const textWidth = metrics.width

  // background color
  context.fillStyle = 'rgba(' + backgroundColor.r + ',' + backgroundColor.g + ',' +
    backgroundColor.b + ',' + backgroundColor.a + ')'
  // border color
  context.strokeStyle = 'rgba(' + borderColor.r + ',' + borderColor.g + ',' +
    borderColor.b + ',' + borderColor.a + ')'
  context.lineWidth = borderThickness

  // 1.4 is extra height factor for text below baseline: g,j,p,q.
  roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6)

  // text color
  context.fillStyle = 'rgba(0, 0, 0, 1.0)'
  context.fillText(message, borderThickness, fontsize + borderThickness)

  // canvas contents will be used for a texture
  const texture = new Texture(canvas)
  texture.needsUpdate = true

  const spriteMaterial = new SpriteMaterial({ map: texture })
  const sprite = new Sprite(spriteMaterial)
  sprite.scale.set(100, 50, 1.0)

  return sprite
}

// function for drawing rounded rectangles
function roundRect (ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

export default class GateMesh {
  create (scene) {
    // square with some texture
    const texture = new TextureLoader().load('assets/images/crate.gif')
    const crateMaterial = new SpriteMaterial({ map: texture })
    const sprite = new Sprite(crateMaterial)
    sprite.position.set(175, 0, -300)
    sprite.scale.set(50, 50, 1.0)
    sprite.name = 'crate-sprite'

    // add some text
    const text = makeTextSprite(' Abre la puerta ')
    text.position.set(200, 15, -300)
    text.name = 'text-sprite'

    scene.add(sprite)
    scene.add(text)
  }
}
