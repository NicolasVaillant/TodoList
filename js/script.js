//JS FILE

// $(document).ready(function(){
//     $('.collapsible').collapsible();
// });


//----------------------------------------------------------------------
window.onload = function () {reloadTasks();reloadNote()}
window.onclick = function (){hideMenu()}
window.oncontextmenu = function (e){e.preventDefault()}
//----------------------------------------------------------------------


let compteurCard, compteurLiSub = 0;

let compteurTodoBanMain = 0;

const colorNotes = ["rgb(181, 222, 255)","rgb(252, 255, 166)", "rgb(193, 255, 215)", "rgb(240, 217, 255)"]

const list = document.querySelector('ul');
const date = document.querySelector('.date');
const lastSaveTime = document.querySelector('.lastSaveTime');
const input = document.getElementById("myInput");
const myUL = document.getElementById("myUL");
const myUL_note = document.getElementById("myUL_note");
const dm = document.querySelector("#dm");
const refresh_but = document.querySelector("#rb");

const butNote = document.querySelector("#butNote");

const account = document.querySelector("#account");
const selector = document.querySelector(".selector");

const nothingToShow = document.querySelector(".nothingToShow");

const impTask_start = document.querySelector("#impTask_start");
const speTask_start = document.querySelector("#speTask_start");
const addHas = document.querySelector("#addHas");



function filterTasks(check_id){
    const nbElem = [];
    for(let i = 0 ; i < myUL.childElementCount ; i++){
        if(myUL.childElementCount !== 0){
            if(check_id === "all"){
                myUL.children[i].style.display = "";
                nbElem.push(true)
            }else if(check_id === "reminder"){
                console.log("reminder")
            }else{
                if(myUL.children[i].children[0].children[0].children[0].classList.contains(check_id)) {
                    myUL.children[i].style.display = "";
                    nbElem.push(true)
                }else{
                    myUL.children[i].style.display = "none";
                    nbElem.push(false)
                }
            }
            const counts = {};
            for (const num of nbElem) {
                counts[num] = counts[num] ? counts[num] + 1 : 1;
            }

            if(counts[false] === myUL.childElementCount){
                nothingToShow.style.display = "flex";
            }else{
                nothingToShow.style.display = "none";
            }
        }else{return;}
    }

//    faire un test sur style: none des children pour afficher ou non
//    nothingToShow.classList.add('show');


}

function inputSubEnter(key,element){
    if (key === 'Enter') {addChild(element)}
}

function removeAll(element){
    element.closest('.todoBanMain').classList.add('slideOut')
    setTimeout(function (){
        element.closest('.todoBanMain').remove();
        saveTasks(false);
    }, 200)
}

function removeOne(element){
    element.parentElement.classList.add('slideOut')
    setTimeout(function (){
        element.parentElement.remove();
        saveTasks(false);
    }, 200)
}

function addChild(element){
    compteurLiSub++;
    const div = element.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[1].children[0];
    const staticContent = div.children[0];

    const li_sub = document.createElement("li");
    li_sub.classList.add('li_sub');
    li_sub.setAttribute("data-hierarchy", compteurLiSub);

    const input_set = document.createElement("input");
    input_set.setAttribute("type", "text");
    // input_set.setAttribute("autofocus", "");
    input_set.classList.add('input_sub');
    input_set.onkeypress = function(e){inputSubEnter(e.key,this)};
    li_sub.appendChild(input_set);

    const span = document.createElement("span");
    const txt = document.createTextNode("\u00D7");

    span.className = "close";
    span.appendChild(txt);
    span.onclick = function(){removeOne(this);saveTasks(false);};
    li_sub.appendChild(span);

    // div.appendChild(li_sub);
    div.insertBefore(li_sub, staticContent);
}

list.addEventListener('click', function(ev) {
    let li = ev.target;
    if (li.tagName === 'DIV') {}
}, false);

function linkToNote(element){
    const dup = element.parentElement.parentElement;
    const clone = dup.cloneNode(true);
    clone.classList.add('noteCard');
    // dup.parentNode.appendChild(clone);
}

function checkBox(element){
    const parent = element.parentElement;
    if(element.checked){
        parent.style.border = "2px dashed red";
        // parent.classList.add('liChecked');
    }else{
        parent.style.border = "";
        // parent.classList.remove('liChecked');
    }
}

function developChild(){
    $('.collapsible').collapsible()
}

function setTodo(element){
    const div = element.closest(".todoBanMain").children[0].children[0].children[0];
    if(element.dataset.name === "star"){
        if(div.classList.contains("importantTasks")){
            div.classList.remove("importantTasks");
            element.parentElement.children[0].classList.remove("importantTasks_color");
        }
        element.classList.toggle("specialTasks_color");
        div.classList.toggle("specialTasks");
    }else{
        if(div.classList.contains("specialTasks")){
            div.classList.remove("specialTasks");
            element.parentElement.children[1].classList.remove("specialTasks_color");
        }
        element.classList.toggle("importantTasks_color");
        div.classList.toggle("importantTasks");
    }
    return div.classList;
}
function getDate(){
    const date_reminder = new Date();
    let h = date_reminder.getHours();
    if (h < 10) {
        h = "0" + h
    }
    let m = date_reminder.getMinutes();
    if (m < 10) {
        m = "0" + m
    }
    return h + "h" + m;
}
function getDateDay(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
}
function reminder(elem) {
    getDate();
}

function setFinish(e){
    const parent = e.target.closest('.todoBanMain');
    parent.children[0].children[0].children[0].classList.toggle('endTasks');
    parent.children[1].children[0].classList.toggle('endTasks_text');
    parent.children[1].children[1].children[0].classList.toggle('endTasks_text');
    parent.children[1].children[2].children[0].classList.toggle('endTasks_container');
}
function rightClick(e){
    e.preventDefault();
    document.getElementById(
        "contextMenuNote").style.display = "none";
    const parent = e.target.closest('.todoBanMain');

    parent.classList.add('bumpOnRClick');
    setTimeout(function (){
        parent.classList.remove('bumpOnRClick')
    },200)

    const i_zone_1 = document.querySelector('#i_zone_1');
    const txt_zone_1 = document.querySelector('.txt_zone_1');
    const txt_zone_2 = document.querySelector('.txt_zone_2');
    const txt_zone_3 = document.querySelector('.txt_zone_3');
    const txt_zone_4 = document.querySelector('.txt_zone_4');

    const menu = document.getElementById("contextMenu")

    menu.children[0].children[6].children[1].children[0].innerHTML =  "Créée le " + `${parent.dataset.date}` +
        " à " + `${parent.dataset.hour}`;

    txt_zone_2.innerHTML = "Ajouter le filtre important";
    txt_zone_3.innerHTML = "Ajouter le filtre special";

    txt_zone_1.innerHTML = "Marquer comme terminée";
    i_zone_1.classList.add('fas');
    i_zone_1.classList.add('fa-check-circle');

    if(parent.children[0].children[0].children[0].classList.contains('endTasks')){
        txt_zone_1.innerHTML = "Marquer comme non terminée";

        parent.children[1].children[0].classList.add('endTasks_text');
        parent.children[1].children[1].children[0].classList.add('endTasks_text');
        parent.children[1].children[2].children[0].classList.add('endTasks_container');

        i_zone_1.classList.remove('fas');
        i_zone_1.classList.remove('fa-check-circle');
        i_zone_1.classList.add('circle');

        menu.children[0].children[1].classList.add('disabledOptionsRC');
        menu.children[0].children[2].classList.add('disabledOptionsRC');

    }else if(parent.children[0].children[0].children[0].classList.contains('importantTasks')){

        txt_zone_2.innerHTML = "Enlever le filtre important";
        menu.children[0].children[1].classList.remove('disabledOptionsRC');

    }else if(parent.children[0].children[0].children[0].classList.contains('specialTasks')){

        txt_zone_3.innerHTML = "Enlever le filtre special";
        menu.children[0].children[2].classList.remove('disabledOptionsRC');

    }
    else{
        txt_zone_1.innerHTML = "Marquer comme terminée";
        txt_zone_2.innerHTML = "Ajouter le filtre important";
        txt_zone_3.innerHTML = "Ajouter le filtre special";

        i_zone_1.classList.remove('circle');
        i_zone_1.classList.add('fas');
        i_zone_1.classList.add('fa-check-circle');

        parent.children[1].children[0].classList.remove('endTasks_text');
        parent.children[1].children[1].children[0].classList.remove('endTasks_text');
        parent.children[1].children[2].children[0].classList.remove('endTasks_container');

        menu.children[0].children[1].classList.remove('disabledOptionsRC');
        menu.children[0].children[2].classList.remove('disabledOptionsRC');

    }
    txt_zone_4.innerHTML = "Supprimer la tâche";

    function zone1(parent){
        //TODO: cant right click end tasks then click on check and save it
        parent.children[0].children[0].children[0].classList.toggle('endTasks');
        parent.children[1].children[0].classList.toggle('endTasks_text');
        parent.children[1].children[1].children[0].classList.toggle('endTasks_text');
        parent.children[1].children[2].children[0].classList.toggle('endTasks_container');

        parent.children[0].children[0].children[0].classList.remove('importantTasks');
        parent.children[0].children[0].children[0].classList.remove('specialTasks');
    }
    function zone2(parent,element){
        if(element.classList.contains('disabledOptionsRC')){}else{
            parent.children[0].children[0].children[0].classList.toggle('importantTasks');
            parent.children[0].children[0].children[0].classList.remove('specialTasks');
        }
    }
    function zone3(parent,element){
        if(element.classList.contains('disabledOptionsRC')){}else{
            parent.children[0].children[0].children[0].classList.toggle('specialTasks');
            parent.children[0].children[0].children[0].classList.remove('importantTasks');
        }
    }
    function zone4(parent){
        parent.classList.add('slideOut');
        setTimeout(function (){
            parent.remove()
        }, 200)
    }
    function zone5(parent){
        const check_user_1 = document.querySelector('#check_user_1')
        const valueInput = parent.children[1].children[1].children[0].innerHTML;
        let user;
        if (check_user_1.checked) {user = "Nicolas"}else{user= "Thérence"}
        const text = `${user}` + " a partagé le contenu d'une note avec vous. " +
            `\"${valueInput}\"` + " est le titre de la note." + " La note a été créée le " + `${parent.dataset.date}` +
            " à " + `${parent.dataset.hour}` + ".";
        console.log(text)
    }

    if (document.getElementById("contextMenu").style.display === "block")
        hideMenu();
    else{
        menu.style.display = 'flex';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";

        //END
        menu.children[0].children[0].onclick = function(){zone1(parent);saveTasks(false);};
        //IMPORTANT
        menu.children[0].children[1].onclick = function(){zone2(parent,this);saveTasks(false);};
        //SPECIAL
        menu.children[0].children[2].onclick = function(){zone3(parent,this);saveTasks(false);};
        //DELETE
        menu.children[0].children[3].onclick = function(){zone4(parent);saveTasks(false);};
        //SHARE
        menu.children[0].children[4].onclick = function(){zone5(parent);saveTasks(false);};
    }
}
function hideMenu() {
    document.getElementById(
        "contextMenu").style.display = "none";
    document.getElementById(
        "contextMenuNote").style.display = "none";
}

function createTask(keypress,filter, nbLS, stateLS, classLS, valueLS, hastag, data_set) {
    const expand = document.createElement("i");
    expand.onclick = function(){developChild()};
    expand.classList.add("fas");
    expand.classList.add("fa-chevron-down");
    expand.classList.add("expandChevron");
    expand.classList.add("checkBox");
    //Add value wrote in input
    const text = document.createElement("p");
    // res.setAttribute("type", "text");
    text.classList.add("textTask");
    const inputValue = input.value;
    const itag_end = document.createElement("i");
    itag_end.classList.add("fas");
    itag_end.classList.add("fa-check-circle");
    itag_end.onclick = setFinish;
    //---------------------------------------------------COLLAPSIBLE
    const todoBanMain = document.createElement("div");
    todoBanMain.classList.add('todoBanMain');

    const div_option = document.createElement("div");
    const div_option_container = document.createElement("div");
    div_option.classList.add('div_option');
    const div_option_static = document.createElement("div");
    const div_option_container_static = document.createElement("div");
    div_option_static.classList.add('div_optionstatic');

    let nb_subtask = 0;
    const numberOfElement = document.createElement("p");
    numberOfElement.innerText = `${nb_subtask}` + " sous-tâche(s) restante(s).";

    const todoBanMainContainer = document.createElement("div");
    todoBanMainContainer.classList.add('todoBanMainContainer')
    const collapsible_ul = document.createElement("ul");
    collapsible_ul.classList.add('collapsible')
    const collapsible_li = document.createElement("li");
    const collapsible_div_header = document.createElement("div");
    const collapsible_div_body = document.createElement("div");
    collapsible_div_header.classList.add('collapsible-header')
    collapsible_div_body.classList.add('collapsible-body');
    const collapsible_div_bodyContent = document.createElement("div");
    const div_number = document.createElement("div");
    collapsible_div_bodyContent.classList.add('collapsible_div_bodyContent');
    const collapsible_div_bodyContent_staticContent = document.createElement("div");
    collapsible_div_bodyContent_staticContent.classList.add('collapsible_div_bodyContent_staticContent')
    const itag_imp = document.createElement("i");
    itag_imp.classList.add("fas");
    itag_imp.classList.add("fa-exclamation-circle");
    itag_imp.setAttribute("data-name", "important");
    itag_imp.onclick = function(){setTodo(this);saveTasks(false)};
    const itag_star = document.createElement("i");
    itag_star.classList.add("fas");
    itag_star.classList.add("fa-star");
    itag_star.setAttribute("data-name", "star");
    itag_star.onclick = function(){setTodo(this);saveTasks(false)};
    //---------------------------------------------------COLLAPSIBLE
    const div_text = document.createElement("div");
    //---------------------------------------------------COLLAPSIBLE
    const itage = document.createElement("i");
    const itag = document.createElement("i");
    const itac = document.createElement("i");
    itage.classList.add("fas");
    itage.classList.add("fa-times");
    itage.onclick = function(){removeAll(this);saveTasks(false)};
    itag.classList.add("fas");
    itag.classList.add("fa-plus-circle");
    itag.onclick = function(){addChild(this)};
    itag.setAttribute("name", "morebut");
    itac.classList.add("fas");
    itac.classList.add("fa-clock");
    itac.onclick = function(){reminder(this)};
    itac.setAttribute("name", "reminder");
    //---------------------------------------------------RIGHT CLICK
    todoBanMain.oncontextmenu= rightClick;
    //---------------------------------------------------AppendChild
    collapsible_div_header.appendChild(expand);
    div_option_container_static.appendChild(itag_imp);
    div_option_container_static.appendChild(itag_star);
    div_number.appendChild(numberOfElement);
    div_option_static.appendChild(div_option_container_static);
    collapsible_div_bodyContent_staticContent.appendChild(div_number);
    collapsible_div_bodyContent_staticContent.appendChild(div_option_static);
    collapsible_div_bodyContent.appendChild(collapsible_div_bodyContent_staticContent);
    collapsible_div_body.appendChild(collapsible_div_bodyContent);
    collapsible_li.appendChild(collapsible_div_header);
    collapsible_li.appendChild(collapsible_div_body);
    collapsible_ul.appendChild(collapsible_li);
    todoBanMainContainer.appendChild(itag_end);
    div_text.appendChild(text);
    todoBanMainContainer.appendChild(div_text);
    // todoBanMainContainer.appendChild(itac);
    // div_option_container.appendChild(itag);
    div_option_container.appendChild(itage);
    div_option.appendChild(div_option_container);
    todoBanMainContainer.appendChild(div_option);
    todoBanMain.appendChild(collapsible_ul);
    todoBanMain.appendChild(todoBanMainContainer);
    //---------------------------------------------------VALIDATION
    const spanhas = document.createElement("span");
    spanhas.classList.add('colorhastags');
    const emptyTasks = localStorage.getItem("Node_todo");
    let hour,date_act;
    if(keypress === "input" || keypress === "button"){
        compteurTodoBanMain ++;
        hour = getDate();
        date_act = getDateDay();
        if (inputValue !== ''){
            todoBanMain.setAttribute("data-hour", hour)
            todoBanMain.setAttribute("data-date", date_act);

            todoBanMain.setAttribute("data-hierarchy", compteurTodoBanMain.toString());

            myUL.appendChild(todoBanMain);
            input.value = "";
            text.innerHTML = inputValue;

            if(filter !== false){
                if(filter === "important"){
                    collapsible_div_header.classList.add('importantTasks')
                }else if(filter === "special"){
                    collapsible_div_header.classList.add('specialTasks')
                }
                myUL.appendChild(todoBanMain)
                input.value = "";
                text.innerHTML = inputValue;
            }
            const spanhas = document.createElement("span");
            spanhas.classList.add('colorhastags')
            let txt = "";

            if(inputValue.includes("#")){
                let allhastags = inputValue.indexOf("#");
                const indices = [];
                const res = [];
                while (allhastags !== -1) {
                    indices.push(allhastags);
                    allhastags = inputValue.indexOf("#", allhastags + 1);
                }
                for(let i = 0 ; i < indices.length ; i++){
                    txt = document.createTextNode(inputValue.substr(indices[i], inputValue.length).split(" ")[i]);
                    spanhas.appendChild(txt);
                    div_text.appendChild(spanhas);
                }
                input.value = "";
                text.innerHTML = inputValue.split("#")[0];
            }else{
                txt = document.createTextNode("");
                spanhas.appendChild(txt);
                div_text.appendChild(spanhas);
            }
        }
    }else{ //LS : ON RELOAD
        text.innerHTML = valueLS.split("#")[0];

        if(hastag !== "undefined"){
            spanhas.appendChild(document.createTextNode(hastag));
            div_text.appendChild(spanhas);
        }

        todoBanMain.setAttribute("data-hour", data_set.hour)
        todoBanMain.setAttribute("data-date", data_set.date)
        todoBanMain.setAttribute("data-hierarchy", data_set.hierarchy)

        if(stateLS.length !== 1){
            for(let i = 0 ; i < stateLS.length ; i++){
                collapsible_div_header.classList.add(stateLS[i]);
                if(stateLS[i] === "endTasks"){
                    // console.log(todoBanMain.children[1].children[0])
                    todoBanMain.children[1].children[0].classList.toggle('endTasks_text');
                    todoBanMain.children[1].children[1].children[0].classList.toggle('endTasks_text');
                    todoBanMain.children[1].children[2].children[0].classList.toggle('endTasks_container');
                }
            }

        }
        myUL.appendChild(todoBanMain);
    }
}

function saveTasks(hourSaveClick){
    const containerTodo = document.querySelector('#myUL');
    const containerTodoChildren = containerTodo.children; //todoBanMain
    let containerTodo_subChildChildren;

    //CHILD-------------------------------------------
    let childClass = {
        length: 0,
        findClass: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    let child_classNameState = {
        length: 0,
        findClassState: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    let childParent= {
        length: 0,
        findParent: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    let childValue= {
        length: 0,
        findValue: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    let childValue_has= {
        length: 0,
        findValueHas: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    let childDataSet= {
        length: 0,
        findDataSet: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    //SUB CHILD-------------------------------------------
    let subChildClass = {
        length: 0,
        findClassSub: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    let subChildValue= {
        length: 0,
        findValueSub: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    if(containerTodoChildren.length !== 0){
        for(let i = 0 ; i < containerTodoChildren.length ; i++){
            childClass.findClass(containerTodoChildren[i].className);
            child_classNameState.findClassState(containerTodoChildren[i].children[0].children[0].children[0].className);
            childParent.findParent(containerTodoChildren[i].closest(".todoBanMain"));
            childValue.findValue(containerTodoChildren[i].children[1].children[1].children[0].innerHTML);
            // if(containerTodoChildren[i].children[1].children[1].childElementCount > 1){
            childValue_has.findValueHas(containerTodoChildren[i].children[1].children[1].children[1].innerHTML);
            // }else{}
            childDataSet.findDataSet(containerTodoChildren[i].dataset);
        }
    }
    // if(containerTodoChildren.length !== 0){
    //     for(let i = 0 ; i < containerTodo_subChildChildren.length ; i++){
    //         if(containerTodo_subChildChildren[i].className === "li_sub"){
    //             subChildClass.findClassSub(containerTodo_subChildChildren[i].className);
    //             subChildValue.findValueSub(containerTodo_subChildChildren[i].children[0].value);
    //
    //         }
    //     }
    // }
    // if(containerTodo.childElementCount !== 0){
    //     // for(let i = 0 ; i < containerTodoChildren.length; i++){
    //     const containerTodo_subChild = document.querySelectorAll('.collapsible_div_bodyContent');
    //
    //     containerTodo_subChild.forEach(function(element){
    //         for(let i = 0 ; i < containerTodo_subChild.childElementCount; i++){
    //             console.log(element.children[i])
    //             console.log(element.children)
    //         }
    //
    //     })
    //     // containerTodo_subChildChildren = containerTodo_subChild.children;
    //     // }
    //
    // }else{containerTodo_subChildChildren = null}


    let hourSave;
    if (hourSaveClick === false) {
        hourSave = getDate();
    }else {
        hourSave = hourSaveClick;
    }
    const cTodo = {
        child_nb : containerTodo.childElementCount,
        child_className : childClass,
        child_classNameState : child_classNameState,
        child_value : childValue,
        childValue_has : childValue_has,
        childDataSet : childDataSet,
        lastSave : hourSave,
        // subChild_className : subChildClass,
        // subChild_value : subChildValue,
        counterTasks : compteurTodoBanMain
    }
    localStorage.setItem("Node_todo", JSON.stringify(cTodo));
}


function reloadTasks(){
    const elem = JSON.parse(localStorage.getItem("Node_todo"));
    let nb_child = elem.child_nb;
    lastSaveTime.innerHTML =  elem.lastSave;

    for(let i = 0 ; i < nb_child ; i++){
        let class_child = elem.child_className[i];
        let state_child = elem.child_classNameState[i];
        let value_child = elem.child_value[i];
        let value_child_has = elem.childValue_has[i];
        let dataset_child = elem.childDataSet[i];
        // console.log(dataset_child)
        createTask(
            false,
            false,
            nb_child,
            state_child.split(" "),
            class_child,
            value_child,
            value_child_has,
            dataset_child
        );
    }
}

function reloadNote(){
    const parse_Note = JSON.parse(localStorage.getItem("Node_note"));
    let nb_child = parse_Note.child_nb;
    // lastSaveTime.innerHTML =  parse.lastSave;

    for(let i = 0 ; i < nb_child ; i++){
        let class_child = parse_Note.child_className[i];
        let value_content = parse_Note.child_content[i];
        let value_title = parse_Note.child_title[i];
        let value_style = parse_Note.child_style[i];
        let value_dataset = parse_Note.childDataSet[i];

        createNote(
            false,
            nb_child,
            class_child,
            value_title,
            value_content,
            value_style,
            value_dataset
        );
    }
}


input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        createTask("input",false);
        saveTasks(false);
    }
}, false);


butNote.addEventListener('click', function(e) {
    createNote("button");
    saveNote();

}, false);


impTask_start.addEventListener('click', function (e){
    createTask("button","important");
    saveTasks(false);

}, false);

speTask_start.addEventListener('click', function (e){
    createTask("button","special");
    saveTasks(false);

}, false);

// addHas.addEventListener('click', function (e){
// //    TODO: ADD # AT THE END OF INPUT
// }, false);

function filterNotes(){
    let input, filter, ul, li;
    input = document.getElementById('filterNote');

    filter = input.value.toUpperCase();

    ul = document.getElementById("myUL_note");
    li = ul.getElementsByTagName('li');

    let valueTitle,valueContent;

    for (let i = 0; i < li.length; i++) {

        valueTitle = li[i].children[0].children[0].value;
        valueContent = li[i].children[2].value;

        if (valueTitle.toUpperCase().indexOf(filter) > -1 ||
            valueContent.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function toTop(element){
    const elem = element.parentElement.parentElement;
    compteurCard++;
    elem.setAttribute("data-name", compteurCard.toString());

    const classname = document.getElementsByClassName('noteCard');
    const divs = [];
    for (let i = 0 ; i < classname.length; ++i) {
        divs.push(classname[i]);
    }
    divs.sort(function(a, b) {
        return a.dataset.name.localeCompare(b.dataset.name);
    });


    divs.forEach(function(el) {
        myUL_note.insertBefore(el, myUL_note.childNodes[0]);
    });
}

function changeColor(element){
    //Ajout d'un test pour éviter de retomber directement sur la même couleur
    const elem = element.closest('.noteCard');

    const colorNotes = ["rgb(181, 222, 255)","rgb(252, 255, 166)", "rgb(193, 255, 215)", "rgb(240, 217, 255)"]

    const index = colorNotes.indexOf(elem.style.background);
    if (index > -1) {
        colorNotes.splice(index, 1);
    }
    elem.style.background = colorNotes[Math.floor(Math.random()*colorNotes.length)];
}

function removeNote(element) {
    element.parentElement.parentElement.parentElement.classList.add('slideOut')
    setTimeout(function (){
        element.parentElement.parentElement.parentElement.remove();
    }, 200)
}

let mouse = false;

function mouseEnter(element){
    mouse = true;
    infoNote(element);
}
function mouseLeave(element){
    setTimeout(function (){
        mouse = false;
        infoNote(element);
    },100)
}


function infoNote(element){
    const res =  element.parentElement.parentElement.parentElement.children[1];
    if(mouse){
        element.classList.add('expendNoteOption_active'); //i
        res.classList.add('expendNoteOption'); //option
        res.onmouseleave = function(){mouseLeave(this)};
    }else{
        res.children[0].children[0].children[1].children[0].classList.remove('expendNoteOption_active');
        element.classList.remove('expendNoteOption');
    }
}

function createNote(keypress,nb,class_note,title_note,content,style,dataset){
    compteurCard++;
    const lin = document.createElement("li");
    const div = document.createElement("div");
    const divicon = document.createElement("div");
    const titre_in = document.createElement("input");
    const cont_in = document.createElement("textarea");
    cont_in.classList.add('contentNote')
    div.classList.add('headerTitle')
    divicon.classList.add('headerTitleIcon')
    titre_in.setAttribute("type", "text");
    titre_in.setAttribute("placeholder", "Titre");
    cont_in.setAttribute("type", "text");
    cont_in.setAttribute("placeholder", "Contenu");
    cont_in.setAttribute("onkeyup", "SizeTextarea(this)");
    lin.classList.add('noteCard');
    lin.oncontextmenu= rightClickNote;

    cont_in.onkeyup = function(){saveNote()};
    titre_in.onkeyup = function(){saveNote()};

    const itagi = document.createElement("i");

    itagi.classList.add("fas");
    itagi.classList.add("fa-info-circle");

    itagi.onmouseover = function(){mouseEnter(this)};

    // divicon.appendChild(itagi);

    //divOption NOT PREFERED
    const divOption = document.createElement("div");
    divOption.classList.add("optionNote");
    //------------------------------------options
    const itagp = document.createElement("i");
    const itagtt = document.createElement("i");
    const itagtl = document.createElement("i");

    itagp.classList.add("fas");
    itagp.classList.add("fa-palette");
    itagp.onclick = function(){changeColor(this);saveNote()};

    itagtt.classList.add("fas");
    itagtt.classList.add("fa-chevron-circle-up");
    itagtt.onclick = function(){toTop(this);saveNote();};

    itagtl.classList.add("fas");
    // itagtl.classList.add("fa-link");
    itagtl.classList.add("fa-share-square");
    itagtl.onclick = function(){linkToNote(this);saveNote();};

    // divOption.appendChild(itagtt);
    // divOption.appendChild(itagp);
    // divOption.appendChild(itagtl);
    //------------------------------------
    const span = document.createElement("span");
    const txt = document.createTextNode("\u00D7");
    const spanp = document.createElement("span");
    const pipe = document.createTextNode("|");
    span.className = "close";
    span.appendChild(txt);

    span.onclick = function(){removeNote(this);saveNote();};

    //FONCTION setToTop()
    // divicon.appendChild(itagtt);
    divicon.appendChild(itagp);
    divicon.appendChild(itagtl);
    divicon.appendChild(span);

    div.appendChild(titre_in);
    div.appendChild(divicon);

    lin.appendChild(div);
    lin.appendChild(divOption);
    lin.appendChild(cont_in);

    if(keypress === "button"){
        let hour = getDate();
        let date_act = getDateDay();

        lin.setAttribute("data-hour", hour)
        lin.setAttribute("data-date", date_act);

        lin.setAttribute("data-name", compteurCard);
        lin.style.background = colorNotes[Math.floor(Math.random()*colorNotes.length)];
        myUL_note.appendChild(lin);
    }else{ //LS
        lin.style.background = style;
        titre_in.value = title_note;
        cont_in.innerHTML = content
        myUL_note.appendChild(lin);
    }

}

let i = 0;
function SizeTextarea(e) {
    // e.target.style.height = el.offsetHeight + el.offsetHeight / 4;
}


//TODO:
//drag and drop pour réarranger ordre taches
//enter depuis child taches permet de créer une autre tache
//créer input pour texte tache pour le modifier par la suite
//ajouter indicateur d'avancement d'une tache
//ajouter importance des taches
//Creer sous categories pour filter taches
//si on selectionne une taches (avec checkbox) on peut lui attribuer un niveau d'importance

//----------------------------------------------------------------------
const url = "https://nicolasvaillant.net/local/prive/todo/tempfiles/temp.php";
function saveData(){
    post(url, {value: xxxxxxx}).then(r =>
        console.log(r)
    );
}
window.post = function(url, data) {
    return fetch(url, {method: "POST", body: JSON.stringify(data)});
}
window.get = function(url) {
    return fetch(url, {method: "GET", mode: "cors"});
}
function getData(){
    const xmltype_2 = new XMLHttpRequest();
    xmltype_2.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(JSON.parse(this.responseText));
            // const myObj = JSON.parse(this.responseText);

        }
    };
    xmltype_2.open("GET", "https://nicolasvaillant.net/local/prive/todo/tempfiles/results.php", true);
    xmltype_2.send();
}
//----------------------------------------------------------------------


const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
    document.documentElement.classList.add('toggle_mode');
}

dm.addEventListener('click', function (){
    dm.classList.toggle("spinMode");
    document.documentElement.classList.toggle('toggle_mode');

    let theme = "light";
    if (document.documentElement.classList.contains("toggle_mode")) {
        theme = "dark";
    }
    localStorage.setItem("theme", theme);
})

refresh_but.addEventListener('click', function (){
    refresh_but.classList.toggle("spinModeAll");
    saveTasks(getDate());
});
account.addEventListener('click', function (e){
    if(e.target.tagName === 'I'){
        selector.classList.toggle('selectorVisibility')
    }
});

function chooseUser(id){
    console.log(id)
}

function rightClickNote(e){
    e.preventDefault();
    document.getElementById(
        "contextMenu").style.display = "none";
    const parent = e.target.closest('.noteCard');

    parent.classList.add('bumpOnRClick');
    setTimeout(function (){
        parent.classList.remove('bumpOnRClick')
    },200)

    function zone1_note(parent){

    }
    function zone2_note(parent){

    }
    function zone3_note(parent){

    }

    if (document.getElementById("contextMenuNote").style.display === "block")
        hideMenu();
    else{
        const menu = document.getElementById("contextMenuNote")
        menu.style.display = 'flex';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";

        menu.children[0].children[0].onclick = function(){zone1_note(parent);saveTasks(false);};
        menu.children[0].children[1].onclick = function(){zone2_note(parent);saveTasks(false);};
        menu.children[0].children[2].onclick = function(){zone3_note(parent);saveTasks(false);};
    }
}

function saveNote(){
    const containerNote = document.querySelector('#myUL_note');
    const containerNoteChildren = containerNote.children;

    //CHILD-------------------------------------------
    let childClass = {
        length: 0,
        findClass: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    let childStyle= {
        length: 0,
        findStyle: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    let childTitle= {
        length: 0,
        findValue: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    let childContent= {
        length: 0,
        findValueC: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    let childDataSet= {
        length: 0,
        findDataSet: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };

    if(containerNoteChildren.length !== 0){
        for(let i = 0 ; i < containerNoteChildren.length ; i++){
            childClass.findClass(containerNoteChildren[i].className);
            childStyle.findStyle(containerNoteChildren[i].style.background);
            childTitle.findValue(containerNoteChildren[i].children[0].children[0].value);
            childContent.findValueC(containerNoteChildren[i].children[2].value);
            childDataSet.findDataSet(containerNoteChildren[i].dataset);
        }
    }

    const cNote = {
        child_nb : containerNote.childElementCount,
        child_className : childClass,
        child_style : childStyle,
        child_title : childTitle,
        child_content : childContent,
        childDataSet : childDataSet,
        // lastSave : hourSave,
        // counterTasks : compteurTodoBanMain
    }
    localStorage.setItem("Node_note", JSON.stringify(cNote));
}