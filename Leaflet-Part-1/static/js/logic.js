//tile layers

var defaultMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// gray scale layer
var grayscale = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});



//Topography
let topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});



//make a basemap object
let basemaps = {
    Default: defaultMap,
    Grayscale: grayscale,
    "Topography": topoMap,
};



//make a map object
var myMap = L.map("map", {
    center:[36.1656, -119.9001],
    zoom: 3,
    layers: [defaultMap, grayscale, topoMap]
});


//add default map
defaultMap.addTo(myMap);


//get the data for the tect plates and draw on the map
//variable to hold the tect plates layer
let tectonicplates = new L.layerGroup();

//Go get Tectonic Plates data and format
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
.then(function(plateData){
    //console log to check
    //console.log(plateData);

    //load data useing Json and add to the plates layer
    L.geoJson(plateData,{
        //add style to make lines visible
        color: "yellow",
        weight: 4
    }).addTo(tectonicplates);
});

//add the plates to the map
tectonicplates.addTo(myMap);

// variable to hold the earthquake data layer
let earthquakes = new L.layerGroup();

// Go get data for eathquake and populate the layer
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
.then(
    function(earthquakeData) {
        //console log to check
        console.log(earthquakeData.features[0]);

        //plot circles for earthquakes and color is depdent on depth
        function dataColor(depth) {
            if (depth > 90)
                return "red";
            else if(depth > 70)
                return "#fc4903";
            else if(depth > 50)
                return "#fc8403";
            else if(depth > 30)
                return "#fcad03";
            else if(depth > 10)
                return "#cafc03";
            else 
                return "green"; 
        }
        
        // Function for the size of the circles 
        function radiusSize(mag) {
            if (mag == 0)
                return 1; //make mag 0
            else
                return mag * 5;
        }
        // adding style to circles
        function dataStyle(feature) {
            return{
                opacity: 1,
                fillOpacity: .5,
                fillColor: dataColor(feature.geometry.coordinates[2]),
                color: "0000000",
                radius: radiusSize(feature.properties.mag),
                weight: 0.5
            }
        }

        //add the GeoJson
        L.geoJson(earthquakeData, {
            pointToLayer: function(feature, latLng) {
                return L.circleMarker(latLng);
            },
            style: dataStyle,
            onEachFeature: function(feature, layer) {
                layer.bindPopup(`Magnitude: <b>${feature.properties.mag}</b><br>
                Depth: <b>${feature.geometry.coordinates[2]}</b><br>
                Location: <b>${feature.properties.place}</b>`);
            }
        }).addTo(earthquakes);
    }
);
earthquakes.addTo(myMap);





// add the overlay for the plates and earthquakes
let overlays = {
    "Tectonic Plates": tectonicplates,
    "Earthquakes": earthquakes
};


// add legend
let legend = L.control({
    position: "bottomright"
});

legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");

    let intervals = [-10, 10, 30, 50, 70, 90];
    let colors = ["green", "#cafc03", "#fcad03", "#fc8403", "#fc4903", "red"];

    for(var i=0; i<intervals.length; i++) {
        let span = `<span class="legend-icon" style="background-color:${colors[i]}"></span>`;
        let interval = intervals[i] + (intervals[i+1] ? "km - " + intervals[i+1] + "km<br>" : "+");
        div.innerHTML += `<div class="legend-row">${span}&nbsp;${interval}</div>`;
    }
    return div;
}

legend.addTo(myMap);


//add the layer control
L.control
    .layers(basemaps, overlays)
    .addTo(myMap);