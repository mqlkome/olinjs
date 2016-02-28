var app = angular.module('myApp', ['ngRoute']);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all skwiki titles and show them
    $http.get("/skwikis")
        .success(function(data) {
            $scope.skwikis = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createSkwiki = function() {
        $http.post("/addSkwiki", $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.skwikis = data;
                
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteSkwiki = function(id) {
        $http.delete("/skwiki/" + id)
            .success(function(data) {
                $scope.skwikis = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    //edits a todo after it has been made
    $scope.editSkwiki = function(id) {
        $http.post("/skwiki/" + id, $scope.formData)
            .success(function(data) {
                $scope.skwikis = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getSkwiki = function(id) {
        $http.post("/skwiki/" + id, $scope.formData)
            .success(function(data) {
                $scope.skwikis = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}