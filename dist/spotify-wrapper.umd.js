!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.spotifyWrapper=t():e.spotifyWrapper=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var u=t[r]={i:r,l:!1,exports:{}};return e[r].call(u.exports,u,u.exports,n),u.l=!0,u.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return e.json()}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="https://api.spotify.com/v1"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=this;return{getAlbum:function(t){return e.request(e.apiURL+"/albums/"+t)},getAlbums:function(t){return e.request(e.apiURL+"/albums/?ids="+t)},getTracks:function(t){return e.request(e.apiURL+"/albums/"+t+"/tracks")}}}},function(e,t,n){"use strict";function r(e,t){return this.request(this.apiURL+"/search?q="+t+"&type="+e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return{artists:r.bind(this,"artist"),albums:r.bind(this,"album"),tracks:r.bind(this,"track"),playlists:r.bind(this,"playlist")}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=a(n(3)),i=a(n(2)),o=a(n(1)),s=a(n(0));function a(e){return e&&e.__esModule?e:{default:e}}var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.apiURL=t.apiURL||o.default,this.token=t.token,this.album=i.default.bind(this)(),this.search=u.default.bind(this)()}return r(e,[{key:"request",value:function(e){var t={headers:{Authorization:"'Bearer "+this.token+"'"}};return fetch(e,t).then(s.default)}}]),e}();t.default=f}])});
//# sourceMappingURL=spotify-wrapper.umd.js.map