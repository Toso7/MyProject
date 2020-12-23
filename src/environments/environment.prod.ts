export const environment = {
  production: true,
  apiUrl: 'https://api.github.com',
  gatekeeperConfig: {
    client_id: 'bf3f1d0d8f145948087c', // your Client ID from GitHub
    redirect_uri: 'http://localhost:4200/auth', // authentication url
    gatekeeper: 'http://localhost:9999' // url from gatekeeper
  }
};
