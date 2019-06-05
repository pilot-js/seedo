export const convertBufferToImgSrc = imageBuffer => {
  const base64String = btoa(String.fromCharCode(...new Uint8Array(imageBuffer.data)));
  return `data:image/png;base64,${base64String}`;
};
