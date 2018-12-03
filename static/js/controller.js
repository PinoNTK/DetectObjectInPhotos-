angular.module('myApp', [])
.controller('HomeCtrl', function ($scope, $http) {
	console.log('Ok!');
		// http request syntax
        // $http({
        //     method: 'POST',
        //     url: '/login',
        //     data: params

        // }).then(function (response) {

        // }, function (error) {
        //     console.log(error);

        // });
        // end syntax

    $scope.getListOfImages = function(){
    	$http({
            method: 'POST',
            url: '/images_list',
            //data: params
        }).then(function (response) {
        	console.log(response);
        	alert(response);
        }, function (error) {
            console.log(error);
        });
    }

    $scope.getListOfImages();
    $scope.submitLink=function (){
            // alert("clicked!");
            

    }
    $scope.info={};
    $("#urlInput").on("keypress", function(e){
        if(e.keyCode==13){
            // alert("Submit link!");
            var imageUrl= $('#urlInput').val();
            $scope.params = imageUrl;
            console.log($scope.params);
            $http({
                method: 'POST',
                url: '/objects_dectection',
                data: JSON.stringify($scope.params)
            }).then(function (response) {
                console.log(response);
                alert(response);
            }, function (error) {
                console.log(error);
            });
        }
    })
    
    $scope.submitCrop= function(){
        alert("Submit the cropped image!");
    }

});
