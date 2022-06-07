/*Neuseelandreise Skript*/
// einzeiliger Komentar

let zoom = 10

let coords = [
    ETAPPEN[18].lat,
    ETAPPEN[18].lng
];
//console.log(coords);
//console.log(coords[0]);
//console.log(coords[1]);
//console.log(coords.length);

//console.log("text");
//console.log('text');
//console.log('id="map"');
//console.log(`latitude = ${lat}`)

let startLayer = L.tileLayer.provider("OpenStreetMap.Mapnik");

let map = L.map('map', {
    center: coords,
    zoom: zoom,
    layers: [
        startLayer
    ],
});

let layerControl = L.control.layers({
    "Open Street Map": startLayer,
    "Open Topo Map": L.tileLayer.provider("OpenTopoMap"),
    "Esri Orthophoto": L.tileLayer.provider("Esri.WorldImagery"),
}).addTo(map);

/*L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);*/

for (let etappe of ETAPPEN) {
    let popup = `
    <h3>${etappe.titel} (Etappe ${etappe.nr})</h3>
    <ul>
        <li>geogr. Länge: ${etappe.lng}</li> 
        <li>geogr. Breite: ${etappe.lat}</li>
        <li><a href="${etappe.wikipedia}">Link zur Wikipediaseite</a></li>
        <li><a href="https://${etappe.github}.github.io/nz/index.html">Link zur Etappenseite</a></li>
    </ul>`
    //console.log(etappe)
    let navClass = "etappenLink";
    let mrk = L.marker([etappe.lat, etappe.lng]).addTo(map).bindPopup(popup);
    if (etappe.nr == 19){
        mrk.openPopup();
        navClass = "etappenLink etappeAktuell"
    }

    //Etappennavigation erweitern
    let link = `<a href="https://${etappe.github}.github.io/nz/index.html" class="${navClass}" title="${etappe.titel}">${etappe.nr}</a>`;
    document.querySelector("#navigation").innerHTML += link
}

//https://webmapping.github.io/nz/huts.js

let trailLayer = L.featureGroup();

layerControl.addOverlay(trailLayer, "Wanderwege");

L.tileLayer.provider("WaymarkedTrails.hiking").addTo(trailLayer);

let hutLayer = L.featureGroup().addTo(map);

layerControl.addOverlay(hutLayer, "Hütten");

for (let hut of HUTS) {
    let popup = `
    <h3>${hut.name}</h3>
    <h4>${hut.region}</h3>
    <hr>
    <p>${hut.info}</p>
    <img src="${hut.image}" alt="Vorschaubild">
    <hr>
    <a href="${hut.link}" target="Neuseeland">Link zur Hütte</a>
    `;

    let statusColor;
    if (hut.open == true) {
        statusColor = "green"
    } else {
        statusColor = "red";
    }
    L.circleMarker([hut.lat, hut.lng], {
        color: statusColor,
        radius: 5
    }).addTo(hutLayer).bindPopup(popup)
}

// Maßstab hinzufügen
L.control.scale({
    imperial: false,
}).addTo(map);

L.control.fullscreen().addTo(map);

let miniMap = new L.Control.MiniMap(
    startLayer, {
        toggleDisplay: true
    }).addTo(map)