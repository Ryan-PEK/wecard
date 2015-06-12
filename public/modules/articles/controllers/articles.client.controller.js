'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
    function($scope, $stateParams, $location, Authentication, Articles) {
        $scope.authentication = Authentication;
        $scope.thumb = '';

        $scope.create = function() {
            var article = new Articles({
                title: this.title,
                thumb: this.thumb,
                keyword: this.keyword,
                link: this.link,
                content: this.content
            });
            article.$save(function(response) {
                $location.path('articles/' + response._id);

                $scope.title = '';
                $scope.content = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function(article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function() {
                    $location.path('articles');
                });
            }
        };

        $scope.update = function() {
            var article = $scope.article;

            article.$update(function() {
                $location.path('articles/' + article._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.articles = Articles.query();
        };

        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            });
        };
        $scope.initEdit = function(){
        	$scope.findOne();
        	Dropzone.options.fileUpload = {
                success: function(file, response) {
                    $scope.$apply(function() {
                        $scope.article.thumb = response;
                    });
                }
            };
            var myDropZone = new Dropzone(".dropzone");
        };

        $scope.initCreate = function() {
            Dropzone.options.fileUpload = {
                success: function(file, response) {
                    $scope.$apply(function() {
                        $scope.thumb = response;
                    });
                }
            };
            var myDropZone = new Dropzone(".dropzone");
        };
    }
]);
