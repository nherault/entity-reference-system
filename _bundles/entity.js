!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("MyLib",[],t):"object"==typeof exports?exports.MyLib=t():e.MyLib=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var o=n(3);function i(e,t,n,o){var f=(o=o||s)(e,t,n);return function(e,t,n){if(n.compose){var r=c(t,n.compose);r.forEach(function(t){n.composeOf=n.composeOf||{},Array.isArray(n.composeOf[t.type])?n.composeOf[t.type].push(i(e,t.type,t.id)):void 0!==n.composeOf[t.type]?(n.composeOf[t.type]=[n.composeOf[t.type]],n.composeOf[t.type].push(i(e,t.type,t.id))):n.composeOf[t.type]=i(e,t.type,t.id)}),delete n.compose}}(e,t,f=function(e,t,n){if(n.extend){var o=c(t,n.extend);o.forEach(function(){n=r({},o.reduce(function(t,n){return r({},t,i(e,n.type,n.id))},{}),n)}),delete n.extend}return n}(e,t,f)),f}function s(e,t,n){return o.COPY(e[t][n])}function c(e,t){return Array.isArray(t)?t.map(function(t){return f(e,t)}):[f(e,t)]}function f(e,t){return"string"==typeof t?{type:e,id:t}:t}t.generateTypeEntityFromReference=i,t.isEntityReferenceExist=function(e,t,n){return void 0!==t&&void 0!==n&&void 0!==e[t]&&void 0!==e[t][n]}},function(e,t,n){"use strict";function r(e,t,n){return e="object"==typeof t?t.constructor===Array?function(e,t,n){var o=t.length;if(e&&e.constructor===Array){n&&(e=[]);for(var i=0;i<o;i++)e.push(r(void 0,t[i],n))}else{e=[];for(var i=0;i<o;i++)e[i]=r(e[i],t[i],n)}return e}(e,t,n):function(e,t,n){void 0===e&&(e={});for(var o=Object.keys(t),i=0,s=o.length;i<s;i++){var c=o[i],f=t[c];void 0!==f&&(e[c]=r(e[c],f,n))}return e}(e,t,n):t}function o(e,t){return e.constructor===Array?e.concat(JSON.parse(JSON.stringify(t))):JSON.parse(JSON.stringify(t))}Object.defineProperty(t,"__esModule",{value:!0}),t.initializer=function(e,t){for(var n=Object.keys(t),r=0,o=n.length;r<o;r++){var i=n[r];t.hasOwnProperty(i)&&(e[i]=t[i])}return e},t.reset=function(e,t,n){return void 0===n&&(n=!0),t=r(t,e,!0),n&&(t=function e(t,n){for(var r=Object.keys(n),o=0,i=r.length;o<i;o++){var s=r[o];void 0===t[s]?n[s]=void 0:"object"==typeof t[s]&&(n[s]=e(t[s],n[s]))}return n}(e,t)),t},t.applyMixins=function(e,t){return(t.constructor===Array?t:[t]).forEach(function(t){e=function e(t,n){for(var r=Object.keys(n),i=0,s=r.length;i<s;i++){var c=r[i];n.hasOwnProperty(c)&&(void 0===t[c]||null===t[c]?t[c]=JSON.parse(JSON.stringify(n[c])):n[c].constructor===Array?t[c]=o(t[c],n[c]):"object"==typeof n[c]?t[c]=JSON.parse(JSON.stringify(e(t[c],n[c]))):t[c]=n[c])}return t}(e,t)}),e},t.deepCopy=function(e,t,n){return void 0===n&&(n=!1),(t.constructor===Array?t:[t]).forEach(function(t){e=r(e,t,n)}),e}},function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(0)),r(n(4)),r(n(5))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.COPY=function(e){return JSON.parse(JSON.stringify(e))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),o=n(0),i=function(){function e(){this.entityReference={},this.entityReferenceByType={}}return e.prototype.init=function(e){return this.entityReference=r.deepCopy({},e),this.generateEntityReferenceByType(),this},e.prototype.add=function(e){return this.entityReference=r.deepCopy({},[this.entityReference,e],!0),this.generateEntityReferenceByType(),this},e.prototype.isEntityReferenceExist=function(e,t){return o.isEntityReferenceExist(this.entityReference,e,t)},e.prototype.generateTypeEntityFromReference=function(e,t){var n=this.generateType(e,t);return JSON.parse(JSON.stringify(this.entityReferenceByType[n]))},e.prototype.generateEntityReferenceByType=function(){var e=this;Object.keys(this.entityReference).forEach(function(t){Object.keys(e.entityReference[t]).forEach(function(n){var i=e.generateType(t,n),s=o.generateTypeEntityFromReference(e.entityReference,t,n);e.entityReferenceByType[i]=r.deepCopy({},s)})})},e.prototype.generateType=function(e,t){return e+"_"+t},e}();t.EntityReferenceSystemDefault=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),o=n(6),i=n(0),s=function(){function e(){this.entityReference={},this.entityReferenceByPoolType={},this.poolManager=new o.PoolManager}return e.prototype.init=function(e){return this.entityReference=r.deepCopy({},e),this.generatePools(),this},e.prototype.add=function(e){return this.entityReference=r.deepCopy(this.entityReference,[this.entityReference,e]),this.generatePools(),this},e.prototype.isEntityReferenceExist=function(e,t){return i.isEntityReferenceExist(this.entityReference,e,t)},e.prototype.generateTypeEntityFromReference=function(e,t){var n=this.generatePoolType(e,t),o=this.poolManager.createAndGenerateId(n),i=o.id;return r.reset(this.entityReferenceByPoolType[n],o),o.id=i,o},e.prototype.generatePools=function(){var e=this;this.poolManager.releaseAllPools(),Object.keys(this.entityReference).forEach(function(t){Object.keys(e.entityReference[t]).forEach(function(n){var o=e.generatePoolType(t,n),s=i.generateTypeEntityFromReference(e.entityReference,t,n);e.entityReferenceByPoolType[o]=r.deepCopy({},s),e.poolManager.addPool(o,50,s)})})},e.prototype.generatePoolType=function(e,t){return e+"_"+t},e}();t.EntityReferenceSystemPool=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={currentObjects:[],expandFactor:.2,expandMinUnits:32,freeIndexes:[],freeList:[],id:"",reference:{}},o=function(){function e(){this.pools={}}return e.prototype.addPool=function(e,t,n,o,i){return void 0===o&&(o=32),void 0===i&&(i=.2),this.pools[e]=JSON.parse(JSON.stringify(r)),this.pools[e].expandMinUnits=o,this.pools[e].expandFactor=i,this.pools[e].reference=n,this.pools[e].id=e,this.expandPool(e,t),this.pools[e]},e.prototype.expandPool=function(e,t){for(var n=this.pools[e],r=0;r<t;r++)n.freeList.push(JSON.parse(JSON.stringify(n.reference)));return this},e.prototype.createAndGenerateId=function(e){var t=this.pools[e];if(t.freeList.length<=0){var n=Math.ceil(t.freeList.length*t.expandFactor);n<t.expandMinUnits&&(n=t.expandMinUnits),this.expandPool(e,n)}var r=t.freeList.pop(),o=t.freeIndexes.pop();return void 0===o&&(o=t.currentObjects.length),r.id=o,t.currentObjects[o]=r,r},e.prototype.getCurrents=function(e){return this.pools[e].currentObjects},e.prototype.release=function(e,t){return this.releaseById(e,t.id)},e.prototype.releaseById=function(e,t){var n=this.pools[e],r=n.currentObjects[t];return r&&void 0!==r.id&&(n.freeList.push(r),n.freeIndexes.push(r.id),n.currentObjects[r.id]=void 0),this},e.prototype.releaseAll=function(e){var t=this;return this.pools[e].currentObjects.forEach(function(n,r){void 0!==n&&t.releaseById(e,r)}),this},e.prototype.releaseAllPools=function(){var e=this;return Object.keys(this.pools).forEach(function(t){e.releaseAll(t)}),this},e.prototype.getById=function(e,t){return this.pools[e].currentObjects[t]},e.prototype.isPoolExist=function(e){return void 0!==this.pools[e]},e.prototype.getPool=function(e){return this.pools[e]},e.prototype.currentSize=function(e){var t=this.pools[e];return t.currentObjects.length-t.freeIndexes.length},e.prototype.freeIdSize=function(e){return this.pools[e].freeIndexes.length},e.prototype.freeObjectSize=function(e){return this.pools[e].freeList.length},e.prototype.getSafeCurrents=function(e){return this.pools[e].currentObjects.filter(function(e){return void 0!==e})},e}();t.PoolManager=o}])});