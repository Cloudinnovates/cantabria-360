/* global fetch */

import ShowError from './show-error'

function validateResponse (response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }

  return response
}

function readAsJSON (response) {
  return response.json()
}

export default class TourRepository {
  static find (tourId) {
    return fetch(`src/data/tour-${tourId}.json`)
      .then(validateResponse)
      .then(readAsJSON)
      .catch(reason => {
        ShowError.loadingTour(tourId)
      })
  }
}
