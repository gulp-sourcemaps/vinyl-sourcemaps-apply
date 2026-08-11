# vinyl-sourcemaps-apply

Apply a source map to a vinyl file, merging it with preexisting source maps.

## Strict No LLM / No AI Policy

No LLMs for issues.

No LLMs for patches / pull requests.

No LLMs for comments on the bug tracker, including translation.

English is encouraged, but not required. You are welcome to post in your native language and rely on others to have their own translation tools of choice to interpret your words.

## Usage:

```javascript
var applySourceMap = require('vinyl-sourcemaps-apply');
applySourceMap(vinylFile, sourceMap);
```

### Example (Gulp plugin):

```javascript
var through = require('through2');
var applySourceMap = require('vinyl-sourcemaps-apply');
var myTransform = require('myTransform');

module.exports = function(options) {

  function transform(file, encoding, callback) {
    // generate source maps if plugin source-map present
    if (file.sourceMap) {
      options.makeSourceMaps = true;
    }

    // do normal plugin logic
    var result = myTransform(file.contents, options);
    file.contents = new Buffer(result.code);

    // apply source map to the chain
    if (file.sourceMap) {
      applySourceMap(file, result.map);
    }

    this.push(file);
    callback();
  }

  return through.obj(transform);
};
```
