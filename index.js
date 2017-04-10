var Tracker = require('meteor/tracker').Tracker
var compose = require('react-komposer').compose

function composeWithTracker(reactiveMapper) {
  return function(props, onData, env){
    var trackerCleanup = null;
    var handler = Tracker.nonreactive(function() {
      return Tracker.autorun(function() {
        // assign the custom clean-up function.
        trackerCleanup = reactiveMapper(props, onData, env);
      });
    });

    return function() {
      if(typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };
}

module.exports = function(fn, options){
  return compose(composeWithTracker(fn), options)
}
