export const environment = {
  production: true,
  apiURL: 'https://leocaliban-finance-api.herokuapp.com/',

  tokenWhitelistedDomains: [new RegExp('leocaliban-finance-api.herokuapp.com')],
  tokenBlacklistedRoutes: [new RegExp('\/oauth\/token')]
};
