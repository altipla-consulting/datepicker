#!/bin/bash

set -eu

rm -rf dist
mkdir dist

declare -a langs=("es" "en" "fr" "it" "de")

for lang in "${langs[@]}"
do
  echo "--- Build lang $lang"
  java -jar vendor/closure-compiler/build/compiler.jar \
    --js_output_file dist/datepicker-$lang.js \
    --only_closure_dependencies \
    --language_in ECMASCRIPT5_STRICT \
    --closure_entry_point altipla.InputDatePicker \
    --compilation_level ADVANCED \
    --warning_level VERBOSE \
    --generate_exports \
    --output_wrapper "\n(function() {%output%}).call(this);" \
    --jscomp_error checkTypes \
    --jscomp_error checkVars \
    --jscomp_error deprecated \
    --define "goog.DEBUG=false" \
    --define "goog.LOCALE='$lang'" \
    --define "goog.dom.ASSUME_STANDARDS_MODE=true" \
    --js src/** \
    --js vendor/closure-library/closure/**
done
