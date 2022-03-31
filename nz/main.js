/*Neuseelandreise Skript*/
// einzeiliger Komentar

var map = L.map('map').setView([-36.833333, 174.8], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([-36.833333, 174.8]).addTo(map)
            .bindPopup('<h3>Auckland</h3>')
            .openPopup();