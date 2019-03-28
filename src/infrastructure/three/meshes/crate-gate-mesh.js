import { Sprite, SpriteMaterial, Texture, TextureLoader } from 'three'

function makeTextSprite (message, parameters = {
  fontface: 'Arial',
  fontsize: 18,
  borderThickness: 4,
  borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
  backgroundColor: { r: 255, g: 255, b: 255, a: 1.0 }
}) {
  const { fontface, fontsize, borderThickness, borderColor, backgroundColor } = parameters
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = 'Bold ' + fontsize + 'px ' + fontface

  // get size data (height depends only on font size)
  const textWidth = context.measureText(message).width

  // background color
  context.fillStyle = toRGBA(backgroundColor)
  // border color
  context.strokeStyle = toRGBA(borderColor)
  context.lineWidth = borderThickness

  // 1.4 is extra height factor for text below baseline: g,j,p,q.
  drawRoundedRectangle(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6)

  // text color
  context.fillStyle = 'rgba(0, 0, 0, 1.0)'
  context.fillText(message, borderThickness, fontsize + borderThickness)

  // canvas contents will be used for a texture
  const texture = new Texture(canvas)
  texture.needsUpdate = true
  const sprite = new Sprite(new SpriteMaterial({ map: texture }))
  sprite.scale.set(textWidth, fontsize * 3, 1.0)

  return sprite
}

function toRGBA (color) {
  const { r, g, b, a } = color
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

function drawRoundedRectangle (ctx, x, y, w, h, r) {
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

export default class CrateGateMesh {
  create (scene, gate) {
    const { x, y, z } = gate.position
    // square with some texture
    const texture = new TextureLoader().load('assets/images/crate.gif')
    const crateMaterial = new SpriteMaterial({ map: texture })
    const sprite = new Sprite(crateMaterial)
    sprite.position.set(x, y, z)
    sprite.scale.set(50, 50, 1.0)
    sprite.name = `gate-${gate.id}`
    sprite.userData = gate

    // add some text
    const text = makeTextSprite(` ${gate.label} `)
    text.position.set(x, y, z)
    text.name = `text-${gate.id}`

    scene.add(sprite)
    scene.add(text)
  }
}
