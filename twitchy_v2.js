var Twitchy = {
  input: function(el, connectTo){
    el.addEventListener('input', function(ev){
      var updateEvent, newValue;
      newValue = ev.currentTarget.value;
      updateEvent = new CustomEvent('update:' + connectTo, {detail: {value: newValue}});
      window.dispatchEvent(updateEvent);
    }, false);
  },
  output: function(el, connectTo){
    window.addEventListener('update:' + connectTo, function(ev){
      el.textContent = ev.detail.value;
    }, false);
  }
};
