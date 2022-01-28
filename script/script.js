"use strict";

require([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/widgets/LayerList',
    'esri/widgets/Legend',
    'esri/widgets/BasemapGallery',
    'esri/widgets/Expand',
    'esri/widgets/Search',
    'esri/PopupTemplate',

], (Map, MapView, FeatureLayer, LayerList, Legend, BasemapGallery, Expand, Search, PopupTemplate) => {

    const map = new Map({
        basemap: "dark-gray-vector"
    });

    const view = new MapView({
        map: map,
        container: "viewDiv",
        zoom: 3,
        center: [20, 52],
    });

    const f1 = new FeatureLayer({
        url: 'https://services.arcgis.com/XSeYKQzfXnEgju9o/arcgis/rest/services/World_War_1_Battle_Locations/FeatureServer/0',
    });
    map.add(f1)

    view.constraints = {
        minZoom: 2,
        maxZoom: 19
    };
    const bgw = new BasemapGallery({
        view: view
    });

    const layerList = new LayerList({
        view: view
    });

    const expandbgw = new Expand({
        view: view,
        content: bgw
    });

    const expandlayerList = new Expand({
        view: view,
        content: layerList
    });

    const legend = new Legend({
        view: view,
        content: f1
    });
    view.ui.add(legend, { position: "bottom-right" });

    view.ui.add(expandbgw, {
        position: "top-right"
    });
    view.ui.add(expandlayerList, {
        position: "top-right"
    });

    const searchWidget = new Search({
        view: view
    });
    view.ui.add(searchWidget, {
        position: "top-left",
        index: 2
    });


    const template = {
        title: "Bitwa: {Short_Name} {FID} {Long} {Lat}",
        content: [{
            type: "fields",
            fieldInfos: [{
                    fieldName: "Date",
                    label: "Data"
                },
                {
                    fieldName: "Engagement",
                    label: "Pełna nazwa"
                },
                {
                    fieldName: "Front",
                    label: "Front"
                },
                {
                    fieldName: "Notes",
                    label: "Dodatkowe informacje"
                },
                
            ]
        }]
    };
    f1.popupTemplate = template;
    console.log(f1.outFields);

    document.getElementById("l1").addEventListener("click", function() {
        view.center = [5.372629, 49.207258];
        view.zoom = 11;
    });
    document.getElementById("l2").addEventListener("click", function() {
        view.center = [2.560101, 49.904365];
        view.zoom = 11;
    });
    document.getElementById("l3").addEventListener("click", function() {
        view.center = [2.918129, 50.892553];
        view.zoom = 11;
    });
    document.getElementById("l4").addEventListener("click", function() {
        view.center = [20.248947, 53.572938];
        view.zoom = 11;
    });
    

});