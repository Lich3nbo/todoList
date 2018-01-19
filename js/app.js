(function (window) {
	'use strict';

	var app = angular.module('myApp',[]);
		app.controller("myCon",['$scope','$window',function($scope,$window){

			
			// 本地缓存 
			$scope.set = function(key,value){
				$window.localStorage[key]=JSON.stringify(value);
			}	
			$scope.get =  function (key) {
				return JSON.parse($window.localStorage[key] || '[]' );
			}		
			$scope.todos  = $scope.get("todos"); 
			
			// 添加
			$scope.newData = '';
			$scope.add = function(){
				if(!$scope.newData){
					return alert("不能为空 OK?");
				}
				$scope.todos.push({
					id:$scope.todos.length,
					name:$scope.newData,
					completed:false,
				})
				$scope.newData = '';
				$scope.set('todos',$scope.todos);
			}

			$scope.del = function(index){
				$scope.todos.splice(index,1);
				$scope.set('todos',$scope.todos);
			}

			$scope.count = 0 ;
			$scope.completedNum = function(){
				$scope.count = 0 ;
				for(var i = 0; i< $scope.todos.length; i++){
					if($scope.todos[i].completed){
						$scope.count++;
					}
				}
				return 	$scope.count ;
			}

			$scope.clearCom = function(){
				for(var i = $scope.todos.length-1; i>= 0 ;i--){
					var item = $scope.todos[i];
					if(item.completed){
						$scope.todos.splice(i,1);
					}
				}
				
			}

			$scope.toggle = false;
			// click
			$scope.allToggle = function(){
				for(var i = 0 ; i< $scope.todos.length; i++){
					var item = $scope.todos[i];
					item.completed = $scope.toggle; 				
				}
			
			}
			// change
			$scope.completedToggle = function(){
				for(var i = 0 ; i< $scope.todos.length; i++){
					var item = $scope.todos[i];
					if(!item.completed){
						 $scope.toggle =	item.completed ;
						 return ;
					}else {
						 $scope.toggle =	item.completed ;
					}	
				}

			}
			$scope.testId = -1;
			$scope.revamp = function(id){
				$scope.testId = id;

			}

			$scope.save = function(){
				$scope.testId = -1;

			}

			$scope.filters = '';
			$scope.clickFilter = function(status){
				$scope.filters = status;

			}

			$scope.$watch('todos',function(){
				
				
				$scope.set('todos',$scope.todos);
			})
		}])
})(window);
