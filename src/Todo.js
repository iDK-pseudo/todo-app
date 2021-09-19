export const TaskModule = (function () {
    let taskMap = new Map();

    function addNewTask (dateid,title){
        if(!taskMap.get(dateid)){
            taskMap.set(dateid,[]);
        }
        taskMap.get(dateid).push({title});
    }

    function getTaskMap(){
        return taskMap;
    }

    return {
        addNewTask,
        getTaskMap
    };
})();