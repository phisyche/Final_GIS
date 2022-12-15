mapboxgl.accessToken = 'pk.eyJ1Ijoiby1ycGhldXMiLCJhIjoiY2pzN3F6YThqMGpseDQzb2ttYWJmZ2VmZCJ9.6FyHKQF5WOqnQi3mQVI2Fw'
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    center: [21.7587, 4.0383], 
    zoom: 2.5, 
    });
    

    //load the Water bodies data file from the data folder
    map.on('load', () => {
        map.addSource('water', {
            type: 'geojson',
            data: 'data/africawaterbody.geojson',
        });
        map.scrollZoom.disable();
        map.addLayer({
          'id': 'water-layer',
          'type': 'line',
          'source': 'water',
          'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
            },
          'paint': {
              'line-width': 3,
              'line-color': 'blue'
          }
        });

        // load the Vegetation GeoJSON data from the data folder.
        map.addSource('vegetation', {
            type: 'geojson',
            data: 'data/veg.geojson'
        });
    
        map.addLayer({
          'id': 'vegetation-layer',
          'type': 'line',
          'source': 'vegetation',
          'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
            },
          'paint': {
              'line-width': 3,
              'line-color': 'green',
              'line-opacity': .5
          }
        });
    });

    
    map.on('load', function () {
        map.addSource('mapbox-dem', {
            "type": "raster-dem",
            "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
            'tileSize': 512,
            'maxzoom': 14
        });
        // Render the map in 3D using the setTerrain method
         map.setTerrain({"source": "mapbox-dem", "exaggeration": 1.0});
         
     });
    


     map.on('idle', () => {
        // If these two layers were not added to the map, abort
        if (!map.getLayer('water-layer') || !map.getLayer('vegetation-layer')) {
        return;
        }
         
        // Enumerate ids of the layers.
        const toggleableLayerIds = ['water-layer', 'vegetation-layer'];
         
        // Set up the corresponding toggle button for each layer.
        for (const id of toggleableLayerIds) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
        continue;
        }
         
        // Create a link.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        link.className = 'active';
         
        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
        const clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();
         
        const visibility = map.getLayoutProperty(
        clickedLayer,
        'visibility'
        );
         
        // Toggle layer visibility by changing the layout object's visibility property.
        if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
        } else {
        this.className = 'active';
        map.setLayoutProperty(
        clickedLayer,
        'visibility',
        'visible'
        );
        }
        };
         
        const layers = document.getElementById('menu');
        layers.appendChild(link);
        }
        });
     
    // Add a control to adjust view at the top right corner of the page. 
    const navControl = new mapboxgl.NavigationControl({
        visualizePitch: true
    });
    map.addControl(navControl, 'top-right');

    const map2 = new mapboxgl.Map({
   
        container: 'map2',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [21.7587, 4.0383], 
        zoom: 2.4, 
        projection: 'equirectangular',
        });
        
    
        //load the agro-ecological data file from the data folder
        map2.on('load', () => {
            map2.addSource('water', {
                type: 'geojson',
                data: 'data/eco.geojson',
            });
            map2.scrollZoom.disable();
            map2.addLayer({
              'id': 'water-layer',
              'type': 'line',
              'source': 'water',
              'paint': {
                  'line-width': 3,
                  'line-color': 'orange'
              }
            });
    
            // load the food GeoJSON data from the data folder.
            map2.addSource('vegetation', {
                type: 'geojson',
                data: 'data/food.json'
            });
        
            map2.addLayer({
              'id': 'vegetation-layer',
              'type': 'line',
              'source': 'vegetation',
              'paint': {
                  'line-width': 3,
                  'line-color': 'green',
                  'line-opacity': .5
              }
            });
        });
    
        
        map2.on('load', function () {
            map2.addSource('mapbox-dem', {
                "type": "raster-dem",
                "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
                'tileSize': 512,
                'maxzoom': 14
            });
            // Render the map in 3D using the setTerrain method
             map2.setTerrain({"source": "mapbox-dem", "exaggeration": 1.0});
    
             // Add sky using the map.Setfog method.
             map2.setFog({
                'range': [-1, 2],
                'horizon-blend': 0.3,
                'color': 'white',
                'high-color': '#add8e6',
                'space-color': '#d8f2ff',
                'star-intensity': 0.0
            });
             
         });
 
         const navControl2 = new mapboxgl.NavigationControl({
            visualizePitch: true
        });
        map2.addControl(navControl, 'top-right');
  
         
         const map3 = new mapboxgl.Map({
            container: 'map3', 
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [21.7587, 4.0383], 
            zoom: 4,
            projection: 'equirectangular',
            });
            
        
        
            //load the red alert data file from the data folder
            map3.on('load', () => {
                map3.addSource('water', {
                    type: 'geojson',
                    data: 'data/red.geojson',
                });
                map3.scrollZoom.disable();
                map3.addLayer({
                  'id': 'water-layer',
                  'type': 'line',
                  'source': 'water',
                  'paint': {
                      'line-width': 3,
                      'line-color': 'red'
                  }
                });
        
                map3.addSource('vegetation', {
                    type: 'geojson',
                    data: 'data/red.json'
                });
            
                map3.addLayer({
                  'id': 'vegetation-layer',
                  'type': 'line',
                  'source': 'vegetation',
                  'paint': {
                      'line-width': 3,
                      'line-color': 'green',
                      'line-opacity': .5
                  }
                });
            });
        
            
            map3.on('load', function () {
                map3.addSource('mapbox-dem', {
                    "type": "raster-dem",
                    "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
                    'tileSize': 512,
                    'maxzoom': 14
                });
                // Render the map in 3D using the setTerrain method
                 map3.setTerrain({"source": "mapbox-dem", "exaggeration": 1.0});
        
                 // Add sky using the map.Setfog method.
                 map3.setFog({
                    'range': [-1, 2],
                    'horizon-blend': 0.3,
                    'color': 'white',
                    'high-color': '#add8e6',
                    'space-color': '#d8f2ff',
                    'star-intensity': 0.0
                });
                 
             });

             const navControl3 = new mapboxgl.NavigationControl({
                visualizePitch: true
            });
            map3.addControl(navControl, 'top-right');