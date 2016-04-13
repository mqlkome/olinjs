var app = angular.module("skwikiApp", ['ngRoute']);

//Handles all the angular controllers and data acquiring from the routes.

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
    //sets currently clicked on skwiki
    // While this does a good job of changing the view, I cannot go directly to a page if I wanted to like other wikis allow. 
    $scope.setCurrentSkwiki = function(skwiki) {
        if (skwiki === $scope.currentSkwiki){
            $scope.currentSkwiki = null;
        }else{ 
            $scope.currentSkwiki = skwiki;
            $scope.editText = skwiki.text;
            $scope.$broadcast('scanner-started');
        }
    }

    // when submitting the add form, send the text to the node API
    $scope.createSkwiki = function() {
    // you should check that either the title or the text is not null before submitting.
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
                $scope.currentSkwiki.text = data.editedSkwiki.text;
                $scope.editText = null;
                $scope.skwikis = data.skwikis;

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    //generates a random image for each article
    $scope.imageHandler = function() {
        $scope.$on('scanner-started', function() {
            var images = ["Skeleton/images/skeleton1.png","Skeleton/images/skeleton2.png","Skeleton/images/skeleton3.png","Skeleton/images/skeleton4.png","Skeleton/images/skeleton5.png"]
            var numPaths = 5;
            var r = Math.floor(Math.random() * (numPaths));
            $scope.image = images[r];
        });
    };
}
