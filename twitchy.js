var updateEl = function(el, ev){
  el.textContent = ev.detail.value;
};

var Twitchy = {
  bind: function(selector, description){
    var elements = document.querySelectorAll(selector);
    [].forEach.call(elements, function(el){
      window.addEventListener('update:' + description, function(ev){
        updateEl(el, ev);
      }, false);
    });
  },
  trigger: function(description, value){
    var ev = new CustomEvent('update:' + description, {detail: {value: value}});
    window.dispatchEvent(ev);
  }
};
