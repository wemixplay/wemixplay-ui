'use client';

import React, {
  MouseEvent,
  ChangeEvent,
  DragEvent,
  ReactElement,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
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

import { orderBy, uniqBy } from 'lodash-es';
import { imageFileUpload, readAsDataURLAsync } from '@/utils/fileUtils';
import FeedImagesView from './FeedImagesView';
import {
  convertIframeTwitchURL,
  convertIframeYouTubeURL,
  isTwitchURL,
  isYouTubeURL
} from '@/utils/urlUtils';
import FeedIframesView from './FeedIframesView';
import FeedLinkPreview, { FeedLinkPreviewProps } from './FeedLinkPreview';
import { SvgIcoChevronDown, SvgIcoImage } from '@/assets/svgs';
import CountTextLength from '@/plugins/countTextLength/CountTextLength';
import {
  commaWithValue,
  convertHtmlToMarkdownStr,
  convertMarkdownToHtmlStr
} from '@/utils/valueParserUtils';
import Person from '../avatars/Person';
import PopoverButton from '../popover/PopoverButton';

type PostEditorMediaValue = { file?: File; src: string };
type PostEditorIframeValue = { type?: 'youtube' | 'twitch'; src: string };

type FeedDetailEditorValue = {
  value?: string;
  images?: PostEditorMediaValue[];
  iframes?: PostEditorIframeValue[];
  ogMetaData?: FeedLinkPreviewProps['ogMetaData'];
};

type Props = Omit<WpEditorProps, 'plugin' | 'initialValue'> & {
  className?: string;
  minLength?: number;
  btnSubmitText?: ReactElement | string;
  value?: FeedDetailEditorValue;
  name?: string;
  writerName?: string;
  writerImg?: string;
  emptyChannelText?: string;
  channelName?: string;
  channelImg?: string;
  selectChannelPopoverElement?: ReactElement;
  imageMaxCnt?: number;
  iframeMaxCnt?: number;
  handleChange?: (value: FeedDetailEditorValue, name?: string) => void;
  onMatchExternalUrl?: (url: string[]) => void;
  onUserClick?: (e: MouseEvent<HTMLElement>) => void;
  onSelectChannelClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMaxImageUploads?: () => void;
  onMaxIframeUploads?: () => void;
};

const cx = makeCxFunc(style);

const FeedDetailEditor = forwardRef<WpEditorRef, Props>(
  (
    {
      className = '',
      value,
      name,
      minLength = 10,
      writerName,
      writerImg,
      emptyChannelText = '내 채널에 포스트',
      channelName,
      channelImg,
      btnSubmitText = 'POST',
      maxLength = 1000,
      placeholder = 'What is happening?!',
      config = {},
      imageMaxCnt = 4,
      iframeMaxCnt = 4,
      selectChannelPopoverElement = <></>,
      handleChange,
      onMatchExternalUrl,
      onSelectChannelClick,
      onUserClick,
      onMaxImageUploads,
      onMaxIframeUploads,
      ...editorProps
    },
    ref
  ) => {
    const wpEditorRef = useRef<WpEditorRef>();
    const imgInputRef = useRef<HTMLInputElement>();
    const excludeOgSiteUrl = useRef<string[]>([]);

    const [textLength, setTextLength] = useState(value?.value?.length ?? 0);
    const [textData, setTextData] = useState(value?.value);
    const [mediaData, setMediaData] = useState<Omit<FeedDetailEditorValue, 'value'>>({
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
          if (Array.isArray(params.newImage) && images.length < imageMaxCnt) {
            images = [...images, ...params.newImage.slice(0, imageMaxCnt - images.length)];
          } else if (!Array.isArray(params.newImage)) {
            if (images.length >= imageMaxCnt) {
              onMaxImageUploads
                ? onMaxImageUploads()
                : alert(`이미지는 최대 ${imageMaxCnt}까지 업로드가 가능합니다.`);

              return images;
            }

            images.push(params.newImage);
          }

          images = orderBy(images, 'src');
        } else {
          images = images.filter((_, index) => params.deleteIndex !== index);
        }

        // input[type="file"] 요소의 value 값을 없애주지 않으면 직전에 등록한 이미지와 같은 이미지가 다시 업로드가 안됨
        imgInputRef.current.value = '';

        return images;
      },
      [memorizationData, name, imageMaxCnt, handleChange, onMaxImageUploads]
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

          if (iframes.length > iframeMaxCnt) {
            onMaxIframeUploads
              ? onMaxIframeUploads()
              : alert(`영상은 최대 ${iframeMaxCnt}까지 업로드가 가능합니다.`);

            return;
          }
        } else {
          iframes = iframes.filter((_, index) => params.deleteIndex !== index);
        }

        return iframes;
      },
      [memorizationData.iframes, iframeMaxCnt]
    );

    const onMatchUrl = useCallback(
      ({
        textUrls,
        mediaUrls
      }: {
        textUrls: string[];
        mediaUrls: { tag: 'img' | 'video' | 'iframe'; src: string }[];
      }) => {
        const imagePattern = /\.(jpg|jpeg|png|gif|webp)$/i;

        const urlInfoList = textUrls.reduce(
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
        const externalUrl = etc.filter((url) => !excludeOgSiteUrl.current.includes(url));

        const newImages = handleUpdateImages({
          newImage: [
            ...mediaUrls.filter((url) => url.tag === 'img'),
            ...image.map((url) => ({ src: url }))
          ]
        });
        const newIframes = handleUpdateIframe({
          iframes: [
            ...mediaUrls.filter((url) => url.tag === 'iframe'),
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

        if (externalUrl.length > 0) {
          onMatchExternalUrl && onMatchExternalUrl(externalUrl);
        }

        const newData = {
          ...memorizationData,
          images: newImages,
          iframes: newIframes
        };

        setMediaData(newData);
        handleChange && handleChange(newData, name);

        return textUrls.map((url) => `<a href="${url}" target="_blank">${url}</a>`);
      },
      [
        name,
        memorizationData,
        handleChange,
        handleUpdateImages,
        handleUpdateIframe,
        onMatchExternalUrl
      ]
    );

    const handleEditorTextChange = useCallback(
      (value: string) => {
        const newData = {
          ...memorizationData,
          value
        };

        excludeOgSiteUrl.current = excludeOgSiteUrl.current.filter((url) => value.includes(url));

        setTextData(value);
        handleChange && handleChange({ ...newData, value: convertHtmlToMarkdownStr(value) }, name);
      },
      [name, memorizationData, handleChange]
    );

    useEffect(() => {
      if (value) {
        const { value: textValue, ...mediaValues } = value;
        setMediaData(mediaValues);
      }
    }, [value]);

    useEffect(() => {
      if (value?.value && !textData) {
        const htmlStr = convertMarkdownToHtmlStr(value.value);

        setTextData(htmlStr);
      }
    }, [value?.value, textData]);

    useImperativeHandle(ref, () => {
      const { setData } = wpEditorRef.current;

      wpEditorRef.current.setData = (data: string) => {
        const htmlStr = convertMarkdownToHtmlStr(data);
        setData(htmlStr);
      };

      return wpEditorRef.current;
    });

    return (
      <div className={cx(className, 'post-detail-editor')}>
        <div
          className={cx('post-detail-editor-header', { 'exist-user-click-event': !!onUserClick })}
        >
          <Person
            src={writerImg}
            size={'custom'}
            className={cx('avatar', 'user-img')}
            onClick={onUserClick}
          />
          <div className={cx('profile-info')}>
            <strong className={cx('user-name')} onClick={onUserClick}>
              {writerName || '-'}
            </strong>
            <div className={cx('btn-post-popover')}>
              <PopoverButton
                anchorId={onSelectChannelClick ? '' : `post-channel`}
                id={`post-channel`}
                popoverStyle={{ left: 0, top: 10, zIndex: 9999 }}
                popoverElement={selectChannelPopoverElement}
                popoverAnimation={{ name: 'modal-pop-fade', duration: 300 }}
                onClick={onSelectChannelClick}
              >
                <span className={cx('selected-channel')}>
                  {!channelName && !channelImg ? (
                    <>
                      {emptyChannelText}
                      <SvgIcoChevronDown />
                    </>
                  ) : (
                    <>
                      <Person src={channelImg} size={'xsmall'} className={cx('avatar')} />
                      {channelName || '-'}
                    </>
                  )}
                </span>
              </PopoverButton>
            </div>
          </div>
        </div>
        <WpEditor
          className={cx('editor', 'post-content')}
          ref={wpEditorRef}
          plugin={[Mention, HashTag, AutoUrlMatch, PasteToPlainText, CountTextLength]}
          initialValue={memorizationData?.value}
          placeholder={placeholder}
          maxLength={maxLength}
          {...editorProps}
          config={{
            ...config,
            pasteToPlainText: {
              onMatchUrlReplace: onMatchUrl
            },
            autoUrlMatch: {
              onMatchUrl: (urls) => {
                return onMatchUrl({ textUrls: urls, mediaUrls: [] });
              }
            },
            countTextLength: {
              hideUi: true,
              onChangeTextLength: setTextLength
            }
          }}
          onDragOver={onDragOver}
          onDrop={onInputDrop}
          handleChange={handleEditorTextChange}
        ></WpEditor>
        {memorizationData.images.length > 0 && (
          <FeedImagesView
            images={memorizationData.images}
            handleDeleteImg={({ deleteIndex }) => {
              const images = handleUpdateImages({ deleteIndex });

              setMediaData((data) => ({ ...data, images }));
            }}
          />
        )}
        {memorizationData.iframes.length > 0 && (
          <FeedIframesView
            iframes={memorizationData.iframes}
            handleDeleteIframe={({ deleteIndex }) => {
              const iframes = handleUpdateIframe({ deleteIndex });

              setMediaData((data) => ({ ...data, iframes }));
            }}
          />
        )}
        {!!memorizationData.ogMetaData && (
          <FeedLinkPreview
            ogMetaData={memorizationData.ogMetaData}
            handleDeleteOgMetaData={(params) => {
              setMediaData((data) => ({ ...data, ogMetaData: undefined }));
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
          <div className={cx('right')}>
            <span className={cx('text-count')}>
              <b>{commaWithValue(textLength)}</b> / {commaWithValue(maxLength)}
            </span>
            <button className={cx('btn-submit')} disabled={minLength > textLength}>
              {btnSubmitText}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

FeedDetailEditor.displayName = 'FeedDetailEditor';

export type { Props as FeedDetailEditorProps, PostEditorMediaValue, FeedDetailEditorValue };
export default FeedDetailEditor;
