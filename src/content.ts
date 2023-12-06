import chrome from 'webextension-polyfill';

chrome.runtime.sendMessage({ action: 'activate' });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'redirectFonts') {
    const elements = document.querySelectorAll(
      'link[rel="stylesheet"][href*="fonts.googleapis.com"],link[rel="preconnect"][href*="fonts.googleapis.com"],link[rel="preconnect"][href*="fonts.gstatic.com"]',
    );
    elements.forEach(element => {
      const href = element.getAttribute('href');
      if (href) {
        const modifiedHref = href
          .replace('https://fonts.googleapis.com/', 'https://fonts.nexus/')
          .replace('https://fonts.gstatic.com/', 'https://cdn.fonts.nexus/');
        element.setAttribute('href', modifiedHref);
      }
    });
  }
});
