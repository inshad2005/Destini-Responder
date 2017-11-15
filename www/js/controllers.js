app.directive('contenteditable', [function() {
	return {
		require: '?ngModel',
		scope: {

		},
		link: function(scope, element, attrs, ctrl) {
			// view -> model (when div gets blur update the view value of the model)
			element.bind('blur', function() {
				//alert('tatty');
				scope.$apply(function() {
					ctrl.$setViewValue(element.html());
				});
			});

			// model -> view
			ctrl.$render = function() {
				element.html(ctrl.$viewValue);
			};

			// load init value from DOM
			ctrl.$render();

			// remove the attached events to element when destroying the scope
			scope.$on('$destroy', function() {
				element.unbind('blur');

				element.unbind('paste');
				element.unbind('focus');
			});
		}
	};
}]);

angular.module('filterMod', []).
filter('htmlToPlaintext', function() {
	return function(text) {
		return text ? String(text).replace(/<[^>]+>/gm, '') : '';
	};
});
angular.module('app.controllers', ['myDirectives', 'filterMod'])

.controller('historyAndStatusCtrl', function($scope, $rootScope, $http, $stateParams, $ionicLoading, $state, LoadingSpinner) {

	$scope.$on('$ionicView.beforeEnter', function(event, viewData) {

		//console.debug('[StoryController] $ionicView.beforeEnter');


		viewData.enableBack = false;

	   LoadingSpinner.show('pageLoading');
	   //LoadingSpinner.show('pageLoading');//

		$http({
			method: 'post',
			url: 'https://destini.io/ws_responder/session/history',
			data: {
				'responder_id': localStorage['rId']
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).success(function(data, status, header, config, message) {
			if (data.response) {
				$scope.hauditions = data.result;
			}
			LoadingSpinner.hide('pageLoading');
		}).error(function(data, status, header, config, message) {
			LoadingSpinner.hide('pageLoading');
		});

	});


})

.controller('loginCtrl', function($scope, $state, $http, $ionicLoading, $ionicPopup, $window) {
	console.log(localStorage['auth']);
	/*if(localStorage['auth']=="true"){
	   console.log('login true hai');
	  $state.go('tabsController.auditions');
	}*/
	console.log(localStorage['auth']);
	$scope.login = function() {

		$ionicLoading.show({
			template: 'Redirecting...'
		});
		$http({
			method: 'POST',
			url: 'https://destini.io/ws_responder/login',
			data: {
				'email': $scope.user.email,
				'password': $scope.user.pass
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).success(function(data, status, header, config, message) {

			$ionicLoading.hide();
			if (data.response) {
				logsuc();
				localStorage.setItem('rId', data.result.id);
				console.log('responderid' + localStorage['rId']);
				localStorage.setItem('naam', data.result.name);
				$scope.naam = localStorage['naam'];
				localStorage.setItem('auth', "true");
				localStorage.setItem('rEmail', $scope.user.email);
				localStorage.setItem('rPass', $scope.user.pass);
				localStorage.setItem('photo', $scope.user.profile_pic);
				localStorage.setItem('aboutme', data.result.about_me);
				$scope.photo = localStorage['photo'];
				/*...............data of user....................*/
				$scope.aboutme = localStorage['about_me'];
				localStorage.setItem('age', data.result.age);
				$scope.age = localStorage['age'];
				localStorage.setItem('height', data.result.height);
				$scope.height = localStorage['height'];
				localStorage.setItem('weight', data.result.weight);
				$scope.weight = localStorage['weight'];
				localStorage.setItem('contact', data.result.contact);
				$scope.contact = data.result.contact;
				localStorage.setItem('fb_profile', data.result.fb_profile);
				$scope.fb_profile = localStorage['fb_profile'];
				localStorage.setItem('twitter_profile', data.result.twitter_profile);
				$scope.twitter_profile = localStorage['twitter_profile'];
				localStorage.setItem('website', data.result.website);
				$scope.website = localStorage['website'];
				localStorage.setItem('gender', data.result.gender);
				$scope.gender = localStorage['gender'];
				localStorage.setItem('eyes', data.result.eyes);
				$scope.eyes = localStorage['eyes'];
				localStorage.setItem('build', data.result.build);
				$scope.build = localStorage['build'];
				localStorage.setItem('hair_color', data.result.hair_color);
				$scope.hair_color = localStorage['hair_color'];
				localStorage.setItem('ethnicities', data.result.ethnicities);
				$scope.ethnicities = localStorage['ethnicities'];
				localStorage.setItem('sports', data.result.sports);
				$scope.sports = localStorage['sports'];
				localStorage.setItem('roles_tv', data.result.roles_tv);
				$scope.roles_tv = localStorage['roles_tv'];
				localStorage.setItem('roles_movie', data.result.roles_movie);
				$scope.roles_movie = localStorage['roles_movie'];
				localStorage.setItem('ytube', data.result.intro_video.split('=')[1]);
				$scope.ytube = localStorage['ytube'];
				$scope.embededlink = "http://www.youtube.com/embed/" + $scope.ytube + "?autoplay=1";
				console.log($scope.ytube);
				localStorage.setItem('school', data.result_quali.school);
				$scope.school = localStorage['school'];
				localStorage.setItem('passingyr', data.result_quali.passing_year);
				$scope.passing_year = localStorage['passingyr'];
				$state.go('tabsController.auditions');





// ///////////////push notification

//                 $ionicPush.register().then(function(t) {
//                               return $ionicPush.saveToken(t);
//                             }).then(function(t) {
//                               console.log('Token saved:', t.token);
//               });
			} else {
				logfail();
			}

		}).error(function(data, status, header, config, message) {
			$ionicLoading.hide();
		});
	}


	logsuc = function() {
		/*var alertPopup = $ionicPopup.alert({
						  title: 'Alert',
						  template: 'You are already logged in!'
						  });*/
		/*alertPopup.then(function(res) {
						  console.log('user login');
						  });*/
		console.log('login successfull');
	}
	logfail = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Alert',
			template: 'Either Email or Password is incorrect!'
		});
		alertPopup.then(function(res) {
			console.log('User not login');
		});
	}
	$scope.register = function() {
		$state.go('signUp');
	}

	$scope.fpass = function() {
		$state.go('fpass');
	}

})

.controller('fpassCtrl', function($scope, $state, $ionicLoading, $ionicPopup, $http) {

	$scope.getpass = function() {

		$ionicLoading.show({
			template: 'Please Wait...'
		});

		$http({
			method: 'POST',
			url: 'https://destini.io/ws_responder/forgot/password',
			data: {
				'email': $scope.email
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).success(function(data, status, header, config, message) {

			$ionicLoading.hide();
			if (data.response) {
				passis();
				$state.go('login');
			} else {
				passnot();
			}

		}).error(function(data, status, header, config, message) {
			$ionicLoading.hide();

		});
	}

	passis = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Password',
			template: 'Reset your password! Check your registerd email!'
		});
		alertPopup.then(function(res) {
			console.log('link sent!');
		});
	}

	passnot = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Error',
			template: 'You are not registered!'
		});
		alertPopup.then(function(res) {
			console.log('not a user');
		});
	}

})

.controller('signUpCtrl', function($scope, $state, $http, $ionicPopup, $ionicLoading, $cordovaDevice, $ionicPlatform) {

	$ionicPlatform.ready(function() {
		// $scope.device_id = $cordovaDevice.getUUID();
	 //   $scope.device_type = $cordovaDevice.getPlatform();
	});
   $scope.back = function() {
		$state.go('login');
   }
	$scope.backt= function() {
		$state.go('signUp');
	
   }
//  console.log("Device Id" + $scope.device_id);
	console.log($scope.device_id);
	$scope.register = function() {

		$ionicLoading.show({
			template: 'Please Wait...'
		});

		$http({
			method: 'POST',
			url: 'https://destini.io/ws_responder/signup',
			data: {
				'name': $scope.user.name,
				'age': $scope.user.age,
				'contact': $scope.user.contact,
				'email': $scope.user.email,
				'password': $scope.user.pass,
				'device_id': '5445556456985',
				'device_type':'android'
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).success(function(data, status, header, config, message) {

			$ionicLoading.hide();
			if (data.response) {
				regsuc();
				$state.go("login");
			} else {
				regfail();
			}
		}).error(function(data, status, header, config, message) {
			$ionicLoading.hide();
		});
	}

	regsuc = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Alert',
			template: 'Thank you for registering with us. Please check your email for the activation link, and activate your account. Check your junk folders, just incase you haven’t received anything. Please write to care@destini.io for any help.'
		});
		alertPopup.then(function(res) {
			console.log('User Registered');
		});
	};
	regfail = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Alert',
			template: 'You are registered before with this Email Id!'
		});
		alertPopup.then(function(res) {
			console.log('User Not Registered');
		});
	};
})

.controller('auditionsCtrl', function($scope, $rootScope, $http, $stateParams, $ionicLoading, $state, LoadingSpinner) {
	$scope.$on('$ionicView.beforeEnter', function(event, viewData) {
		// console.debug('[StoryController] $ionicView.beforeEnter');
		$http({
			method: 'POST',
			url: 'https://destini.io/ws_sessions/applied/sessions',
			data: {
				'responder_id': localStorage['rId']
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}

		}).success(function(data, status, header, config, message) {
			if (data.response) {
				$scope.AppliedAuditions = data.result;
				console.log(data.result);
			}
			//LoadingSpinner.hide('pageLoading');
		}).error(function(data, status, header, config, message) {
			// LoadingSpinner.hide('pageLoading');
			//dfffds
		});

		viewData.enableBack = false;

		LoadingSpinner.show('pageLoading');
		$http({
			method: 'GET',
			url: 'https://destini.io/ws_sessions/info',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).success(function(data, status, header, config, message) {
			if (data.response) {
				$scope.auditions = data.result;
				$scope.auditions.applied = $scope.AppliedAuditions;
			}
			LoadingSpinner.hide('pageLoading');
		}).error(function(data, status, header, config, message) {
			$ionicLoading.hide();
			LoadingSpinner.hide('pageLoading');
		});
		localStorage['audi'] = $stateParams.auditionId;
		var aud_id = $stateParams.auditionId;
		console.log(aud_id + 'here it is');

	});

	console.log('here' + $scope.res);
	if (localStorage['rId'] != 0) {
		console.log('existing user: ' + localStorage['rId']);

		$http({
			method: 'POST',
			url: 'https://destini.io/ws_responder/login',
			data: {
				'email': localStorage['rEmail'],
				'password': localStorage['rPass']
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).success(function(data, status, header, config, message) {

			$ionicLoading.hide();
			if (data.response) {
				localStorage.setItem('rId', data.result.id);
				console.log('responderid' + localStorage['rId']);
				localStorage.setItem('naam', data.result.name);
				$scope.naam = localStorage['naam'];
				localStorage.setItem('photo', data.result.profile_photo);
				localStorage.setItem('aboutme', data.result.about_me);
				$scope.photo = localStorage['photo'];
				/*...............data of user....................*/
				$scope.aboutme = localStorage['about_me'];
				localStorage.setItem('age', data.result.age);
				$scope.age = localStorage['age'];
				localStorage.setItem('height', data.result.height);
				$scope.height = localStorage['height'];
				localStorage.setItem('weight', data.result.weight);
				$scope.weight = localStorage['weight'];
				localStorage.setItem('contact', data.result.contact);
				$scope.contact = data.result.contact;
				localStorage.setItem('fb_profile', data.result.fb_profile);
				$scope.fb_profile = localStorage['fb_profile'];
				localStorage.setItem('twitter_profile', data.result.twitter_profile);
				$scope.twitter_profile = localStorage['twitter_profile'];
				localStorage.setItem('website', data.result.website);
				$scope.website = localStorage['website'];
				localStorage.setItem('gender', data.result.gender);
				$scope.gender = localStorage['gender'];
				localStorage.setItem('eyes', data.result.eyes);
				$scope.eyes = localStorage['eyes'];
				localStorage.setItem('build', data.result.build);
				$scope.build = localStorage['build'];
				localStorage.setItem('hair_color', data.result.hair_color);
				$scope.hair_color = localStorage['hair_color'];
				localStorage.setItem('ethnicities', data.result.ethnicities);
				$scope.ethnicities = localStorage['ethnicities'];
				localStorage.setItem('sports', data.result.sports);
				$scope.sports = localStorage['sports'];
				localStorage.setItem('roles_tv', data.result.roles_tv);
				$scope.roles_tv = localStorage['roles_tv'];
				localStorage.setItem('roles_movie', data.result.roles_movie);
				$scope.roles_movie = localStorage['roles_movie'];
				localStorage.setItem('ytube', data.result.intro_video.split('=')[1]);
				$scope.ytube = localStorage['ytube'];
				$scope.embededlink = "http://www.youtube.com/embed/" + $scope.ytube + "?autoplay=1";
				console.log($scope.ytube);
				localStorage.setItem('school', data.result_quali.school);
				$scope.school = localStorage['school'];
				localStorage.setItem('passingyr', data.result_quali.passing_year);
				$scope.passing_year = localStorage['passingyr'];
				$scope.passing_year = localStorage['passingyr'];
				console.log('********************');
				console.log(localStorage['naam']);

			} else {

			}

		}).error(function(data, status, header, config, message) {
			LoadingSpinner.hide('pageLoading');
		});
		//$state.go('tabsController.auditions');
		console.log(localStorage['rEmail'], localStorage['rPass']);
		// $scope.login(window.localStorage['rEmail'],window.localStorage['rPass']);
	}
	$scope.open = function() {
		LoadingSpinner.hide('pageLoading');
		$state.go('tabsController.open');
	}

	$scope.invites = function() {
		$state.go('tabsController.invites');
	}

	$scope.pinned = function() {
		$state.go('tabsController.pinned');
	}


	/*$http({
		method: 'POST',
		url: 'http://destini.io/ws_sessions/info',
		data: {
			'id': aud_id
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}

	}).success(function (data, status, header, config, message) {
		if (data.response) {
			$scope.auditions = data.result;
		}
	LoadingSpinner.hide('pageLoading');
	}).error(function (data, status, header, config, message) {
		LoadingSpinner.hide('pageLoading');
		//dfffds
	});*/

	$scope.Audinvites = [];
	/*  $http({
		method: 'POST',
		url: 'http://destini.io/ws_sessions/responder/invitations',
		data: {

	'responder_id': localStorage['rId']        },
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}

	}).success(function (data, status, header, config, message) {
	   
		if (data.response) {
			$scope.Audinvites = data.result;
			console.log($scope.Audinvites)
		}
	LoadingSpinner.hide('pageLoading');
	}).error(function (data, status, header, config, message) {
	   LoadingSpinner.hide('pageLoading');
	});
 */




})

.controller('appliedSessionCtrl', function($scope) {

})

.controller('pinnedCtrl', function($scope, $rootScope, $http, $stateParams, $ionicPopup, $ionicLoading, $state, LoadingSpinner, $ionicPopover) {
		$scope.$on('$ionicView.beforeEnter', function(event, viewData) {

			//console.debug('[StoryController] $ionicView.beforeEnter');


			viewData.enableBack = false;

			LoadingSpinner.show('pageLoading');
			LoadingSpinner.show('pageLoading');

			$http({
				method: 'post',
				url: 'https://destini.io/ws_sessions/pinned/audition',
				data: {
					'responder_id': localStorage['rId']
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).success(function(data, status, header, config, message) {
				if (data.response) {
					$scope.pauditions = data.result;
				}
				LoadingSpinner.hide('pageLoading');
			}).error(function(data, status, header, config, message) {
				LoadingSpinner.hide('pageLoading');
			});

		});

		$scope.open = function() {
			// LoadingSpinner.hide('pageLoading');
			$state.go('tabsController.open');
		}

		$scope.invites = function() {
			$state.go('tabsController.invites');
		}

		$scope.pinned = function() {
			$state.go('tabsController.pinned');
		};

		/*///////////////////////////////////////////////////////////////////   popover  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////
		 */
		var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1></ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

		$scope.popover = $ionicPopover.fromTemplate(template, {
			scope: $scope
		});

		// .fromTemplateUrl() method
		$ionicPopover.fromTemplateUrl('my-popover.html', {
			scope: $scope
		}).then(function(popover) {
			$scope.popover = popover;
		});


		$scope.openPopover = function($event, index) {
			$scope.popover.show($event);
			$scope.index = index;
		};
		$scope.closePopover = function() {
			$scope.popover.hide();
		};
		//Cleanup the popover when we're done with it!
		$scope.$on('$destroy', function() {
			$scope.popover.remove();
		});
		// Execute action on hide popover
		$scope.$on('popover.hidden', function() {
			// Execute action
		});
		// Execute action on remove popover
		$scope.$on('popover.removed', function() {
			// Execute action
		});

		/* //////////////////////////////////////////////////////////////////////////// Unpinned//////////////////////////////////////
		 */
		$scope.unpin = function(index) {


			$ionicLoading.show({
				template: 'Please Wait...'
			});

			$http({
				method: 'POST',
				url: 'https://destini.io/ws_sessions/unpinned/audition',
				data: {
					'responder_id': localStorage['rId'],
					'session_id': $scope.index,

					//'device_id':   '74673',
					// 'device_type': 'android'*/
				},

				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).success(function(data, status, header, config, message) {

				$ionicLoading.hide();
				if (data.response) {
					regsuc();
					$state.go("tabsController.open");
				} else {
					regfail();
				}
			}).error(function(data, status, header, config, message) {
				$ionicLoading.hide();
			});
		}

		regsuc = function() {
			var alertPopup = $ionicPopup.alert({
				title: 'Alert',
				template: 'Removed From Pinned List!!'
			});
			alertPopup.then(function(res) {
				console.log('Unpinned successfully');
			});
		};
		regfail = function() {
			var alertPopup = $ionicPopup.alert({
				title: 'Alert',
				template: "Can't unpinned"
			});
			alertPopup.then(function(res) {
				console.log('not unpinned');
			});
		};
	})
	/*.controller('pinnedCtrl', function ($scope,$rootScope, $http, $stateParams, $ionicLoading, $state,LoadingSpinner) {
	  $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
		
		  console.debug('[StoryController] $ionicView.beforeEnter');
		   
		   
			viewData.enableBack = false;
		  
			LoadingSpinner.show('pageLoading');
			  LoadingSpinner.show('pageLoading');
	  
			$http({
				method: 'post',
				url: 'http://destini.io/ws_sessions/pinned/audition',
		   data: {
				'responder_id': localStorage['rId']
				 },
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).success(function (data, status, header, config, message) {
				if (data.response) {
					$scope.pauditions = data.result;
				}
		  LoadingSpinner.hide('pageLoading');
			}).error(function (data, status, header, config, message) {
				LoadingSpinner.hide('pageLoading');
			});
		
		});
		
	  $scope.open = function () {
		   // LoadingSpinner.hide('pageLoading');
			$state.go('tabsController.open');
		}

		$scope.invites = function () {
		$state.go('tabsController.invites');
		}
	  
		$scope.pinned = function () {
		 $state.go('tabsController.pinned');
		}
	}) */

.controller('invitesCtrl', function($scope, $state, $stateParams, $http, $ionicLoading, $ionicPopup, LoadingSpinner) {

	$scope.$on('$ionicView.beforeEnter', function(event, viewData) {

		console.debug('[StoryController] $ionicView.beforeEnter');
		viewData.enableBack = false;
		LoadingSpinner.show('pageLoading');

		console.log("invitesctrl" + localStorage['rId']);
		var aud_id = localStorage['rId'];
		console.log('Main hu ' + aud_id);
		$scope.Audinvites = [];
		$http({
			method: 'POST',
			url: 'https://destini.io/ws_sessions/responder/invitations',
			data: {
				'responder_id': localStorage['rId']
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}

		}).success(function(data, status, header, config, message) {

			if (data.response) {
				$scope.Audinvites = data.result;
				console.log("Here comes result");
				console.log($scope.Audinvites)
			}
			LoadingSpinner.hide('pageLoading');
		}).error(function(data, status, header, config, message) {
			LoadingSpinner.hide('pageLoading');
		});

	});

	/* $http({
		method: 'POST',
		url: 'http://destini.io/ws_sessions/info',
		data: {
			'id': localStorage['rId']
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}

	}).success(function (data, status, header, config, message) {
		if (data.response) {
			$scope.auditions = data.result;
		}
	LoadingSpinner.hide('pageLoading');
	}).error(function (data, status, header, config, message) {
		LoadingSpinner.hide('pageLoading');
		//dfffds
	}); */

	$scope.open = function() {
		LoadingSpinner.hide('pageLoading');
		$state.go('tabsController.open');
	}



	$scope.pinned = function() {
		//alert('inside this');

		LoadingSpinner.show('pageLoading');
		$state.go('tabsController.pinned');
		$http({
			method: 'post',
			url: 'https://destini.io/ws_sessions/pinned/audition',
			data: {
				'responder_id': localStorage['rId']
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).success(function(data, status, header, config, message) {
			if (data.response) {
				$scope.pauditions = data.result;
			}
			LoadingSpinner.hide('pageLoading');
		}).error(function(data, status, header, config, message) {
			LoadingSpinner.hide('pageLoading');
		});
	}

})

.controller('audition1Ctrl', function($scope, $state,$stateParams, $http, $ionicLoading, $ionicPopup,$ionicActionSheet,$timeout,$cordovaFileTransfer) {
   
   $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
 $http({
			method: 'POST',
			url: 'https://destini.io/ws_sessions/applied/sessions',
			data: {
				'responder_id': localStorage['rId']
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}

		}).success(function(data, status, header, config, message) {
			 $scope.applied=[];
			if (data.response) {
				$scope.AppliedAuditions = data.result;
				console.log($scope.AppliedAuditions);
				angular.forEach($scope.AppliedAuditions, function(k,v){
					console.log(k.id);
					$scope.applied.push(k.id);


				});
				console.log('Balle shava mundia');
				console.log($scope.applied);
				console.log(data.result);
			}
			//LoadingSpinner.hide('pageLoading');
		}).error(function(data, status, header, config, message) {
			// LoadingSpinner.hide('pageLoading');
			//dfffds
		});
	 });
 


   $scope.check = function(aud_id) {
		$ionicLoading.show({
			template: 'Please wali...'
		});
		 



		$http({
			method: 'POST',
			url: 'https://destini.io/ws_responder/response/limit',
			data: {
				'session_id': aud_id,
				

			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}

		}).success(function(data, status, header, config, message) {
			$ionicLoading.hide();
			if (data.message=="Allow responder to respond") {
			   $state.go('tabsController.questions');
			} else {
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title: 'Alert',
					template: ' This audition is not accepting any more responses, Sorry for the inconvenience'
				});
				alertPopup.then(function(res) {
					console.log('Pin Registered');
				});
			}
		}).error(function(data, status, header, config, message) {
			$ionicLoading.hide();
		   
		});
	}

	$scope.savePin = function(aud_id) {
		$ionicLoading.show({
			template: 'Saving your Pin...'
		});
		 



		$http({
			method: 'POST',
			url: 'https://destini.io/ws_sessions/response',
			data: {
				'session_id': aud_id,
				'responder_id': localStorage['rId']

			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}

		}).success(function(data, status, header, config, message) {
			$ionicLoading.hide();
			if (data.response) {
				var alertPopup = $ionicPopup.alert({
					title: 'Success',
					template: 'This audition has been pinned for you.'
				});
				alertPopup.then(function(res) {
					console.log('Pin Registered');
				});
			} else {
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title: 'Already Pinned!',
					template: 'This audition has already been marked as pinned for you.'
				});
				alertPopup.then(function(res) {
					console.log('Pin Registered');
				});
			}
		}).error(function(data, status, header, config, message) {
			$ionicLoading.hide();
		   
		});
	}
	$scope.audid = $stateParams.auditionId;
	console.log($scope.audid);
	localStorage['audi'] = $scope.audid;

	console.log('here it is ' + localStorage['audi']);
	$ionicLoading.show({
		template: 'Loading...'
	});

	var link = 'https://destini.io/ws_sessions/info';
	$http.post(link, {
		session_id: $stateParams.auditionId
	}).success(function(data, status, header, config, message) {
		$ionicLoading.hide();
		$scope.response = data.session_details;
		console.log("Video Needed:" + data.session_details.video_needed);
		localStorage['audi_video'] = data.session_details.video_needed;
		localStorage['duration']=data.session_details.video_length;
		localStorage['audi_image'] = data.session_details.photos_need;
		localStorage['audi_type']=data.session_details.session_type;
		console.log(data.session_details);
		 console.log("AUDITION TYPE"+localStorage['audi_type']);
		$scope.rdetails = data.requester_details;
		$scope.req_id = data.requester_details.id;
		//$scope.globalData.reqid=data.requester_details.id;
	}).error(function(data, status, header, config, message) {

	});



	$scope.show = function(id) {
		var session_id=id;



		 $http({
			method: 'POST',
			url: 'https://destini.io/ws_sessions/documnents/download',
			data: {
				'session_id': session_id
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}

		}).success(function(data, status, header, config, message) {

			if (data.result) {
				$scope.Audinvites = data.result;
				console.log("Here comes result");
				console.log($scope.Audinvites)
				suc($scope.Audinvites);
			}
			else{
			   fail(data.message); 
			}
		   // LoadingSpinner.hide('pageLoading');
		}).error(function(data, status, header, config, message) {
		   // LoadingSpinner.hide('pageLoading');
		});

	

	suc= function(data) {
		console.log('file name'+data);
	   $scope.file=data;
	   console.log('file name with scope'+ $scope.file);

   // Show the action sheet
  var buttons1=[];
  angular.forEach(data, function(k,v){
	console.log("machi");
	console.log(k);
	buttons1.push({ text : '<div class="download-sheet">'+k.name+'</div>' });
  });
  console.log(buttons1);
   var hideSheet = $ionicActionSheet.show({
	 buttons: buttons1,
	// destructiveText: 'Delete',
	 titleText: 'Download Document',
	 cancelText: 'Cancel',
	 cancel: function() {
		  // add cancel code..
		},
	buttonClicked: function(index) {
								   var file=data[index].name;
							   
								//  console.log('chod wali index'+file);


								var url = "https://destini.io/public/frontEnd/uploads/documents/"+file;
								var filename = url.split("/").pop();
								//alert(filename);
								var targetPath = cordova.file.externalRootDirectory + filename;
								var trustHosts = true;
								var options = {};
								 var alertPopup = $ionicPopup.alert({
											title: 'Success',
											template: 'Documents will be downloaded at location: '+cordova.file.externalRootDirectory
										});
										alertPopup.then(function(res) {
											$cordovaFileTransfer.download(url, targetPath, options, trustHosts)
								.then(function(result) {
								// Success!
									 if(result){
										 $ionicLoading.hide();
									 }

								  var alertPopup = $ionicPopup.alert({
											title: 'Success',
											template: 'Document download successfully.'
										});
										alertPopup.then(function(res) {
										   
											console.log('Pin Registered');
										});
								// alert(JSON.stringify(result));
								 
								 console.log(JSON.stringify(result));
								
								}, function(error) {
								// Error
								alert(JSON.stringify(error));
								console.log(JSON.stringify(error));
								}, function (progress) {
								var downloadProgress =(progress.loaded / progress.total) * 100;
								console.log('downloadProgress'+downloadProgress);
								$ionicLoading.show({
								//template: "downloading "+(downloadProgress)+"%"
								template: "downloading "+Math.ceil(downloadProgress)+"%"
								});
								});
							   
											
										});
							   // alert('Documents will be downloaded at location: '+cordova.file.externalRootDirectory);

								// alert(cordova.file.externalRootDirectory);
								
	 
	}
	 
   });
	
   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
	 hideSheet();
   }, 30000);

 };





 fail= function(msg) {
	var msg=msg;

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
	 buttons: [
	  
	   { text: '<div class="download-sheet">No session document to download</div>' }
	  
	 ],
	// destructiveText: 'Delete',
	 titleText: 'Download Document',
	 cancelText: 'Cancel',
	 cancel: function() {
		  // add cancel code..
		},
	 buttonClicked: function(index) {
	   
	   return true;
	 }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
	 hideSheet();
   }, 2000);

 };
}

})

.controller('mediaUploadCtrl', function($http, $scope, $cordovaCapture, $cordovaFileTransfer, $state, $ionicPopup, $ionicLoading, $stateParams) {
	 $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
	 //    if(parseInt(localStorage['audi_video'])==0){
	 //     mark_applied();
	 //     $state.go('tabsController.mediaUpload2');
	 // }else{
		  console.log("audition_type"+localStorage['audi_type']);
		$scope.num_video = localStorage['audi_video'];
		$scope.num_image = localStorage['audi_image'];
		var  video=parseInt(localStorage['duration']);
		console.log("video length"+video);
		console.log("video length"+localStorage['duration']);
   // }
	});

	$scope.nextupload=function(){
			   console.log("audition_type next"+localStorage['audi_type']);
		  if (localStorage['audi_type']=='video' || localStorage['audi_type']=='videos'|| localStorage['audi_type']=='Video' || localStorage['audi_type']=='VIDEO' ) {
							 $state.go('tabsController.addDocuments');
						   // $state.go('tabsController.mediaUpload2');

						} else {
							// mark_applied();
							// var alertPopup = $ionicPopup.alert({
							//     title: 'Success!',
							//     template: 'Thankyou for your application!'
							// });
							// alertPopup.then(function(res) {
								 $state.go('tabsController.mediaUpload2');
								//$state.go('tabsController.addDocuments');

							 }
						}


	


	console.log('Videos Needed:' + localStorage['audi_video']);
	console.log('Images Needed:' + localStorage['audi_image']);

	console.log('video length'+localStorage['duration']);
   $http({
				method: 'POST',
				url: 'https://destini.io/ws_responder/videoCount',
				data: {
					'session_id': localStorage['audi'],
					'responder_id': localStorage['rId']
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}

			}).success(function(data, status, header, config, message) {
				$ionicLoading.hide();
				console.log(JSON.stringify(data));
		localStorage['vCount']=data.data;
		console.log('Balle shava video '+data.data+' party kha k kisko');
		}).error(function(data, status, header, config, message) {
				console.log(data);

			});
   

	function callback1() {
		alert('done video');
	}
	localStorage['counter'] = 0;
	$scope.captureVideo = function() {

		var options1 = {
			limit: 1,
			popoverOptions: CameraPopoverOptions,
			duration:60*parseInt(localStorage['duration']),
		};
		$cordovaCapture.captureVideo(options1).then(function(videoData) {

			var i, path = [],
				len;
			//console.log(videoData);
			for (i = 0, len = videoData.length; i < len; i += 1) {
				path.push(videoData[i].fullPath);
			}
			localStorage['video_path'] = path;
			$scope.videos = path;
			console.log(path);
			for (i = 0, len = path.length; i < len; i += 1) {
				var url = encodeURI("https://destini.io/ws_sessions/audition/video/post");
				var filename = localStorage['rId'] + '_' + localStorage['audi'];
				var fileUrl = path[i];
				var options = {
					fileKey: "res_sess",
					fileName: filename,
					httpMethod: 'POST',
					trustAllHosts: true,
					chunkedMode: false,
					mimeType: "video/mpeg",
				};
				//var headers = {'headerParam':'headerValue'};
				// options.headers = headers;
				options.headers = {
					Connection: "close"
				};
				var fileTransfer = new FileTransfer();
				console.log('All the files are:');
				console.log(fileUrl);
				$cordovaFileTransfer.upload(url, fileUrl, options, true).then(function(result) {
					console.log("SUCCESS: " + JSON.stringify(result.response));
					$ionicLoading.hide();
					console.log('Message:' + JSON.stringify(angular.fromJson(result.response).message));
					console.log('Submitted Videos:' + (parseInt(JSON.stringify(angular.fromJson(result.response).submitted)) + parseInt(1)));
					if ((parseInt(JSON.stringify(angular.fromJson(result.response).submitted)) + parseInt(1)) < parseInt(localStorage['audi_video'])) {

						console.log('Counter' + localStorage['counter']);
						console.log('Videos' + localStorage['audi_video']);
						var alertPopup = $ionicPopup.confirm({
							title: 'Confirmation!',
							template: "We 've  received your " + (parseInt(JSON.stringify(angular.fromJson(result.response).submitted)) + parseInt(1)) + " Videos. Click OK if you are ready for the next video?"
						});
						alertPopup.then(function(res) {
							if (res) {
								console.log("Previously Submitted:" + (parseInt(JSON.stringify(angular.fromJson(result.response).submitted)) + parseInt(1)));
								console.log('Counter' + localStorage['counter']);
								console.log('Videos' + localStorage['audi_video']);
								$scope.captureVideo();
							} else {


							 if(localStorage['audi_type']=='video' || localStorage['audi_type']=='videos'|| localStorage['audi_type']=='Video' || localStorage['audi_type']=='VIDEO' )
								   {
										$state.go('tabsController.addDocuments');
								   }else{
									$state.go('tabsController.mediaUpload2');
								   }    
							}
						});
					} else {
						if (localStorage['audi_type']=='video' || localStorage['audi_type']=='videos'|| localStorage['audi_type']=='Video' || localStorage['audi_type']=='VIDEO' ) {
							  var alertPopup = $ionicPopup.alert({
								title: 'Success!',
								template: 'Thankyou for your application!'
							});
							alertPopup.then(function(res) {

								$state.go('tabsController.addDocuments');

							});
						   
						} else {
						   mark_applied();
							$state.go('tabsController.mediaUpload2');

							
						}
					}
					// alert(JSON.stringify(result.response));
				}, function(err) {
					console.log("ERROR: " + JSON.stringify(err));
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
						title: 'Connection Error!',
						template: 'Please try again later!'
					});
					alertPopup.then(function(res) {
						// if (localStorage['audi_type']!='video' || localStorage['audi_type']!='videos'|| localStorage['audi_type']!='Video' || localStorage['audi_type']!='VIDEO' ) {

						//     $state.go('tabsController.mediaUpload2');
						// } else {
						//     $ionicHistory.goBack();
						// }
					});
				}, function(progress) {
					var progress_status = (progress.loaded / progress.total) * 100;
					$ionicLoading.show({
						template: "Uploading " + Math.floor(progress_status) + "%......"
					});
				});
			}
			// if(localStorage['audi_image']!=0){
			if (0) {
				var alertPopup = $ionicPopup.alert({
					title: 'Success!',
					template: 'Upload Your ' + localStorage['audi_image'] + ' images.'
				});
				alertPopup.then(function(res) {

					$state.go('tabsController.mediaUpload2');

				});
			}
			/*else{
						mark_applied();
					  var alertPopup = $ionicPopup.alert({
								title: 'Success!',
								template: 'Thankyou for your application!'
							});
							alertPopup.then(function (res) {
					  
							   $state.go('tabsController.open');
					 
							});
					}*/
		});

	};

	function mark_applied() {
		$http({
			method: 'POST',
			url: 'https://destini.io/ws_sessions/responder/application',
			data: {
				'session_id': localStorage['audi'],
				'responder_id': localStorage['rId']
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}

		}).success(function(data, status, header, config, message) {
			console.log(JSON.stringify(data));
			//$ionicLoading.hide();

			if (data) {
				console.log('Applied');
			}
		}).error(function(data, status, header, config, message) {
			console.log(data);

		});
	}


	console.log("Videos are");
	console.log($scope.videos);
})

.controller('mediaUpload2Ctrl', function($scope, $http, $cordovaImagePicker, $ionicPopup, $state, $ionicLoading, $cordovaCamera, Camera, $ionicPopover) {
	$scope.$on('$ionicView.beforeEnter', function(event, viewData) {
  if(parseInt(localStorage['audi_image'])==0){
		 mark_applied();
					var alertPopup = $ionicPopup.alert({
						title: 'Application Submitted!',
						template: 'Upload Completed.  Continue to the next step.'
					});
					alertPopup.then(function(res) {

						$state.go('tabsController.addDocuments');
					});
		}
	localStorage['iCount']=0;
	console.log('herereeeeeeeeeee');
		  $http({
				method: 'POST',
				url: 'https://destini.io/ws_responder/imageCount',
				data: {
					'session_id': localStorage['audi'],
					'responder_id': localStorage['rId']
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}

			}).success(function(data, status, header, config, message) {
				$ionicLoading.hide();
				console.log(JSON.stringify(data));
		localStorage['iCount']=data.data;
		
		}).error(function(data, status, header, config, message) {
				console.log(data);

			});
		console.debug('[StoryController] $ionicView.beforeEnter');
		$scope.captureVideo = function() {
			alert('hey there');
			//PostAudition.setAuditionData(localStorage.getItem('audition_id'),"gagan",20,"SAD","dsaf",1,'9988878787');

			var options = {};
			$cordovaCapture.captureVideo(options).then(function(videoData) {
				var i, path, len;
				for (i = 0, len = videoData.length; i < len; i += 1) {
					path = videoData[i].fullPath;
				}
				//alert(JSON.stringify(videoData));
				var url = encodeURI("https://europa.promaticstechnologies.com/fileupload/upload.php");
				var filename = path.split("/").pop();
				var fileUrl = path;
				var options = {
					fileKey: "my_video",
					fileName: filename,
					httpMethod: 'POST',
					trustAllHosts: true,
					chunkedMode: false,
					mimeType: "video/mpeg",
				};

				options.headers = {
					Connection: "close"
				};

				var fileTransfer = new FileTransfer();
				$cordovaFileTransfer.upload(url, fileUrl, options, true).then(function(result) {
					console.log("SUCCESS: " + JSON.stringify(result.response));
					alert("success");
					$scope.input.url = 'https://europa.promaticstechnologies.com/fileupload/uploaddata/' + filename;
					alert(JSON.stringify($scope.input));
					PostAudition.setAuditionData(localStorage.getItem('audition_id'), $scope.input.firstName, $scope.input.lastName, $scope.input.age, $scope.input.email, $scope.input.phone, $scope.input.url);
					alert('Response Saved Sucessfully!');
					alert(localStorage.getItem('audition_id') + $scope.input.firstName + $scope.input.lastName + $scope.input.age + $scope.input.email + $scope.input.phone + $scope.input.url);

					$ionicLoading.hide();
					alert(JSON.stringify(result.response));
				}, function(err) {
					console.log("ERROR: " + JSON.stringify(err));
					$ionicLoading.hide();
					alert('ERROR:' + JSON.stringify(err));
				}, function(progress) {
					var progress_status = (progress.loaded / progress.total) * 100;
					$ionicLoading.show({
						template: "Uploading " + filename + "......"
					});
				});
			});
		};

		var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1></ion-header-bar> <ion-content > Hello! </ion-content></ion-popover-view>';

		$scope.popover = $ionicPopover.fromTemplate(template, {
			scope: $scope
		});

		// .fromTemplateUrl() method
		$ionicPopover.fromTemplateUrl('my-popover.html', {
			scope: $scope
		}).then(function(popover) {
			$scope.popover = popover;

		});


		$scope.openPopover = function($event) {
			$scope.popover.show($event);
			//$scope.index=index;


		};
		$scope.closePopover = function() {
			$scope.popover.hide();
		};
		//Cleanup the popover when we're done with it!
		$scope.$on('$destroy', function() {
			$scope.popover.remove();
		});
		// Execute action on hide popover
		$scope.$on('popover.hidden', function() {
			// Execute action
		});
		// Execute action on remove popover
		$scope.$on('popover.removed', function() {
			// Execute action
		});




	 
		$scope.pickimages = function() {
			$scope.popover.hide();
			$scope.collection = {
				selectedImage: ''
			};
			console.log('Inside Pick Images' + localStorage['audi_image']);
			$scope.items = [];
			var options = {
				maximumImagesCount: localStorage['audi_image'],
				width: 800,
				height: 800,
				quality: 80
			};


		   
			$cordovaCamera.getPicture(options).then(function(imageData) {

				$scope.collection.selectedImage = imageData;
				uploadPhoto(imageData);
				if (parseInt(localStorage['iCount']) <= parseInt(localStorage['audi_image'])) {} else {
					mark_applied();
					var alertPopup = $ionicPopup.alert({
						title: 'Application Submitted!',
						template: 'Upload Completed.  Continue to the next step.'
					});
					alertPopup.then(function(res) {

						$state.go('tabsController.addDocuments');
					});
				}
				//       console.log('Image URI: ' + results[i]);


			}, function(error) {
				// error getting photos
			});


		}

		function uploadPhoto(imageURI) {
			$ionicLoading.show({
				template: "Submitting Your Response..."
			});

			function win(r) {
				  $http({
				method: 'POST',
				url: 'https://destini.io/ws_responder/imageCount',
				data: {
					'session_id': localStorage['audi'],
					'responder_id': localStorage['rId']
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}

			}).success(function(data, status, header, config, message) {
				$ionicLoading.hide();
				console.log(JSON.stringify(data));
		localStorage['iCount']=data.data;
		console.log('Balle shava mitro '+data.data+' party kha k kisko');
				  if (angular.fromJson(r.response)['message'] == "image upload limit as defined") {
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
						title: 'Image Already Submitted',
						template: 'We have already received defined number of image(s) i.e ' + localStorage['audi_image'] + ' for this audition'
					});
					alertPopup.then(function(res) {
						$state.go('tabsController.addDocuments');
					});
		  
				} else {

					$ionicLoading.hide();
				  
		if(parseInt(localStorage['iCount']) >= parseInt(localStorage['audi_image'])){
		 mark_applied();
							var alertPopup = $ionicPopup.alert({
								title: 'Application Submitted!',
								template: 'Upload Completed.  Continue to the next step.'
							});
							alertPopup.then(function(res) {

								$state.go('tabsController.addDocuments');
							});
		}else{
					var alertPopup = $ionicPopup.confirm({
						title: 'Confirmation!',
						template: ". Click OK if you are ready for the next image ?"
					});
					alertPopup.then(function(res) {
						if (res) {
							$scope.pickimages();
						} else {
							mark_applied();
							var alertPopup = $ionicPopup.alert({
								title: 'Application Submitted!',
								template: 'Upload Completed.  Continue to the next step.'
							});
							alertPopup.then(function(res) {

								$state.go('tabsController.addDocuments');
							});
						};
					})
			}
				}
				console.log("Sent = " + r.bytesSent);
		}).error(function(data, status, header, config, message) {
				console.log(data);
 console.log("Code = " + r.responseCode);
				console.log("Response = " + angular.fromJson(r.response)['message']);
	  
			});
			   
			}

			function fail(r) {
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title: 'Network Error!',
					template: 'A network error occurred. Please try again later'
				});
				alertPopup.then(function(res) {
					$state.go('tabsController.open');
				});
				console.log(JSON.stringify(r));
			}
			var options = new FileUploadOptions();
			options.fileKey = "res_sess";
			options.fileName = localStorage['rId'] + '_' + localStorage['audi'];
			//imageURI.substr(imageURI.lastIndexOf('/')+1);
			options.mimeType = "image/jpeg";

			var params = new Object();
			params.value1 = "test";
			params.value2 = "param";

			options.params = params;

			var ft = new FileTransfer();
			ft.onprogress = function(progressEvent) {
				if (progressEvent.lengthComputable) {
					// loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
				} else {
					//loadingStatus.increment();
				}
			};
			ft.upload(imageURI, encodeURI("https://destini.io/ws_sessions/audition/image/post"), win, fail, options);


		}


		function mark_applied() {
			$http({
				method: 'POST',
				url: 'https://destini.io/ws_sessions/responder/application',
				data: {
					'session_id': localStorage['audi'],
					'responder_id': localStorage['rId']
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}

			}).success(function(data, status, header, config, message) {
				console.log(JSON.stringify(data));
				//$ionicLoading.hide();

				if (data) {
					console.log(data);
				}
			}).error(function(data, status, header, config, message) {
				console.log(data);

			});
		}


		$scope.pickimagegallery = function() {
			$scope.popover.hide();
			$scope.collection = {
				selectedImage: ''
			};
			console.log('Inside Pick Images ' + localStorage['audi_image']);
			$scope.items = [];
			var options = {
				maximumImagesCount: parseInt(localStorage['audi_image'])-parseInt(localStorage['iCount']),
				width: 800,
				height: 800,
				quality: 80
			};
console.log(parseInt(localStorage['audi_image'])-parseInt(localStorage['iCount']));
			$cordovaImagePicker.getPictures(options)
				.then(function(results) {
					for (var i = 0; i < results.length; i++) {
						$scope.collection.selectedImage = results[i];

						uploadPhotos(results[i]);
						console.log('Image URI: ' + results[i]);
					}

				}, function(error) {
					// error getting photos
				});

		}

		function uploadPhotos(imageURI) {
			$ionicLoading.show({
				template: "Submitting Your Response..."
			});

			function win(r) {


				console.log("Code = " + r.responseCode);
				console.log("Response = " + r.response);
				if (r.response == "image upload limit as defined") {
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
						title: 'Image Already Submitted',
						template: 'We have already received defined number of image(s) i.e ' + localStorage['audi_image'] + ' for this audition'
					});
					alertPopup.then(function(res) {
						$ionicHistory.goBack();
					});
				}
				$ionicLoading.hide();
				mark_applieds();
				$state.go('tabsController.addDocuments');



				console.log("Sent = " + r.bytesSent);
			}

			function fail(r) {
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title: 'Network Error!',
					template: 'A network error occurred. Please try again later'
				});
				alertPopup.then(function(res) {
					$state.go('tabsController.open');
				});
				console.log(JSON.stringify(r));
			}
			var options = new FileUploadOptions();
			options.fileKey = "res_sess";
			options.fileName = localStorage['rId'] + '_' + localStorage['audi'];
			//imageURI.substr(imageURI.lastIndexOf('/')+1);
			options.mimeType = "image/jpeg";

			var params = new Object();
			params.value1 = "test";
			params.value2 = "param";

			options.params = params;

			var ft = new FileTransfer();
			ft.onprogress = function(progressEvent) {
				if (progressEvent.lengthComputable) {
					// loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
				} else {
					//loadingStatus.increment();
				}
			};
			ft.upload(imageURI, encodeURI("https://destini.io/ws_sessions/audition/image/post"), win, fail, options);


		}

		function mark_applieds() {
			$http({
				method: 'POST',
				url: 'https://destini.io/ws_sessions/responder/application',
				data: {
					'session_id': localStorage['audi'],
					'responder_id': localStorage['rId']
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}

			}).success(function(data, status, header, config, message) {
				console.log(JSON.stringify(data));
				//$ionicLoading.hide();

				if (data) {
					console.log(data);
				}
			}).error(function(data, status, header, config, message) {
				console.log(data);

			});
		}

	});

})

.controller('addDocumentsCtrl', function($scope, $state, $http, $cordovaFileTransfer, $ionicLoading, $ionicPopup) {
	var res_id = localStorage['rId'];
	var audi_id = localStorage['audi'];
	$scope.showValue = function() {
		// fileChooser.open(function(uri) {

		// 	$scope.btn_val = uri;
		// 	var filetype=uri.split(".").pop();
		// 	console.log('file_type'+filetype);
		// 	uploadFile(uri, res_id, audi_id);
		// });
	}
     
	function uploadFile(uri, audi_id, res_id) {
		alert('hhhs'+file);
		// console.log('uri'+uri);
		// var url = encodeURI("https://destini.io/ws_sessions/responder/file");
		// var params = new Object();
		// params.responder_id = res_id;
		// params.session_id = audi_id;
		// var filename = uri.split("/").pop();
		// filename = res_id + '_' + audi_id + "." + filename.split(".").pop();
		// var fileUrl = uri;
		// var options = {
		// 	fileKey: "file",
		// 	fileName: filename,
		// 	httpMethod: 'POST',
		// 	trustAllHosts: true,
		// 	chunkedMode: false,
		// 	params: params,
		// 	mimeType: 'Application/' + filename.split(".").pop()

		// };
		// options.headers = {
		// 	Connection: "close"
		// };
		// $cordovaFileTransfer.upload(url, fileUrl, options, true).then(function(result) {
		// 	result = angular.fromJson(angular.fromJson(result));
		// 	console.log("SUCCESS: " + result.response['message']);
		// 	console.log("videoname " + result.response.result);
		// 	console.log("result " + JSON.stringify(result));
		// 	$ionicLoading.hide();
		// 	var alertPopup = $ionicPopup.alert({
		// 		title: 'Success!',
		// 		template: "Document Uploaded Successfully!"
		// 	});
		// 	alertPopup.then(function(res) {

		// 		$state.go('tabsController.submissionConfirmation');
		// 	});


		// }, function(err) {
		// 	$ionicLoading.hide();
		// 	var alertPopup = $ionicPopup.alert({
		// 		title: 'Error!',
		// 		template: "Network Error Occurred. Try again later!"
		// 	});
		// 	alertPopup.then(function(err) {
		// 		console.log(err);
		// 	});
		// }, function(progress) {
		// 	var progress_status = (progress.loaded / progress.total) * 100;
		// 	$ionicLoading.show({
		// 		template: "Uploading Your Document..."
		// 	});
		// });

	}

})

.controller('submissionConfirmationCtrl', function($scope) {

})

.controller('profileCtrl', function($scope, $http, $ionicHistory, $state,$ionicLoading) {

	$scope.$on('$ionicView.beforeEnter', function(event, viewData) {

		 $ionicLoading.show({
				template: "Please wait..."
			});

		viewData.enableBack = false;
		get_details();
		$scope.name = localStorage['naam'];
		console.log('here you go:' + localStorage['naam']);
		$scope.picture = localStorage['photo'];
		$scope.aboutme = localStorage['aboutme'];
		if ($scope.picture == '' ||$scope.picture =='null') {
			$scope.picture = "https://destini.io/public/frontEnd/uploads/image/1.png";
		} else {

			$http({
				method: 'POST',
				url: 'https://destini.io/ws_responder/multimedia/get',
				data: {
					'responder_id': localStorage['rId']
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).success(function(data, status, header, config, message) {
				if (data.response) {
					console.log('responderid' + localStorage['rId']);
					$scope.photo = localStorage['photo'];
					//$scope.globalData.embededlink=data.result;
					$scope.picture = "https://destini.io/public/frontEnd/uploads/image/" + $scope.photo;
					// console.log($scope.ytube);
					console.log(data.result);

				} else {

				}

			}).error(function(data, status, header, config, message) {

			});

		}
	

	function get_details() {

		$http({
			method: 'POST',
			url: 'https://destini.io/ws_responder/responder/detail',
			data: {

				'responder_id': localStorage['rId'],

			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).success(function(data, status, header, config, message) {


			if (data.response) {
				localStorage.setItem('naam', data.result.name);
				$scope.naam = localStorage['naam'];
				localStorage.setItem('auth', "true");

				localStorage.setItem('photo', data.result.profile_photo);
				localStorage.setItem('aboutme', data.result.about_me);
				$scope.photo = localStorage['photo'];
				/*...............data of user....................*/
				$scope.aboutme = localStorage['about_me'];
				localStorage.setItem('age', data.result.age);
				$scope.age = localStorage['age'];
				localStorage.setItem('height', data.result.height);
				$scope.height = localStorage['height'];
				localStorage.setItem('weight', data.result.weight);
				$scope.weight = localStorage['weight'];
				localStorage.setItem('contact', data.result.contact);
				localStorage.setItem('location', data.result.location);
				$scope.contact = data.result.contact;
				localStorage.setItem('fb_profile', data.result.fb_profile);
				$scope.fb_profile = localStorage['fb_profile'];
				localStorage.setItem('twitter_profile', data.result.twitter_profile);
				$scope.twitter_profile = localStorage['twitter_profile'];
				localStorage.setItem('website', data.result.website);
				$scope.website = localStorage['website'];
				localStorage.setItem('gender', data.result.gender);
				$scope.gender = localStorage['gender'];
				localStorage.setItem('eyes', data.result.eyes);
				$scope.eyes = localStorage['eyes'];
				localStorage.setItem('build', data.result.build);
				$scope.build = localStorage['build'];
				localStorage.setItem('hair_color', data.result.hair_color);
				$scope.hair_color = localStorage['hair_color'];
				localStorage.setItem('ethnicities', data.result.ethnicities);
				$scope.ethnicities = localStorage['ethnicities'];
				localStorage.setItem('sports', data.result.sports);
				$scope.sports = localStorage['sports'];
				localStorage.setItem('roles_tv', data.result.roles_tv);
				$scope.roles_tv = localStorage['roles_tv'];
				localStorage.setItem('roles_movie', data.result.roles_movie);
				$scope.roles_movie = localStorage['roles_movie'];
				localStorage.setItem('ytube', data.result.intro_video.split('=')[1]);
				$scope.ytube = localStorage['ytube'];
				$scope.embededlink = "http://www.youtube.com/embed/" + $scope.ytube + "?autoplay=1";
				console.log($scope.ytube);
				localStorage.setItem('school',data.result.school);
				$scope.school = localStorage['school'];
				localStorage.setItem('passingyr',data.result.passing_year);
				$scope.passing_year = localStorage['passingyr'];
				$ionicLoading.hide();

			}

		}).error(function(data, status, header, config, message) {
			console.log("error");
			$ionicLoading.hide();
		});
	}
	});
	console.log(localStorage['photo']);
	$scope.logout = function() {
		window.localStorage.clear();
		$ionicHistory.clearCache();
		$ionicHistory.clearHistory();
		localStorage['rId'] = 0;
		localStorage.setItem('auth', "false");
		$state.go('login');
	}


 $scope.fbopen=function(){
	console.log('fb'+localStorage['fb_profile']);

	 if(localStorage["fb_profile"].indexOf("http")!=-1){
	 // alert('sundar ladka');
	 window.open(localStorage["fb_profile"], '_blank', 'location=yes'); 
	}else{
		  window.open('http://'+google.com, '_blank', 'location=yes');  
	}

 }
})

.controller('profileDetailsCtrl', function($scope,$http,$ionicLoading,$ionicPopup) {
	$scope.$on('$ionicView.beforeEnter', function(event, viewData) {

		   $ionicLoading.show({
			template: 'Please Wait!...'
		});
	if (localStorage.getItem('photo') == 'null'|| localStorage.getItem('photo') ==null ||localStorage.getItem('photo') =='') {
		$scope.picture = "https://destini.io/public/frontEnd/uploads/image/1.png";
	} else {
		$scope.picture = "https://destini.io/public/frontEnd/uploads/image/" + localStorage.getItem('photo');
	}

	  $http({
			method: 'POST',
			url: 'https://destini.io/ws_responder/responder/detail',
			data: {

				'responder_id': localStorage['rId'],

			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
			}).success(function(data, status, header, config, message) {
				 $ionicLoading.hide();
				if (data) {
					$scope.details_profile=data.result;
					// console.log($scope.ytube);
					console.log("gsgdsdhwsdhjdssdcs"+JSON.stringify(data.result));

				} else {

				}

			}).error(function(data, status, header, config, message) {
				$ionicLoading.hide();
				
			});

	  });
	 $scope.save = function() {
		console.log("in save button");
		$ionicLoading.show({
			template: 'saving!...'
		});


		$http({
			method: 'POST',
			url: 'https://destini.io/ws_responder/save/basic/detail',
			data: {

				'responder_id': localStorage['rId'],
				'height': $scope.details_profile.height,
				'weight': $scope.details_profile.weight,
				'gender': $scope.details_profile.gender,
				'age': $scope.details_profile.age,
			   // 'name':' ',
				// 'fb_profile': $scope.fbprofile,
				// 'twitter_profile': $scope.twitterprofile,
				// 'website': $scope.website,
				
				// 'build': $scope.build,
				// 'eyes': $scope.eyes,
				
				// 'hair_color': $scope.hcolor,
				// 'ethnicities': $scope.ethnicities,
				// 'sports': $scope.sports,
				// 'roles_movie': $scope.roles_movie,
				// 'roles_tv': $scope.roles_tv,
				// 'school': $scope.school,
				// 'passing_year': $scope.passingyr
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).success(function(data, status, header, config, message) {
			console.log($scope.rolet);
			localStorage.setItem('naam', $scope.name);
			localStorage.setItem('about_me', $scope.aboutme);


			$ionicLoading.hide();
			if (data.response) {
			 savedsuc();
				$scope.responderid = data.result.id;
				$scope.naam = data.result.name;
				console.log($scope.naam);
				

			} else {
				savedfail();
			}

		}).error(function(data, status, header, config, message) {
			$ionicLoading.hide();
			//dfffds
		});
	}



	savedsuc = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Alert',
			template: 'Successfully Saved!'
		});
		alertPopup.then(function(res) {
			console.log('Edited Data saved');
		});
	}
	savedfail = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Alert',
			template: 'Not Saved!'
		});
		alertPopup.then(function(res) {
			console.log('Not saved data');
		});
	}
})

.controller('requesterDetailsCtrl', function($scope, $http, $stateParams, $ionicLoading, $ionicPopup, $state, $cordovaFileTransfer, $cordovaContacts) {

	console.log($stateParams);
	$ionicLoading.show({
		template: 'Loading...'
	});

	$http({
		method: 'POST',
		url: 'https://destini.io/ws_sessions/requester/info',
		data: {
			'requester_id': $stateParams.id
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}

	}).success(function(data, status, header, config, message) {
		$ionicLoading.hide();
		if (data.response) {
			$scope.rdet = data.result;
			console.log($scope.rdet);
			console.log($scope.rdet.first_name);
			$state.go('tabsController.requesterDetails')
			$scope.contactForm = {

				"displayName": $scope.rdet.first_name,
				"name": {
					"givenName": $scope.rdet.first_name,
					"formatted": $scope.rdet.last_name
				},
				"nickname": $scope.rdet.first_name,
				"phoneNumbers": [{
					"value": $scope.rdet.contact,
					"type": "mobile"
				}],
				"emails": [{
					"value": $scope.rdet.email,
					"type": "Office"
				}],
				"addresses": [{
					"type": "Office",
					"streetAddress": $scope.rdet.zipcode
				}],
				"ims": null,
				"organizations": null,
				"birthday": null,
				"note": "",
				"photos": null,
				"categories": null,
				"urls": null
			}
		}
	}).error(function(data, status, header, config, message) {
		$ionicLoading.hide();
		//dfffds
	});


	$scope.addContact = function() {
		$cordovaContacts.save($scope.contactForm).then(function(result) {

			console.log(JSON.stringify(result));
			contactsave();
		}, function(error) {
			console.log(error);
		});
	}

	contactsave = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Alert',
			template: 'Contact Saved!'
		});
		alertPopup.then(function(res) {
			console.log('contact saved!');
		});
	}

})

.controller('questionsCtrl', function($scope, $http, $stateParams, $state, $ionicPopup, $ionicHistory, $ionicLoading) {
	/*** sending marked answers to server ***/
	 $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
	$scope.num_video = localStorage['audi_video'];
	$scope.num_image = localStorage['audi_image'];
	console.log('type in question'+localStorage['audi_type']);
})
	$scope.answerss = {};
	$scope.reply = {};
	//$scope.que.answer="here"; 
	var questions_lcl = [];

	  $scope.skipques=function(){
		console.log('type in question'+localStorage['audi_type']);

		// if (localStorage['audi_type']=='none' || localStorage['audi_type']=='None' || localStorage['audi_type']=='NONE') 
	   //                  {
	   //                         // mark_applied();
	   //                          var alertPopup = $ionicPopup.alert({
	   //                          title: 'Success!',
	   //                          template: 'Thank you for your interest in this Audition!'
	   //                          });
	   //                          alertPopup.then(function(res) {
	   //                          $state.go('tabsController.addDocuments');
	   //                          //$ionicHistory.goBack();
	   //                          });

	   //                  } 

	   if(localStorage['audi_type']=='image' || localStorage['audi_type']=='PHOTO'|| localStorage['audi_type']=='Photo' || localStorage['audi_type']=='image' || localStorage['audi_type']=='Image'|| localStorage['audi_type']=='IMAGE')
						{
								$state.go('tabsController.mediaUpload2');
						}
		 else{
								var alertPopup = $ionicPopup.alert({
								title: 'Information',
								template: 'We need your ' + localStorage['audi_video'] + ' (Maximum) Videos. Click on Record Videos to proceed.'
								});
								alertPopup.then(function(res) {
								console.log('contact saved!');
								});
								$state.go('tabsController.mediaUpload');
						  }

	  }



	$scope.markQues = function() {
		$ionicLoading.show({
			template: 'Submitting Your Answers...'
		});

		console.log($scope.reply);
		$http({
			method: 'POST',
			url: 'https://destini.io/ws_sessions/session/answers',
			data: {
				'answer': $scope.reply,
				'responder_id': localStorage['rId']
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}

		}).success(function(data, status, header, config, message) {
			console.log(JSON.stringify(data));
			$ionicLoading.hide();
			mark_applied();
			if (data) {
						if (localStorage['audi_type']=='none' || localStorage['audi_type']=='None' || localStorage['audi_type']=='NONE') 
						{
							   mark_applied();
								var alertPopup = $ionicPopup.alert({
								title: 'Success!',
								template: 'Thank you for your interest in this Audition!'
								});
								alertPopup.then(function(res) {
								$state.go('tabsController.addDocuments');
								//$ionicHistory.goBack();
								});

						} 

					 else if(localStorage['audi_type']=='photo' || localStorage['audi_type']=='PHOTO'|| localStorage['audi_type']=='Photo' || localStorage['audi_type']=='image' || localStorage['audi_type']=='Image'|| localStorage['audi_type']=='IMAGE')
						{
								$state.go('tabsController.mediaUpload2');
						}
						else{
								var alertPopup = $ionicPopup.alert({
								title: 'Information',
								template: 'We need your ' + localStorage['audi_video'] + ' (Maximum) Videos. Click on Record Videos to proceed.'
								});
								alertPopup.then(function(res) {
								console.log('contact saved!');
								});
								$state.go('tabsController.mediaUpload');
						  }
			}
		}).error(function(data, status, header, config, message) {
			$ionicLoading.hide();

		});



		console.log($scope.answer);
	}
	console.log($stateParams);
	console.log("in questionsCtrl" + localStorage['audi']);
	$ionicLoading.show({
		template: 'Loading...'
	});
	$scope.$on('$ionicView.beforeEnter', function(event, viewData) {

		$http({
			method: 'POST',
			url: 'https://destini.io/ws_sessions/session/questions',
			data: {
				'session_id': localStorage['audi']
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}

		}).success(function(data, status, header, config, message) {
			$ionicLoading.hide();

			if (data.response) {

				console.log(data);
				console.log(data.result);
				console.log(data.result.id);
				$scope.questions = data.result;

				//$scope.answer = data.result.questions.answer;
				//  $scope.questionid=data.result.qid;   
			}
			var i = 0;
			angular.forEach($scope.questions, function(value) {
				questions_lcl.push(value.id);
				i++;
			});
			if (i != 0) {
				getAns();
			}
		}).error(function(data, status, header, config, message) {
			$ionicLoading.hide();
			//dfffds
		});
	});

	function getAns() {

		$http({
			method: 'POST',
			url: 'https://destini.io/ws_sessions/responder/answers',
			data: {
				'data': questions_lcl,
				'responder': localStorage['rId']
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}

		}).success(function(data, status, header, config, message) {
			console.log(JSON.stringify(data));
			$scope.answers = data.result;
			//console.log(data.result['0']['0']);

		}).error(function(data, status, header, config, message) {
			console.log(data);

		});


	}

	function mark_applied() {
		$http({
			method: 'POST',
			url: 'https://destini.io/ws_sessions/responder/application',
			data: {
				'session_id': localStorage['audi'],
				'responder_id': localStorage['rId']
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}

		}).success(function(data, status, header, config, message) {
			console.log(JSON.stringify(data));
			//$ionicLoading.hide();

			if (data) {
				console.log(data);
			}
		}).error(function(data, status, header, config, message) {
			console.log(data);

		});
	}

})

.controller('responseCtrl', function($scope, $ionicPopup, $http, $ionicLoading, $stateParams, $ionicHistory) {
	$scope.saveQues = function(answer) {
		$ionicLoading.show({
			template: 'Submitting your answer...'
		});
		var ques_id = $stateParams.id;
		console.log($stateParams.id);
		$http({
			method: 'POST',
			url: 'https://destini.io/ws_sessions/session/answers',
			data: {
				'ques_id': ques_id,
				'answer': answer,
				'responder_id': window.localStorage['rId']
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}

		}).success(function(data, status, header, config, message) {
			$ionicLoading.hide();

			if (data.response) {
				var alertPopup = $ionicPopup.alert({
					title: 'Success!',
					template: 'Your Answer to this question has been submitted successfully!'
				});
				alertPopup.then(function(res) {

					$ionicHistory.goBack();
				});
				console.log(data);
				console.log(data.result);
				console.log(data.result.qid);
				$scope.questions = data.result;
				$scope.answer = data.result.questions.answer;
			}
		}).error(function(data, status, header, config, message) {
			$ionicLoading.hide();
			//dfffds
		});
	}
	$ionicLoading.show({
		template: 'Loading...'
	});

	var ques_id = $stateParams.id;
	console.log($stateParams.id);
	$http({
		method: 'POST',
		url: 'https://destini.io/ws_sessions/session/ques',
		data: {
			'id': ques_id
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}

	}).success(function(data, status, header, config, message) {
		$ionicLoading.hide();

		if (data.response) {

			console.log(data);
			console.log(data.result);
			console.log(data.result.qid);
			$scope.questions = data.result;
			$scope.ques = $scope.questions.question;
			$scope.answer = $scope.questions.answer;

		}
	}).error(function(data, status, header, config, message) {
		$ionicLoading.hide();

	});



})

.controller('picturesCtrl', function($scope, Camera, $http, $ionicLoading, $cordovaFileTransfer, $ionicPopup, $state) {
	console.log(FileTransfer);
	// console.log($scope.globalData.responderid);

	$ionicLoading.show({
		template: 'Loading...'
	});

	$http({
		method: 'POST',
		url: 'https://destini.io/ws_responder/audition/image/get',
		data: {
			'responder_id': localStorage['rId']
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}

	}).success(function(data, status, header, config, message) {
		console.log(data);
		$ionicLoading.hide();
		if (data.response) {
			$scope.records = data.result;
			//$scope.Audinvites=data.result;
			console.log(data.result);
		}
	}).error(function(data, status, header, config, message) {
		$ionicLoading.hide();

	});


	$scope.deletepicture = function(image) {

		$ionicLoading.show({
			template: 'Loading...'
		});
		console.log("image from" + image);

		$http({
			method: 'POST',
			url: 'https://destini.io/ws_responder/delete/image',
			data: {
				'responder_id': localStorage['rId'],
				'image_name': image
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}

		}).success(function(data, status, header, config, message) {
			console.log(data);
			$ionicLoading.hide();
			if (data.response) {
				console.log();
				//$scope.Audinvites=data.result;
				console.log(data.result);
				delpic();
				$state.go('tabsController.profile');
			}

		}).error(function(data, status, header, config, message) {
			$ionicLoading.hide();
			ndelpic();
		});



	}

	delpic = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Alert',
			template: 'Photo Deleted!'
		});
		alertPopup.then(function(res) {
			console.log('Photo deleted');
		});
	}




	$index = '';
	$scope.removeItem = function(x) {
		console.log("i am in removeItem");
		console.log($index);
		$scope.portfolios.splice(x, 1);
	}


	$scope.getPicture = function() {
		console.log("this is getpicture function");
		console.log("responderid" + localStorage['rId']);
		var path;
		var options = {
			quality: 75,
			targetWidth: 200,
			targetHeight: 200,
			sourceType: 0
		};
		console.log(options);
		Camera.getPicture(options).then(function(imageData) {
			$scope.picture = imageData.split('?')[0];
			console.log($scope.picture);
			var url = encodeURI("https://destini.io/ws_responder/audition/image/post");
			var filename = localStorage['rId'] + '.jpg';
			var fileUrl = imageData;
			path = imageData;
			var options = {
				fileKey: "img",
				fileName: filename,
				httpMethod: 'POST',
				params: {
					responder_id: localStorage['rId']
				},
				trustAllHosts: true,
				chunkedMode: false,
				mimeType: "image/jpeg",
			};
			//var headers = {'headerParam':'headerValue'};
			//options.headers = headers;
			options.headers = {
				Connection: "close"
			};
			console.log("responderid2" + localStorage['rId']);
			//console.log(imageData);
			//var imgData = readFileAsBinaryString(fileUrl);
			var fileTransfer = new FileTransfer();
			$cordovaFileTransfer.upload(url, fileUrl, options, true).then(function(response) {
			   console.log("response1: " + JSON.stringify(response));
				console.log("response2: " + angular.fromJson(angular.fromJson(response).response).response);
				console.log("response3: " + angular.fromJson(response));
				var check=angular.fromJson(angular.fromJson(response).response).response;


				if (check == true) {
					console.log("SUCCESS: " + JSON.stringify(response));

					console.log("response is" + response);
					alert('Photo Saved Sucessfully!');

					$ionicLoading.hide();
					$state.go('tabsController.profile')
						//  alert(JSON.stringify(response.response));
					console.log("response is" + response.response);
				} else {
					 console.log("failed: " + JSON.stringify(response));
					$ionicLoading.hide();
					uploadlimit();
				}
			}, function(err) {
				console.log("ERROR: " + JSON.stringify(err));
				$ionicLoading.hide();
				alert('ERROR:' + JSON.stringify(err));
			}, function(progress) {
				var progress_status = (progress.loaded / progress.total) * 100;
				$ionicLoading.show({
					template: "Uploading your picture " + "......"
				});
			});
		}, function(err) {
			console.log("fsfsfsfs" + err);
		});

	}

	uploadlimit = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Alert',
			template: 'Not more than 4 photos'
		});
		alertPopup.then(function(res) {
			console.log('Not more than 4 photos');
		});
	}
})

.controller('aboutmeCtrl', function($scope, Camera, $http, $window, $ionicLoading, $cordovaFileTransfer, $ionicPopup, $state) {

	//  $scope.edit1=function()
	//  {
	//     $scope.name='';
	//  }
	//  $scope.edit2=function()
	//  {
	//     $scope.aboutme='';
	//  }
	//  $scope.edit3=function()
	//  {
	//     $scope.age='';
	//  }
	//  $scope.edit4=function()
	//  {
	//     $scope.fbprofile='';
	//  }
	//  $scope.edit5=function()
	//  {
	//     $scope.twitterprofile='';
	//  }
	//  $scope.edit6=function()
	//  {
	//     $scope.website='';
	//  }
	//  $scope.edit7=function()
	//  {
	//     $scope.gender='';
	//  }
	//  $scope.edit8=function()
	//  {
	//     $scope.eyes='';
	//  }
	//  $scope.edit9=function()
	//  {
	//     $scope.build='';
	//  }
	//  $scope.edit10=function()
	//  {
	//     $scope.height='';
	//  }
	//  $scope.edit11=function()
	//  {
	//     $scope.weight='';
	//  }
	//  $scope.edit12=function()
	//  {
	//     $scope.school='';
	//  }
	//  $scope.edit13=function()
	//  {
	//     $scope.passingyr='';
	//  }
	//  $scope.edit14=function()
	//  {
	//     $scope.hcolor='';
	//  }
	//  $scope.edit15=function()
	//  {
	//     $scope.ethnicities='';
	//  }
	//  $scope.edit16=function()
	//  {
	//     $scope.sports='';
	//  }
	//  $scope.edit17=function()
	//  {
	//     $scope.roles_movie='';
	//  }
	//  $scope.edit18=function()
	//  {
	//     $scope.roles_tv='';
	//  }
	//  $scope.edit19=function()
	//  {
	//     $scope.phone='';
	//  }
	//  $scope.edit20=function()
	//  {
	//     $scope.location='';
	//  }
	 
	$scope.namea = localStorage['naam'];
	 if ($scope.namea == 'null' ||$scope.namea ==null) {
		$scope.name = ' ';
	} else {
		$scope.name = $scope.namea;
	}
	
	 if ($scope.agea == 'null' ||$scope.agea==null) {
		$scope.age = ' ';
	} else {
		$scope.age = $scope.agea;
	}
	$scope.aboutmea = localStorage['aboutme'];
	console.log("abu"+$scope.aboutmea);
	if ($scope.aboutmea == 'null'|| $scope.aboutmea==null) {
		$scope.aboutme = ' ';
	} else {
		$scope.aboutme = $scope.aboutmea;
	}
	$scope.agea = localStorage['age'];
	if ($scope.aboutmea == 'null'||$scope.aboutmea == null) {
		$scope.aboutme = ' ';
	} else {
		$scope.aboutme = $scope.aboutmea;
	}
	console.log('age'+$scope.agea);
	$scope.heighta = localStorage['height'];
	if ($scope.heighta == 'null'||$scope.heighta ==null) {
		$scope.height = ' ';
	} else {
		$scope.height = $scope.heighta;
	}
	$scope.weighta = localStorage['weight'];
	if ($scope.weighta == 'null' ||$scope.weighta ==null) {
		$scope.weight = ' ';
	} else {
		$scope.weight = $scope.weighta;
	}
	$scope.contacta= localStorage['contact'];
	if ($scope.contacta == 'null' ||$scope.contacta ==null) {
		$scope.contact = ' ';
	} else {
		$scope.contact = $scope.contacta;
	}
	$scope.fbprofilea = localStorage['fb_profile'];
	if ($scope.fbprofilea == 'null' ||$scope.fbprofilea ==null) {
		$scope.fbprofile = ' ';
	} else {
		$scope.fbprofile = $scope.fbprofilea;
	}
	$scope.twitterprofilea = localStorage['twitter_profile'];
	if ($scope.twitterprofilea == 'null' || $scope.twitterprofilea==null) {
		$scope.twitterprofile = ' ';
	} else {
		$scope.twitterprofile = $scope.twitterprofilea;
	}
	$scope.websitea = localStorage['website'];
	if ($scope.websitea == 'null' ||$scope.websitea ==null) {
		$scope.website = ' ';
	} else {
		$scope.website = $scope.websitea;
	}
	$scope.gendera = localStorage['gender'];
	if ($scope.gendera == 'null' ||$scope.gendera ==null) {
		$scope.gender = ' ';
	} else {
		$scope.gender = $scope.gendera;
	}
	$scope.eyesa = localStorage['eyes'];
	if ($scope.eyesa == 'null' ||$scope.eyesa ==null) {
		$scope.eyes = ' ';
	} else {
		$scope.eyes = $scope.eyesa;
	}
	$scope.builda = localStorage['build'];
	if ($scope.builda == 'null' ||$scope.builda ==null) {
		$scope.build = ' ';
	} else {
		$scope.build = $scope.builda;
	}
	$scope.locationa = localStorage['location'];
	if ($scope.locationa == 'undefined' || $scope.locationa==null) {
		$scope.location = ' ';
	} else {
		$scope.location = $scope.locationa;
	}
	 $scope.phonea = localStorage['contact'];
	if ($scope.phonea == 'undefined' || $scope.phonea==null) {
		$scope.phone = ' ';
	} else {
		$scope.phone = $scope.phonea;
	}
	$scope.photo = localStorage['photo'];
	if ($scope.photo == 'null') {
		$scope.picture = "https://destini.io/public/frontEnd/uploads/image/1.png";
	} else {
		$scope.picture = "https://destini.io/public/frontEnd/uploads/image/" + $scope.photo;
	}
	// $scope.hcolora = localStorage['hair_color'];
	// if ($scope.hcolora == 'null' || $scope.hcolora ==null) {
	//     $scope.hcolor = ' ';
	// } else {
	//     $scope.hcolor = $scope.hcolora;
	// }
	// $scope.ethnicitiesa = localStorage['ethnicities'];
	// if ($scope.ethnicitiesa == 'null' || $scope.ethnicitiesa ==null) {
	//     $scope.ethnicities = ' ';
	// } else {
	//     $scope.ethnicities = $scope.ethnicitiesa;
	// }
	// $scope.sportsa = localStorage['sports'];
	// if ($scope.sportsa == 'null' || $scope.sportsa==null) {
	//     $scope.sports = ' ';
	// } else {
	//     $scope.sports = $scope.sportsa;
	// }
	// $scope.roles_tva = localStorage['roles_tv'];
	// if ($scope.roles_tva == 'null' || $scope.roles_tva ==null) {
	//     $scope.roles_tv = ' ';
	// } else {
	//     $scope.roles_tv = $scope.roles_tva;
	// }
	// $scope.roles_moviea = localStorage['roles_movie'];
	// if ($scope.roles_moviea == 'null' || $scope.roles_moviea ==null) {
	//     $scope.roles_movie = ' ';
	// } else {
	//     $scope.roles_movie = $scope.roles_moviea;
	// }
	// $scope.schoola = localStorage['school'];
	// if ($scope.schoola == 'undefined'|| $scope.schoola ==null) {
	//     $scope.school = ' ';
	// } else {
	//     $scope.school = $scope.schoola;
	// }
	// $scope.passingyra = localStorage['passingyr'];
	// if ($scope.passingyra == 'undefined' || $scope.passingyra==null) {
	//     $scope.passingyr = ' ';
	// } else {
	//     $scope.passingyr = $scope.passingyra;
	// }
  
	
	 
	$scope.save = function(a,b) {
		
				
		console.log( 'height'+a);
		 console.log('weight'+b);
		$ionicLoading.show({
			template: 'saving!...'
		});
			if($scope.gender=='Click To Edit')
			{
				var gender='';
			}else{
			   var gender=$scope.gender; 
			}

		$http({
			method: 'POST',
			url: 'https://destini.io/ws_responder/edit/profile',
			data: {

				'responder_id': localStorage['rId'],
				'name': $scope.name,
				'about_me': $scope.aboutme,
				 'contact': $scope.phone,
				'location': $scope.location,
				'age': $scope.age,
				'fb_profile': $scope.fbprofile,
				'twitter_profile': $scope.twitterprofile,
				'website': $scope.website,
				'gender': gender,
				'build': $scope.build,
				'eyes': $scope.eyes,
				'height': $scope.height,
				'weight': $scope.weight,
				'hair_color': '',
				'ethnicities': '',
				'sports':  '',
				'roles_movie':'',
				'roles_tv': ' ' ,
				'school': ' ',
				'passing_year': " "
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).success(function(data, status, header, config, message) {
			console.log($scope.rolet);
			console.log("success"+JSON.stringify(data));
			localStorage.setItem('naam', $scope.name);
			localStorage.setItem('about_me', $scope.aboutme);


			$ionicLoading.hide();
			if (data.response) {
			 savesuc();
				$scope.responderid = data.result.id;
				$scope.naam = data.result.name;
				console.log($scope.naam);
				

			} else {
				savefail();
			}

		}).error(function(data, status, header, config, message) {
			$ionicLoading.hide();
			//dfffds
		});
	}



	savesuc = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Alert',
			template: 'Successfully Saved!'
		});
		alertPopup.then(function(res) {

			console.log('Edited Data saved')
			if(res){
				$state.go('tabsController.profile');
			}
		});
	}
	savefail = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Alert',
			template: 'Not Saved!'
		});
		alertPopup.then(function(res) {
			console.log('Not saved data');
		});
	}


	$scope.takePicture = function(options) {
		console.log("this is camera function");
		var path;
		var options = {
			quality: 75,
			targetWidth: 200,
			targetHeight: 200,
			sourceType: 1
		};
		console.log(options);
		Camera.getPicture(options).then(function(imageData) {
			var url = encodeURI("https://destini.io/ws_responder/upload/profile/image");
			var filename = localStorage['rId'] + '.jpg';
			var fileUrl = imageData;
			$scope.picture = imageData.split('?')[0];
			console.log($scope.picture);
			path = imageData;
			var options = {
				fileKey: "img",
				fileName: filename,
				httpMethod: 'POST',
				params: {
					responder_id: localStorage['rId']
				},
				trustAllHosts: true,
				chunkedMode: false,
				mimeType: "image/jpeg",
			};
			options.headers = {
				Connection: "close"
			};
			console.log("responderid2" + localStorage['rId']);
			var fileTransfer = new FileTransfer();
			$cordovaFileTransfer.upload(url, fileUrl, options, true).then(function(result) {
				console.log("SUCCESS: " + JSON.stringify(result));
				 $ionicLoading.hide();
				//alert("success");
				console.log("uploading image");
				$scope.picture = imageData.split('?')[0];
				console.log("result is" + result);
				var alertPopup = $ionicPopup.alert({
						title: 'Alert',
						template: 'Photo Saved Sucessfully!'
					});
					alertPopup.then(function(res) {
						if(res)
						{
							$state.go('tabsController.profile');
						}
						console.log('Edited Data saved');
					});
				//   $scope.picture=path;
				//alert(JSON.stringify($scope.input));
				//  PostAudition.setAuditionData(localStorage.getItem('audition_id'),$scope.input.firstName,$scope.input.lastName,$scope.input.age,$scope.input.email,$scope.input.phone,$scope.input.url);
				//alert('Photo Saved Sucessfully!');
				//alert(localStorage.getItem('audition_id')+$scope.input.firstName+$scope.input.lastName+$scope.input.age+$scope.input.email+$scope.input.phone+$scope.input.url);
				/*$http.post("http://destini.io/ws_sendresponse",{session_id: 1, first_name: $scope.input.firstName,last_name:$scope.input.lastName,age:$scope.input.age,email:$scope.input.email,url:$scope.input.url },function(data){
							alert(JSON.stringify(data));
						  }, function(err){
							alert(JSON.stringify(err));
							 $ionicLoading.hide();
						  });*/
				
				//location.href = location.origin;
				// alert(JSON.stringify(result.response));
				console.log("result is" + result.result);
			}, function(err) {
				console.log("ERROR: " + JSON.stringify(err));
				$ionicLoading.hide();
				alert('ERROR:' + JSON.stringify(err));
			}, function(progress) {
				var progress_status = (progress.loaded / progress.total) * 100;
				$ionicLoading.show({
					template: "Uploading " + filename + "......"
				});
			});

		}, function(err) {
			console.log(err);
		});

	};


	$scope.getPicture = function() {
		console.log("this is getpicture function");
		console.log("responderid" + localStorage['rId']);
		var path;
		var options = {
			quality: 75,
			targetWidth: 200,
			targetHeight: 200,
			sourceType: 0
		};
		console.log(options);
		Camera.getPicture(options).then(function(imageData) {
			$scope.picture = imageData.split('?')[0];
			console.log($scope.picture);
			var url = encodeURI("https://destini.io/ws_responder/upload/profile/image");
			var filename = localStorage['rId'] + '.jpg';
			var fileUrl = imageData;
			path = imageData;
			var options = {
				fileKey: "img",
				fileName: filename,
				httpMethod: 'POST',
				params: {
					responder_id: localStorage['rId']
				},
				trustAllHosts: true,
				chunkedMode: false,
				mimeType: "image/jpeg",
			};
			//var headers = {'headerParam':'headerValue'};
			//options.headers = headers;
			options.headers = {
				Connection: "close"
			};
			console.log("responderid2" + localStorage['rId']);
			//console.log(imageData);
			//var imgData = readFileAsBinaryString(fileUrl);
			var fileTransfer = new FileTransfer();
			$cordovaFileTransfer.upload(url, fileUrl, options, true).then(function(result) {
				console.log("SUCCESS: " + JSON.stringify(result));
				//alert("success");
				console.log("result is" + result);
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
						title: 'Alert',
						template: 'Photo Saved Sucessfully!'
					});
					alertPopup.then(function(res) {
						if(res)
						{
							$state.reload('');
						}
						console.log('Edited Data saved');
					});
				//$scope.picture=path;
				// alert(JSON.stringify($scope.input));
				//  PostAudition.setAuditionData(localStorage.getItem('audition_id'),$scope.input.firstName,$scope.input.lastName,$scope.input.age,$scope.input.email,$scope.input.phone,$scope.input.url);
			   // alert('Photo Saved Sucessfully!');
				//alert(localStorage.getItem('audition_id')+$scope.input.firstName+$scope.input.lastName+$scope.input.age+$scope.input.email+$scope.input.phone+$scope.input.url);
				/*$http.post("http://destini.io/ws_sendresponse",{session_id: 1, first_name: $scope.input.firstName,last_name:$scope.input.lastName,age:$scope.input.age,email:$scope.input.email,url:$scope.input.url },function(data){
								alert(JSON.stringify(data));
							  }, function(err){
								alert(JSON.stringify(err));
								 $ionicLoading.hide();
							  });*/
				//$ionicLoading.hide();
				//location.href = location.origin;
				//$window.location.reload(true);
				//navigator.app.loadUrl("file:///android_asset/www/index.html");
				//  alert(JSON.stringify(result.response));
				console.log("result is" + result.result);
			}, function(err) {
				console.log("ERROR: " + JSON.stringify(err));
				$ionicLoading.hide();
				alert('ERROR:' + JSON.stringify(err));
			}, function(progress) {
				var progress_status = (progress.loaded / progress.total) * 100;
				$ionicLoading.show({
					template: "Uploading " + filename + "......"
				});
			});
		}, function(err) {
			console.log("fsfsfsfs" + err);
		});

	}

})

.controller('videosCtrl', function($scope, $http, $cordovaCapture, $cordovaFileTransfer, $ionicPopup, $ionicLoading, $state, $sce) {

	//    console.log("video" + $scope.globalData.embededlink);
 $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
	$ionicLoading.show({
		template: 'Loading...'
	});

	$scope.video = {
		src: localStorage['ytube'],
		title: "Intro Video"
	};
	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}

	$http({
		method: 'POST',
		url: 'https://destini.io/ws_responder/multimedia/get',
		data: {
			'responder_id': localStorage['rId']
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}
	}).success(function(data, status, header, config, message) {


		

		if (data.response) {
			console.log('responderid' + localStorage['rId']);
			//$scope.globalData.photo=data.result.profile_photo;
			//$scope.globalData.embededlink=data.result;
			$scope.ytube = data.result.intro_video.split('=')[1];
			$scope.embededlink = "https://www.youtube.com/embed/" + localStorage['ytube'] + "?autoplay=1";
			$scope.video = {
				src: $scope.embededlink,
				title: "Intro Video"

			};
			//$scope.picture="http://destini.io/public/frontEnd/uploads/image/"+$scope.globalData.photo;
			console.log($scope.video);
			 $ionicLoading.hide();

		} else {

		}

	}).error(function(data, status, header, config, message) {});


});
	$scope.send = function() {
		console.log("in send button");
		//        console.log("responderid" + $scope.globalData.responderid);
		$ionicLoading.show({
			template: 'sending!...'
		});

		$http({
			method: 'POST',
			url: 'https://destini.io/ws_responder/intro/video',
			data: {
				'responder_id': localStorage['rId'],
				'intro_video': $scope.ylink

			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).success(function(data, status, header, config, message) {

			$ionicLoading.hide();


			if (data.response) {
				ylinksuc();

				$state.go('tabsController.profile');
			} else {
				ylinkfail();
			}

		}).error(function(data, status, header, config, message) {
			$ionicLoading.hide();
			//dfffds
		});
	}

	ylinksuc = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Alert',
			template: 'Successfully Posted!'
		});
		alertPopup.then(function(res) {
			console.log('video link posted');
		});
	}
	ylinkfail = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Alert',
			template: 'oops ! Something went wrong!'
		});
		alertPopup.then(function(res) {
			console.log('video link not posted');
		});
	}

	////////////////////// NOT IN USE----------------------------------------------------------------------------------------------
	$scope.captureVideo = function() {
		//alert(JSON.stringify($scope.input));
		//PostAudition.setAuditionData(localStorage.getItem('audition_id'),"gagan",20,"SAD","dsaf",1,'9988878787');
		var options = {};
		$cordovaCapture.captureVideo(options).then(function(videoData) {
			var i, path, len;
			for (i = 0, len = videoData.length; i < len; i += 1) {
				path = videoData[i].fullPath;
			}

			//alert(JSON.stringify(videoData));
			var url = encodeURI("https://destini.io/ws_responder/upload/intro/video");
			var filename = $scope.globalData.responderid + '.mpeg';
			var fileUrl = path;
			var options = {
				fileKey: "intro_video",
				fileName: filename,
				httpMethod: 'POST',
				trustAllHosts: true,
				chunkedMode: false,
				mimeType: "video/mpeg",
			};
			//var headers = {'headerParam':'headerValue'};
			// options.headers = headers;
			options.headers = {
				Connection: "close"
			};
			console.log("responderid" + $scope.globalData.responderid);
			//var imgData = readFileAsBinaryString(fileUrl);
			console.log("uploading video....");

			var fileTransfer = new FileTransfer();
			$cordovaFileTransfer.upload(url, fileUrl, options, true).then(function(result) {
				result = angular.fromJson(angular.fromJson(result));
				console.log("SUCCESS: " + result.response['message']);
				console.log("videoname " + result.response.result);
				console.log("result " + JSON.stringify(result));
				alert("success");
				//$scope.lin='http://destini.io/ws_responder/upload/intro/video'+filename;
				//alert(JSON.stringify($scope.input));
				console.log("saved on server properly");
				// PostAudition.setAuditionData(localStorage.getItem('audition_id'),$scope.input.firstName,$scope.input.lastName,$scope.input.age,$scope.input.email,$scope.input.phone,$scope.input.url);
				alert('Response Saved Sucessfully!');
				// alert(localStorage.getItem('audition_id')+$scope.input.firstName+$scope.input.lastName+$scope.input.age+$scope.input.email+$scope.input.phone+$scope.input.url);
				/*$http.post("http://destini.io/ws_sendresponse",{session_id: 1, first_name: $scope.input.firstName,last_name:$scope.input.lastName,age:$scope.input.age,email:$scope.input.email,url:$scope.input.url },function(data){
																			alert(JSON.stringify(data));
																		  }, function(err){
																			alert(JSON.stringify(err));
																			 $ionicLoading.hide();
																		  });*/
				$ionicLoading.hide();
				// alert(JSON.stringify(result.response));
			}, function(err) {
				console.log("ERROR: " + JSON.stringify(err));
				$ionicLoading.hide();
				alert('ERROR:' + JSON.stringify(err));
			}, function(progress) {
				var progress_status = (progress.loaded / progress.total) * 100;
				$ionicLoading.show({
					template: "Uploading " + filename + "......"
				});
			});
		});
	};

})

.controller('portfolioCtrl', function($scope) {
	console.log("in portfolioCtrl");
	$index = '';
	$scope.portfolios = []
	$scope.addmore = function() {
		console.log("i am in addmore");
		$scope.portfolios.push({
			port: ''
		})
	}

	$scope.removeItem = function(x) {
		console.log("i am in removeItem");
		console.log($index);
		$scope.portfolios.splice(x, 1);
	}

})

.controller('resumeCtrl', function($scope,$state, $cordovaFileTransfer, $ionicLoading,$ionicPopup) {
	var res_id = localStorage['rId'];
	var audi_id = localStorage['audi'];
	$scope.btn_val = "Choose File";
	$scope.showValue = function() {
		fileChooser.open(function(uri) {
			$scope.btn_val = uri;
			console.log('url'+uri);
			uploadFile(uri);

		});
	}

	function uploadFile(uri, audi_id, res_id) {
		console.log('url'+uri);
		var url = encodeURI("https://destini.io/ws_sessions/responder/file");
		var params = new Object();
		params.responder_id = res_id;
		params.session_id = audi_id;
		var filename = localStorage['audi']+"_"+localStorage['rId'];
		console.log();
		var fileUrl = uri;
		var options = {
			fileKey: "file",
			fileName: filename,
			httpMethod: 'POST',
			trustAllHosts: true,
			chunkedMode: false,
			params: params,
			mimeType: 'Application/' + filename.split(".").pop()

		};
		options.headers = {
			Connection: "close"
		};
		$cordovaFileTransfer.upload(url, fileUrl, options, true).then(function(result) {
			result = angular.fromJson(angular.fromJson(result));
			console.log("SUCCESS: " + result.response['message']);
			console.log("videoname " + result.response.result);
			console.log("result " + JSON.stringify(result));
		   // alert("success");

			console.log("saved on server properly");

			//alert('Response Saved Sucessfully!');
			var alertPopup = $ionicPopup.alert({
			title: 'Alert',
			template: 'Response Saved Sucessfully!'
		});
		alertPopup.then(function(res) {
			if(res){
			  console.log('video link posted');
			  $state.go('tabsController.profile');   
			}
			
		});


			$ionicLoading.hide();

		}, function(err) {
			console.log("ERROR: " + JSON.stringify(err));
			$ionicLoading.hide();
			alert('ERROR:' + JSON.stringify(err));
		}, function(progress) {
			var progress_status = (progress.loaded / progress.total) * 100;
			$ionicLoading.show({
				template: "Uploading " + filename + "......"
			});
		});

	}
})


.controller("resume1Ctrl", function($scope, $ionicPlatform, $fileFactory) {



})