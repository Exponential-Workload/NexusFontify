import chrome from 'webextension-polyfill';
import updateCSP from './CSP';
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
chrome.webRequest.onHeadersReceived.addListener(
  details => {
    const headers = details.responseHeaders ?? [];

    const cspHeader = headers.find(
      v => v.name.toLowerCase() === 'content-security-policy',
    );
    if (cspHeader && cspHeader.value)
      cspHeader.value = updateCSP(
        updateCSP(cspHeader.value, 'font-src', 'https://cdn.fonts.nexus'),
        'style-src',
        'https://fonts.nexus',
      );

    return { responseHeaders: headers };
  },
  { urls: ['<all_urls>'] }, // You can specify the URLs you want to intercept
  ['blocking', 'responseHeaders'],
);
