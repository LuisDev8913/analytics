!function(){"use strict";var t,e,r,i=window.location,a=window.document,o=a.getElementById("plausible"),l=o.getAttribute("data-api")||(t=o.src.split("/"),e=t[0],r=t[2],e+"//"+r+"/api/event");function p(t){console.warn("Ignoring Event: "+t)}function n(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(i.hostname)||"file:"===i.protocol)return p("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return p("localStorage flag")}catch(t){}var r={};r.n=t,r.u=e&&e.u?e.u:i.href,r.d=o.getAttribute("data-domain"),r.r=a.referrer||null,r.w=window.innerWidth,e&&e.meta&&(r.m=JSON.stringify(e.meta)),e&&e.props&&(r.p=e.props);var n=new XMLHttpRequest;n.open("POST",l,!0),n.setRequestHeader("Content-Type","text/plain"),n.send(JSON.stringify(r)),n.onreadystatechange=function(){4===n.readyState&&e&&e.callback&&e.callback()}}}var u=window.plausible&&window.plausible.q||[];window.plausible=n;for(var s=0;s<u.length;s++)n.apply(this,u[s]);var c=1;function f(t){if("auxclick"!==t.type||t.button===c){var e,r=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target),n=r&&r.href&&r.href.split("?")[0];if((e=r)&&e.href&&e.host&&e.host!==i.host)return d(t,r,"Outbound Link: Click",{url:r.href});if(function(t){if(!t)return!1;var e=t.split(".").pop();return h.some(function(t){return t===e})}(n))return d(t,r,"File Download",{url:n})}}function d(t,e,r,n){var i=!1;function a(){i||(i=!0,window.location=e.href)}!function(t,e){if(!t.defaultPrevented){var r=!e.target||e.target.match(/^_(self|parent|top)$/i),n=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return r&&n}}(t,e)?plausible(r,{props:n}):(plausible(r,{props:n,callback:a}),setTimeout(a,5e3),t.preventDefault())}a.addEventListener("click",f),a.addEventListener("auxclick",f);var w=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],g=o.getAttribute("file-types"),v=o.getAttribute("add-file-types"),h=g&&g.split(",")||v&&v.split(",").concat(w)||w}();