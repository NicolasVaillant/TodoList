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
    // console.log(element.parentElement.parentElement.parentElement.children[0])
    compteurLiSub++;
    const staticContent = document.querySelector('.collapsible_div_bodyContent_staticContent');

    const divHeader = element.parentElement.parentElement.parentElement.children[0].children[0].children[0];
    // divHeader.classList.add('active');
    const div = element.parentElement.parentElement.children[0].children[0].children[1].children[0];
    // console.log(div)
    // const div = element.parentElement.parentElement;
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
    if (li.tagName === 'DIV') {

        // if(li.children[0].checked){
        //     li.children[0].checked = false;
        //     li.children[0].removeAttribute("disabled");
        //     li.children[1].removeAttribute("disabled");
        //     li.classList.remove('liChecked');
        //     for(let i = 2 ; i < li.parentElement.childElementCount ; i++){
        //         li.parentElement.children[i].classList.remove('liChecked');
        //     }
        // }else{
        //     li.children[0].checked = true;
        //     li.children[0].setAttribute("disabled", true);
        //     li.children[1].setAttribute("disabled", true);
        //     li.classList.add('liChecked');
        //     for(let i = 2 ; i < li.parentElement.childElementCount ; i++){
        //         li.parentElement.children[i].classList.add('liChecked');
        //     }
        // }

    }
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
    console.log(element.dataset.name)
}

input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        compteurTodoBanMain++;
        const li = document.createElement("li");
        const expand = document.createElement("i");
        expand.onclick = function(){developChild()};
        expand.classList.add("fas");
        expand.classList.add("fa-chevron-down");
        expand.classList.add("expandChevron");
        expand.classList.add("checkBox");

        const res = document.createElement("input");
        res.setAttribute("type", "text");
        res.classList.add("input_sub");

        const inputValue = input.value;
        res.value = inputValue;

        li.appendChild(expand);
        li.appendChild(res);
        li.classList.add('liParent')

        //---------------------------------------------------COLLAPSIBLE
        const todoBanMain = document.createElement("div");
        todoBanMain.classList.add('todoBanMain')
        todoBanMain.setAttribute("data-hierarchy", compteurTodoBanMain);
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
        itag_imp.onclick = function(){setTodo(this)};
        itag_imp.setAttribute("name", "important");

        const itag_star = document.createElement("i");
        itag_star.classList.add("fas");
        itag_star.classList.add("fa-star");
        itag_star.onclick = function(){setTodo(this)};
        itag_star.setAttribute("name", "star");

        //---------------------------------------------------COLLAPSIBLE

        const moreOptions = document.createElement("div");
        const all = document.createElement("div");
        moreOptions.classList.add("moreOptionsClass");
        all.classList.add("all");

        const span = document.createElement("span");
        const itag = document.createElement("i");
        const txt = document.createTextNode("\u00D7");

        span.className = "close";
        span.appendChild(txt);
        span.onclick = function(){removeAll(this)};

        itag.classList.add("fas");
        itag.classList.add("fa-plus-circle");
        itag.onclick = function(){addChild(this)};
        itag.setAttribute("name", "morebut");



        collapsible_div_header.appendChild(expand);
        collapsible_div_bodyContent_staticContent.appendChild(itag_imp);
        collapsible_div_bodyContent_staticContent.appendChild(itag_star);

        collapsible_div_bodyContent.appendChild(collapsible_div_bodyContent_staticContent);
        collapsible_div_body.appendChild(collapsible_div_bodyContent);

        collapsible_li.appendChild(collapsible_div_header);
        collapsible_li.appendChild(collapsible_div_body);

        collapsible_ul.appendChild(collapsible_li);

        todoBanMainContainer.appendChild(res);
        todoBanMainContainer.appendChild(itag);
        todoBanMainContainer.appendChild(span);

        todoBanMain.appendChild(collapsible_ul);
        todoBanMain.appendChild(todoBanMainContainer);

        if (inputValue === '') {
            return;
        } else {
            // all.appendChild(li);
            // all.appendChild(moreOptions);
            myUL.appendChild(todoBanMain);
        }
        input.value = "";

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
    let childDataset= {
        length: 0,
        findDataset: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };
    let childValue= {
        length: 0,
        findValue: function ajoutElem (elem) {
            [].push.call(this, elem);
        }
    };

    for(let i = 0 ; i < containerTodoChildren.length ; i++){
        childClass.findClass(containerTodoChildren[i].className);
        childParent.findParent(containerTodoChildren[i].closest(".todoBanMain"));
        childDataset.findDataset(containerTodoChildren[i].dataset);
        childValue.findValue(containerTodoChildren[i].children[1].children[0].value);
    }

    for(let i = 0 ; i < subChildContainerTodo.length ; i++){
        subChildClass.findClass(subChildContainerTodo[i].className);
    }

    const cTodo = {
        child_ : containerTodoChildren,
        child_nb : containerTodo.childElementCount,
        child_className : childClass,
        child_order : childDataset,
        child_value : childValue,

        subChild_ : {subChildContainerTodo,childParent},
        subChild_nb : subChildContainerTodo.length,
        subChild_className : subChildClass,
    }
    const cNote= {
        nbElem : containerNote.childElementCount,
    }

    return cTodo;
}

function replicationTodo(){
    const res = h();

    const replicate = document.querySelector('.replicate');
    const element = res.child_;

    console.log(element)

    replicate.appendChild(element[0]);

    return true;
}