var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGFmaXNoZXJnaXMiLCJhIjoiY2t5MHp1NHNoMDY3dDJ3cGRtNXdraDFiaSJ9.GS7A10SiyfuUiKee_X5N_A'
}).addTo(map);

//Initializes the layer into which features are drawn
var drawnItems = L.featureGroup().addTo(map);

//Defines the rules for what can be drawn
new L.Control.Draw({
    draw : {
        polygon : false,
        polyline : false,
        rectangle : false,     // Rectangles disabled
        circle : false,        // Circles disabled
        circlemarker : false,  // Circle markers disabled
        marker: true
    },
    edit : {
        featureGroup: drawnItems
    }
}).addTo(map);

//Defines rules for spawning the popup from a created feature
function createFormPopup() {
    var popupContent =
    '<form>' +
  		'<h2>Please answer all which you can.</h2>' +
  		'<ul>' +
  		  '<li>' +
  				'<fieldset>' +
  					'<legend>What kind of restroom is it?</legend>' +
  					'<p>' +
  				    '<input type="radio" name="restroomCat" id="Portable" value="Portable">' +
  				    'Port-O-John' +
  	    		'</p>' +
  			    '<p>' +
  					  '<input type="radio" name="restroomCat" id="Latrine" value="Latrine">' +
  				    'Outhouse/Latrine' +
  			    '</p>' +
  			    '<p>' +
  						'<input type="radio" name="restroomCat" id="Building" value="Building">' +
  						'Permanent Structure with Plumbing' +
  				  '</p>' +
   				'</fieldset>' +
  		  '</li>' +
  		  '<li>' +
  				'<fieldset>' +
  					'<legend>What gender does the restroom used serve?</legend>' +
  					'<p>' +
  						'<input type="radio" name="genderCat" id="All" value="All Gender">' +
  						'All Gender' +
  					'</p>' +
  					'<p>' +
  						'<input type="radio" name="genderCat" id="W" value="Women">' +
  						'Women' +
  					'</p>' +
  					'<p>' +
  						'<input type="radio" name="genderCat" id="M" value="Men">' +
  						'Men' +
  					'</p>' +
  				'</fieldset>' +
  		  '</li>' +
  		  '<li>' +
  				'<fieldset>' +
  					'<legend>Please supply a photo of the restroom from outside.</legend>' +
  					'<input type="file" capture="user" accept="image/*" id="photo">' +
  				'</fieldset>' +
  		  '</li>' +
  			'<li>' +
  				'<fieldset>' +
  					'<legend>Usage Fee (enter 0.00 if no fee):</legend>' +
  					'<p>' +
  						'<input type="number" id="price">' +
  						'USD' +
  					'</p>' +
  				'</fieldset>' +
  			'</li>' +
  			'<h3>Section</h3>' +
  			'<li>' +
  				'<fieldset>' +
  					'<legend>Is the restroom out of order?</legend>' +
  					'<p>' +
  						'<input type="radio" name="OutCat" id="ONo" value="OOONo">' +
  						'No' +
  					'</p>' +
  					'<p>' +
  						'<input type="radio" name="OutCat" id="OYes" value="OOOYes">' +
  						'Yes' +
  					'</p>' +
  					'<p>' +
  						'<input type="radio" name="OutCat" id="OUnknown" value="OOOUnknown">' +
  						'Unknown' +
  					'</p>' +
  				'</fieldset>' +
  			'</li>' +
  			'<li>' +
  				'<fieldset>' +
  					'<legend>Number of toilets + urinals in the restroom.</legend>' +
  					'<input type="number" id="NToilets">' +
  					'units' +
  				'</fieldset>' +
  			'</li>' +
  			'<li>' +
  				'<fieldset>' +
  					'<legend>Does the restroom have sinks?</legend>' +
  					'<p>' +
  						'<input type="radio" name="SinkCat" id="SNo" value="SinksNo">' +
  						'No' +
  					'</p>' +
  					'<p>' +
  						'<input type="radio" name="SinkCat" id="SYes" value="SinksYes">' +
  						'Yes' +
  					'</p>' +
  					'<p>' +
  						'<input type="radio" name="SinkCat" id="SUnknown" value="SinksUnknown">' +
  						'Unknown' +
  					'</p>' +
  				'</fieldset>' +
  			'</li>' +
  			'<li>' +
  				'<fieldset>' +
  					'<legend>Does the restroom have urinals?</legend>' +
  					'<p>' +
  						'<input type="radio" name="UriCat" id="UNo" value="UrinalNo">' +
  						'No' +
  					'</p>' +
  					'<p>' +
  						'<input type="radio" name="UriCat" id="UYes" value="UrinalYes">' +
  						'Yes' +
  					'</p>' +
  					'<p>' +
  						'<input type="radio" name="UriCat" id="UUnknown" value="UrinalUnknown">' +
  						'Unknown' +
  					'</p>' +
  				'</fieldset>' +
  			'</li>' +
  			'<li>' +
  				'<fieldset>' +
  					'<legend>Does the restroom have diaper change stations?</legend>' +
  					'<p>' +
  						'<input type="radio" name="DiaCat" id="DNo" value="DiaperNo">' +
  						'No' +
  					'</p>' +
  					'<p>' +
  						'<input type="radio" name="DiaCat" id="DYes" value="DiaperYes">' +
  						'Yes' +
  					'</p>' +
  					'<p>' +
  						'<input type="radio" name="DiaCat" id="DUnknown" value="DiaperUnknown">' +
  						'Unknown' +
  					'</p>' +
  				'</fieldset>' +
  			'</li>' +
  			'<li>' +
  				'<fieldset>' +
  					'<legend>Does the restroom have showers?</legend>' +
  					'<p>' +
  						'<input type="radio" name="ShoCat" id="ShNo" value="ShowerNo">' +
  						'No' +
  					'</p>' +
  					'<p>' +
  						'<input type="radio" name="ShoCat" id="ShYes" value="ShowerYes">' +
  						'Yes' +
  					'</p>' +
  					'<p>' +
  						'<input type="radio" name="ShoCat" id="ShUnknown" value="ShowerUnknown">' +
  						'Unknown' +
  					'</p>' +
  				'</fieldset>' +
  			'</li>' +
  			'<li>' +
  				'<fieldset>' +
  					'<legend>Is the restroom ADA accessible?</legend>' +
  					'<p>' +
  						'<input type="radio" name="ADACat" id="ANo" value="ADANo">' +
  						'No' +
  					'</p>' +
  					'<p>' +
  						'<input type="radio" name="ADACat" id="AYes" value="ADAYes">' +
  						'Yes' +
  					'</p>' +
  					'<p>' +
  						'<input type="radio" name="ADACat" id="AUnknown" value="ADAUnknown">' +
  						'Unknown' +
  					'</p>' +
  				'</fieldset>' +
  			'</li>' +
  			'<li>' +
  				'<fieldset>' +
  					'<legend>Please describe any damage that needs repairs in the restroom.</legend>' +
  					'<p>' +
  						'<input type="text" name="Damage" id="Damage">' +
  					'</p>' +
  				'</fieldset>' +
  			'</li>' +
  			'<li>' +
  				'<fieldset>' +
  					'<legend>Please describe any messes that need cleanup in the restroom.</legend>' +
  					'<p>' +
  						'<input type="text" name="Mess" id="Mess">' +
  					'</p>' +
  				'</fieldset>' +
  			'</li>' +
  			'<li>' +
  				'<fieldset>' +
  					'<legend>Please describe any supply shortages that need restocking in the restroom.</legend>' +
  					'<p>' +
  						'<input type="text" name="Shortage" id="Shortage">' +
  					'</p>' +
  				'</fieldset>' +
  			'</li>' +
  			'<li>' +
  				'<fieldset>' +
  					'<legend>Date of update:</legend>' +
  					'<p>' +
  						'<input type="date" name="Date" id="Date">' +
  					'</p>' +
  				'</fieldset>' +
  			'</li>' +
        '<li>' +
          '<input type="submit" id="submit">'
        '</li>' +
  	 '</ul>' +
  	'</form>'
    drawnItems.bindPopup(popupContent).openPopup();
}

//Spawns data entry popup when a feature is drawn.
map.addEventListener("draw:created", function(e) {
    e.layer.addTo(drawnItems);
    createFormPopup();
});

//Created based on the following link and experience with python: https://www.geeksforgeeks.org/how-to-get-value-of-selected-radio-button-using-javascript/
function radioCheck(a) {
  var target = document.getElementsByName(a);

  for(i = 0; i < target.length; i++) {
      if(target[i].checked)
      return target[i].value;
  }
}

//Prints inputted data into console after turning it into variables
function setData(e) {
    if(e.target && e.target.id == "submit") {
        var restroomType = radioCheck('restroomCat');
        var gender = radioCheck('genderCat');
        var sitePhoto = document.getElementById("photo").value;
        var entryPrice = document.getElementById("price").value;
        var outOfOrder = radioCheck("OutCat");
        var noToilets = document.getElementById("NToilets").value;
        var sinks = radioCheck("SinkCat");
        var urinals = radioCheck("UriCat");
        var diaperChange = radioCheck("DiaCat");
        var showers = radioCheck("ShoCat");
        var americanDA = radioCheck("ADACat");
        var damages = document.getElementById("Damage").value;
        var messes = document.getElementById("Mess").value;
        var shortages = document.getElementById("Shortage").value;
        var upDate = document.getElementById("Date").value;
        // Print user name and description
        console.log('Structure Type: ' + restroomType);
        console.log('Gender Served: ' + gender);
        console.log('Photo: ' + sitePhoto);
        console.log('Price: ' + entryPrice);
        console.log('Out of Order?: ' + outOfOrder);
        console.log('Number of Toilets: ' + noToilets);
        console.log('Has Sinks: ' + sinks);
        console.log('Has Urinals: ' + urinals);
        console.log('Has Diaper Stations: ' + diaperChange);
        console.log('Has Showers: ' + showers);
        console.log('ADA Compliant: ' + americanDA);
        console.log('Damages: ' + damages);
        console.log('Messes: ' + messes);
        console.log('Shortages: ' + shortages);
        console.log('Last Update: ' + upDate);
        // Get and print GeoJSON for each drawn layer
        drawnItems.eachLayer(function(layer) {
            var drawing = JSON.stringify(layer.toGeoJSON().geometry);
            console.log(drawing);
        });
        // Clear drawn items layer
        drawnItems.closePopup();
        drawnItems.clearLayers();
    }
}

//renders the submit button functional
document.addEventListener("click", setData);

//Ensures that the popup will only be present when geometry is not being modified or deleted
map.addEventListener("draw:editstart", function(e) {
    drawnItems.closePopup();
});
map.addEventListener("draw:deletestart", function(e) {
    drawnItems.closePopup();
});
map.addEventListener("draw:editstop", function(e) {
    drawnItems.openPopup();
});
map.addEventListener("draw:deletestop", function(e) {
    if(drawnItems.getLayers().length > 0) {
        drawnItems.openPopup();
    }
});
