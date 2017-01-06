var Tracker = require('meteor/tracker').Tracker
var compose = require('react-komposer')

function composeWithTracker(reactiveMapper) {
  return function(props, onData, env){
    var trackerCleanup = null;
    const handler = Tracker.nonreactive(() => {
      return Tracker.autorun(() => {
        // assign the custom clean-up function.
        trackerCleanup = reactiveMapper(props, onData, env);
      });
    });

    return () => {
      if(typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };
}

module.exports = function(fn, options){
  return compose(compseWithTracker(fn), options)
}
