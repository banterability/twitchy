var Twitchy = {
  input: function(options){
    var bindTo, callback, channel, elements, eventCallback, selector;

    options = options || {};
    bindTo = options.bindTo || 'input';
    callback = options.callback || this._defaultInputCallback;
    channel = options.channel;
    selector = options.selector;

    elements = document.querySelectorAll(selector);

    [].forEach.call(elements, function(el){
      el.addEventListener(bindTo, function(ev){
        callback(ev, channel);
      }, false);
    });
  },
  _defaultInputCallback: function(ev, channel){
    var updateEvent, newValue;

    newValue = ev.currentTarget.value;
    updateEvent = new CustomEvent('update:' + channel, {
      detail: {value: newValue}
    });

    window.dispatchEvent(updateEvent);
  },
  output: function(options){
    var callback, channel, elements, selector;

    options = options || {};
    callback = options.callback || this._defaultOutputCallback;
    channel = options.channel;
    selector = options.selector;

    elements = document.querySelectorAll(selector);

    [].forEach.call(elements, function(el){
      window.addEventListener('update:' + channel, function(ev){
        callback(ev, el);
      }, false);
    });
  },
  _defaultOutputCallback: function(ev, el){
    el.textContent = ev.detail.value;
  }
};
