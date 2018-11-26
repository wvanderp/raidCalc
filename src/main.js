//( ͡° ͜ʖ ͡°)
var $ = require('jquery');
var filesizeParser = require('filesize-parser');
var drives = [];

$("document").ready(function() {
  $(".input").val("500, 2tb, 2tb, 5");

  $(".submitButton").click(parse);

});

function parse() {
  var tempDrive = parseInput();
  var text = $(".input").val();
  var parts = text.split(",");
  // console.log(parts);
  for (var i = 0; i < parts.length; i++) {
    var drive = parts[i];
    drive = drive.trim();

    var regex = /[a-zA-z]{2}/;
    if (!regex.exec(drive.substring(drive.length - 2, drive.length))) {
      if (drive > 9) {
        drive = drive + "gb";
      } else {
        drive = drive + "tb";
      }
    }

    console.log("'" + drive + "'");
    console.log(filesizeParser(drive));
  }
  console.log(drives);
}

function parseInput() {
  // body...
}
