!function(){"use strict";var e,t,i,n,a=window.location,r=window.document,o=r.getElementById("plausible"),l=o.getAttribute("data-api")||(e=o.src.split("/"),t=e[0],i=e[2],t+"//"+i+"/api/event"),w=window.localStorage.plausible_ignore;function d(e,t){var i,n;window.phantom||window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress||("true"!=w?((i={}).n=e,i.u=a.href,i.d=o.getAttribute("data-domain"),i.r=r.referrer||null,i.w=window.innerWidth,t&&t.meta&&(i.m=JSON.stringify(t.meta)),t&&t.props&&(i.p=JSON.stringify(t.props)),i.h=1,(n=new XMLHttpRequest).open("POST",l,!0),n.setRequestHeader("Content-Type","text/plain"),n.send(JSON.stringify(i)),n.onreadystatechange=function(){4==n.readyState&&t&&t.callback&&t.callback()}):console.warn("Ignoring Event: localStorage flag"))}function s(){n=a.pathname,d("pageview")}window.addEventListener("hashchange",s);var p=window.plausible&&window.plausible.q||[];window.plausible=d;for(var c=0;c<p.length;c++)d.apply(this,p[c]);"prerender"===r.visibilityState?r.addEventListener("visibilitychange",function(){n||"visible"!==r.visibilityState||s()}):s()}();