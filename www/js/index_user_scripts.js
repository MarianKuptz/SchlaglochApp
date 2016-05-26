/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers
 */
 function register_event_handlers()
 {

    GPSCheckUp();


     /* graphic button  #btnFoto */
    $(document).on("click", "#btnFoto", function(evt)
    {
       navigator.camera.cleanup(onSuccess, onFail);

        function onSuccess() {
            alert("Camera cleanup success.");
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }

    });

    }

    //Überprüfen ob GPS akiv ist
    function GPSCheckUp(){

      var onSuccess = function(position) {
        /*alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n'
             );*/
        $('#txtHomescreenGPSCheckUp').append('<p>GPS ist aktiv!</p>');
        $('#txtFotoGPSKoordinaten').append('<p> GPS Koordinaten:<br> Längengrad: '+position.coords.latitude+ '<br> Breitengrad: '+ position.coords.longitude+'</p>');

    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);


    }



 document.addEventListener("app.Ready", register_event_handlers, false);
})();
