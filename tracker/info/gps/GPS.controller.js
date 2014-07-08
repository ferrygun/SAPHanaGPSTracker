sap.ui.controller("gps.GPS", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
//	onInit: function() {
//
//	},

	
    actSearch: function (lat, lang) {  
        this.geocoder = new google.maps.Geocoder();  
        var latlng = new google.maps.LatLng(lat, lang);
        var mapOptions = {  
            center: latlng,  
            zoom: 16,  
            mapTypeId: google.maps.MapTypeId.ROADMAP  
        };  
        this.map = new google.maps.Map($('#map_canvas').get(0), mapOptions);
        var marker = new google.maps.Marker({
            position: latlng,
            map: this.map,
            title: 'You are here'
        });
    }  
    
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//	onExit: function() {
//
//	}

});
