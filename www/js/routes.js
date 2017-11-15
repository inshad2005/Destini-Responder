angular.module('app.routes', ['ionicUIRouter'])

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
$ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.tabs.position('bottom');
	
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    $stateProvider



/* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.historyAndStatus'
      2) Using $state.go programatically:
        $state.go('tabsController.historyAndStatus');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab4/page4
      /page1/tab3/page4
  */
    .state('tabsController.historyAndStatus', {
        url: '/page4',
        views: {
            'tab4': {
                templateUrl: 'templates/historyAndStatus.html',
                controller: 'historyAndStatusCtrl'
            },
            'tab3': {
                templateUrl: 'templates/historyAndStatus.html',
                controller: 'historyAndStatusCtrl'
            }
        }
    })

    .state('tabsController', {
        url: '/page1',
        templateUrl: 'templates/tabsController.html',
        abstract: true
    })

    .state('login', {
        url: '/page7',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl',
		onEnter: function($state){
        if(localStorage['auth']=='true'){
		 //$state.transition.finally(() => {
           $state.go('tabsController.auditions');
		    // });
        }
    }
		 
    })

    .state('fpass', {
        url: '/page32',
        templateUrl: 'templates/fpass.html',
        controller: 'fpassCtrl'
    })
    .state('signUp', {
        url: '/page8',
        templateUrl: 'templates/signUp.html',
        controller: 'signUpCtrl'
    })

/* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.auditions'
      2) Using $state.go programatically:
        $state.go('tabsController.auditions');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab4/page9
      /page1/tab3/page9
  */
    .state('tabsController.auditions', {
        url: '/page9',
        views: {
            'tab4': {
                templateUrl: 'templates/auditions.html',
                controller: 'auditionsCtrl'
            }
        }
    }).state('tabsController.open', {
        url: '/page33',
        views: {
            'tab4': {
                templateUrl: 'templates/open.html',
                controller: 'auditionsCtrl'
            }
        }
    }).state('tabsController.pinned', {
        url: '/page34',
        views: {
            'tab4': {
                templateUrl: 'templates/pinned.html',
                controller: 'pinnedCtrl'
            }
        }
    })

    .state('tabsController.invites', {
        url: '/page35',
        views: {
            'tab4': {
                templateUrl: 'templates/invites.html',
                controller: 'invitesCtrl'
            }
        }
    }).state('tabsController.auditionspinned', {
        url: '/page25',
        views: {
            'tab3': {
                templateUrl: 'templates/auditions.html',
                controller: 'auditionsCtrl'
            }
        }
    })
/* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.appliedSession'
      2) Using $state.go programatically:
        $state.go('tabsController.appliedSession');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab4/page10
      /page1/tab3/page10
  */
    .state('tabsController.appliedSession', {
        url: '/page10',
        views: {
            'tab4': {
                templateUrl: 'templates/appliedSession.html',
                controller: 'appliedSessionCtrl'
            },
            'tab3': {
                templateUrl: 'templates/appliedSession.html',
                controller: 'appliedSessionCtrl'
            }
        }
    })

/* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.audition1'
      2) Using $state.go programatically:
        $state.go('tabsController.audition1');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab4/page15
      /page1/tab3/page15
  */
    .state('tabsController.audition1', {
        url: '/page15/:auditionId',
        views: {
            'tab4': {
                templateUrl: 'templates/audition1.html',
                controller: 'audition1Ctrl'
            },
            'tab3': {
                templateUrl: 'templates/audition1.html',
                controller: 'audition1Ctrl'
            }
        }
    })
    .state('tabsController.audition11', {
        url: '/page151/:auditionId',
        views: {
            'tab4': {
                templateUrl: 'templates/audition11.html',
                controller: 'audition1Ctrl'
            },
            'tab3': {
                templateUrl: 'templates/audition11.html',
                controller: 'audition1Ctrl'
            }
        }
    })
	 .state('tabsController.audition101', {
        url: '/page101/:auditionId',
        views: {
            'tab4': {
                templateUrl: 'templates/auditiond.html',
                controller: 'audition1Ctrl'
            },
            'tab3': {
                templateUrl: 'templates/audition1.html',
                controller: 'audition1Ctrl'
            }
        }
    })

/* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.mediaUpload'
      2) Using $state.go programatically:
        $state.go('tabsController.mediaUpload');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab4/page11
      /page1/tab3/page11
  */
    .state('tabsController.mediaUpload', {
        url: '/page11',
        views: {
            'tab4': {
                templateUrl: 'templates/mediaUpload.html',
                controller: 'mediaUploadCtrl'
            },
            'tab3': {
                templateUrl: 'templates/mediaUpload.html',
                controller: 'mediaUploadCtrl'
            }
        }
    })

/* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.mediaUpload2'
      2) Using $state.go programatically:
        $state.go('tabsController.mediaUpload2');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab4/page14
      /page1/tab3/page14
  */
    .state('tabsController.mediaUpload2', {
        url: '/page14',
        views: {
            'tab4': {
                templateUrl: 'templates/mediaUpload2.html',
                controller: 'mediaUpload2Ctrl'
            },
            'tab3': {
                templateUrl: 'templates/mediaUpload2.html',
                controller: 'mediaUpload2Ctrl'
            }
        }
    })

	
	   .state('resume1', {
        url: '/page50',
        templateUrl: 'templates/resume1.html',
        controller: 'resumeCtrl'
		
		 
    })

	 
/* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.addDocuments'
      2) Using $state.go programatically:
        $state.go('tabsController.addDocuments');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab4/page12
      /page1/tab3/page12
  */
    .state('tabsController.addDocuments', {
        url: '/page12',
        views: {
            'tab4': {
                templateUrl: 'templates/addDocuments.html',
                controller: 'addDocumentsCtrl'
            },
            'tab3': {
                templateUrl: 'templates/addDocuments.html',
                controller: 'addDocumentsCtrl'
            }
        }
    })

/* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.submissionConfirmation'
      2) Using $state.go programatically:
        $state.go('tabsController.submissionConfirmation');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab4/page13
      /page1/tab3/page13
  */
    .state('tabsController.submissionConfirmation', {
        url: '/page13',
        views: {
            'tab4': {
                templateUrl: 'templates/submissionConfirmation.html',
                controller: 'submissionConfirmationCtrl'
            },
            'tab3': {
                templateUrl: 'templates/submissionConfirmation.html',
                controller: 'submissionConfirmationCtrl'
            }
        }
    })

    .state('tabsController.profile', {
        url: '/page17',
        views: {
            'tab1': {
                templateUrl: 'templates/profile.html',
                controller: 'profileCtrl'
            }
        }
    })

    .state('tabsController.profileDetails', {
        url: '/page19',
        views: {
            'tab1': {
                templateUrl: 'templates/profileDetails.html',
                controller: 'profileDetailsCtrl'
            }
        }
    })

/* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.requesterDetails'
      2) Using $state.go programatically:
        $state.go('tabsController.requesterDetails');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab4/page24
      /page1/tab3/page24
  */
    .state('tabsController.requesterDetails', {
        url: '/page24/:id',
        views: {
            'tab4': {
                templateUrl: 'templates/requesterDetails.html',
                controller: 'requesterDetailsCtrl'
            },
            'tab3': {
                templateUrl: 'templates/requesterDetails.html',
                controller: 'requesterDetailsCtrl'
            }
        }
    })

/* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.questions'
      2) Using $state.go programatically:
        $state.go('tabsController.questions');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab4/page20
      /page1/tab3/page20
  */
    .state('tabsController.questions', {
        url: '/page20/:auditionId',
        views: {
            'tab4': {
                templateUrl: 'templates/questions.html',
                controller: 'questionsCtrl'
            },
            'tab3': {
                templateUrl: 'templates/questions.html',
                controller: 'questionsCtrl'
            }
        }
    })

/* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.response'
      2) Using $state.go programatically:
        $state.go('tabsController.response');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab4/page21
      /page1/tab3/page21
  */
    .state('tabsController.response', {
        url: '/page21/:id',
        views: {
            'tab4': {
                templateUrl: 'templates/response.html',
                controller: 'responseCtrl'
            },
            'tab3': {
                templateUrl: 'templates/response.html',
                controller: 'responseCtrl'
            }
        }
    })

    .state('tabsController.pictures', {
        url: '/page22',
        views: {
            'tab1': {
                templateUrl: 'templates/pictures.html',
                controller: 'picturesCtrl'
            }
        }
    })

    .state('tabsController.videos', {
        url: '/page23',
        views: {
            'tab1': {
                templateUrl: 'templates/videos.html',
                controller: 'videosCtrl'
            }
        }
    })

    .state('tabsController.portfolio', {
        url: '/page16',
        views: {
            'tab1': {
                templateUrl: 'templates/portfolio.html',
                controller: 'portfolioCtrl'
            }
        }
    })

    .state('tabsController.resume', {
        url: '/page18',
        views: {
            'tab1': {
                templateUrl: 'templates/resume.html',
                controller: 'resumeCtrl'
            }
        }
    })

    .state('tabsController.aboutme', {
        url: '/page31',
        views: {
            'tab1': {
                templateUrl: 'templates/aboutme.html',
                controller: 'aboutmeCtrl'
            }
        }
    })

     .state('termcondition', {
        url: '/page52',
        templateUrl: 'templates/termcondition.html',
        controller: 'signUpCtrl'

      
    })

    $urlRouterProvider.otherwise('/page7');



});