
// NOTE: none of the values specified here apply automatically to any window
// these values has to be explicitly used there
// this file is more like a css file

// BOOLEAN SPECIFYTING IF THE PLATFORM IS ANDROID OR NOT
var android = Ti.Platform.name == 'android';
var platform_height = Titanium.Platform.displayCaps.platformHeight;
var platform_width = Titanium.Platform.displayCaps.platformWidth;


// COLOR OF FORM LABELS
var label_color = '#535252';

// HEIGHT OF FORM LABELS
var label_height = android ? 20 : 20;

// TEXT FIELD HEIGHT IN FORMS
var text_field_height = android ? 45 : 35;

// HEIGHT OF BUTTON IN FORMS
var button_height = android ? 45 : 35;

// WIDTH OF TEXT FIELDS IN FORMS
var width = 250;

// DEFAULT TOP MARGIN TO BE APPLIED IN EACH PAGE
var top_margin = 10;

