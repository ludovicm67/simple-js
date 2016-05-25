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
