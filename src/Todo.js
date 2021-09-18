export const TodoModule = (function () {
    let todoList = [];

    function addNewTodo (title){
        todoList.push({title});
        console.log(todoList);
    }

    function getTodoList(){
        return todoList;
    }

    return {addNewTodo,getTodoList};
})();