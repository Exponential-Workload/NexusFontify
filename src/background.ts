import chrome from 'webextension-polyfill';
chrome.webRequest.onBeforeRequest.addListener(
  details => {
    const modifiedUrl = details.url.replace(
      'https://fonts.googleapis.com/',
      'https://fonts.nexus/',
    );

    return { redirectUrl: modifiedUrl };
  },
  { urls: ['https://fonts.googleapis.com/css*'] },
  ['blocking'],
);
let webFontLoaderUrl = `https://cdn.jsdelivr.net/npm/@nexusfonts/webfontloader@1.6.29-nexus/webfontloader.cjs`;
// below would be nice but cors
// fetch(webFontLoaderUrl)
//   .then(v => v.text())
//   .then(
//     v =>
//       (webFontLoaderUrl = `data:application/javascript,${encodeURIComponent(
//         v,
//       )}`),
//   )
//   .catch(console.warn);
chrome.webRequest.onBeforeRequest.addListener(
  () => ({
    redirectUrl: webFontLoaderUrl,
    requestHeaders: [
      {
        name: 'Access-Control-Allow-Origin',
        value: '*',
      },
    ],
  }),
  { urls: ['https://cdn.jsdelivr.net/npm/webfontloader/*/webfont.js'] },
  ['blocking'],
);
