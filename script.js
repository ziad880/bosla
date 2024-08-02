// Function to get Qibla direction based on latitude and longitude
function getQiblaDirection(lat, lon) {
    const qiblaLat = 21.4225; // Latitude of Kaaba
    const qiblaLon = 39.8262; // Longitude of Kaaba
    const rad = Math.PI / 180;
    
    lat *= rad;
    lon *= rad;
    qiblaLat *= rad;
    qiblaLon *= rad;
    
    const deltaLon = qiblaLon - lon;
    const x = Math.cos(qiblaLat) * Math.sin(deltaLon);
    const y = Math.cos(lat) * Math.sin(qiblaLat) - Math.sin(lat) * Math.cos(qiblaLat) * Math.cos(deltaLon);
    const angle = Math.atan2(x, y);
    
    return (angle * 180 / Math.PI + 360) % 360; // Return angle in degrees
}

// Function to set needle rotation
function setNeedleRotation(degrees) {
    document.querySelector('.needle').style.transform = `translate(-50%, -50%) rotate(${degrees}deg)`;
}

// Get user's location and calculate Qibla direction
navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const qiblaDirection = getQiblaDirection(latitude, longitude);
    setNeedleRotation(qiblaDirection);
}, (error) => {
    console.error("Unable to retrieve location", error);
});
