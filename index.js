'use strict';
var SourceMapGenerator = require('source-map').SourceMapGenerator;
var SourceMapConsumer = require('source-map').SourceMapConsumer;

module.exports = function applySourceMap(file, sourceMap) {
  if (typeof sourceMap === 'string' || sourceMap instanceof String) {
    sourceMap = JSON.parse(sourceMap);
  }

  assertProperty(sourceMap, "file");
  assertProperty(sourceMap, "mappings");
  assertProperty(sourceMap, "sources");

  if (file.sourceMap) {
    var generator = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(sourceMap));
    generator.applySourceMap(new SourceMapConsumer(file.sourceMap));
    file.sourceMap = JSON.parse(generator.toString());
  } else {
    file.sourceMap = sourceMap;
  }
};

function assertProperty(sourceMap, propertyName) {
  if (!sourceMap[propertyName]) {
    var e = new Error('Source map to be applied is missing the \"' + propertyName + '\" property');
    throw e;
  }
}
