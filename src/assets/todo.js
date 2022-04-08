var TodoApp = angular.module('TodoApp', ['ngStorage']);

TodoApp.controller('TodoCtrl', function($scope, $localStorage) {

    var currentEdited = false, 
        currentEditedIndex = null;
    $scope.priority = '2'; //2 = Medium
    $scope.dueDate = new Date();

    //will be exported to server.js
    var localArray = $localStorage.todos;

    //load user local storage
    if ($localStorage.todos) {
        //change format for dueDate field
        angular.forEach($localStorage.todos, function(value, key) {
            value.dueDate = new Date(value.dueDate);
        });
        $scope.todos = $localStorage.todos;
        $scope.predicate = $localStorage.predicate;
        $scope.reverse = $localStorage.reverse;
    } else {
        //default state for example
        $scope.todos = [{
            summary: 'Build a To-Do App in Angular',
            dueDate: new Date('2022-12-31'),
            priority: '3',
            done: true
        }, {
            summary: 'Add a PostgreSQL Database to validate Login Info',
            dueDate: new Date('2023-03-01'),
            priority: '2',
            done: false
        }, {
            summary: 'Add Fancy CSS Styling',
            dueDate: new Date('2023-06-01'),
            priority: '1',
            done: false
        }];
        $scope.predicate = 'summary';
        $scope.reverse = true;
    }

    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
        $scope.saveToLocalStorage();
    };

    $scope.addTodo = function() {
        if ($scope.todoSummary === '' || $scope.todoSummary === undefined) return;
        $scope.todos.push({
            summary: $scope.todoSummary,
            priority: $scope.priority,
            dueDate: $scope.dueDate,
            done: false
        });
        //default state for new task
        $scope.todoSummary = '';
        $scope.priority = '2';
        $scope.dueDate = new Date();
        $scope.saveToLocalStorage();
    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.archive = function() {
        $scope.endEditMode();
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done) $scope.todos.push(todo);
        });
        $scope.saveToLocalStorage();
    };

    $scope.edit = function($event) {
        $scope.endEditMode();
        currentEditedIndex = $scope.todos.indexOf(this.todo);
        currentEdited = $event.currentTarget.parentElement;
        currentEdited.classList.add('editItem');
    };

    $scope.editSubmit = function($event) {
        this.todo.summary = $event.currentTarget.querySelector('input').value;
        $scope.endEditMode();
        $scope.saveToLocalStorage();
    };

    $scope.removeTask = function() {
        //by clicking Remove icon
        $scope.endEditMode();
        $scope.todos.splice($scope.todos.indexOf(this.todo), 1);
        $scope.saveToLocalStorage();
    };

    $scope.saveToLocalStorage = function() {
        $localStorage.todos = $scope.todos;
        $localStorage.predicate = $scope.predicate;
        $localStorage.reverse = $scope.reverse;
    };

    $scope.endEditMode = function() {
        if (currentEdited) {
            //delete changes from value
            currentEdited.querySelector('.editForm input').value = $scope.todos[currentEditedIndex].summary;
            //hide editMode
            currentEdited.classList.remove('editItem');
            currentEdited = false;
        }
    };
});