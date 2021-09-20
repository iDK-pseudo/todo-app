export const TaskModule = (function () {
    let taskMap = new Map();

    function init(){
        if(localStorage.getItem("taskMap")){
            taskMap = new Map(JSON.parse(localStorage.getItem("taskMap")));
        }
    }

    function addNewTask (dateid,title,desc,priority){
        if(!taskMap.get(dateid)){
            taskMap.set(dateid,[]);
        }
        taskMap.get(dateid).push({title,desc,priority});
        localStorage.setItem("taskMap",JSON.stringify(Array.from(taskMap.entries())));
    }

    function getTaskMap(){
        return taskMap;
    }

    return {
        init,
        addNewTask,
        getTaskMap
    };
})();