!function(){"use strict";var e,t,i,s=window.location,c=window.document,u=c.getElementById("plausible"),d=u.getAttribute("data-api")||(e=u.src.split("/"),t=e[0],i=e[2],t+"//"+i+"/api/event");function f(e){console.warn("Ignoring Event: "+e)}function a(e,t){if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return f("localStorage flag")}catch(e){}var i=u&&u.getAttribute("data-include"),a=u&&u.getAttribute("data-exclude");if("pageview"===e){var r=!i||i&&i.split(",").some(l),n=a&&a.split(",").some(l);if(!r||n)return f("exclusion rule")}var o={};o.n=e,o.u=s.href,o.d=u.getAttribute("data-domain"),o.r=c.referrer||null,o.w=window.innerWidth,t&&t.meta&&(o.m=JSON.stringify(t.meta)),t&&t.props&&(o.p=t.props);var p=new XMLHttpRequest;p.open("POST",d,!0),p.setRequestHeader("Content-Type","text/plain"),p.send(JSON.stringify(o)),p.onreadystatechange=function(){4===p.readyState&&t&&t.callback&&t.callback()}}function l(e){return s.pathname.match(new RegExp("^"+e.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}}function r(e){for(var t=e.target,i="auxclick"===e.type&&2===e.which,a="click"===e.type;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;t&&t.href&&t.host&&t.host!==s.host&&((i||a)&&plausible("Outbound Link: Click",{props:{url:t.href}}),t.target&&!t.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!a||(setTimeout(function(){s.href=t.href},150),e.preventDefault()))}c.addEventListener("click",r),c.addEventListener("auxclick",r);var n=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],o=u.getAttribute("file-types"),p=u.getAttribute("add-file-types"),l=o&&o.split(",")||p&&p.split(",").concat(n)||n;function w(e){for(var t=e.target,i="auxclick"===e.type&&2===e.which,a="click"===e.type;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;var r,n=t&&t.href&&t.href.split("?")[0];n&&(r=n.split(".").pop(),l.some(function(e){return e===r}))&&((i||a)&&plausible("File Download",{props:{url:n}}),t.target&&!t.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!a||(setTimeout(function(){s.href=t.href},150),e.preventDefault()))}c.addEventListener("click",w),c.addEventListener("auxclick",w);var h=window.plausible&&window.plausible.q||[];window.plausible=a;for(var g,v=0;v<h.length;v++)a.apply(this,h[v]);function m(){g!==s.pathname&&(g=s.pathname,a("pageview"))}var y,b=window.history;b.pushState&&(y=b.pushState,b.pushState=function(){y.apply(this,arguments),m()},window.addEventListener("popstate",m)),"prerender"===c.visibilityState?c.addEventListener("visibilitychange",function(){g||"visible"!==c.visibilityState||m()}):m()}();