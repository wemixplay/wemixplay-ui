/**
 * file 정보를 읽어 data64 형식의 url로 변환하여 반환
 */
export declare const readAsDataURLAsync: (file: Blob) => Promise<string>;
/**
 * input[type="file"]로 단일 이미지 파일 업로드 이벤트를 받아 file 정보와 data64 url 정보를 추출하여 반환하는 함수
 * @param e React.ChangeEvent<HTMLInputElement>
 * @returns {{file: File, dataUrl: string}} file 정보와 data64 url 정보를 갖는 객체
 */
export declare const imageFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<{
    file: File;
    dataUrl: string;
}>;
/**
 * input[type="file"]로 여러 이미지 파일 업로드 이벤트를 받아 file 정보와 data64 url 정보를 추출하여 반환하는 함수
 * @param e React.ChangeEvent<HTMLInputElement>
 * @returns {{file: File, dataUrl: string}} file 정보와 data64 url 정보를 갖는 객체를 요소로 갖는 배열
 */
export declare const multiImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<{
    file: File;
    dataUrl: string;
}[]>;
/**
 * input[type="file"]로 단일 파일 업로드 이벤트를 받아 file 정보와 data64 url 정보를 추출하여 반환하는 함수
 * @param e React.ChangeEvent<HTMLInputElement>
 * @returns {{file: File, dataUrl: string}} file 정보와 data64 url 정보를 갖는 객체
 */
export declare const fileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<{
    file: any;
    dataUrl: string;
}>;
/**
 * API로 전달받은 BlobPart 형태의 파일 데이터를 이용하여 다운로드 기능을 제공하는 함수
 * @param {Record<string, JSONObject>} responseData API 응답
 * @param {string} fileName 다운로드시 지정할 파일명
 */
export declare const downloadFile: (responseData: {
    headers: Record<string, JSONObject>;
    data: BlobPart;
}, fileName?: string) => void;
/**
 * Blob 형태의 파일 데이터를 이용하여 다운로드 기능을 제공하는 함수
 * @param {Blob} data Blob 형태의 파일 데이터
 * @param {string} fileName 다운로드시 지정할 파일명
 */
export declare const downloadBlobFile: (data: Blob, filename: string) => void;
/**
 * FormData 형태로 API 요청 할때 전달할 params를 FormData 형태로 변환해주는 함수
 * @param {T} params  API 요청 할때 전달할 params
 * @param isPut method가 put인지 확인
 */
export declare const makeFormData: <T extends Record<string, any>>(params: T, isPut?: boolean) => T;
