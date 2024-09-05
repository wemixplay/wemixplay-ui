export const isYouTubeURL = (url: string) => {
  // 정규식 패턴 정의
  const youTubePattern =
    /^(https:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]+(\?[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+(&[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*)?$/;

  console.log(youTubePattern.test(url));

  // 정규식 테스트
  return youTubePattern.test(url);
};

export const convertIframeYouTubeURL = (url: string) => {
  // 정규식 패턴 정의
  const shortUrlPattern =
    /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)(?:\?[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*/;

  const longUrlPattern =
    /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(?:&[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*/;

  // 정규식 매칭 및 변환
  if (shortUrlPattern.test(url)) {
    return url.replace(
      shortUrlPattern,
      'https://www.youtube.com/embed/$1?autoplay=0&rel=0&controls=1&modestbranding=1&loop=1&enablejsapi=1&origin=https%3A%2F%2Fwemixplay.com&widgetid=1'
    );
  } else if (longUrlPattern.test(url)) {
    return url.replace(
      longUrlPattern,
      'https://www.youtube.com/embed/$1?autoplay=0&rel=0&controls=1&modestbranding=1&loop=1&enablejsapi=1&origin=https%3A%2F%2Fwemixplay.com&widgetid=1'
    );
  } else {
    return url; // 매칭되지 않으면 원래 URL 반환
  }
};

export const isTwitchURL = (url: string) => {
  // 정규식 패턴 정의
  const twitchPattern =
    /^(https:\/\/)?(www\.)?twitch\.tv\/(video\/)?([a-zA-Z0-9_-]+)(\?[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+(&[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*)?$/;

  // 정규식 테스트
  return twitchPattern.test(url);
};

export const convertIframeTwitchURL = (url: string): string => {
  // 정규식 패턴 정의
  const urlPattern =
    /^(https:\/\/)?(www\.)?twitch\.tv\/(video\/)?([a-zA-Z0-9_-]+)(\?[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+(&[a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*)?$/;

  // 정규식 매칭 및 변환
  const match = url.match(urlPattern);
  if (match) {
    const isVideo = match[3] === 'video/';
    const idOrUsername = match[4];
    if (isVideo) {
      return `https://player.twitch.tv/?video=${idOrUsername}&autoplay=false&muted=true&parent=${location.hostname}`;
    } else {
      return `https://player.twitch.tv/?channel=${idOrUsername}&autoplay=false&muted=false&parent=${location.hostname}`;
    }
  } else {
    return url; // 매칭되지 않으면 원래 URL 반환
  }
};
