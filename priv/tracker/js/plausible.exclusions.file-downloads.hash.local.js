!function(){"use strict";var c=window.location,u=window.document,s=u.currentScript,d=s.getAttribute("data-api")||new URL(s.src).origin+"/api/event";function f(e){console.warn("Ignoring Event: "+e)}function e(e,t){try{if("true"===window.localStorage.plausible_ignore)return f("localStorage flag")}catch(e){}var i=s&&s.getAttribute("data-include"),a=s&&s.getAttribute("data-exclude");if("pageview"===e){var n=!i||i&&i.split(",").some(o),r=a&&a.split(",").some(o);if(!n||r)return f("exclusion rule")}function o(e){var t=c.pathname;return(t+=c.hash).match(new RegExp("^"+e.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}var l={};l.n=e,l.u=c.href,l.d=s.getAttribute("data-domain"),l.r=u.referrer||null,l.w=window.innerWidth,t&&t.meta&&(l.m=JSON.stringify(t.meta)),t&&t.props&&(l.p=t.props),l.h=1;var p=new XMLHttpRequest;p.open("POST",d,!0),p.setRequestHeader("Content-Type","text/plain"),p.send(JSON.stringify(l)),p.onreadystatechange=function(){4===p.readyState&&t&&t.callback&&t.callback()}}var t=window.plausible&&window.plausible.q||[];window.plausible=e;for(var i,a=0;a<t.length;a++)e.apply(this,t[a]);function n(){i=c.pathname,e("pageview")}window.addEventListener("hashchange",n),"prerender"===u.visibilityState?u.addEventListener("visibilitychange",function(){i||"visible"!==u.visibilityState||n()}):n();var v=1;function r(e){if("auxclick"!==e.type||e.button===v){var t,i,a,n,r,o=function(e){for(;e&&(void 0===e.tagName||"a"!==e.tagName.toLowerCase()||!e.href);)e=e.parentNode;return e}(e.target),l=o&&o.href&&o.href.split("?")[0];if(function(e){if(!e)return!1;var t=e.split(".").pop();return g.some(function(e){return e===t})}(l)){return n={url:l},r=!(a="File Download"),void(!function(e,t){if(!e.defaultPrevented){var i=!t.target||t.target.match(/^_(self|parent|top)$/i),a=!(e.ctrlKey||e.metaKey||e.shiftKey)&&"click"===e.type;return i&&a}}(t=e,i=o)?plausible(a,{props:n}):(plausible(a,{props:n,callback:p}),setTimeout(p,5e3),t.preventDefault()))}}function p(){r||(r=!0,window.location=i.href)}}u.addEventListener("click",r),u.addEventListener("auxclick",r);var o=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],l=s.getAttribute("file-types"),p=s.getAttribute("add-file-types"),g=l&&l.split(",")||p&&p.split(",").concat(o)||o}();