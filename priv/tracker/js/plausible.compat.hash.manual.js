!function(){"use strict";var t,e,n,a=window.location,o=window.document,i=window.localStorage,r=o.getElementById("plausible"),l=r.getAttribute("data-api")||(t=r.src.split("/"),e=t[0],n=t[2],e+"//"+n+"/api/event"),w=i&&i.plausible_ignore;function s(t){console.warn("Ignoring Event: "+t)}function d(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(a.hostname)||"file:"===a.protocol)return s("localhost");if(!(window.phantom||window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){if("true"==w)return s("localStorage flag");var n={};n.n=t,n.u=a.href,n.d=r.getAttribute("data-domain"),n.r=o.referrer||null,n.w=window.innerWidth,e&&e.meta&&(n.m=JSON.stringify(e.meta)),e&&e.props&&(n.p=JSON.stringify(e.props)),n.h=1;var i=new XMLHttpRequest;i.open("POST",l,!0),i.setRequestHeader("Content-Type","text/plain"),i.send(JSON.stringify(n)),i.onreadystatechange=function(){4==i.readyState&&e&&e.callback&&e.callback()}}}var p=window.plausible&&window.plausible.q||[];window.plausible=d;for(var u=0;u<p.length;u++)d.apply(this,p[u])}();