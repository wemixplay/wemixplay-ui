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
import Editor, { EditorProps, EditorRef } from './Editor';
import Mention from '@/plugins/mention/Mention';
import HashTag from '@/plugins/hashTag/HashTag';
import AutoUrlMatch from '@/plugins/autoUrlMatch/AutoUrlMatch';
import PasteToPlainText from '@/plugins/pasteToPlainText/PasteToPlainText';
import { makeCxFunc } from '@/utils/forReactUtils';
import { SvgIcoImage } from '@/assets/svgs';
import Ripple from '../ripple/Ripple';
import { orderBy, uniqBy } from 'lodash-es';
import { imageFileUpload, readAsDataURLAsync } from '@/utils/fileUtils';
import ImagesUploadPreview from './ImagesUploadPreview';

type PostEditorMediaValue = { file?: File; src: string };

type PostDetailEditorValue = {
  editorInitailValue?: string;
  images?: PostEditorMediaValue[];
  videos?: PostEditorMediaValue[];
  ogUrl?: string;
};

type Props = Omit<EditorProps, 'plugin' | 'config' | 'initailValue'> & {
  className?: string;
  btnSubmitElement?: ReactElement;
  value?: PostDetailEditorValue;
  name?: string;
  handleChange?: (value: PostDetailEditorValue, name?: string) => void;
};

const cx = makeCxFunc(style);

const PostDetailEditor = forwardRef<EditorRef, Props>(
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

    const [data, setData] = useState(value);

    const memorizationData = useMemo(() => {
      return {
        ...data,
        images: uniqBy(data?.images ?? [], 'src'),
        videos: uniqBy(data?.videos ?? [], 'src')
      };
    }, [data]);

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

        setData({ ...memorizationData, images });
        handleChange && handleChange({ ...memorizationData, images }, name);

        // input[type="file"] 요소의 value 값을 없애주지 않으면 직전에 등록한 이미지와 같은 이미지가 다시 업로드가 안됨
        imgInputRef.current.value = '';
      },
      [memorizationData.images, handleChange, name]
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

        handleUpdateImages({ newImage: images });
      },
      [memorizationData?.images, handleUpdateImages]
    );

    /**
     * input[type="file"] 요소의 value가 바뀔때 호출되는 함수로써 message state의 image, imageFile값을 업데이트 하는 함수
     *
     *  @param e `ChangeEvent<HTMLInputElement>`
     */
    const onImageFileChange = useCallback(
      async (e: ChangeEvent<HTMLInputElement>) => {
        const { file, dataUrl } = await imageFileUpload(e);

        handleUpdateImages({ newImage: { file, src: dataUrl } });
      },
      [handleUpdateImages]
    );

    const onMatchImgOrVideoUrl = useCallback(
      (
        urls: {
          tag: 'iframe' | 'img' | 'video';
          src: string;
        }[]
      ) => {
        const images = urls.filter((url) => url.tag === 'img');

        handleUpdateImages({ newImage: images });
      },
      []
    );

    const onMatchUrl = useCallback((url: string) => {
      const imagePattern = /\.(jpg|jpeg|png|gif|webp)$/i;

      const isImageUrl = imagePattern.test(url);

      if (isImageUrl) {
        handleUpdateImages({ newImage: { src: url } });
      }

      return `<a href="${url}" target="_blank">${url}</a>`;
    }, []);

    useEffect(() => {
      if (value) {
        setData(value);
      }
    }, [value]);

    return (
      <div className={cx(className, 'post-detail-editor')}>
        <Editor
          ref={ref}
          plugin={[Mention, HashTag, AutoUrlMatch, PasteToPlainText]}
          initialValue={memorizationData?.editorInitailValue}
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
        ></Editor>
        {memorizationData.images.length > 0 && (
          <ImagesUploadPreview
            images={memorizationData?.images}
            handleDeleteImg={handleUpdateImages}
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

export default PostDetailEditor;
