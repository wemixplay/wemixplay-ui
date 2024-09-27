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
  useState,
  ClipboardEvent
} from 'react';
import style from './FeedDetailEditor.module.scss';
import WpEditor, { WpEditorProps, WpEditorRef } from '../editor/WpEditor';
import Mention from '@/plugins/mention/Mention';
import HashTag from '@/plugins/hashTag/HashTag';
import AutoUrlMatch from '@/plugins/autoUrlMatch/AutoUrlMatch';
import PasteToPlainText from '@/plugins/pasteToPlainText/PasteToPlainText';
import { makeCxFunc } from '@/utils/forReactUtils';

import { uniqBy } from 'lodash';
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
  convertMarkdownToHtmlStr,
  removeSpaceAndLineBreak
} from '@/utils/valueParserUtils';
import Person from '../avatars/Person';
import PopoverButton from '../popover/PopoverButton';
import Spinner from '../loadings/Spinner';

type PostEditorImageValue = { file?: File; loading?: boolean; src: string } & {
  [key: string]: string | number | boolean | File | undefined; // 추가적인 필드도 허용
};
type PostEditorMediaValue = { type: 'youtube' | 'twitch'; src: string };

type FeedDetailEditorValue = {
  textValue?: string;
  images?: PostEditorImageValue[];
  media?: PostEditorMediaValue[];
  ogMetaData?: FeedLinkPreviewProps['ogMetaData'];
};

type Props = Omit<WpEditorProps, 'plugin' | 'initialValue' | 'handleChange'> & {
  /** 추가적인 CSS 클래스명 */
  className?: string;
  /** 에디터에 입력해야 하는 최소 텍스트 길이 */
  minLength?: number;
  /** 제출 버튼 텍스트 */
  btnSubmitText?: ReactElement | string;
  /** 에디터 텍스트 값 */
  textValue?: string;
  /** 업로드된 이미지 배열 */
  images?: PostEditorImageValue[];
  /** 업로드된 미디어 배열 */
  media?: PostEditorMediaValue[];
  /** 링크 미리보기 메타데이터 */
  ogMetaData?: FeedLinkPreviewProps['ogMetaData'];
  /** 에디터 이름 */
  name?: string;
  /** 사용자가 공식인지 여부 */
  isOfficial?: boolean;
  /** 작성자의 이름 */
  writerName: string;
  /** 작성자의 프로필 이미지 URL */
  writerImg: string;
  /** 채널 이름 */
  channelName: string;
  /** 채널 이미지 URL */
  channelImg: string;
  /** 카테고리 이름 */
  categoryName?: string;
  /** 채널 선택 팝오버 요소 */
  selectChannelPopoverElement?: ReactElement;
  /** 카테고리 선택 팝오버 요소 */
  selectCategoryPopoverElement?: ReactElement;
  /** 업로드 가능한 최대 이미지 개수 */
  imageMaxCnt?: number;
  /** 업로드 가능한 최대 iframe 개수 */
  iframeMaxCnt?: number;
  /** 로딩 상태 */
  loading?: boolean;
  /** 외부 URL이 변경될 때 호출되는 함수 */
  handleExternalUrlChange?: (url: string) => void;
  /** 작성자 프로필 클릭 이벤트 핸들러 */
  onUserClick?: (e: MouseEvent<HTMLElement>) => void;
  /** 채널 선택 클릭 이벤트 핸들러 */
  onSelectChannelClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** 카테고리 선택 클릭 이벤트 핸들러 */
  onSelectCategoryClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** 이미지가 최대보다 크게 업로드 하려고 할시 실행되는 함수 */
  onMaxImageUploads?: () => void;
  /** iframe이 최대보다 크게 업로드 되려고 할시 실행되는 함수 */
  onMaxIframeUploads?: () => void;
  /** 텍스트 변경 시 호출되는 함수 */
  handleTextChange: (value: string, name?: string) => void;
  /** 이미지 변경 시 호출되는 함수 */
  handleImageChange: (value: PostEditorImageValue[], name?: string) => void;
  /** 미디어 변경 시 호출되는 함수 */
  handleMediaChange: (value: PostEditorMediaValue[], name?: string) => void;
  /** 제출 시 호출되는 함수 */
  handleSubmit: (value: FeedDetailEditorValue, name?: string) => void;
};

const cx = makeCxFunc(style);

/**
 * `FeedDetailEditor`는 피드 작성 및 수정 시 사용되는 에디터 컴포넌트입니다.
 * 텍스트, 이미지, 미디어, 링크 미리보기 등을 지원하며, 텍스트 길이 제한 및 입력된 URL 자동 매칭 기능도 포함되어 있습니다.
 *
 * @component
 * @example
 * <FeedDetailEditor
 *   writerName="John Doe"
 *   writerImg="profile.jpg"
 *   handleTextChange={(value) => console.log(value)}
 *   handleImageChange={(images) => console.log(images)}
 *   handleSubmit={(value) => console.log(value)}
 * />
 */
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

    const [textLength, setTextLength] = useState(textValue?.length ?? 0);
    const [textData, setTextData] = useState(convertMarkdownToHtmlStr(textValue ?? ''));
    const [imagesData, setImagesData] = useState(images);
    const [mediaData, setMediaData] = useState(media);
    const [metaData, setMetaData] = useState(ogMetaData);
    const [excludeOgSiteUrl, setExcludeOgSiteUrl] = useState([]);

    const memorizationData = useMemo(() => {
      return {
        ...mediaData,
        textValue: textData,
        images: uniqBy(imagesData, 'src'),
        media: uniqBy(mediaData, 'src')
      };
    }, [textData, imagesData, mediaData]);

    const buttonStatus = useMemo(() => {
      const isFillText = !!removeSpaceAndLineBreak(memorizationData.textValue);
      const isFillImages = !!(memorizationData.images ?? []).length;
      const isFillMedia = !!(memorizationData.media ?? []).length;
      const isImageLoading = (memorizationData.images ?? []).some((img) => !!img.loading);

      return {
        loading: loading || isImageLoading,
        disalbed:
          minLength > textLength ||
          loading ||
          isImageLoading ||
          (!isFillMedia && !isFillImages && !isFillText)
      };
    }, [loading, minLength, textLength, memorizationData]);

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

          images = uniqBy(images, 'src');
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
          if (media.length >= iframeMaxCnt) {
            onMaxIframeUploads && onMaxIframeUploads();
            return media;
          }

          if (Array.isArray(params.media)) {
            media = [...media, ...params.media];
          } else {
            media.push(params.media);
          }

          media = uniqBy(media, 'src');

          if (media.length > iframeMaxCnt) {
            onMaxIframeUploads && onMaxIframeUploads();
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
        const imagePattern = /\.(jpg|jpeg|png|gif|bmp|tiff|webp|avif)(\?.*)?$/i;

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

        setMediaData(newMedia);
        setImagesData(newImages);
        handleMediaChange && handleMediaChange(newMedia, name);
        handleImageChange && handleImageChange(newImages, name);

        return textUrls.map(
          (url) =>
            `<a href="${url.startsWith('http') ? url : `https://${url}`}" target="_blank">${url}</a>`
        );
      },
      [
        name,
        memorizationData,
        handleImageChange,
        handleMediaChange,
        handleUpdateImages,
        handleUpdateMedia
      ]
    );

    const handlePaste = useCallback(
      async (e: ClipboardEvent<HTMLDivElement>) => {
        const item = e.clipboardData.items[0];

        if (item.type.indexOf('image') === 0) {
          const file = item.getAsFile();

          const url = await readAsDataURLAsync(file);

          handleUpdateImages({ newImage: { file, src: url } });
        }
      },
      [handleUpdateImages]
    );

    const handleEditorTextChange = useCallback(
      (value: string) => {
        const convertValue = convertHtmlToMarkdownStr(value);

        setTextData(convertValue);
        handleTextChange && handleTextChange(convertValue, name);
      },
      [name, handleTextChange]
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
      <div className={cx(className, 'feed-detail-editor')}>
        <div
          className={cx('feed-detail-editor-header', { 'exist-user-click-event': !!onUserClick })}
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
                      <Person src={channelImg} size={'custom'} className={cx('avatar')} />
                    )}
                    {channelName || '내 채널에 포스트'}
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
        <div className={cx('feed-detail-editor-body')}>
          <WpEditor
            className={cx('editor', 'post-content', { filled: textData.length })}
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
                onMatchUrl: (url) => {
                  return onMatchUrl({ textUrls: [url], mediaUrls: [] });
                },
                onChangeMatchUrls: (urls) => {
                  const imagePattern = /\.(jpg|jpeg|png|gif|bmp|webp|tiff|avif)$/i;
                  const normalUrls = urls.filter(
                    (url) => !imagePattern.test(url) && !isYouTubeURL(url) && !isTwitchURL(url)
                  );

                  setExcludeOgSiteUrl(
                    excludeOgSiteUrl.filter((url) => {
                      return normalUrls.includes(url);
                    })
                  );

                  const externalUrls = normalUrls.filter((url) => {
                    return !excludeOgSiteUrl.includes(url);
                  });

                  if (!excludeOgSiteUrl.includes(externalUrls[0])) {
                    handleExternalUrlChange && handleExternalUrlChange(externalUrls[0]);
                  }
                }
              },
              countTextLength: {
                hideUi: true,
                onChangeTextLength: setTextLength
              }
            }}
            onDragOver={onDragOver}
            onDrop={onInputDrop}
            onPaste={handlePaste}
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
          {!!metaData && (
            <FeedLinkPreview
              ogMetaData={metaData}
              handleDeleteOgMetaData={({ urls }) => {
                setMetaData(undefined);
                handleExternalUrlChange && handleExternalUrlChange(undefined);

                setExcludeOgSiteUrl((excludeOgSiteUrl) => {
                  return [
                    ...new Set([
                      ...excludeOgSiteUrl,
                      ...(urls ?? []).map((url) => (url.endsWith('/') ? url.slice(0, -1) : url))
                    ])
                  ];
                });
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
                accept="image/png, image/gif, image/jpeg, image/jpg, image/webp, image/bmp, image/tiff"
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
              className={cx('btn-submit', {
                loading: buttonStatus.loading
              })}
              disabled={buttonStatus.disalbed}
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
