'use strict';

goog.provide('altipla.date.MAXIMUM_DATE');
goog.provide('altipla.date.buildRange');
goog.provide('altipla.date.todayMadrid');

goog.require('altipla.timezones.EuropeMadrid');
goog.require('goog.date.Date');
goog.require('goog.date.DateRange');
goog.require('goog.date.DateTime');
goog.require('goog.date.Interval');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.TimeZone');


goog.scope(function() {
var Interval = goog.date.Interval;
var TimeZone = goog.i18n.TimeZone;


/**
 * Maximum date allowed on the picker.
 * @type {goog.date.Date}
 * @export
 */
altipla.date.MAXIMUM_DATE = goog.date.DateRange.MAXIMUM_DATE;


/**
 * Builds a date object in the Europe/Madrid timezone with a value of today.
 * @return {!Date} Date object.
 * @export
 */
altipla.date.todayMadrid = function() {
  var today = new goog.date.DateTime();

  var timezone = TimeZone.createTimeZone(altipla.timezones.EuropeMadrid);
  today.add(new Interval(Interval.MINUTES, today.getTimezoneOffset()));
  today.add(new Interval(Interval.MINUTES, -timezone.getOffset(today)));

  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};


/**
 * Build a new date range.
 * @param {goog.date.DateLike} start Start of the range.
 * @param {goog.date.DateLike} end End of the range.
 * @export
 */
altipla.date.buildRange = function(start, end) {
  start = new goog.date.Date(start);
  end = new goog.date.Date(end);
  
  return new goog.date.DateRange(start, end);
};


/**
 * Format a date.
 * @param {Date} date Date to format.
 * @param {string} format Format to use.
 * @return {string} Formatted date.
 * @export
 */
altipla.date.format = function(date, format) {
  var datefmt = new goog.i18n.DateTimeFormat(format);
  return datefmt.format(date);
};


});  // goog.scope


