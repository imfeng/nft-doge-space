export * from './format';

export * from './check';

export function web3ErrorToMsg(error: any) {
  if (!error) {
    return '';
  }
  return error.error?.message || error.message || error.message || 'Something went wrong';
}
