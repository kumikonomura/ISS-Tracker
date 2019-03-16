let marker, tracker
  
  // Initialize and add the map
  function initMap() {
    // The location of Uluru
    var uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    map = new google.maps.Map(document.getElementById('map'), { zoom: 4, center: uluru });
    // The marker, positioned at Uluru
    marker = new google.maps.Marker({ position: uluru, map: map });
}

const trackMovement = () => {
    // Fetch coordinates of ISS
    fetch('http://api.open-notify.org/iss-now.json')
    .then(r => r.json())
    .then(response => {
        // Declare variables latitude and longitude that are both properties of response.iss_position
        const {latitude, longitude} = response.iss_position
        // Changed latitude and longitude from string to numbers
        marker.setPosition({
            lat: parseInt(latitude), 
            lng: parseInt(longitude),
        })
        map.panTo({
            lat: parseInt(latitude), 
            lng: parseInt(longitude),
        })

    })
    .catch(err => console.error(err))
}

// We don't want the interval running all the time so we wrap it in a function
function startTracking () {
// Invoke the function every 2 seconds using this setInterval
    tracker = setInterval(trackMovement, 2000)
}

function stopTracking () {
    clearInterval(tracker)
}