export const LAST_FRAME_INDEX = 191;
export const TOTAL_FRAME_COUNT = LAST_FRAME_INDEX + 1;

export function getFramePath(index: number): string {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/frames/frame_${paddedIndex}.jpg`;
}
