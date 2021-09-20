import './main.css';
import {DomModule} from "./DomModule.js";
import { TaskModule } from './Todo.js';
import { format } from "date-fns";

export const MainModule = (function () {
    let dateId = null;

    function init(){
        dateId = format(new Date(), "yyyyMMdd");
        DomModule.init();
        TaskModule.init();
        if(TaskModule.getTaskMap().size){
            DomModule.renderTasks("new",TaskModule.getTaskMap());
        }else{
            DomModule.renderEmptyMessages();
        }
    }

    function handleNewTask(value){
        TaskModule.addNewTask(dateId,value);
        DomModule.clearEmptyMsg();   
        if(DomModule.isListWithDateIdPresent(dateId)){
            DomModule.renderTasks("append",TaskModule.getTaskMap());
        }else {
            DomModule.renderTasks("new",TaskModule.getTaskMap());
        }
    }

    function handleNewTaskWithFormData(title,desc,priority){
        TaskModule.addNewTask(dateId,title,desc,priority);
        DomModule.clearEmptyMsg();
        if(DomModule.isListWithDateIdPresent(dateId)){
            DomModule.renderTasks("append",TaskModule.getTaskMap());
        }else {
            DomModule.renderTasks("new",TaskModule.getTaskMap());
        }
    }
    return {
        init,
        handleNewTask,
        handleNewTaskWithFormData
    };
})();
MainModule.init();