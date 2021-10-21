//JS FILE

// $(document).ready(function(){
//     $('.collapsible').collapsible();
// });

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

function filterTasks(check_id){
    for(let i = 0 ; i < myUL.childElementCount ; i++){
        if(myUL.childElementCount !== 0){
            if(check_id === "all"){
                myUL.children[i].style.display = "";
            }else if(check_id === "reminder"){
                console.log("reminder")
            }else{
                if(myUL.children[i].children[0].children[0].children[0].classList.contains(check_id)) {
                    myUL.children[i].style.display = "";
                }else{
                    myUL.children[i].style.display = "none";
                }
            }
        }else{return}
    }
}

function inputSubEnter(key,element){
    if (key === 'Enter') {addChild(element)}
}

function removeAll(element){
    // element.parentElement.parentElement.remove()
    element.parentElement.parentElement.classList.add('slideOut')
    setTimeout(function (){
        element.parentElement.parentElement.remove()
    }, 200)
}

function removeOne(element){
    element.parentElement.classList.add('slideOut')
    setTimeout(function (){
        element.parentElement.remove()
    }, 200)
}

function addChild(element){
    compteurLiSub++;
    const div = element.parentElement.parentElement.children[0].children[0].children[1].children[0];
    // console.log(div)
    const staticContent = div.children[0];
    // console.log(staticContent)

    const divHeader = element.parentElement.parentElement.parentElement.children[0].children[0].children[0];

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
    span.onclick = function(){removeOne(this)};
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
function reminder(elem) {
    getDate();
}

function createTask(keypress, nbLS, stateLS, classLS, valueLS) {
    const expand = document.createElement("i");
    expand.onclick = function(){developChild()};
    expand.classList.add("fas");
    expand.classList.add("fa-chevron-down");
    expand.classList.add("expandChevron");
    expand.classList.add("checkBox");
    //Add value wrote in input
    const res = document.createElement("input");
    res.setAttribute("type", "text");
    res.classList.add("input_sub");
    const inputValue = input.value;
    //---------------------------------------------------COLLAPSIBLE
    const todoBanMain = document.createElement("div");
    todoBanMain.classList.add('todoBanMain');
    todoBanMain.setAttribute("data-hierarchy", compteurTodoBanMain.toString());
    const todoBanMainContainer = document.createElement("div");
    todoBanMainContainer.classList.add('todoBanMainContainer')
    const collapsible_ul = document.createElement("ul");
    collapsible_ul.classList.add('collapsible')
    const collapsible_li = document.createElement("li");
    const collapsible_div_header = document.createElement("div");
    const collapsible_div_body = document.createElement("div");
    collapsible_div_header.classList.add('collapsible-header')
    collapsible_div_body.classList.add('collapsible-body')
    const collapsible_div_bodyContent = document.createElement("div");
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
    const span = document.createElement("span");
    const itag = document.createElement("i");
    const itac = document.createElement("i");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.onclick = function(){removeAll(this);saveTasks(false)};
    itag.classList.add("fas");
    itag.classList.add("fa-plus-circle");
    itag.onclick = function(){addChild(this)};
    itag.setAttribute("name", "morebut");
    itac.classList.add("fas");
    itac.classList.add("fa-clock");
    itac.onclick = function(){reminder(this)};
    itac.setAttribute("name", "reminder");
    //---------------------------------------------------AppendChild
    collapsible_div_header.appendChild(expand);
    collapsible_div_bodyContent_staticContent.appendChild(itag_imp);
    collapsible_div_bodyContent_staticContent.appendChild(itag_star);
    collapsible_div_bodyContent.appendChild(collapsible_div_bodyContent_staticContent);
    collapsible_div_body.appendChild(collapsible_div_bodyContent);
    collapsible_li.appendChild(collapsible_div_header);
    collapsible_li.appendChild(collapsible_div_body);
    collapsible_ul.appendChild(collapsible_li);
    todoBanMainContainer.appendChild(res);
    todoBanMainContainer.appendChild(itac);
    todoBanMainContainer.appendChild(itag);
    todoBanMainContainer.appendChild(span);
    todoBanMain.appendChild(collapsible_ul);
    todoBanMain.appendChild(todoBanMainContainer);
    //---------------------------------------------------VALIDATION

    const emptyTasks = localStorage.getItem("Node");

    if(emptyTasks === ""){
        if (inputValue === '') {return}
        else {myUL.appendChild(todoBanMain)}
        input.value = "";

        res.value = inputValue;
    }else{
        if(keypress){
            if (inputValue === '') {return}
            else {myUL.appendChild(todoBanMain)}
            input.value = "";

            res.value = inputValue;
        }else {
            res.value = valueLS;
            if(stateLS.length !== 1){
                for(let i = 0 ; i < stateLS.length ; i++){
                    collapsible_div_header.classList.add(stateLS[i]);
                }
            }
            myUL.appendChild(todoBanMain);
        }
    }
}

function saveTasks(hourSaveClick){
    const containerTodo = document.querySelector('#myUL');
    const containerTodoChildren = containerTodo.children;
    const containerTodo_subChild = document.querySelector('.collapsible_div_bodyContent');
    const containerTodo_subChildChildren = containerTodo_subChild.children;


    let childClass = {
        length: 0,
        findClass: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    let subChildClass = {
        length: 0,
        findClassSub: function ajoutElem (elem) {
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
    let subChildValue= {
        length: 0,
        findValueSub: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };

    for(let i = 0 ; i < containerTodoChildren.length ; i++){
        childClass.findClass(containerTodoChildren[i].className);
        child_classNameState.findClassState(containerTodoChildren[i].children[0].children[0].children[0].className);
        childParent.findParent(containerTodoChildren[i].closest(".todoBanMain"));
        childValue.findValue(containerTodoChildren[i].children[1].children[0].value);
    }
    for(let i = 0 ; i < containerTodo_subChildChildren.length ; i++){
        if(containerTodo_subChildChildren[i].className === "li_sub"){
            subChildClass.findClassSub(containerTodo_subChildChildren[i].className);
            subChildValue.findValueSub(containerTodo_subChildChildren[i].children[0].value);
        }
    }

    let hourSave;
    if (hourSaveClick === false) {
        hourSave = getDate();
    }else{
        hourSave = hourSaveClick;
    }

    const cTodo = {
        child_nb : containerTodo.childElementCount,
        child_className : childClass,
        child_classNameState : child_classNameState,
        child_value : childValue,
        lastSave : hourSave,
        subChild_className : subChildClass,
        subChild_value : subChildValue
    }
    localStorage.setItem("Node", JSON.stringify(cTodo));
}

window.onload = function (){
    reloadTasks();
}

function reloadTasks(){
    const elem = JSON.parse(localStorage.getItem("Node"));
    let nb_child = elem.child_nb;

    for(let i = 0 ; i < nb_child ; i++){
        let class_child = elem.child_className[i];
        let state_child = elem.child_classNameState[i];
        let value_child = elem.child_value[i];
        createTask(false, nb_child, state_child.split(" "), class_child,value_child);
    }
}


input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        compteurTodoBanMain++;
        createTask(true);
        saveTasks(false);
    }
}, false);

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
    const elem = element.parentElement.parentElement;

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

function createNote(){
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
    lin.setAttribute("data-name", compteurCard);
    lin.style.background = colorNotes[Math.floor(Math.random()*colorNotes.length)];

    const itagt = document.createElement("i");
    const itagi = document.createElement("i");

    // itagt.classList.add("fas");
    itagi.classList.add("fas");
    // itagt.classList.add("fa-minus-circle");
    itagi.classList.add("fa-info-circle");

    const span = document.createElement("span");
    const txt = document.createTextNode("\u00D7");

    span.className = "close";
    span.appendChild(txt);

    span.onclick = function(){removeNote(this)};
    itagi.onmouseover = function(){mouseEnter(this)};

    divicon.appendChild(itagi);
    divicon.appendChild(span);

    const divOption = document.createElement("div");
    divOption.classList.add("optionNote");
    //------------------------------------options
    const itagp = document.createElement("i");
    const itagtt = document.createElement("i");
    const itagtl = document.createElement("i");

    itagp.classList.add("fas");
    itagp.classList.add("fa-palette");
    itagp.onclick = function(){changeColor(this)};

    itagtt.classList.add("fas");
    itagtt.classList.add("fa-chevron-circle-up");
    itagtt.onclick = function(){toTop(this)};

    itagtl.classList.add("fas");
    itagtl.classList.add("fa-link");
    itagtl.onclick = function(){linkToNote(this)};

    divOption.appendChild(itagtt);
    divOption.appendChild(itagp);
    divOption.appendChild(itagtl);
    //------------------------------------


    div.appendChild(titre_in);
    div.appendChild(divicon);

    lin.appendChild(div);
    lin.appendChild(divOption);
    lin.appendChild(cont_in);

    myUL_note.appendChild(lin)

    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            const div = this.parentElement;
            // div.style.display = "none";
            div.remove();
        }
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

//setInterval(
function h(){
    const dateObj = new Date();
    let h = dateObj.getHours();
    if (h < 10) { h = "0" + h }
    let m = dateObj.getMinutes();
    if (m < 10) { m = "0" + m }
    lastSaveTime.innerHTML =  h + "h" + m;

    const containerTodo = document.querySelector('#myUL');
    const containerTodoChildren = containerTodo.children;
    const subChildContainerTodo = containerTodo.querySelectorAll('.li_sub');
    const containerNote = document.querySelector('#myUL_note');


    let childClass = {
        length: 0,
        findClass: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    let subChildClass = {
        length: 0,
        findClass: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    let childParent= {
        length: 0,
        findParent: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    // let childDataset= {
    //     length: 0,
    //     findDataset: function ajoutElem (elem) {
    //         [].push.call(this, elem);
    //     }
    // };
    let childValue= {
        length: 0,
        findValue: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };

    for(let i = 0 ; i < containerTodoChildren.length ; i++){
        childClass.findClass(containerTodoChildren[i].className);
        childParent.findParent(containerTodoChildren[i].closest(".todoBanMain"));
        // childDataset.findDataset(containerTodoChildren[i].dataset);
        childValue.findValue(containerTodoChildren[i].children[1].children[0].value);
    }

    for(let i = 0 ; i < subChildContainerTodo.length ; i++){
        subChildClass.findClass(subChildContainerTodo[i].className);
    }

    const cTodo = {

        child_nb : containerTodo.childElementCount,
        child_className : childClass,
        child_value : childValue,

        // subChild_ : {subChildContainerTodo,childParent},
        // subChild_nb : subChildContainerTodo.length,
        // subChild_className : subChildClass,
    }
    const cNote= {
        nbElem : containerNote.childElementCount,
    }

    localStorage.setItem("Node", JSON.stringify(cTodo));

    return cTodo;
}

function saveData(){
    post(url, {value: h()}).then(r =>
        console.log(r)
    );
}
const url = "https://nicolasvaillant.net/local/prive/todo/tempfiles/temp.php";

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


function replicationTodo(){
    const res = h();

    const replicate = document.querySelector('.replicate');
    const element = res.child_;

    // console.log(element)

    replicate.appendChild(element[0]);

    return true;
}

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
