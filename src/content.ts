import chrome from 'webextension-polyfill';
import updateCSP from './CSP';

chrome.runtime.sendMessage({ action: 'activate' });

const elements = document.querySelectorAll(
  'link[rel="stylesheet"][href*="fonts.googleapis.com"],link[rel="preconnect"][href*="fonts.googleapis.com"],link[rel="preconnect"][href*="fonts.gstatic.com"]',
);
elements.forEach(element => {
  const href = element.getAttribute('href');
  if (href) {
    const modifiedHref = href
      .replace('https://fonts.googleapis.com/', 'https://fonts.arson.wtf/')
      .replace('https://fonts.gstatic.com/', 'https://fcdn.arson.wtf/');
    element.setAttribute('href', modifiedHref);
  }
});

const metaCSP = document.querySelector(
  'meta[http-equiv="Content-Security-Policy"]',
);
if (metaCSP) {
  const csp = metaCSP.getAttribute('content');
  metaCSP.setAttribute(
    'content',
    updateCSP(
      updateCSP(
        csp ?? '',
        'font-src',
        'https://fcdn.arson.wtf https://fonts-cdn.nexuspipe.com',
      ),
      'style-src',
      'https://fonts.arson.wtf',
    ),
  );
}
