
// Button clicks
$(document).ready(function() {
	// DOWNLOAD CODE
	$( "#dlbtn" ).on( "click", function( event ) {
	  editor.save();
	  var thecode = $("#code").val();
	  postToURL( '/api/gethtml', { hstring: thecode } );
	  //alert(thecode);
	});
});


/*-----------------------------------------------------------------------------------*/
/*	##.	GLOBAL POST FUNCTION
/*-----------------------------------------------------------------------------------*/
function postToURL(path, parameters) {
  method = "post"; // Set method to post by default
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for(var key in parameters) {
      if(parameters.hasOwnProperty(key)) {
          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", parameters[key]);

          form.appendChild(hiddenField);
       }
  }

  document.body.appendChild(form);
  form.submit();
}
