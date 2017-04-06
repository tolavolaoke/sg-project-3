// specifying and mapping a route aka state in the URL and an actual state

function MainRouter ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');


  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/states/home.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/states/signup.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/states/login.html'
    })
    .state('authRequired', {
      url: '/authrequired',
      templateUrl: '/states/authRequired.html'
    })
    .state('relatives', {
      url: '/relatives',
      templateUrl: '/states/relatives.html',
      resolve: {
        currentAuth: [
          'AuthFactory',
          (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    });
}


MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

function AuthCatcher($rootScope, $state) { //auth catcher if authotrised to view the page you can see it

  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    if (error === 'AUTH_REQUIRED') {
      $state.go('authRequired');
    }
  });
}

AuthCatcher.$inject = ['$rootScope', '$state'];


angular
  .module('FamilyTreeApp', ['ui.router', 'firebase'])
  .config(MainRouter)
  .run(AuthCatcher);
