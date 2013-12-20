
/*-----------------------------------------------------------------------------------*/
/*  ##. BUTTON HANDLERS
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
	// DOWNLOAD EDITOR TEXT
	$( "#dlbtn" ).on( "click", function( event ) {
	  editor.save();
	  var thecode = $("#code").val();
    // download the code as a file if there is code in the editor
    if (thecode) {
      postToURL( '/api/gethtml', { hstring: thecode } );
    }
    else {
      alert("The editor is empty.  Please enter something in the editor before you attempt to download the text.");
    }
	}); //end dlbtn.on click

  // COPY EDITOR TEXT
  // initialize the zeroclipboard copy capability on page load
  var clip = new ZeroClipboard($("#copybtn"), { moviePath: "swf/ZeroClipboard.swf", hoverClass: "zeroclipboard-is-hover" });
  // set handling when clicked
  clip.on( 'dataRequested', function (client, args) {
    editor.save(); //save the editor text to the textarea
    var thecode = $("#code").val(); //make new variable with the text from the textarea
    if ( thecode ) {
      client.setText( thecode ); //if there is text in the textarea, set the clipboard with the text
    }
    else {
      alert("The editor is empty.  Please enter something in the editor before you attempt to copy the text.");
    }
  }); //end clip = new ZeroClipboard
}); //end document.rdy


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
