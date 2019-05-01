export default class Browser {
  showLoadingScene () {
    return new Promise((resolve, reject) => {
      const container = document.getElementById('container')
      container.className = 'inactive'

      const loading = document.getElementById('loading')
      loading.className = 'active'

      resolve()
    })
  }

  setTourDescription (tour) {
    const info = document.getElementById('info')
    info.innerHTML = tour.description
  }

  renderScene (renderer) {
    const loading = document.getElementById('loading')
    loading.className = 'inactive'

    const container = document.getElementById('container')
    container.className = 'active'
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

  tourId () {
    const query = window.location.search.substring(1)
    const params = query.split('&')
    const pairs = params
      .map(param => param.split('='))
      .map(pair => {
        return {
          name: pair[0],
          value: pair[1]
        }
      })
    const tourPair = pairs.find(pair => pair.name === 'tour')
    return tourPair && tourPair.value
  }
}
