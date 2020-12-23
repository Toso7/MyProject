export const environment = {
  production: true,
  apiUrl: 'https://api.github.com',
  gatekeeperConfig: {
    client_id: 'bf3f1d0d8f145948087c', // your Client ID from GitHub
    redirect_uri: 'http://myproject-toso7.epizy.com/auth', // authentication url
    gatekeeper: '/auth.php' // url from gatekeeper
  }
};
