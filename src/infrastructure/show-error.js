export default class ShowError {
  static tourIdNotFound () {
    const $error = document.getElementById('show-error')
    $error.innerHTML = '<h1>No he podido encontrar un tour</h1>'
  }

  static loadingTour (tourId) {
    const $error = document.getElementById('show-error')
    $error.innerHTML = `<h1>Error cargando tour ${tourId}</h1>`
  }
}
