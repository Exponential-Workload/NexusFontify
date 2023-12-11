const updateCSP = (csp: string, key: string, value: string): string => {
  const directives = csp.split(';').map(directive => directive.trim());

  const index = directives.findIndex(directive =>
    directive.startsWith(`${key} `),
  );

  if (index !== -1) {
    const updatedDirective = `${key} ${directives[index]
      .substring(key.length)
      .trim()} ${value}`;
    directives[index] = updatedDirective;
  }

  const updatedCSP = directives.join('; ');

  return updatedCSP;
};
export default updateCSP;
console.log(
  updateCSP(
    `connect-src 'self' checkout.stripe.com https://checkout.stripe.com https://billing.stripe.com/session https://api.funcaptcha.com https://api.arkoselabs.com sentry.io api.github.com www.npmjs.com;default-src 'none';img-src * data: https://*.stripe.com;script-src 'self' data: 'unsafe-inline' https://checkout.stripe.com/checkout.js https://checkout.stripe.com https://js.stripe.com/v3 https://platform.twitter.com/widgets.js https://octocaptcha.com https://static-production.npmjs.com/;style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://static-production.npmjs.com/;frame-src checkout.stripe.com https://checkout.stripe.com https://js.stripe.com/ https://octocaptcha.com;font-src https://fonts.gstatic.com https://static-production.npmjs.com/ ;media-src https://player.vimeo.com https://fpdl.vimeocdn.com https://gcs-vimeo.akamaized.net https://vod-progressive.akamaized.net`,
    'yay-src',
    'ts',
  ),
);
