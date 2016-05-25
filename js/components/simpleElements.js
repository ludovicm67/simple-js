//
// simpleElements adds useful methods for DOM elements, ...
//
(function() {

  // We add the element.appendChilds() method
  if(typeof HTMLElement.prototype.appendChilds !== "function") {
    HTMLElement.prototype['appendChilds'] = function () {
      for (var i = 0; i < arguments.length; i++) this.appendChild(arguments[i]);
    }
  }
  if(!document.body) document.body = document.getElementsByTagName('body')[0];
  if(typeof document.appendChilds !== "function" && document.body) {
    document.appendChilds = function () {
      for (var i = 0; i < arguments.length; i++) document.body.appendChild(arguments[i]);
    }
  }

  var simpleElements = {

      // create a new element quickly
      newElem: function (elem, attrs) {
          return Object.assign(document.createElement(elem), attrs);
      }

  };

  // Add this component to simpleJS
  if(typeof window.sJS === "object") window.sJS = Object.assign(window.sJS, simpleElements);
  else window.sJS = Object.assign({}, simpleElements);

})();
