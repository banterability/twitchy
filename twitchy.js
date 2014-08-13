var Twitchy = function(){
  var input, _defaultInputCallback, output, _defaultOutputCallback, trigger;

  input = function(options){
    var bindTo, callback, channel, elements, eventCallback, selector;

    options = options || {};
    bindTo = options.bindTo || 'input';
    callback = options.callback || _defaultInputCallback;
    channel = options.channel;
    selector = options.selector;

    elements = document.querySelectorAll(selector);

    [].forEach.call(elements, function(el){
      el.addEventListener(bindTo, function(ev){
        callback(ev, channel);
      }, false);
    });
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
    var callback, channel, elements, selector;

    options = options || {};
    callback = options.callback || _defaultOutputCallback;
    channel = options.channel;
    selector = options.selector;

    elements = document.querySelectorAll(selector);

    [].forEach.call(elements, function(el){
      window.addEventListener('update:' + channel, function(ev){
        callback(ev, el);
      }, false);
    });
  };

  _defaultOutputCallback = function(ev, el){
    el.textContent = ev.detail.value;
  };

  trigger = function(options){
    options = options || {};
    channel = options.channel;
    value = options.value;

    updateEvent = new CustomEvent('update:' + channel, {
      detail: {value: value}
    });

    window.dispatchEvent(updateEvent);
  };

  return {
    input: input,
    output: output,
    trigger: trigger
  };
}();
