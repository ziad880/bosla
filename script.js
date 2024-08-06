// Function to handle errors
function displayError(message) {
    console.error(message);
    document.getElementById('error-message').innerText = message;
}

// Function to update compass needle
function updateCompass(event) {
    const alpha = event.alpha || 0; // Orientation in degrees
    document.querySelector('.needle').style.transform = `translate(-50%, -50%) rotate(${alpha}deg)`;
}

// Function to get geolocation and update the UI
function requestGeolocationPermission() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            // Using qibla-direction library to calculate qibla direction
            const qiblaDirection = QiblaDirection.getDirection(latitude, longitude);
            
            document.getElementById('location-info').innerText = `موقعك الحالي: Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`;
            document.getElementById('direction').innerText = `اتجاه القبلة: ${qiblaDirection.toFixed(2)} درجة`;
        }, error => {
            displayError("خطأ في الحصول على الموقع: " + error.message);
        });
    } else {
        displayError("الجيوبوتينش غير مدعوم.");
    }
}

// Function to request device orientation permissions
function requestDeviceOrientationPermission() {
    if (window.DeviceOrientationEvent) {
        if (DeviceOrientationEvent.requestPermission) {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', updateCompass, true);
                        requestGeolocationPermission();
                    } else {
                        displayError("الأذونات المطلوبة لمستشعرات الاتجاه مرفوضة.");
                    }
                })
                .catch(error => {
                    displayError("خطأ في طلب الإذن: " + error.message);
                });
        } else {
            // For non-iOS devices
            window.addEventListener('deviceorientation', updateCompass, true);
            requestGeolocationPermission();
        }
    } else {
        displayError("المستشعرات غير مدعومة في هذا المتصفح.");
    }
}

// Event listener for the permission button
document.getElementById('request-permission').addEventListener('click', requestDeviceOrientationPermission);