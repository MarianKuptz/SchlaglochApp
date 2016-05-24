/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers
 */
 function register_event_handlers()
 {


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
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
