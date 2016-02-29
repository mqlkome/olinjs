var app = angular.module("skwikiApp", ['ngRoute']);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.currentSkwiki = null;

    // when landing on the page, get all skwiki titles and show them
    $http.get("/skwikis")
        .success(function(data) {
            $scope.skwikis = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.setCurrentSkwiki = function(skwiki) {
        if (skwiki === $scope.currentSkwiki){
            $scope.currentSkwiki = null;
        }else{ $scope.currentSkwiki = skwiki; }

    }

    // when submitting the add form, send the text to the node API
    $scope.createSkwiki = function() {
        $http.post("/addSkwiki", {title: $scope.title, text: $scope.text})
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
        $http.post("/editSkwiki/" + id, {text:$scope.editText})
            .success(function(data) {
                $scope.formData = {};
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