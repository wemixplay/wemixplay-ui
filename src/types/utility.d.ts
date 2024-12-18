export type UnknownArrayType = unknown[] | never[];

export type GetArrayItemType<LIST> = LIST extends (infer R)[] ? R : never;

export type PartialKeys<T, K extends keyof T> = Partial<Pick<T, Extract<keyof T, K>>> &
  Omit<T, K> extends infer O
  ? { [P in keyof O]: O[P] }
  : never;

export type EmptyObject = {
  [key: string]: never;
  [key: number]: never;
};
