!function(){"use strict";var t,e,i,c=window.location,d=window.document,f=d.getElementById("plausible"),w=f.getAttribute("data-api")||(t=f.src.split("/"),e=t[0],i=t[2],e+"//"+i+"/api/event");function v(t){console.warn("Ignoring Event: "+t)}function a(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(c.hostname)||"file:"===c.protocol)return v("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return v("localStorage flag")}catch(t){}var i=f&&f.getAttribute("data-include"),a=f&&f.getAttribute("data-exclude");if("pageview"===t){var n=!i||i&&i.split(",").some(p),r=a&&a.split(",").some(p);if(!n||r)return v("exclusion rule")}var o={};o.n=t,o.u=c.href,o.d=f.getAttribute("data-domain"),o.r=d.referrer||null,o.w=window.innerWidth,e&&e.meta&&(o.m=JSON.stringify(e.meta)),e&&e.props&&(o.p=e.props);var l=f.getAttributeNames().filter(function(t){return"event-"===t.substring(0,6)}),s=o.p||{};l.forEach(function(t){var e=t.replace("event-",""),i=f.getAttribute(t);s[e]=s[e]||i}),o.p=s;var u=new XMLHttpRequest;u.open("POST",w,!0),u.setRequestHeader("Content-Type","text/plain"),u.send(JSON.stringify(o)),u.onreadystatechange=function(){4===u.readyState&&e&&e.callback&&e.callback()}}function p(t){return c.pathname.match(new RegExp("^"+t.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}}var n=window.plausible&&window.plausible.q||[];window.plausible=a;for(var r,o=0;o<n.length;o++)a.apply(this,n[o]);function l(){r!==c.pathname&&(r=c.pathname,a("pageview"))}var s,u=window.history;u.pushState&&(s=u.pushState,u.pushState=function(){s.apply(this,arguments),l()},window.addEventListener("popstate",l)),"prerender"===d.visibilityState?d.addEventListener("visibilitychange",function(){r||"visible"!==d.visibilityState||l()}):l();var p=1;function h(t){if("auxclick"!==t.type||t.button===p){var e,i,a,n,r,o,l=function(t){for(;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;return t}(t.target);l&&l.href&&l.href.split("?")[0];if((o=l)&&o.href&&o.host&&o.host!==c.host){var s={url:l.href};return n=s,r=!(a="Outbound Link: Click"),void(!function(t,e){if(!t.defaultPrevented){var i=!e.target||e.target.match(/^_(self|parent|top)$/i),a=!(t.ctrlKey||t.metaKey||t.shiftKey)&&"click"===t.type;return i&&a}}(e=t,i=l)?plausible(a,{props:n}):(plausible(a,{props:n,callback:u}),setTimeout(u,5e3),e.preventDefault()))}}function u(){r||(r=!0,window.location=i.href)}}d.addEventListener("click",h),d.addEventListener("auxclick",h)}();