export const environment = {
  production: true,
  apiURL: 'https://leocaliban-finance-api.herokuapp.com/',

  tokenWhitelistedDomains: [/leocaliban-finance-api.herokuapp.com/],
  tokenBlacklistedRoutes: [/\/oauth\/token/]
};
