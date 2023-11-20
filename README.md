
# Leaflet Challenge 

## Interactive Map with Earthquake and Tectonic Plate Data

This code creates an interactive map using Leaflet.js library, integrating various tile layers and data sources. The map displays three base layers:

- **Default:** Default OpenStreetMap view.
- **Grayscale:** Stamen Design's grayscale view.
- **Topography:** OpenTopoMap showing elevation contours.

Additionally, two data layers are added:

- **Tectonic Plates:** Displays tectonic plate boundaries in yellow lines.
- **Earthquakes:** Plots earthquake locations as circles with varying sizes and colors based on magnitude and depth.

### Data Sources

- **Tectonic Plates:** Obtained from [fraxen's GitHub repository](https://github.com/fraxen/tectonicplates).
- **Earthquake Data:** Pulled from the USGS Earthquake Hazards Program API.

### Legend

- The legend on the bottom-right corner represents earthquake depth intervals using different colors. It helps interpret the depth of earthquakes displayed on the map.

### How to Use

1. Run the HTML/JavaScript code in a web environment.
2. The map displays by default with the Default base layer.
3. Use the layer control panel to toggle between base maps (Default, Grayscale, Topography) and additional overlays (Tectonic Plates, Earthquakes).
4. Click on earthquake circles to view magnitude, depth, and location information in pop-up windows.

 ### See the Full Map Below
![FullMAP](https://github.com/bolitaf88/Leaflet-challenge/blob/main/Images/fullmap.png)

### Libraries Used

- **Leaflet.js:** For creating interactive maps.
- **d3.js:** To fetch and manipulate data from external sources.

### Acknowledgments

- **OpenStreetMap Contributors:** Base map data.
- **Stamen Design:** Grayscale map tiles.
- **OpenTopoMap Contributors:** Topography map data.
- **USGS Earthquake Hazards Program:** Earthquake data source.
- **Liang Yam** - TA
- **Mitchell Stone** - TA
- **Justin Bisal** - TA
- **James Newman** - TA
