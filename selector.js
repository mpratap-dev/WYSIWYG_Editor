'use strict';
/*
The idea behind this was to save few lines of code and make DOM element traversing a bit less expensive. 
These functions use the concept of memoization to make a cache of DOM elements the first time js loads, 
afterwards DOM elements are returned from the cache. Also, you can use functions like map(), filter(), and forEach()
without the need to bind because it returns an array instead of NodeList.

$getID()
  Arguments:
    1: id of DOM element
    2: true (if element is to fetched from cache) else false, [default: true].
    3: selector, [default: document]
$getC()
  Arguments:
    1:  class of DOM element
    2:  true (if element is to fetched from cache) else false, [default: true].
    3:  'multiple' (if array of all elements having same class is required) else 'single', [default: 'single'].
    4:  selector, [default: document]
$getQ() 
  Arguments:
    1:  query selector of DOM element (similar to document.querySelectorAll())
    2:  true (if element is to fetched from cache) else false, [default: true].
    3:  'multiple' (if an array of all elements having the same class is required) else 'single', [default: 'single'].
    4:  selector, [default: document]
*/

const globalFunction = (function () {
  return {
    memoizeQuery: function () {
      const cache = {};
      return (query, searchInCache = true, returnType = 'single', selector = document) => {
        let queryParam = query.toString();

        if (searchInCache && (queryParam in cache)) {
          return cache[queryParam];
        } else {
          if (returnType === 'single') {
            let element = selector.querySelector(queryParam);
            cache[queryParam] = element;
            return element;

          } else if (returnType === 'multiple') {
            let nodeList = Array.from(selector.querySelectorAll(queryParam));
            cache[queryParam] = nodeList;
            return nodeList;
          }
        }
      }
    },

    memoizeClass: function () {
      const cache = {};
      return (query, searchInCache = true, returnType = 'single', selector = document) => {
        let queryParam = query.toString();


        if (searchInCache && (queryParam in cache)) {
          return cache[queryParam];
        } else {
          if (returnType === 'single') {
            let element = selector.getElementsByClassName(queryParam)[0];
            cache[queryParam] = element;
            return element;

          } else if (returnType === 'multiple') {
            let nodeList = Array.from(selector.getElementsByClassName(queryParam));

            cache[queryParam] = nodeList;
            return nodeList;
          }
        }
      }
    },

    memoizeID: function () {
      const cache = {};
      return (query, searchInCache = true, selector = document) => {
        let queryParam = query.toString();

        if (searchInCache && (queryParam in cache)) {
          return cache[queryParam];
        } else {
          let element = selector.getElementById(queryParam);
          cache[queryParam] = element;
          return element;
        }
      }
    },

    debounce: function () {
      let inDebounce;
      return (func, delay) => {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay);
      }
    },
  }

})();

const $getQ = globalFunction.memoizeQuery();
const $getC = globalFunction.memoizeClass();
const $getID = globalFunction.memoizeID();
const $debounce = globalFunction.debounce();
