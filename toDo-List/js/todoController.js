app.controller("todoController", function ($scope) {
    $scope.todos = [];
    $scope.addTodo = function () {
        if (event.keyCode === 13 && $scope.todoText !== '') {
            $scope.todos.push({text: $scope.todoText, done: false});
            $scope.todoText = '';
        }
    };

    $scope.hasTodoItems = function () {
        return ($scope.todos.length > 0);
    };

    $scope.toggleTodo = function (todoItem) {
        todoItem.done = !todoItem.done;
    };

    $scope.toggleEditMode = function () {
        event.target.contentEditable = true;
    }
    $scope.editTodo = function () {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.target.contentEditable = false;
        }
    };

    $scope.removeTodo = function () {
    };

    $scope.markAllDone = function () {
        for (var index in $scope.todos) {
            $scope.todos[index].done = true;
        }
    };

    $scope.removeAllTodo = function () {
        $scope.todos = [];
    };

    $scope.itemsCompleted = function () {
        var completedItemsCount = 0;
        for (var index in $scope.todos) {
            if ($scope.todos[index].done === true) {
                completedItemsCount++;
            }
        }
        return completedItemsCount;
    };
});