'use client';

import React, {
  ChangeEvent,
  DragEvent,
  ReactElement,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import style from './PostEditor.module.scss';
import WpEditor, { WpEditorProps, WpEditorRef } from './WpEditor';
import Mention from '@/plugins/mention/Mention';
import HashTag from '@/plugins/hashTag/HashTag';
import AutoUrlMatch from '@/plugins/autoUrlMatch/AutoUrlMatch';
import PasteToPlainText from '@/plugins/pasteToPlainText/PasteToPlainText';
import { makeCxFunc } from '@/utils/forReactUtils';
import { SvgIcoImage } from '@/assets/svgs';
import { orderBy, uniqBy } from 'lodash-es';
import { imageFileUpload, readAsDataURLAsync } from '@/utils/fileUtils';
import ImagesUploadPreview from './ImagesUploadPreview';
import {
  convertIframeTwitchURL,
  convertIframeYouTubeURL,
  isTwitchURL,
  isYouTubeURL
} from '@/utils/urlUtils';
import IframesUploadPreview from './IframesUploadPreview';
import OgMetaDataPreview from './OgMetaDataPreview';

type PostEditorMediaValue = { file?: File; src: string };
type PostEditorIframeValue = { type?: 'youtube' | 'twitch'; src: string };

type PostDetailEditorValue = {
  value?: string;
  images?: PostEditorMediaValue[];
  iframes?: PostEditorIframeValue[];
  ogMetaData?: Record<string, string> | null;
};

type Props = Omit<WpEditorProps, 'plugin' | 'config' | 'initailValue'> & {
  className?: string;
  btnSubmitElement?: ReactElement;
  value?: PostDetailEditorValue;
  name?: string;
  handleChange?: (value: PostDetailEditorValue, name?: string) => void;
};

const cx = makeCxFunc(style);

const PostDetailEditor = forwardRef<WpEditorRef, Props>(
  (
    {
      className = '',
      value,
      name,
      btnSubmitElement = <button className={cx('btn-submit')}>게시</button>,
      handleChange,
      ...editorProps
    },
    ref
  ) => {
    const imgInputRef = useRef<HTMLInputElement>();
    const excludeOgSiteUrl = useRef<string[]>([]);

    const [textData, setTextData] = useState(value?.value);
    const [mediaData, setMediaData] = useState<Omit<PostDetailEditorValue, 'value'>>({
      images: value?.images ?? [],
      iframes: value?.iframes ?? [],
      ogMetaData: value?.ogMetaData
    });

    const memorizationData = useMemo(() => {
      return {
        ...mediaData,
        value: textData,
        images: uniqBy(mediaData.images, 'src'),
        iframes: uniqBy(mediaData.iframes, 'src')
      };
    }, [textData, mediaData]);

    const handleUpdateImages = useCallback(
      (
        params:
          | { newImage: PostEditorMediaValue | PostEditorMediaValue[] }
          | { deleteIndex: number }
      ) => {
        let images = [...(memorizationData?.images ?? [])];

        if ('newImage' in params) {
          if (Array.isArray(params.newImage)) {
            images = [...images, ...params.newImage];
          } else {
            images.push(params.newImage);
          }

          images = orderBy(images, 'src');

          if (images.length > 4) {
            alert('이미지는 최대 4개까지 가능합니다!!');

            return;
          }
        } else {
          images = images.filter((_, index) => params.deleteIndex !== index);
        }

        // input[type="file"] 요소의 value 값을 없애주지 않으면 직전에 등록한 이미지와 같은 이미지가 다시 업로드가 안됨
        imgInputRef.current.value = '';

        return images;
      },
      [memorizationData, handleChange, name]
    );

    /**
     * PostEditor에 Editor 컴포넌트가 드래그 되었을때 기본 동작 무효화
     */
    const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    }, []);

    /**
     * PostEditor에 Editor 컴포넌트에 이미지 파일이 Drop 되었을때 이미지 파일을 업로드 처리하는 함수
     */
    const onInputDrop = useCallback(
      async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        // 드롭된 파일 리스트 처리
        const files = Array.from(e.dataTransfer.files);

        // 이미지 파일인지 확인
        const imageFiles = files.filter((file) => file.type.startsWith('image/'));

        if (imageFiles.length === 0) {
          return;
        }

        const images = [...(memorizationData?.images ?? [])];

        // 이미지 파일 처리 예시
        for (const file of imageFiles) {
          const dataUrl = await readAsDataURLAsync(file);

          images.push({ file: file, src: dataUrl });
        }

        const newData = { ...memorizationData, images: handleUpdateImages({ newImage: images }) };

        setMediaData({
          images: newData.images,
          iframes: newData.iframes,
          ogMetaData: newData.ogMetaData
        });
        handleChange && handleChange(newData, name);
      },
      [name, memorizationData, handleUpdateImages, handleChange]
    );

    /**
     * input[type="file"] 요소의 value가 바뀔때 호출되는 함수로써 message state의 image, imageFile값을 업데이트 하는 함수
     *
     *  @param e `ChangeEvent<HTMLInputElement>`
     */
    const onImageFileChange = useCallback(
      async (e: ChangeEvent<HTMLInputElement>) => {
        const { file, dataUrl } = await imageFileUpload(e);

        const newData = {
          ...memorizationData,
          images: handleUpdateImages({ newImage: { file, src: dataUrl } })
        };

        setMediaData({
          images: newData.images,
          iframes: newData.iframes,
          ogMetaData: newData.ogMetaData
        });
        handleChange && handleChange(newData, name);
      },
      [name, memorizationData, handleUpdateImages, handleChange]
    );

    const handleUpdateIframe = useCallback(
      (
        params:
          | {
              iframes: PostEditorIframeValue | PostEditorIframeValue[];
            }
          | {
              deleteIndex: number;
            }
      ) => {
        let iframes = [...memorizationData.iframes];

        if ('iframes' in params) {
          if (Array.isArray(params.iframes)) {
            iframes = [...iframes, ...params.iframes];
          } else {
            iframes.push(params.iframes);
          }

          iframes = orderBy(iframes, 'src');

          if (iframes.length > 4) {
            alert('이미지는 최대 4개까지 가능합니다!!');

            return;
          }
        } else {
          iframes = iframes.filter((_, index) => params.deleteIndex !== index);
        }

        return iframes;
      },
      [memorizationData.iframes]
    );

    const handleUpdateOgMetaData = useCallback(
      ({ urls, type }: { urls: string[]; type: 'add' | 'delete' }) => {
        if (!urls) {
          return;
        }

        if (type === 'add') {
          const targetUrl = urls.filter((url) => !excludeOgSiteUrl.current.includes(url))[0];

          if (memorizationData.ogMetaData) {
            return memorizationData.ogMetaData;
          } else if (targetUrl) {
            return {
              url: targetUrl,
              name: targetUrl
            };
          }
        } else {
          excludeOgSiteUrl.current.push(urls[0]);
        }

        return null;
      },
      [memorizationData.ogMetaData]
    );

    const onMatchImgOrVideoUrl = useCallback(
      (
        urls: {
          tag: 'iframe' | 'img' | 'video';
          src: string;
        }[]
      ) => {
        const images = urls.filter((url) => url.tag === 'img');
        const iframes = urls.filter((url) => url.tag === 'iframe');

        const newImages = handleUpdateImages({ newImage: images });
        const newIframes = handleUpdateIframe({ iframes });

        const newData = { ...memorizationData, images: newImages, iframes: newIframes };

        console.log(newImages);

        setMediaData({
          images: newData.images,
          iframes: newData.iframes,
          ogMetaData: newData.ogMetaData
        });
        handleChange && handleChange(newData, name);
      },
      [name, memorizationData, handleChange, handleUpdateImages, handleUpdateIframe]
    );

    const onMatchUrl = useCallback(
      (urls: string[]) => {
        const imagePattern = /\.(jpg|jpeg|png|gif|webp)$/i;

        const urlInfoList = urls.reduce(
          (acc, cur) => {
            let type = 'etc';

            if (imagePattern.test(cur)) {
              type = 'image';
            } else if (isYouTubeURL(cur)) {
              type = 'youtube';
            } else if (isTwitchURL(cur)) {
              type = 'twitch';
            }

            if (!acc[type]) {
              acc[type] = [];
            }

            acc[type].push(cur);

            return acc;
          },
          {} as Record<string, string[]>
        );

        const { image = [], youtube = [], twitch = [], etc = [] } = urlInfoList;

        const newOgMetaData = handleUpdateOgMetaData({
          urls: etc,
          type: etc.length ? 'add' : 'delete'
        });
        const newImages = handleUpdateImages({ newImage: image.map((url) => ({ src: url })) });
        const newIframes = handleUpdateIframe({
          iframes: [
            ...youtube.map(
              (url) =>
                ({ type: 'youtube', src: convertIframeYouTubeURL(url) }) as PostEditorIframeValue
            ),
            ...twitch.map(
              (url) =>
                ({ type: 'twitch', src: convertIframeTwitchURL(url) }) as PostEditorIframeValue
            )
          ]
        });

        const newData = {
          ...memorizationData,
          images: newImages,
          iframes: newIframes,
          ogMetaData: newOgMetaData
        };

        setMediaData({
          images: newData.images,
          iframes: newData.iframes,
          ogMetaData: newData.ogMetaData
        });
        handleChange && handleChange(newData, name);

        return urls.map((url) => `<a href="${url}" target="_blank">${url}</a>`);
      },
      [
        name,
        memorizationData,
        handleChange,
        handleUpdateImages,
        handleUpdateIframe,
        handleUpdateOgMetaData
      ]
    );

    const handleEditorTextChange = useCallback(
      (value: string) => {
        const newData = {
          ...memorizationData,
          value,
          ogMetaData:
            !memorizationData.ogMetaData || !value.includes(memorizationData.ogMetaData?.url)
              ? null
              : memorizationData.ogMetaData
        };

        excludeOgSiteUrl.current = excludeOgSiteUrl.current.filter((url) => value.includes(url));

        setTextData(value);
        handleChange && handleChange(newData, name);
      },
      [name, memorizationData, handleChange]
    );

    useEffect(() => {
      if (value) {
        const { value: textValue, ...mediaValues } = value;
        setTextData(textValue);
        setMediaData(mediaValues);
      }
    }, [value]);

    return (
      <div className={cx(className, 'post-detail-editor')}>
        <WpEditor
          ref={ref}
          plugin={[Mention, HashTag, AutoUrlMatch, PasteToPlainText]}
          initialValue={memorizationData?.value}
          {...editorProps}
          config={{
            pasteToPlainText: {
              onMatchImgOrVideoUrl: onMatchImgOrVideoUrl
            },
            autoUrlMatch: {
              onMatchUrl: onMatchUrl
            }
          }}
          onDragOver={onDragOver}
          onDrop={onInputDrop}
          handleChange={handleEditorTextChange}
        ></WpEditor>
        {memorizationData.images.length > 0 && (
          <ImagesUploadPreview
            images={memorizationData.images}
            handleDeleteImg={({ deleteIndex }) => {
              const images = handleUpdateImages({ deleteIndex });

              setMediaData((data) => ({ ...data, images }));
            }}
          />
        )}
        {memorizationData.iframes.length > 0 && (
          <IframesUploadPreview
            iframes={memorizationData.iframes}
            handleDeleteIframe={({ deleteIndex }) => {
              const iframes = handleUpdateIframe({ deleteIndex });

              setMediaData((data) => ({ ...data, iframes }));
            }}
          />
        )}
        {!!memorizationData.ogMetaData && (
          <OgMetaDataPreview
            ogMetaData={memorizationData.ogMetaData}
            handleDeleteOgMetaData={(params) => {
              const ogMetaData = handleUpdateOgMetaData(params);

              setMediaData((data) => ({ ...data, ogMetaData }));
            }}
          />
        )}

        <div className={cx('control-box')}>
          <div className={cx('left')}>
            <label className={cx('btn-img-upload')}>
              <input
                ref={imgInputRef}
                type="file"
                accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                onChange={onImageFileChange}
              />
              <SvgIcoImage />
            </label>
          </div>
          <div className={cx('right')}>{btnSubmitElement}</div>
        </div>
      </div>
    );
  }
);

PostDetailEditor.displayName = 'PostDetailEditor';

export type { Props as PostDetailEditorProps, PostEditorMediaValue, PostDetailEditorValue };
export default PostDetailEditor;
