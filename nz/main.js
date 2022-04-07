/*Neuseelandreise Skript*/
// einzeiliger Komentar

let lat = -36.833333
let lng = 174.8
let zoom = 10

let coords = [-36.833333, 174.8]
console.log(coords);
console.log(coords[0]);
console.log(coords[1]);
console.log(coords.length);



let map = L.map('map').setView(coords, zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(coords).addTo(map)
            .bindPopup('<h3>Auckland</h3>')
            .openPopup();