//Persistent Vars
alertify.defaults = {
  // dialogs defaults
  autoReset: true,
  basic: false,
  closable: true,
  closableByDimmer: false,
  frameless: false,
  maintainFocus: true, // <== global default not per instance, applies to all dialogs
  maximizable: false,
  modal: true,
  movable: false,
  moveBounded: false,
  overflow: true,
  padding: true,
  pinnable: true,
  pinned: true,
  preventBodyShift: false, // <== global default not per instance, applies to all dialogs
  resizable: false,
  startMaximized: false,
  transition: "fade",

  // notifier defaults
  notifier: {
    // auto-dismiss wait time (in seconds)
    delay: 5,
    // default position
    position: "bottom-center",
    // adds a close button to notifier messages
    closeButton: true
  },

  // language resources
  glossary: {
    // dialogs default title
    title: "E-Pay Merchant Services",
    // ok button text
    ok: "OK",
    // cancel button text
    cancel: "Cancel"
  },

  // theme settings
  theme: {
    // class name attached to prompt dialog input textbox.
    input: "ajs-input",
    // class name attached to ok button
    ok: "ajs-ok",
    // class name attached to cancel button
    cancel: "ajs-cancel"
  }
};

/**
 * Dialogs factory
 *
 * @name      {string}   Dialog name.
 * @Factory   {Function} Dialog factory function.
 * @transient {Boolean}  Indicates whether to create a singleton or transient dialog.
 * @base      {String}   The name of an existing dialog to inherit from.
 *
 * alertify.dialog(name, Factory, transient, base)
 *
 */

if (!alertify.promptRestrict) {
  //define a new dialog
  alertify.dialog(
    "promptRestrict",
    function factory() {
      return {
        /*    main: function (message) {
                this.message = message;
            },*/
        setup: function() {
          return {
            buttons: [{ text: "Ok", key: 13 /*Enter*/ }],
            focus: { element: 0 }
          };
        },
        prepare: function() {
          this.setContent(this.message);
        },
        // listen to internal dialog events.
        hooks: {
          // triggered when the dialog is shown, this is seperate from user defined onshow
          onshow: function() {},
          // triggered when the dialog is closed, this is seperate from user defined onclose
          onclose: function() {
            if (key != 13) {
              location.reload();
            }
          },
          // triggered when a dialog option gets updated.
          // IMPORTANT: This will not be triggered for dialog custom settings updates ( use settingUpdated instead).
          onupdate: function() {}
        }
      };
    },
    true,
    "prompt"
  );
}

//ajaxLoader Settings
$.LoadingOverlaySetup({
  image: "",
  fontawesome: "fa fa-circle-notch fa-spin",
  maxSize: 50,
  minSize: 30
});

//Reset button to enabled and set text value
function resetBtn(buttonId, text) {
  var btn = document.getElementById(buttonId);
  if (btn.hasAttribute("disabled")) {
    btn.removeAttribute("disabled");
  }
  btn.textContent = text;
}

//Check if value exists in array
function inArray(needle, haystack) {
  var length = haystack.length;
  for (var i = 0; i < length; i++) {
    if (haystack[i] == needle) return true;
  }
  return false;
}

function generateUUID() {
  var d = new Date().getTime();
  if (Date.now) {
    d = Date.now(); //high-precision timer
  }
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

function generateUID() {
  // I generate the UID from two parts here 
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}