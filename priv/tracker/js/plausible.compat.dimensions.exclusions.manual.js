!function(){"use strict";var e,t,n,l=window.location,u=window.document,s=u.getElementById("plausible"),p=s.getAttribute("data-api")||(e=s.src.split("/"),t=e[0],n=e[2],t+"//"+n+"/api/event"),c=s&&s.getAttribute("data-exclude").split(",");function w(e){console.warn("Ignoring Event: "+e)}function a(e,t){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(l.hostname)||"file:"===l.protocol)return w("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return w("localStorage flag")}catch(e){}if(c)for(var n=0;n<c.length;n++)if("pageview"===e&&l.pathname.match(new RegExp("^"+c[n].trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$")))return w("exclusion rule");var a={};a.n=e,a.u=t&&t.u?t.u:l.href,a.d=s.getAttribute("data-domain"),a.r=u.referrer||null,a.w=window.innerWidth,t&&t.meta&&(a.m=JSON.stringify(t.meta)),t&&t.props&&(a.p=t.props);var r=s.getAttributeNames().filter(function(e){return"event-"===e.substring(0,6)}),i=a.p||{};r.forEach(function(e){var t=e.replace("event-",""),n=s.getAttribute(e);i[t]=i[t]||n}),a.p=i;var o=new XMLHttpRequest;o.open("POST",p,!0),o.setRequestHeader("Content-Type","text/plain"),o.send(JSON.stringify(a)),o.onreadystatechange=function(){4===o.readyState&&t&&t.callback&&t.callback()}}}var r=window.plausible&&window.plausible.q||[];window.plausible=a;for(var i=0;i<r.length;i++)a.apply(this,r[i])}();