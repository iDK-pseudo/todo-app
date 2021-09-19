import { MainModule } from "./index.js";
import { format, parseISO } from "date-fns";

export const DomModule = (function () {
    let body = null, _existingList = null;
    function init(){
        body = document.querySelector("body");
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
        newTaskBtn.addEventListener("click",MainModule.handleNewTaskWithForm);
    }  

    function clearEmptyMsg(){
        const main = document.querySelector("main");
        while(main.firstChild && main.firstChild.getAttribute("class") === "empty-msg"){
            main.removeChild(main.firstChild);
        }
    }

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

    function clearPageAndRenderForm(){
        //Clear Page
        while(body.lastChild.tagName !== "HEADER"){
            body.removeChild(body.lastChild);
        }

        //Render Form
        const form = _createElement("form"),
        br = _createElement("br"),
        titleInput = _createElement("input",{class:"form-input", type:"text", placeholder:"Title"}),
        descInput = _createElement("textarea",{class:"form-input", type:"text", placeholder:"Description", rows : "5"}),
        p = _createElement("p",{id: "choose-priority",textContent: "Choose Priority"}),
        highPriorityBtn = _createElement("button",{type:"button",class:"form-button", id:"high-priority",textContent:"High"}),
        mediumPriorityBtn = _createElement("button",{type:"button",class:"form-button", id:"medium-priority",textContent:"Medium"}),
        lowPriorityBtn = _createElement("button",{type:"button", class:"form-button", id:"low-priority",textContent:"Low"}),
        submitBtn = _createElement("button",{type:"submit", class:"form-button", id:"submit-btn",textContent:"Submit"});
        form.append(titleInput,br,descInput,br,p,highPriorityBtn,mediumPriorityBtn,lowPriorityBtn,submitBtn);
        body.appendChild(form);
    }

    return {
        init,
        renderEmptyMessages,
        clearEmptyMsg,
        isListWithDateIdPresent,
        renderTasks,
        clearPageAndRenderForm
    }
})();