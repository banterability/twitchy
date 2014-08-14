window.Twitchy = function(){
  var forEachElement, input, _defaultInputCallback, output, _defaultOutputCallback, trigger;

  forEachElement = function(selector, callback){
    [].forEach.call(document.querySelectorAll(selector), callback);
  };

  input = function(options){
    var bindTo, callback, channel, selector;

    options = options || {};
    bindTo = options.bindTo || 'input';
    callback = options.callback || _defaultInputCallback;
    channel = options.channel;
    selector = options.selector;

    forEachElement(selector, function(el){
      el.addEventListener(bindTo, function(ev){
        callback(ev, channel);
      }, false);
    });
    return this;
  };

  _defaultInputCallback = function(ev, channel){
    var value;

    value = ev.currentTarget.value;

    trigger({
      channel: channel,
      value: value
    });
  };

  output = function(options){
    var callback, channel, selector;

    options = options || {};
    callback = options.callback || _defaultOutputCallback;
    channel = options.channel;
    selector = options.selector;

    forEachElement(selector, function(el){
      window.addEventListener('update:' + channel, function(ev){
        callback(ev, el);
      }, false);
    });
    return this;
  };

  _defaultOutputCallback = function(ev, el){
    el.textContent = ev.detail.value;
  };

  trigger = function(options){
    var channel, updateEvent, value;

    options = options || {};
    channel = options.channel;
    value = options.value;

    updateEvent = new CustomEvent('update:' + channel, {
      detail: {value: value}
    });

    window.dispatchEvent(updateEvent);
    return this;
  };

  return {
    input: input,
    output: output,
    trigger: trigger
  };
}();
