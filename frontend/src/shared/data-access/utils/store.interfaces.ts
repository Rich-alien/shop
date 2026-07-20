export type LoadingStatus = 'idle' | 'loading' | 'loaded' | 'empty' | 'error';

export const DEFAULT_STATUS = 'idle';

export const loadingStatus = {
  LOADING: 'loading',
  LOADED: 'loaded',
  EMPTY: 'empty',
  ERROR: 'error',
} as const;



export interface StoreBaseState {
  status: LoadingStatus;
  error: Error | null;
}
