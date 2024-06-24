import { get } from 'lodash-es';

/**
 * file 정보를 읽어 data64 형식의 url로 변환하여 반환
 */
export const readAsDataURLAsync = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        const decoder = new TextDecoder();
        resolve(decoder.decode(reader.result));
      }
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * 이미지 파일이 맞는지 확인하는 함수
 *
 * 이미지 파일이 아니라면 onlyImage라는 정보를 가진 error 발생
 *
 * @param {File} file
 * @param {Event} e
 * @returns {Promise<*>}
 */
const validateImageFile = (
  file: File,
  e?: React.ChangeEvent<HTMLInputElement>
): Promise<JSONObject> => {
  return new Promise((resolve, reject) => {
    if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)) {
      if (e) {
        e.target.value = '';
      }

      reject(new Error('onlyImage'));
    } else {
      resolve(true);
    }
  });
};

/**
 * input[type="file"]로 단일 이미지 파일 업로드 이벤트를 받아 file 정보와 data64 url 정보를 추출하여 반환하는 함수
 * @param e React.ChangeEvent<HTMLInputElement>
 * @returns {{file: File, dataUrl: string}} file 정보와 data64 url 정보를 갖는 객체
 */
export const imageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = get(e, 'target.files[0]', null) as File | null;
  if (file) {
    await validateImageFile(file, e);
    const dataUrl = await readAsDataURLAsync(file);
    return { file, dataUrl: dataUrl || '' };
  }
  throw new Error('uploadFailed');
};

/**
 * input[type="file"]로 여러 이미지 파일 업로드 이벤트를 받아 file 정보와 data64 url 정보를 추출하여 반환하는 함수
 * @param e React.ChangeEvent<HTMLInputElement>
 * @returns {{file: File, dataUrl: string}} file 정보와 data64 url 정보를 갖는 객체를 요소로 갖는 배열
 */
export const multiImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const result: { file: File; dataUrl: string }[] = [];
  const files = get(e, 'target.files', []) as File[];

  for (let i = 0; i < Array.from(files).length; i += 1) {
    const file = Array.from(files)[i];
    if (file) {
      await validateImageFile(file, e);
      const dataUrl = await readAsDataURLAsync(file);
      result.push({ file, dataUrl });
    }
  }

  return result;
};

/**
 * input[type="file"]로 단일 파일 업로드 이벤트를 받아 file 정보와 data64 url 정보를 추출하여 반환하는 함수
 * @param e React.ChangeEvent<HTMLInputElement>
 * @returns {{file: File, dataUrl: string}} file 정보와 data64 url 정보를 갖는 객체
 */
export const fileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = get(e, 'target.files[0]', null);
  if (file) {
    const dataUrl = await readAsDataURLAsync(file);
    return { file, dataUrl };
  }

  return { file: null, dataUrl: null };
};

/**
 * API로 전달받은 BlobPart 형태의 파일 데이터를 이용하여 다운로드 기능을 제공하는 함수
 * @param {Record<string, JSONObject>} responseData API 응답
 * @param {string} fileName 다운로드시 지정할 파일명
 */
export const downloadFile = (
  responseData: { headers: Record<string, JSONObject>; data: BlobPart },
  fileName: string = ''
) => {
  const url = window.URL.createObjectURL(new Blob([responseData.data]));
  const link = document.createElement('a');
  if (!fileName) {
    fileName = 'unknown';
    const contentDisposition = responseData.headers['content-disposition'];
    if (contentDisposition) {
      const [fileNameMatch] = contentDisposition
        .split(';')
        .filter((str: string) => str.includes('filename'));
      if (fileNameMatch) [, fileName] = fileNameMatch.split('=');
    }
  }
  link.href = url;
  link.setAttribute('download', decodeURI(fileName));
  link.style.cssText = 'display:none';
  document.body.appendChild(link);
  link.click();
  link.remove();
};

/**
 * Blob 형태의 파일 데이터를 이용하여 다운로드 기능을 제공하는 함수
 * @param {Blob} data Blob 형태의 파일 데이터
 * @param {string} fileName 다운로드시 지정할 파일명
 */
export const downloadBlobFile = (data: Blob, filename: string) => {
  const anchor = document.createElement('a');
  anchor.download = filename;
  anchor.href = URL.createObjectURL(data);
  anchor.click();
  URL.revokeObjectURL(anchor.href);
};

/**
 * FormData 형태로 API 요청 할때 전달할 params를 FormData 형태로 변환해주는 함수
 * @param {T} params  API 요청 할때 전달할 params
 * @param isPut method가 put인지 확인
 */
export const makeFormData = <T extends Record<string, JSONObject>>(params: T, isPut = false) => {
  const formData = new FormData();

  if (isPut) {
    formData.append('_method', 'put');
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null) {
      if (Array.isArray(value)) {
        for (const v of value) {
          formData.append(`${key}[]`, v);
        }
      } else {
        formData.append(key, value);
      }
    }
  });

  return formData as unknown as T;
};
