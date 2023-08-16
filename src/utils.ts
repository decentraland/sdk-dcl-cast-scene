export enum VideoTrackSourceType {
  VTST_UNKNOWN = 0,
  VTST_CAMERA = 1,
  VTST_SCREEN_SHARE = 2,
  UNRECOGNIZED = -1
}

export function formatAddress(address: string) {
  if (!address.startsWith('0x')) return address
  const prefix = address.slice(0, 5);
  const body = address.slice(-4);
  const formattedAddress = `${prefix}...${body}`;
  return formattedAddress
}

export const getSourceType = {
  [VideoTrackSourceType.VTST_CAMERA]: 'Camera',
  [VideoTrackSourceType.VTST_SCREEN_SHARE]: 'Screen sharing',
  [VideoTrackSourceType.UNRECOGNIZED]: 'Unrecognized',
  [VideoTrackSourceType.VTST_UNKNOWN]: 'Unknown',
}

