// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://api.github.com',
  gatekeeperConfig: {
    client_id: 'b442133bd4e9b87b9f62', // your Client ID from GitHub
    redirect_uri: 'http://localhost:4200/auth', // authentication url
    gatekeeper: 'http://localhost:9999' // url from gatekeeper
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
