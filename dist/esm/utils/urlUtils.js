var t=function(t){return/^(https:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)[a-zA-Z0-9_-]+(&.*)?|youtu\.be\/[a-zA-Z0-9_-]+)(\?.*)?$/.test(t)},a=function(t){var a=/https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)(?:\?[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*/,e=/https:\/\/www\.youtube\.com\/(?:watch\?v=|shorts\/)([a-zA-Z0-9_-]+)(?:[&?][a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*/;return a.test(t)?t.replace(a,"https://www.youtube.com/embed/$1?autoplay=0&rel=0&controls=1&modestbranding=1&loop=1&enablejsapi=1&origin=https%3A%2F%2Fwemixplay.com&widgetid=1"):e.test(t)?t.replace(e,"https://www.youtube.com/embed/$1?autoplay=0&rel=0&controls=1&modestbranding=1&loop=1&enablejsapi=1&origin=https%3A%2F%2Fwemixplay.com&widgetid=1"):t},e=function(t){return/^(https:\/\/)?(www\.)?twitch\.tv\/(video\/)?([a-zA-Z0-9_-]+)(\?[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+(&[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*)?$/.test(t)},o=function(t){var a=t.match(/^(https:\/\/)?(www\.)?twitch\.tv\/(video\/)?([a-zA-Z0-9_-]+)(\?[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+(&[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*)?$/);if(a){var e="video/"===a[3],o=a[4];return e?"https://player.twitch.tv/?video=".concat(o,"&autoplay=false&muted=true&parent=").concat(location.hostname):"https://player.twitch.tv/?channel=".concat(o,"&autoplay=false&muted=false&parent=").concat(location.hostname)}return t};export{o as convertIframeTwitchURL,a as convertIframeYouTubeURL,e as isTwitchURL,t as isYouTubeURL};
