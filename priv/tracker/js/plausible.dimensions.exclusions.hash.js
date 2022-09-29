!function(){"use strict";var p=window.location,d=window.document,w=d.currentScript,g=w.getAttribute("data-api")||new URL(w.src).origin+"/api/event";function v(e){console.warn("Ignoring Event: "+e)}function e(e,t){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(p.hostname)||"file:"===p.protocol)return v("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return v("localStorage flag")}catch(e){}var i=w&&w.getAttribute("data-include"),n=w&&w.getAttribute("data-exclude");if("pageview"===e){var a=!i||i&&i.split(",").some(u),r=n&&n.split(",").some(u);if(!a||r)return v("exclusion rule")}var o={};o.n=e,o.u=p.href,o.d=w.getAttribute("data-domain"),o.r=d.referrer||null,o.w=window.innerWidth,t&&t.meta&&(o.m=JSON.stringify(t.meta)),t&&t.props&&(o.p=t.props);var l=w.getAttributeNames().filter(function(e){return"event-"===e.substring(0,6)}),s=o.p||{};l.forEach(function(e){var t=e.replace("event-",""),i=w.getAttribute(e);s[t]=s[t]||i}),o.p=s,o.h=1;var c=new XMLHttpRequest;c.open("POST",g,!0),c.setRequestHeader("Content-Type","text/plain"),c.send(JSON.stringify(o)),c.onreadystatechange=function(){4===c.readyState&&t&&t.callback&&t.callback()}}function u(e){var t=p.pathname;return(t+=p.hash).match(new RegExp("^"+e.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}}var t=window.plausible&&window.plausible.q||[];window.plausible=e;for(var i,n=0;n<t.length;n++)e.apply(this,t[n]);function a(){i=p.pathname,e("pageview")}window.addEventListener("hashchange",a),"prerender"===d.visibilityState?d.addEventListener("visibilitychange",function(){i||"visible"!==d.visibilityState||a()}):a()}();