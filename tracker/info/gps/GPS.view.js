sap.ui.jsview("gps.GPS", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf ftse_simple.FTSE_SIMPLE
	*/ 
	getControllerName : function() {
		return "gps.GPS";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf ftse_simple.FTSE_SIMPLE
	*/ 
	createContent : function(oController) {
		var oPanel = new sap.ui.commons.Panel().setText('GPS Coordinate');
		

		
		jQuery.sap.require("sap.ui.core.IconPool");
			    
		
	    oController.oModel = new sap.ui.model.odata.ODataModel("http://hana2.vm.cld.sr:8000/tracker/info/service/GPSTracker.xsodata",true, "SYSTEM", "manager");
	    oController.oModel.setHeaders({"content-type" : "application/json;charset=UTF-8"}); 

	    
	    //Define Table (needs sap.ui.table)
		var oTable = new sap.ui.table.Table("GPS", {tableId: "GPSId",visibleRowCount: 5,
			toolbar: new sap.ui.commons.Toolbar({items: [ 
			new sap.ui.commons.Button({text: "Refresh Data", press: function() { oController.oModel.refresh(); } })
			]})
		});  
		
		var oControl;  
		var vCol;
		// ADD COLUMNS
		//Prepare column to easily allow formating etc
		vCol = "STIMESTAMP";
		oControl = new sap.ui.commons.TextField().bindProperty("value",vCol);  
		//Add
		oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "Timestamp" }), 
            template: oControl,   
            sortProperty: vCol,  
            filterProperty: vCol 
                      }));  
		
		vCol = "LAT"; 
		oControl = new sap.ui.commons.TextField().bindProperty("value",vCol);  
		//Add
		oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "Latitude" }), 
            template: oControl,   
            sortProperty: vCol,  
            filterProperty: vCol 
                      }));  

		vCol = "LONG"; 
		oControl = new sap.ui.commons.TextField().bindProperty("value",vCol);  
		//Add
		oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "Longitude" }), 
            template: oControl,   
            sortProperty: vCol,  
            filterProperty: vCol 
                      }));  
		
		//Sort Table
		oTable.sort(oTable.getColumns()[0]);
		
		
		oTable.attachRowSelectionChange(function(oEvent) {  
            var currentRowContext = oEvent.getParameter("rowContext");
            var lat = oController.oModel.getProperty("LAT", currentRowContext);   
            var lang = oController.oModel.getProperty("LONG", currentRowContext);   

            oController.actSearch(lat, lang);
            
		});  
		
		//Prepare output
		oTable.setModel(oController.oModel);   
		oTable.bindRows("/GPSTracker");   
		oPanel.addContent(oTable);
		
		return oPanel;
		
		
		
	}

});
