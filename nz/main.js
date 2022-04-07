/*Neuseelandreise Skript*/
// einzeiliger Komentar

let lat = -36.833333
let lng = 174.8
let zoom = 10

let map = L.map('map').setView([lat, lng], zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map)
            .bindPopup('<h3>Auckland</h3>')
            .openPopup();