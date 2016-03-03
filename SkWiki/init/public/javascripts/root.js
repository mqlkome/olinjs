var app = angular.module("skwikiApp", ['ngRoute']);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.currentSkwiki = null;

    // when landing on the page, get all skwiki titles and show them
    $http.get("/skwikis")
        .success(function(data) {
            $scope.skwikis = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.setCurrentSkwiki = function(skwiki) {
        if (skwiki === $scope.currentSkwiki){
            $scope.currentSkwiki = null;
        }else{ 
            $scope.currentSkwiki = skwiki;
            $scope.editText = skwiki.text;
        }
    }

    // when submitting the add form, send the text to the node API
    $scope.createSkwiki = function() {
        $http.post("/addSkwiki", {title: $scope.title, text: $scope.text})
            .success(function(data) {
                $scope.title = null; // clear the form
                $scope.text = null;
                $scope.skwikis = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a skwiki
    $scope.deleteSkwiki = function(id) {
        $http.delete("/skwiki/" + id)
            .success(function(data) {
                $scope.skwikis = data;
                $scope.currentSkwiki = null;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    //edits an existing skwiki
    $scope.editSkwiki = function(id) {
        $http.post("/editSkwiki/" + id, {text:$scope.editText})
            .success(function(data) {
                console.log(data.editedSkwiki);
                $scope.currentSkwiki.text = data.editedSkwiki.text;
                $scope.editText = null;
                $scope.skwikis = data.skwikis;

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.imageHandler = function() {
        var images = ["images/favicon.png", "images/favicon.png"]
        var numPaths = 2;
        var r = Math.floor(Math.random() * (numPaths));
        $scope.image = images[r];
    };
//Are we even using this one??
    // $scope.getSkwiki = function(id) {
    //     $http.post("/skwiki/" + id, $scope.formData)
    //         .success(function(data) {
    //             $scope.skwikis = data;
    //         })
    //         .error(function(data) {
    //             console.log('Error: ' + data);
    //         });
    // };

}