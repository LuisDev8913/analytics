!function(){"use strict";var s=window.location,u=window.document,c=u.currentScript,d=c.getAttribute("data-api")||new URL(c.src).origin+"/api/event";function w(t){console.warn("Ignoring Event: "+t)}function t(t,e){try{if("true"===window.localStorage.plausible_ignore)return w("localStorage flag")}catch(t){}var i=c&&c.getAttribute("data-include"),n=c&&c.getAttribute("data-exclude");if("pageview"===t){var a=!i||i&&i.split(",").some(o),r=n&&n.split(",").some(o);if(!a||r)return w("exclusion rule")}function o(t){return s.pathname.match(new RegExp("^"+t.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}var l={};l.n=t,l.u=s.href,l.d=c.getAttribute("data-domain"),l.r=u.referrer||null,l.w=window.innerWidth,e&&e.meta&&(l.m=JSON.stringify(e.meta)),e&&e.props&&(l.p=e.props);var p=new XMLHttpRequest;p.open("POST",d,!0),p.setRequestHeader("Content-Type","text/plain"),p.send(JSON.stringify(l)),p.onreadystatechange=function(){4===p.readyState&&e&&e.callback&&e.callback()}}var e=window.plausible&&window.plausible.q||[];window.plausible=t;for(var i,n=0;n<e.length;n++)t.apply(this,e[n]);function a(){i!==s.pathname&&(i=s.pathname,t("pageview"))}var r,o=window.history;o.pushState&&(r=o.pushState,o.pushState=function(){r.apply(this,arguments),a()},window.addEventListener("popstate",a)),"prerender"===u.visibilityState?u.addEventListener("visibilitychange",function(){i||"visible"!==u.visibilityState||a()}):a()}();