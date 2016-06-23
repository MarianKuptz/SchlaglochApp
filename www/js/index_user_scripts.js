/*jshint browser:true */
/*global $ */(function()
{
 "use strict";

    var client, todoItemTable;
 /*
   hook up event handlers
 */
 function register_event_handlers()
 {

     //Create a connection refernece ti izr Azure Mobile Apps backend

     client = new WindowsAzure.MobileServiceClient('htts://schlaglochapp.azurewebsites.net');

     //create a table reference
     todoItemTable = client.getTable('todoitem');

     $('#add-item').submit(addItemHandler);




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

    function addItemHandler(event){

        var textbox = $('#new-item-text'),
            itemText = textbox.val();

        if(itemText !== ''){

            todoItemTable.insert({
                text:itemText,
                complete:false
            }).then(handleError);
        }
    }

    function handleError(error){
        var text = error + error.request ? ' - ' + error.request.status :'');
        console.error(text);

    }

    //Kamera verwenden um ein Foto zu schießen und es als base64-encoded string zurückzugeben


52 function capturePhoto() {
53     // Take picture using device camera and retrieve image as base64-encoded string
54     navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
55         quality: 30,
56         targetWidth: 600,
57         targetHeight: 600,
58         destinationType: destinationType.FILE_URI,
59         saveToPhotoAlbum: true
60     });
61 }




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



    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    }

    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }


 document.addEventListener("app.Ready", register_event_handlers, false);
})();
