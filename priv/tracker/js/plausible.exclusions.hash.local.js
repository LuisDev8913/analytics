!function(){"use strict";var r=window.location,o=window.document,l=o.currentScript,w=l.getAttribute("data-api")||new URL(l.src).origin+"/api/event",s=l&&l.getAttribute("data-exclude").split(",");function d(e){console.warn("Ignoring Event: "+e)}function e(e,t){if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return d("localStorage flag")}catch(e){}if(s)for(var i=0;i<s.length;i++)if("pageview"===e&&r.pathname.match(new RegExp("^"+s[i].trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$")))return d("exclusion rule");var n={};n.n=e,n.u=r.href,n.d=l.getAttribute("data-domain"),n.r=o.referrer||null,n.w=window.innerWidth,t&&t.meta&&(n.m=JSON.stringify(t.meta)),t&&t.props&&(n.p=JSON.stringify(t.props)),n.h=1;var a=new XMLHttpRequest;a.open("POST",w,!0),a.setRequestHeader("Content-Type","text/plain"),a.send(JSON.stringify(n)),a.onreadystatechange=function(){4===a.readyState&&t&&t.callback&&t.callback()}}}var t=window.plausible&&window.plausible.q||[];window.plausible=e;for(var i,n=0;n<t.length;n++)e.apply(this,t[n]);function a(){i=r.pathname,e("pageview")}window.addEventListener("hashchange",a),"prerender"===o.visibilityState?o.addEventListener("visibilitychange",function(){i||"visible"!==o.visibilityState||a()}):a()}();