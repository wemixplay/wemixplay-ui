const imageCacher = (imgSrcList: string | string[]) => {
  if (!window.cacheImgs) {
    window.cacheImgs = {};
  }

  if (!Array.isArray(imgSrcList)) {
    imgSrcList = [imgSrcList];
  }

  imgSrcList.forEach((src) => {
    if (src && !window.cacheImgs[src]) {
      const image = new Image();
      image.src = src;

      const imgList = Object.entries(window.cacheImgs);

      if (imgList.length > 200) {
        imgList.sort((a, b) => a[1].index - b[1].index);
        const key = imgList[0][0];

        delete window.cacheImgs[key];

        window.cacheImgs = imgList.slice(1, imgList.length).reduce((acc, cur) => {
          return { ...acc, [cur[0]]: { ...cur[1], index: cur[1].index - 1 } };
        }, {});
      }

      window.cacheImgs[src] = {
        image,
        index: imgList.length
      };
    }
  });
};

export default imageCacher;
