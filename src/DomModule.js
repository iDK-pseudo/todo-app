import { MainModule } from "./index.js";
import { format, parseISO } from "date-fns";

export const DomModule = (function () {
    let body = null, _existingList = null;
    function init(){
        body = document.querySelector("body");
        body.innerHTML = "";
        _renderBasicLayout();
        _bindUIActions();
    }

    function _renderBasicLayout() {
        const fragment = new DocumentFragment();

        //Header
        const header = _createElement("header"),
        h1 = _createElement("h1",{id:"title", textContent:"Todo"});
        header.appendChild(h1)
        fragment.appendChild(header);

        //Main
        const main = _createElement("main");
        fragment.appendChild(main);
 
        //Footer
        const footer = _createElement("footer"),
        button = _createElement("button",{id: "new-task-btn", textContent: "New"}),
        input = _createElement("input",{id: "userinput", type: "text", placeholder: "Write here for instant creation"});
        footer.append(button,input);
        fragment.appendChild(footer);
        body.appendChild(fragment);
    }

    function _createElement(element,props = {}){
        const domElement = document.createElement(element);
        for(let key in props){
            if(key === "textContent"){
                domElement.textContent = props.textContent;continue;
            }
            domElement.setAttribute(key,props[key]);
        }
        return domElement;
    }

    function renderEmptyMessages(){
        const main = document.querySelector("main"),
        emptyMsgPart1 = _createElement("p",{class:"empty-msg",textContent:"Aww.. Feels empty."}),
        emptyMsgPart2 = _createElement("p",{class:"empty-msg",textContent:"Why don't you add a task ?"});
        main.append(emptyMsgPart1,emptyMsgPart2);
        body.appendChild(main);
    }

    function _bindUIActions(){
        //Clicking title will render Home Page
        const title = document.getElementById("title");
        title.addEventListener("click",()=>{
            MainModule.init();
        })

        //Instant New Task
        const userInput = document.getElementById("userinput");
        userInput.addEventListener("keydown",(event)=>{
            if(event.key === "Enter"){
                if(event.target.value!=""){
                    MainModule.handleNewTask(event.target.value);
                }
                event.target.value = "";
            }
        })

        //New Task with Form
        const newTaskBtn = document.getElementById("new-task-btn");
        newTaskBtn.addEventListener("click",_clearPageAndRenderForm);
    }  

    function clearEmptyMsg(){
        const main = document.querySelector("main");
        while(main.firstChild && main.firstChild.getAttribute("class") === "empty-msg"){
            main.removeChild(main.firstChild);
        }
    }

    /*  isListWithDateIdPresent() -
        Check if List with Date ID already present in the DOM
        1. If yes, append the new task
        2. If no, render a new list with all the tasks
    */

    function isListWithDateIdPresent(dateid){
        _existingList = document.querySelector(`ul[date-id='${dateid}']`);
        return Boolean(_existingList);
    }

    function renderTasks(action,taskMap){
        const main = document.querySelector("main");
        if(action === "new"){
            const fragment = new DocumentFragment();
            
            //Iterating each date
            taskMap.forEach(function (value,key){
                const displayDate = format(parseISO(key),"d MMM''yy"), //Parsing and Formatting the Display Date from the Key
                date = _createElement("p",{textContent : displayDate, id:"date"}), //Making new <p> for displaying date at top
                list = _createElement("ul",{id: "list","date-id": key}); //<ul> with date-id attribute
                
                //Iterating each task, making DOM for it and appending it to the list
                value.forEach(function(task){   
                    const checkbox = _createElement("input",{type: "checkbox"}),
                    listItem = _createElement("li",{textContent : task.title});
                    list.append(checkbox,listItem);
                })
                fragment.append(date,list);
            });
            main.appendChild(fragment);
        }else if(action === "append"){
            let selectedId = _existingList.getAttribute("date-id"),
            taskArray = taskMap.get(selectedId),
            newTask = taskArray[taskArray.length-1];

            //Make new task DOM and append it to the existing list present
            const checkbox = _createElement("input",{type: "checkbox"}),
            listItem = _createElement("li",{textContent : newTask.title});
            _existingList.append(checkbox,listItem);
        }
    }

    function _clearPageAndRenderForm(){
        //Clear Page
        while(body.lastChild.tagName !== "HEADER"){
            body.removeChild(body.lastChild);
        }

        //Render Form
        const form = _createElement("form",{method: "post"}),
        br = _createElement("br"),
        titleInput = _createElement("input",{class:"form-input", type:"text", placeholder:"Title",required: ""}),
        descInput = _createElement("textarea",{class:"form-input", type:"text", placeholder:"Description", rows : "5",required: ""}),
        p = _createElement("p",{id: "choose-priority",textContent: "Choose Priority"}),
        radioHighPriority = _createElement("input",{type: "radio",id: "high-priority", name: "priority"}),
        labelHighPriority = _createElement("label",{for: "high-priority",textContent: "High"}),
        radioMedPriority = _createElement("input",{type: "radio",id: "medium-priority", name: "priority"}),
        labelMedPriority = _createElement("label",{for: "medium-priority",textContent: "Medium"}),
        radioLowPriority = _createElement("input",{type: "radio",id: "low-priority", name: "priority"}),
        labelLowPriority = _createElement("label",{for: "low-priority",textContent: "Low"}),
        submitBtn = _createElement("button",{type:"submit", class:"form-button", id:"submit-btn",textContent:"Submit"});
        form.append(titleInput,br,descInput,br,p,radioHighPriority,labelHighPriority,radioMedPriority,labelMedPriority,radioLowPriority,labelLowPriority,submitBtn);
        form.addEventListener("submit",_handleFormSubmission);
        body.appendChild(form);
    }

    function _handleFormSubmission(event){
        let priority = null;
        const form = event.target,
        title = form.elements[0].value,
        desc = form.elements[1].value;
        if(form.elements[2].checked){
            priority = "high"
        }else if(form.elements[3].checked){
            priority = "medium"
        }else{
            priority = "low"
        }
        event.preventDefault();
        MainModule.handleNewTaskWithFormData(title,desc,priority);
    }

    return {
        init,
        renderEmptyMessages,
        clearEmptyMsg,
        isListWithDateIdPresent,
        renderTasks
    }
})();