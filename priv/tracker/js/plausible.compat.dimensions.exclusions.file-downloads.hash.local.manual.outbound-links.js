!function(){"use strict";var e,t,a,p=window.location,l=window.document,c=l.getElementById("plausible"),s=c.getAttribute("data-api")||(e=c.src.split("/"),t=e[0],a=e[2],t+"//"+a+"/api/event"),u=c&&c.getAttribute("data-exclude").split(",");function f(e){console.warn("Ignoring Event: "+e)}function r(e,t){if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return f("localStorage flag")}catch(e){}if(u)for(var a=0;a<u.length;a++)if("pageview"===e&&p.pathname.match(new RegExp("^"+u[a].trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$")))return f("exclusion rule");var r={};r.n=e,r.u=t&&t.u?t.u:p.href,r.d=c.getAttribute("data-domain"),r.r=l.referrer||null,r.w=window.innerWidth,t&&t.meta&&(r.m=JSON.stringify(t.meta)),t&&t.props&&(r.p=t.props);var i=c.getAttributeNames().filter(function(e){return"event-"===e.substring(0,6)}),n=r.p||{};i.forEach(function(e){var t=e.replace("event-",""),a=c.getAttribute(e);n[t]=n[t]||a}),r.p=n,r.h=1;var o=new XMLHttpRequest;o.open("POST",s,!0),o.setRequestHeader("Content-Type","text/plain"),o.send(JSON.stringify(r)),o.onreadystatechange=function(){4===o.readyState&&t&&t.callback&&t.callback()}}}function i(e){for(var t=e.target,a="auxclick"===e.type&&2===e.which,r="click"===e.type;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;t&&t.href&&t.host&&t.host!==p.host&&((a||r)&&plausible("Outbound Link: Click",{props:{url:t.href}}),t.target&&!t.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!r||(setTimeout(function(){p.href=t.href},150),e.preventDefault()))}l.addEventListener("click",i),l.addEventListener("auxclick",i);var n=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],o=c.getAttribute("file-types"),d=c.getAttribute("add-file-types"),g=o&&o.split(",")||d&&d.split(",").concat(n)||n;function w(e){for(var t=e.target,a="auxclick"===e.type&&2===e.which,r="click"===e.type;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;var i,n=t&&t.href&&t.href.split("?")[0];n&&(i=n.split(".").pop(),g.some(function(e){return e===i}))&&((a||r)&&plausible("File Download",{props:{url:n}}),t.target&&!t.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!r||(setTimeout(function(){p.href=t.href},150),e.preventDefault()))}l.addEventListener("click",w),l.addEventListener("auxclick",w);var h=window.plausible&&window.plausible.q||[];window.plausible=r;for(var v=0;v<h.length;v++)r.apply(this,h[v])}();