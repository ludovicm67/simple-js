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
        };
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
          };
        } else {
          callback = function(err, res) {
            if(err) console.error(err);
          };
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
            };
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
