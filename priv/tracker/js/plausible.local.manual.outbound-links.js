!function(){"use strict";var n=window.location,i=window.document,o=i.currentScript,l=o.getAttribute("data-api")||new URL(o.src).origin+"/api/event";function e(e,t){try{if("true"===window.localStorage.plausible_ignore)return void console.warn("Ignoring Event: localStorage flag")}catch(e){}var a={};a.n=e,a.u=t&&t.u?t.u:n.href,a.d=o.getAttribute("data-domain"),a.r=i.referrer||null,a.w=window.innerWidth,t&&t.meta&&(a.m=JSON.stringify(t.meta)),t&&t.props&&(a.p=t.props);var r=new XMLHttpRequest;r.open("POST",l,!0),r.setRequestHeader("Content-Type","text/plain"),r.send(JSON.stringify(a)),r.onreadystatechange=function(){4===r.readyState&&t&&t.callback&&t.callback()}}function t(e){for(var t=e.target,a="auxclick"===e.type&&2===e.which,r="click"===e.type;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;t&&t.href&&t.host&&t.host!==n.host&&((a||r)&&plausible("Outbound Link: Click",{props:{url:t.href}}),t.target&&!t.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!r||(setTimeout(function(){n.href=t.href},150),e.preventDefault()))}i.addEventListener("click",t),i.addEventListener("auxclick",t);var a=window.plausible&&window.plausible.q||[];window.plausible=e;for(var r=0;r<a.length;r++)e.apply(this,a[r])}();