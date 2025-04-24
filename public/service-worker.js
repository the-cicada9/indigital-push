importScripts('/indigitall/worker.min.js');
// Add other service workers here if needed
self.addEventListener('push', function (event) {
    console.log('Push message received:', event)
  
    if (event.data) {
      console.log('Push data:', event.data.text())
    } else {
      console.log('Push event but no data')
    }
  })