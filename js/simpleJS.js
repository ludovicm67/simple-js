// Polyfill from https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/assign
if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

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

  // We add the element.remove() method
  if(typeof HTMLElement.prototype.remove !== "function") {
    HTMLElement.prototype['remove'] = function () {
      this.parentNode.removeChild(this);
    }
  }
  if(typeof NodeList.prototype.remove !== "function") {
    NodeList.prototype['remove'] = function () {
      for (var i = 0; i < this.length; i++) {
        if(this[i] && this[i].parentNode) this[i].parentNode.removeChild(this[i]);
      }
    }
  }
  if(typeof HTMLCollection.prototype.remove !== "function") {
    HTMLCollection.prototype['remove'] = function () {
      for (var i = 0; i < this.length; i++) {
        if(this[i] && this[i].parentNode) this[i].parentNode.removeChild(this[i]);
      }
    }
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

//
// simpleInfos adds useful informations about the library
//
(function() {

  var simpleInfos = {

      // Add some informations
      infos: {
        name: 'simpleJS',
        description: 'A simple JavaScript library',
        author: 'ludovicm67',
        repository: 'https://github.com/ludovicm67/simple-js'
      },
      printInfos: function() {
        console.info(
          'You can contribute to ' + this.infos.name + ' (' + this.infos.description +
          '), written by ' + this.infos.author + ' at ' + this.infos.repository);
      }

  };

  // Add this component to simpleJS
  if(typeof window.sJS === "object") window.sJS = Object.assign(window.sJS, simpleInfos);
  else window.sJS = Object.assign({}, simpleInfos);

})();

//
// simpleRequest's methods can help you to make request in a simple way
//
(function() {

  var simpleRequest = {

    // Perform an ajax request
    ajax: function(init, callback) {

      // We create an object with all informations for the request
      var requestObject;
      if(typeof init == 'object') {
        requestObject = Object.assign({}, init);
      } else if(typeof init == 'string') {
        requestObject = {
          url: init
        }
      }

      // Default values
      if(!requestObject.type) requestObject.type = 'GET';
      if(!requestObject.data) requestObject.data = null;
      if(typeof requestObject.async === 'undefined') requestObject.async = true;

      // We define a callback in case it was not defined (to avoid errors)
      if(typeof callback === 'undefined') {
        if(typeof requestObject.success !== 'undefined') {
          callback = function(err, res) {
            if(!err) requestObject.success(res);
          }
        } else {
          callback = function(err, res) {
            if(err) console.error(err);
          }
        }
      }

      // We check if we have an url for the request
      if(!requestObject.url) {
        if(requestObject.error) requestObject.error();
        callback('No URL found for performing this request.');
      } else {
        var request = new XMLHttpRequest();
        request.open(requestObject.type, requestObject.url, requestObject.async);

        request.onload = function() {
          if(this.status >= 200 && this.status < 400) {
            callback(null, this.response);
          } else {
            if(requestObject.error) requestObject.error();
            callback('Server returned a ' + this.status + ' error');
          }
        };

        // If we need to send datas, we need to serialize it (if it's an object)
        if(requestObject.data) {
          request.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded; charset=UTF-8'
          );
          if(typeof requestObject.data == 'object') {
            var serialize = function(obj, prefix) {
              var str = [];
              for(var p in obj) {
                if (obj.hasOwnProperty(p)) {
                  var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
                  str.push(typeof v == 'object' ?
                    serialize(v, k) :
                    encodeURIComponent(k) + '=' + encodeURIComponent(v));
                }
              }
              return str.join('&');
            }
            request.send(serialize(requestObject.data));
          }
          else request.send(requestObject.data);
        }

        // For the case when no data have to be sent
        else request.send();
      }

    },

    // Perform a GET request
    get: function(url, callback) {
      if(typeof url == 'string') this.ajax({
        url: url,
        type: 'GET'
      }, callback);
      else this.ajax(Object.assign({type: 'GET'}, url), callback);
    },

    // Perform a GET request to get json content
    getJSON: function(url, callback) {
      this.get(url, function(err, content) {
        if(err) callback(err);
        else {
          try {
            callback(null, JSON.parse(content));
          } catch(e) {
            callback(e);
          }
        }
      });
    },

    // Perform a POST request
    post: function(url, callback) {
      if(typeof url == 'string') this.ajax({
        url: url,
        type: 'POST'
      }, callback);
      else this.ajax(Object.assign({type: 'POST'}, url), callback);
    }

  };

  // Add this component to simpleJS
  if(typeof window.sJS === "object") window.sJS = Object.assign(window.sJS, simpleRequest);
  else window.sJS = Object.assign({}, simpleRequest);

})();
