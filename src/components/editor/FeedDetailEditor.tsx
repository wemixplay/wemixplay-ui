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

import { orderBy, uniqBy } from 'lodash';
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
import Spinner from '../loadings/Spinner';

type PostEditorImageValue = { file?: File; src: string };
type PostEditorMediaValue = { type: 'youtube' | 'twitch'; src: string };

type FeedDetailEditorValue = {
  textValue?: string;
  images?: PostEditorImageValue[];
  media?: PostEditorMediaValue[];
  ogMetaData?: FeedLinkPreviewProps['ogMetaData'];
};

type Props = Omit<WpEditorProps, 'plugin' | 'initialValue' | 'handleChange'> & {
  className?: string;
  minLength?: number;
  btnSubmitText?: ReactElement | string;
  textValue?: string;
  images?: PostEditorImageValue[];
  media?: PostEditorMediaValue[];
  ogMetaData?: FeedLinkPreviewProps['ogMetaData'];
  name?: string;
  isOfficial?: boolean;
  writerName: string;
  writerImg: string;
  channelName: string;
  channelImg: string;
  categoryName?: string;
  selectChannelPopoverElement?: ReactElement;
  selectCategoryPopoverElement?: ReactElement;
  imageMaxCnt?: number;
  iframeMaxCnt?: number;
  loading?: boolean;
  handleExternalUrlChange?: (url: string) => void;
  onUserClick?: (e: MouseEvent<HTMLElement>) => void;
  onSelectChannelClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onSelectCategoryClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMaxImageUploads?: () => void;
  onMaxIframeUploads?: () => void;
  handleTextChange: (value: string, name?: string) => void;
  handleImageChange: (value: PostEditorImageValue[], name?: string) => void;
  handleMediaChange: (value: PostEditorMediaValue[], name?: string) => void;
  handleSubmit: (value: FeedDetailEditorValue, name?: string) => void;
};

const cx = makeCxFunc(style);

const FeedDetailEditor = forwardRef<WpEditorRef, Props>(
  (
    {
      className = '',
      textValue,
      images,
      media,
      ogMetaData,
      name,
      minLength = 10,
      isOfficial,
      writerName,
      writerImg,
      channelName,
      channelImg,
      categoryName,
      btnSubmitText = 'POST',
      maxLength = 1000,
      placeholder = 'What is happening?!',
      config = {},
      imageMaxCnt = 4,
      iframeMaxCnt = 4,
      selectChannelPopoverElement = <></>,
      selectCategoryPopoverElement = <></>,
      loading,
      handleTextChange,
      handleImageChange,
      handleMediaChange,
      handleSubmit,
      handleExternalUrlChange,
      onSelectChannelClick,
      onSelectCategoryClick,
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

    const [textLength, setTextLength] = useState(textValue?.length ?? 0);
    const [textData, setTextData] = useState(convertMarkdownToHtmlStr(textValue ?? ''));
    const [imagesData, setImagesData] = useState(images);
    const [mediaData, setMediaData] = useState(media);
    const [metaData, setMetaData] = useState(ogMetaData);

    const memorizationData = useMemo(() => {
      return {
        ...mediaData,
        textValue: textData,
        images: uniqBy(imagesData, 'src'),
        media: uniqBy(mediaData, 'src')
      };
    }, [textData, imagesData, mediaData]);

    const handleUpdateImages = useCallback(
      (
        params:
          | { newImage: PostEditorImageValue | PostEditorImageValue[] }
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
      [memorizationData, name, imageMaxCnt, onMaxImageUploads]
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

        const newImage = handleUpdateImages({ newImage: images });

        setImagesData(newImage);
        handleImageChange && handleImageChange(newImage, name);
      },
      [name, memorizationData, handleUpdateImages, handleImageChange]
    );

    /**
     * input[type="file"] 요소의 value가 바뀔때 호출되는 함수로써 message state의 image, imageFile값을 업데이트 하는 함수
     *
     *  @param e `ChangeEvent<HTMLInputElement>`
     */
    const onImageFileChange = useCallback(
      async (e: ChangeEvent<HTMLInputElement>) => {
        const { file, dataUrl } = await imageFileUpload(e);

        const newImage = handleUpdateImages({ newImage: { file, src: dataUrl } });

        setImagesData(newImage);
        handleImageChange && handleImageChange(newImage, name);
      },
      [name, memorizationData, handleUpdateImages, handleImageChange]
    );

    const handleUpdateMedia = useCallback(
      (
        params:
          | {
              media: PostEditorMediaValue | PostEditorMediaValue[];
            }
          | {
              deleteIndex: number;
            }
      ) => {
        let media = [...memorizationData.media];

        if ('media' in params) {
          if (Array.isArray(params.media)) {
            media = [...media, ...params.media];
          } else {
            media.push(params.media);
          }

          media = orderBy(media, 'src');

          if (media.length > iframeMaxCnt) {
            onMaxIframeUploads
              ? onMaxIframeUploads()
              : alert(`영상은 최대 ${iframeMaxCnt}까지 업로드가 가능합니다.`);

            return;
          }
        } else {
          media = media.filter((_, index) => params.deleteIndex !== index);
        }

        return media;
      },
      [memorizationData.media, iframeMaxCnt]
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

        const testUrlList = [...textUrls, ...mediaUrls.map((item) => item.src)];

        const urlInfoList = testUrlList.reduce(
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
        const newMedia = handleUpdateMedia({
          media: [
            ...youtube.map(
              (url) =>
                ({ type: 'youtube', src: convertIframeYouTubeURL(url) }) as PostEditorMediaValue
            ),
            ...twitch.map(
              (url) =>
                ({ type: 'twitch', src: convertIframeTwitchURL(url) }) as PostEditorMediaValue
            )
          ]
        });

        if (externalUrl.length > 0) {
          handleExternalUrlChange && handleExternalUrlChange(externalUrl[0]);
        }

        setMediaData(newMedia);
        setImagesData(newImages);
        handleMediaChange && handleMediaChange(newMedia, name);
        handleImageChange && handleImageChange(newImages, name);

        return textUrls.map((url) => `<a href="${url}" target="_blank">${url}</a>`);
      },
      [
        name,
        memorizationData,
        handleImageChange,
        handleMediaChange,
        handleUpdateImages,
        handleUpdateMedia,
        handleExternalUrlChange
      ]
    );

    const handleEditorTextChange = useCallback(
      (value: string) => {
        const newData = {
          ...memorizationData,
          value
        };

        excludeOgSiteUrl.current = excludeOgSiteUrl.current.filter((url) =>
          wpEditorRef.current.textContent.includes(url)
        );

        const convertValue = convertHtmlToMarkdownStr(value);

        setTextData(convertValue);
        handleTextChange && handleTextChange(convertValue, name);
      },
      [name, memorizationData, handleTextChange]
    );

    useEffect(() => {
      setMediaData(media);
    }, [JSON.stringify(media)]);

    useEffect(() => {
      setImagesData(images);
    }, [JSON.stringify(images)]);

    useEffect(() => {
      setMetaData(ogMetaData);
    }, [JSON.stringify(ogMetaData)]);

    useEffect(() => {
      if (textValue && !textData) {
        const htmlStr = convertMarkdownToHtmlStr(textValue);

        console.log(htmlStr);

        setTextData(htmlStr);
      }
    }, [textValue, textData]);

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
              {isOfficial ? (
                <PopoverButton
                  anchorId={onSelectCategoryClick ? '' : `post-category`}
                  id={`post-category`}
                  popoverStyle={{ left: 0, top: 10, zIndex: 9999 }}
                  popoverElement={selectCategoryPopoverElement}
                  popoverAnimation={{ name: 'modal-pop-fade', duration: 300 }}
                  ripple={{ disabled: !selectCategoryPopoverElement && !onSelectCategoryClick }}
                  onClick={onSelectCategoryClick}
                >
                  <span className={cx('selected-channel')}>
                    {categoryName || '-'}{' '}
                    {selectCategoryPopoverElement || onSelectCategoryClick ? (
                      <SvgIcoChevronDown />
                    ) : (
                      <></>
                    )}
                  </span>
                </PopoverButton>
              ) : (
                <PopoverButton
                  anchorId={onSelectChannelClick ? '' : `post-channel`}
                  id={`post-channel`}
                  popoverStyle={{ left: 0, top: 10, zIndex: 9999 }}
                  popoverElement={selectChannelPopoverElement}
                  popoverAnimation={{ name: 'modal-pop-fade', duration: 300 }}
                  ripple={{ disabled: !selectChannelPopoverElement && !onSelectChannelClick }}
                  onClick={onSelectChannelClick}
                >
                  <span className={cx('selected-channel')}>
                    {!!channelImg && (
                      <Person src={channelImg} size={'xsmall'} className={cx('avatar')} />
                    )}
                    {channelName || '-'}
                    {selectChannelPopoverElement || onSelectChannelClick ? (
                      <SvgIcoChevronDown />
                    ) : (
                      <></>
                    )}
                  </span>
                </PopoverButton>
              )}
            </div>
          </div>
        </div>
        <div className={cx('post-detail-editor-body')}>
          <WpEditor
            className={cx('editor', 'post-content')}
            ref={wpEditorRef}
            plugin={[Mention, HashTag, AutoUrlMatch, PasteToPlainText, CountTextLength]}
            initialValue={textData}
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

                setImagesData(images);
                handleImageChange && handleImageChange(images);
              }}
            />
          )}
          {memorizationData.media.length > 0 && (
            <FeedIframesView
              media={memorizationData.media}
              handleDeleteIframe={({ deleteIndex }) => {
                const media = handleUpdateMedia({ deleteIndex });

                setMediaData(media);
                handleMediaChange && handleMediaChange(media);
              }}
            />
          )}
          {!!ogMetaData && (
            <FeedLinkPreview
              ogMetaData={ogMetaData}
              handleDeleteOgMetaData={({ urls }) => {
                excludeOgSiteUrl.current.push(urls[0]);
                setMetaData(undefined);
                handleExternalUrlChange(undefined);
              }}
            />
          )}
        </div>
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
            <button
              className={cx('btn-submit', { loading })}
              disabled={minLength > textLength || loading}
              onClick={() =>
                handleSubmit(
                  {
                    ...memorizationData,
                    textValue: convertHtmlToMarkdownStr(memorizationData.textValue)
                  },
                  name
                )
              }
            >
              <span className={cx('text')}>{btnSubmitText}</span>
              {loading ? (
                <span className={cx('spinner')}>
                  <Spinner size={20} />
                </span>
              ) : (
                <></>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

FeedDetailEditor.displayName = 'FeedDetailEditor';

export type {
  Props as FeedDetailEditorProps,
  PostEditorImageValue,
  PostEditorMediaValue,
  FeedDetailEditorValue
};
export default FeedDetailEditor;
