'use strict';

goog.provide('altipla.InputDatePicker');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimeParse');
goog.require('goog.labs.userAgent.browser');
goog.require('goog.ui.InputDatePicker');
goog.require('goog.userAgent');
goog.require('goog.userAgent.product');



/**
 * Date picker attach to an input.
 * @param {Element} input The input to attach to.
 * @constructor
 * @struct
 * @export
 */
altipla.InputDatePicker = function(input) {
  /**
   * The attached input.
   * @type {Element}
   * @private
   */
  this.input_ = input;

  var addon = input.parentElement.querySelector('.input-group-addon');
  goog.events.listen(addon, goog.events.EventType.CLICK,
      goog.bind(this.focusInput_, this));

  var formatter = new goog.i18n.DateTimeFormat(
      altipla.InputDatePicker.INPUT_FORMAT_);
  var parser = new goog.i18n.DateTimeParse(
      altipla.InputDatePicker.INPUT_FORMAT_);

  /**
   * The native date picker instance.
   * @type {goog.ui.InputDatePicker}
   * @private
   */
  this.picker_ = new goog.ui.InputDatePicker(formatter, parser);
  this.picker_.decorate(this.input_);

  // Style iPhone date pickers without fixed elements; they break when the
  // keyboard is opened.
  var element = this.picker_.getDatePicker().getElement();
  if (goog.userAgent.IPHONE && goog.labs.userAgent.browser.isSafari()) {
    goog.dom.classlist.add(element, 'iphone');
  } else {
    goog.dom.classlist.add(element, 'backdrop');
  }

  goog.events.listen(element, goog.events.EventType.CLICK,
      goog.bind(this.close_, this));

  var picker = this.picker_.getDatePicker();
  picker.setAllowNone(false);
  picker.setUseSimpleNavigationMenu(true);
  picker.setShowWeekNum(false);
  picker.setShowToday(false);
};


goog.scope(function() {
var _ = altipla.InputDatePicker;


/**
 * Format of the select checkin/checkout dates in the inputs.
 * @const {string}
 * @private
 */
_.INPUT_FORMAT_ = 'dd MMMM yyyy';


/**
 * Add a new change listener.
 * @param {function(altipla.InputDatePicker)} listener Listener to call
 * when the value changes.
 * @export
 */
_.prototype.addChangeListener = function(listener) {
  goog.events.listen(this.picker_.getDatePicker(),
      goog.ui.DatePicker.Events.CHANGE, goog.bind(listener, this));
};


/**
 * @return {string} Serialized date.
 * @export
 */
_.prototype.getValue = function() {
  return this.picker_.getDatePicker().getDate().toIsoString(true);
};


/**
 * Show the date picker.
 * @private
 */
_.prototype.show_ = function() {
  this.picker_.showForElement(this.input_);
};


/**
 * Close the datepicker when the outer page mask is pressed (on mobile).
 * @param {goog.events.Event} event The click event.
 * @private
 */
_.prototype.close_ = function(event) {
  var target = /** @type {Element} */ (event.target);
  if (!goog.dom.classlist.contains(target, 'goog-date-picker')) {
    return;
  }

  this.picker_.hidePopup();
};


/**
 * Focus the input when the calendar icon addon is clicked.
 * @private
 */
_.prototype.focusInput_ = function() {
  this.input_.focus();
  this.show_();
};


});  // goog.scope
