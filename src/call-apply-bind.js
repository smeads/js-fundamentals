/*
- Understanding the "this" keyword, call, apply, and bind in JavaScript
- https://tylermcginnis.com/this-keyword-call-apply-bind-javascript/
- Implicit Bindings
- Explicit Bindings
- new Bindings
- window Binding
*/

// Where is this function invoked?

// Implicit Bindings
// Left of the dot at call time

var sayNameMixin = function(obj) {
  obj.sayName = function() {
    console.log(this.name);
  };
};

var me = {
  name: "Steve",
  age: 30
};

var you = {
  name: "Jack",
  age: 29
};

sayNameMixin(me);
sayNameMixin(you);

me.sayName();
you.sayName();

var Person = function(name, age) {
  return {
    name: name,
    age: age,
    sayName: function() {
      console.log(this.name);
    },
    mother: {
      name: "Stacy",
      sayName: function() {
        console.log(this.name);
      }
    }
  };
};

var jim = Person("Jim", 30);
jim.sayName();
jim.mother.sayName();

// Explicit Bindings
// call, apply, bind

// The call() method calls a function with a given this value and arguments provided individually.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call

var sayName = function(lang1, lang2, lang3) {
  console.log(
    `My name is ${this.name} and I know ${lang1}, ${lang2}, and ${lang3}!`
  );
};

var steve = {
  name: "Steve",
  age: 30
};

var languages = ["JavaScript", "Ruby", "Python"];

sayName.call(steve, languages[0], languages[1], languages[2]);

// The apply() method calls a function with a given this value, and arguments provided as an array (or an array-like object).
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

sayName.apply(steve, languages);

// The bind() method creates a new function that, when called, has its this keyword set to the provided value,
// with a given sequence of arguments preceding any provided when the new function is called.
// ***** RETURNS A NEW FUNCTION *****
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

var newFn = sayName.bind(steve, languages[0], languages[1], languages[2]);
newFn();

// new Binding
// "this" keyword is bound to the new object being created by the constructor
var Animal = function(color, name, type) {
  //this = {}
  this.color = color;
  this.name = name;
  this.type = type;
};

var zebra = new Animal("striped", "Zenus", "zebra");
console.log(zebra.name);
console.log(zebra.color);
console.log(zebra.type);

// window Binding
// If "this" does not exist in a particular lexical scope it will look to the next lexical scope
// and will look until it gets to the window object.
// var saySomething = function() {
//   console.log(this.word);
// };

// var whatSaid = {
//   word: "Hello"
// };

// saySomething(); // -> TypeError (CodeSandbox uses strict mode);
// window.word = "Hello";
// saySomething(); // -> 'Hello'

/**
 * NOTE
 * ES6 arrow functions don't have "this". Instead they just look up the lexical scope until it finds a this reference
 */
