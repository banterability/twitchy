var Twitchy = {
  input: function(selector, connectTo, callback){
    var elements = document.querySelectorAll(selector);
    var eventCallback = callback || this._defaultInputCallback;
    [].forEach.call(elements, function(el){
      el.addEventListener('input', function(ev){
        eventCallback(ev, connectTo);
      }, false);
    });
  },
  _defaultInputCallback: function(ev, connectTo){
    var updateEvent, newValue;
    newValue = ev.currentTarget.value;
    updateEvent = new CustomEvent('update:' + connectTo, {
      detail: {value: newValue}
    });
    window.dispatchEvent(updateEvent);
  },
  output: function(selector, connectTo, callback){
    var elements = document.querySelectorAll(selector);
    var eventCallback = callback || this._defaultOutputCallback;
    [].forEach.call(elements, function(el){
      window.addEventListener('update:' + connectTo, function(ev){
        eventCallback(ev, el);
      }, false);
    });
  },
  _defaultOutputCallback: function(ev, el){
    el.textContent = ev.detail.value;
  }
};
