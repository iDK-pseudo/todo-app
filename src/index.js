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

        /*
        Check if List with Date ID already present in the DOM
            1. If yes, append the new task
            2. If no, render a new list with all the tasks
        */
        if(DomModule.isListWithDateIdPresent(dateId)){
            DomModule.renderTasks("append",TaskModule.getTaskMap());
        }else {
            DomModule.renderTasks("new",TaskModule.getTaskMap());
        }
        
    }

    function handleNewTaskWithForm(){
        DomModule.clearPageAndRenderForm();
    }
    return {init,handleNewTask,handleNewTaskWithForm};
})();
MainModule.init();