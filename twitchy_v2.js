var Twitchy = {
  input: function(selector, connectTo){
    var elements = document.querySelectorAll(selector);
    [].forEach.call(elements, function(el){
      el.addEventListener('input', function(ev){
        var updateEvent, newValue;
        newValue = ev.currentTarget.value;
        updateEvent = new CustomEvent('update:' + connectTo, {detail: {value: newValue}});
        window.dispatchEvent(updateEvent);
      }, false);
    });
  },
  output: function(selector, connectTo){
    var elements = document.querySelectorAll(selector);
    [].forEach.call(elements, function(el){
      window.addEventListener('update:' + connectTo, function(ev){
        el.textContent = ev.detail.value;
      }, false);
    });
  }
};
