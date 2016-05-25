# simpleJS : A simple JavaScript library

Demo here : https://raw.githubusercontent.com/ludovicm67/simple-js/master/demo/index.html

simpleJS (or sJS) is a small and very usefull library for JavaScript.

If you want to get out from the heavy jQuery world, this is one of **the best library** for you, because your jQuery code like :

```js
$.ajax({
  type: 'POST',
  url: '/my/url',
  async: true,
  data: data
})
```

will be something like

```js
sJS.ajax({
  type: 'POST',
  url: '/my/url',
  async: true,
  data: data
})
```

*So here in this case, only the '$' was transformed to 'sJS'*

So you will be familiar with the requests. But simpleJS is not only for people from jQuery; this library will only contains the most useful tools for JavaScript developers with the help of the community. Everyone can read and improve this code, because it's easy to read and to add 



## simpleRequest

With sJS, you can perform classics requests like in jQuery, but also in this way :

```js
sJS.get('/my/url', function (err, res) {
  if(!err) {
    // no errors, so let's so something
  } else {
    // Oh no ! An error ! Let's do something else
  }
});
```

So you can choose the syntax you prefer :wink:

The code is **very easy to understand and not long**, so if you want to learn more about all what you can do with requests of sJS, you can see the code in the **js/components/** folder.


## simpleElements

You can also create new elements in a easy way :

```js
document.appendChilds(
  sJS.newElem('p', {
    className: 'test',
    textContent: 'This is a paragraph for a test :p'
  }),
  sJS.newElem('div', {
    id: 'myId',
    innerHTML: 'Hello world ! :)'
  })
);
```

instead of :

```js
var p = document.createElement('p');
p.className = 'test';
p.textContent = 'This is a paragraph for a test :p';

var div = document.createElement('div');
div.id = 'myId';
div.innerHTML = 'Hello world ! :)';

var body = document.getElementsByTagName('body')[0];
body.appendChild(p);
body.appendChild(div);
```

So here you can see that :

 * we added the `appendChilds()` method

 * you can create HTML elements very quickly with `sJS.newElem('tag', params)`


## simpleInfos

It adds some informations about the project, so just type `sJS.printInfos()` and watch the console.

It can be useful, when you find a problem, and need to find the original repository to open an issue and/or to contribute in other ways.

This component is very small, so if you want to add a new one, just copy this one, remove special content and add your stuff !


## Bugs ?

This library is very young, so it may not be perfect for the moment.

You can fork and contribute to this repository by correcting some bugs or adding new components, or just open an issue here https://github.com/ludovicm67/simple-js/issues :wink:
