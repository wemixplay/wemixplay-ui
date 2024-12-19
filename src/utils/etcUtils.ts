/**
 * setTimeout Promise 처리
 * @param ms : number
 * @returns Promise<unknown>
 */
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
