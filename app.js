const ipAddress = document.getElementById('ip-address');
const submit = document.getElementById('submit');
let ipValue = document.getElementById('ip');
let locationValue = document.getElementById('location');
let timezoneValue = document.getElementById('timezone');
let ispValue = document.getElementById('isp');
var map = L.map('map').setView([19.0760,  72.8777], 10);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var locationIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [30,40]
});

// Setting Map View
function setMapView(latitude, longitude){
    L.marker([latitude, longitude],{icon:locationIcon}).addTo(map);
    map.setView([latitude,  longitude], 10);
}

// fetching data from api
function fetchData(ipAdd){

    url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_OBOROzQ3OHAKQ8GCKgIR6cPlrDyW1&ipAddress=${ipAdd}`;
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        ipValue.innerHTML = data.ip;
        locationValue.innerHTML = `${data.location.city}, ${data.location.region}`;
        timezoneValue.innerHTML = `${data.location.timezone} UTC`;
        ispValue.innerHTML = data.isp;
        setMapView(data.location.lat, data.location.lng);
    })
    .catch(error => {
        locationValue.innerHTML = "NA";
        timezoneValue.innerHTML = "NA";
        ispValue.innerHTML = "NA";
        setMapView(51.50, 0.12);
        console.log(error)
    });
}

// Submit button Event Handler
submit.addEventListener('click',()=>{
    const ip = ipAddress.value;
    if(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)){
        ipAddress.style.outline = "solid 2px green";
        ipAddress.style.boxShadow = "0  0 1em green";
        fetchData(ip);
        setTimeout(()=>{
            ipAddress.style.boxShadow = "none";
        },3000);
    }
    else{
        console.log("False");
        ipAddress.style.outline = "solid 2px red";
        ipAddress.style.boxShadow = "0  0 1em red";
        setTimeout(()=>{
            ipAddress.style.boxShadow = "none";
        },3000);
    }
})

// When the page loads
function onPageLoad(){
    const url = "https://api.ipify.org/?format=json";
    fetch(url)
    .then(response => response.json())
    .then(data => {
        fetchData(data.ip);
    })
    .catch(error => console.log(error));
}

onPageLoad();




