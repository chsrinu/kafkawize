'use strict'

// confirmation of delete
// edit 
// solution for transaction
// message store / key / gui
var app = angular.module('execTopicsApp',[]);

app.controller("execTopicsCtrl", function($scope, $http, $location, $window) {
	
	// Set http service defaults
	// We force the "Accept" header to be only "application/json"
	// otherwise we risk the Accept header being set by default to:
	// "application/json; text/plain" and this can result in us
	// getting a "text/plain" response which is not able to be
	// parsed. 
	$http.defaults.headers.common['Accept'] = 'application/json';
	

        $scope.getMyTopicRequests = function() {
            $http({
                method: "GET",
                url: "getCreatedTopicRequests",
                headers : { 'Content-Type' : 'application/json' }
            }).success(function(output) {
                $scope.topicRequests = output;

            }).error(
                function(error)
                {
                    $scope.alert = error;
                }
            );
        }

        $scope.execTopicRequest = function() {

            $http({
                method: "GET",
                url: "execTopicRequests",
                headers : { 'Content-Type' : 'application/json' },
                params: {'topicName' : $scope.execTopicRequest.topicname },
                data: {'topicName' : $scope.execTopicRequest.topicname}
            }).success(function(output) {

                $scope.alert = "Topic Approve Request : "+output.result;
                $scope.getMyTopicRequests();

            }).error(
                function(error)
                {
                    $scope.alert = error;
                }
            );
        }

        $scope.execTopicRequestReject = function() {

                    $http({
                        method: "GET",
                        url: "execTopicRequestsDecline",
                        headers : { 'Content-Type' : 'application/json' },
                        params: {'topicName' : $scope.execTopicRequest.topicname },
                        data: {'topicName' : $scope.execTopicRequest.topicname}
                    }).success(function(output) {

                        $scope.alert = "Topic Approve Request : "+output.result;
                        $scope.getMyTopicRequests();

                    }).error(
                        function(error)
                        {
                            $scope.alert = error;
                        }
                    );
                }

    $scope.getExecAuth = function() {
    	//alert("onload");
        $http({
            method: "GET",
            url: "getExecAuth",
            headers : { 'Content-Type' : 'application/json' }
        }).success(function(output) {
            $scope.statusauth = output.status;
            if(output.status=="NotAuthorized")
                $scope.alerttop = output.status;
        }).error(
            function(error)
            {
                $scope.alert = error;
            }
        );
	}

            $scope.getAuth = function() {
            	$http({
                    method: "GET",
                    url: "getAuth",
                    headers : { 'Content-Type' : 'application/json' }
                }).success(function(output) {
                    $scope.statusauth = output.status;
                    $scope.userlogged = output.username;
                    $scope.teamname = output.teamname;
                     $scope.notifications = output.notifications;
                    $scope.notificationsAcls = output.notificationsAcls;
                    $scope.statusauthexectopics = output.statusauthexectopics;
                    $scope.alerttop = output.alertmessage;
                    if(output.companyinfo == null){
                        $scope.companyinfo = "Company not defined!!";
                    }
                    else
                        $scope.companyinfo = output.companyinfo;

                    if($scope.userlogged != null)
                        $scope.loggedinuser = "true";
                }).error(
                    function(error)
                    {
                        $scope.alert = error;
                    }
                );
        	}

        $scope.logout = function() {
            //alert("onload");
            $http({
                method: "GET",
                url: "logout"
            }).success(function(output) {

                $location.path('/');
                $window.location.reload();
            }).error(
                function(error)
                {
                    $scope.alert = error;
                }
            );
        }


}
);