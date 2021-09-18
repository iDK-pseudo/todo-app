export const DomModule = (function () {
    function init(){
        _renderEmptyMainPage();
    }

    function _renderEmptyMainPage() {
        const fragment = new DocumentFragment();

        //Header
        const header = _createElement("header"),
        h1 = _createElement("h1",{id:"title", textContent:"Todo"});
        header.appendChild(h1)
        fragment.appendChild(header);

        //Main
        const main = _createElement("main"),
        emptyMsgPart1 = _createElement("p",{class:"empty-msg",textContent:"Aww.. Feels empty."}),
        emptyMsgPart2 = _createElement("p",{class:"empty-msg",textContent:"Why don't you add something by using the field below ?"});
        main.append(emptyMsgPart1,emptyMsgPart2);
        fragment.appendChild(main);
 
        //Footer
        const footer = _createElement("footer"),
        input = _createElement("input",{id: "userinput", type: "text", placeholder: "What's on your mind ?"});
        footer.appendChild(input);
        fragment.appendChild(footer);
        const body = document.querySelector("body");
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
    return {init}
})();