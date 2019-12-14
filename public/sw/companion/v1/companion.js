(function () {
  'use strict'
  var workerScript = document.currentScript.dataset.serviceWorker
  // adapted from create-react-app script

  if (workerScript && 'serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/serviceworker.js', {scope: '/'})
    })
  }
})()
