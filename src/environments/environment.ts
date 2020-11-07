// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  googleMapsApiKey: 'AIzaSyCqlm1Em7HM9OER2mZLbSKyfiRLBaCClSk',
  cryptoKey: 'develop',
  backend: 'http://localhost:4200', // Put your backend here
  firebaseConfig: {
    apiKey: 'AIzaSyCZu41p27JiWz7XnL9hRy1k8_tLtXIJwfM',
    authDomain: 'torretest-3df18.firebaseapp.com',
    databaseURL: 'https://torretest-3df18.firebaseio.com',
    projectId: 'torretest-3df18',
    storageBucket: 'torretest-3df18.appspot.com',
    messagingSenderId: '1026444632385',
    appId: '1:1026444632385:web:3219806051b62d349e41c0',
    measurementId: 'G-T4SMJR3TLJ',
  },
};
