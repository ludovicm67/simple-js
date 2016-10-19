//
// simpleElements adds useful methods for DOM elements, ...
//
(function() {

  // We add the element.appendChilds() method
  if(typeof HTMLElement.prototype.appendChilds !== "function") {
    HTMLElement.prototype.appendChilds = function () {
      for (var i = 0; i < arguments.length; i++) this.appendChild(arguments[i]);
    };
  }
  if(!document.body) document.body = document.getElementsByTagName('body')[0];
  if(typeof document.appendChilds !== "function" && document.body) {
    document.appendChilds = function () {
      for (var i = 0; i < arguments.length; i++) document.body.appendChild(arguments[i]);
    };
  }

  // We add the element.remove() method
  if(typeof HTMLElement.prototype.remove !== "function") {
    HTMLElement.prototype.remove = function () {
      this.parentNode.removeChild(this);
    };
  }
  if(typeof NodeList.prototype.remove !== "function") {
    NodeList.prototype.remove = function () {
      for (var i = 0; i < this.length; i++) {
        if(this[i] && this[i].parentNode) this[i].parentNode.removeChild(this[i]);
      }
    };
  }
  if(typeof HTMLCollection.prototype.remove !== "function") {
    HTMLCollection.prototype.remove = function () {
      for (var i = 0; i < this.length; i++) {
        if(this[i] && this[i].parentNode) this[i].parentNode.removeChild(this[i]);
      }
    };
  }


  var simpleElements = {

    // a simple selector
    elem: function (str) {
      return document.querySelectorAll(str);
    },
    // create a new element quickly
    newElem: function (elem, attrs) {
      return Object.assign(document.createElement(elem), attrs);
    },
    // remove elements
    removeElem: function () {
      for (var i = 0; i < arguments.length; i++) arguments[i].parentNode.removeChild(arguments[i]);
    }

  };

  // Add this component to simpleJS
  if(typeof window.sJS === "object") window.sJS = Object.assign(window.sJS, simpleElements);
  else window.sJS = Object.assign({}, simpleElements);

})();
