export default class Browser {
  setTourDescription (tour) {
    const info = document.getElementById('info')
    info.innerHTML = tour.description
  }

  renderScene (renderer) {
    const container = document.getElementById('container')
    container.appendChild(renderer.domElement)
  }

  windowAspect () {
    return window.innerWidth / window.innerHeight
  }

  pixelRatio () {
    return window.devicePixelRatio
  }

  width () {
    return window.innerWidth
  }

  height () {
    return window.innerHeight
  }
}
