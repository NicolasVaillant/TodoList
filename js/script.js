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
const refresh_but_icon = document.querySelector("#rb_icon");
const switchDirectionC = document.querySelector("#switchDirection");
const flexDirectionMode = document.querySelector(".flexDirectionMode");
const iconDirection = document.querySelector(".iconDirection");

const todoContainer = document.querySelector(".todoContainer");
const noteContainer = document.querySelector(".noteContainer");

const descriptionLink = document.querySelector(".descriptionLink");

const butNote = document.querySelector("#tooltip_2"); //butNote

const account = document.querySelector("#account");
const selector = document.querySelector(".selector");

const nb_label = document.querySelector("#nb_label");

const nothingToShow = document.querySelector(".nothingToShow");
const nothingToShow_more = document.querySelector(".nothingToShow_more");

const impTask_start = document.querySelector("#impTask_start");
const speTask_start = document.querySelector("#speTask_start");


const main = document.querySelector(".main");
const todoBanMainID = document.querySelector("#todoBanMainID");
const tutoTodo = document.querySelector(".tutoTodo");

//----------------------------------------------------------------------
let main_height = 0;

window.onload = function () {

    if (!localStorage.getItem("todo_first_co") === true || !localStorage.getItem("todo_first_co") === "true") {
        introJs().start();
        introJs().addHints();
        todoBanMainID.style.display = "block";
        tutoTodo.style.display = "block";
        localStorage.setItem("todo_first_co", "true");
    }

    if(JSON.parse(localStorage.getItem("Node_note")) !== null){reloadNote()}
    if(JSON.parse(localStorage.getItem("todos_test")) !== null){reloadTasks()}

    nb_label.innerHTML = "(" + myUL.childElementCount + "/" + myUL.childElementCount + ")";
    main_height = Math.max(document.documentElement.offsetHeight, document.documentElement.scrollHeight);
    // if (window.matchMedia("(min-width: 1200px)").matches) {
    //     switchDirectionC.classList.remove('disabledOptionsRC');
    // }else{
    //     switchDirectionC.classList.add('disabledOptionsRC');
    // }
}//reloadNote(); -- getShareTask()
todoBanMainID.oncontextmenu= function (e){
    rightClick;

    e.target.closest('#todoBanMainID').classList.add('bumpOnRClick');
    setTimeout(function (){
        e.target.closest('#todoBanMainID').classList.remove('bumpOnRClick')
    },200)
};
window.onclick = function (){hideMenu()}
window.oncontextmenu = function (e){e.preventDefault()}
window.onscroll = function (){
    // console.log("scrollY : " +window.scrollY)
    const menu = document.getElementById("contextMenu");
    if (menu.style.display === "flex"){

        let out_height = window.innerHeight + window.scrollY - (menu.offsetTop + menu.offsetHeight);

        if(menu.offsetTop + menu.offsetHeight > window.innerHeight + window.scrollY){
            menu.style.top = menu.offsetTop + out_height + "px";
        }else{
            menu.style.top = menu.offsetTop + "px";
        }

        let out_width = window.innerWidth + window.scrollX - (menu.offsetLeft + menu.offsetWidth);

        if(menu.offsetLeft + menu.offsetWidth > window.innerWidth + window.scrollX){
            menu.style.left = menu.offsetLeft + out_width + "px";
        }else{
            menu.style.left = menu.offsetLeft + "px";
        }
    }
}
window.onresize = function (){
    // if (window.matchMedia("(min-width: 1200px)").matches) {
    //     switchDirectionC.classList.remove('disabledOptionsRC');
    // }else{
    //     switchDirectionC.classList.add('disabledOptionsRC');
    // }
}
//----------------------------------------------------------------------
function filterTasks(check_id){
    const nbElem = [];
    const items = [];
    for(let i = 0 ; i < myUL.childElementCount ; i++){
        if(myUL.childElementCount !== 0){

            if(check_id === "all"){
                myUL.children[i].style.display = "";
                nbElem.push(true)
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
                if(check_id === "importantTasks"){
                    nothingToShow_more.innerHTML = "Cliquer sur \"<i class='fas fa-exclamation-circle'></i>\" pour ajouter " +
                        "une tâche importante."
                    items.push(counts)
                }else if(check_id === "specialTasks"){
                    nothingToShow_more.innerHTML = "Cliquer sur \"<i class='fas fa-star'></i>\" pour ajouter " +
                        "une tâche spéciale."
                    items.push(counts)
                }
            }else{
                items.push(counts)
                nothingToShow.style.display = "none";
            }
        }else{
            // console.log("ok")
        }
    }
    if(check_id === "reminder"){
        nb_label.innerHTML = "(" + uniqueChars.length + "/" + myUL.childElementCount + ")"
        console.log(uniqueChars.length)
        for(let i = 0 ; i < uniqueChars.length ; i++){
            // myUL.appendChild(uniqueChars[i])
            // console.log(uniqueChars[i])
        }

    }else{
        if(isNaN(items[myUL.childElementCount - 1].true)){
            nb_label.innerHTML = "(" + 0 + "/" + myUL.childElementCount + ")"
        }else{
            // console.log(items[myUL.childElementCount - 1].true)
            nb_label.innerHTML = "(" + items[myUL.childElementCount - 1].true + "/" + myUL.childElementCount + ")"
        }
    }


    // console.log(items[myUL.childElementCount - 1].true)
    // nb_label_all.innerHTML = items;

//    faire un test sur style: none des children pour afficher ou non
//    nothingToShow.classList.add('show');
}

const menu = document.querySelector('#menu');
const menu_der = document.querySelector('.menu_der');
const content = document.querySelector('.content');

menu.addEventListener('click', function (){
    menu_der.classList.toggle('showMenu');
    menu.parentElement.classList.toggle('clickMenu');
},false);

let computeTog = 0;

function switchDirection(){
    computeTog++;
    if(computeTog%2 === 0){
        flexDirectionMode.innerHTML = "View Ligne";
        iconDirection.style.flexDirection = "column";
    }else{
        flexDirectionMode.innerHTML = "View Colonne";
        iconDirection.style.flexDirection = "row";
    }
    if (window.matchMedia("(min-width: 1200px)").matches) {
        content.classList.toggle('gridV');
        todoContainer.style.width = "100%";
        noteContainer.style.width = "100%";
    }
}

function inputSubEnter(key,element){
    if (key === 'Enter') {addChild(element)}
}

function removeAll(element){
    element.closest('.todoBanMain').classList.add('slideOut')
    // nb_label.innerHTML = "(" + myUL.childElementCount + "/" + myUL.childElementCount+ ")";
    setTimeout(function (){
        element.closest('.todoBanMain').remove();
        saveTasks(getDate());
    }, 500)
}

function updateNBSubChild(element, index){
    const todoBanMain = element.closest('.todoBanMain');
    const div = todoBanMain.querySelector('.collapsible_div_bodyContent');
    const numberOfElement = div.querySelector('.numberOfElement');
    const canvasChart_p = todoBanMain.querySelector('.canvasChart_p');

    setTimeout(function(){
        const localStorageTodos = JSON.parse(localStorage.getItem("todos_test"));
        // console.log(localStorageTodos.e[index][6])
        numberOfElement.innerText = `${localStorageTodos.e[index][6]}` + " sous-tâche(s) restante(s)";
        canvasChart_p.innerText = localStorageTodos.e[index][6];

        changeChart(todoBanMain, localStorageTodos.e[index][6], index);

    }, 100);

}



function removeOne(element){
    const todoBanMain = element.closest('.todoBanMain');
    const div = todoBanMain.querySelector('.collapsible_div_bodyContent');
    element.parentElement.classList.add('slideOut');

    setTimeout(function (){
        element.parentElement.remove();
        saveTasks(getDate("h"));
    }, 500)

    console.log(todoBanMain.dataset.num)

    updateNBSubChild(div, todoBanMain.dataset.num)
}

function addChild(element, localstorage, valueLS, classLS){
    compteurLiSub++;

    const div = element.closest('.todoBanMain').querySelector('.collapsible_div_bodyContent')
    const staticContent = div.children[0];

    if(localstorage === true){
        // print("valueLS", allValues, "red")


        let allValues = valueLS.filter(value => Object.keys(value).length !== 0);

        for(let i = 0 ; i < allValues.length ; i++){
            const li_sub = document.createElement("li");
            const disabled_li_sub_obj = document.createElement("span");
            const end_subTasks = document.createElement("input");
            let arr = classLS[i].split(" ");

            if(arr.length === 2){
                li_sub.classList.add(arr[0]);
                li_sub.classList.add(arr[1]);

                disabled_li_sub_obj.classList.add("disabled_li_sub_obj");
                disabled_li_sub_obj.classList.add("disabled_li_sub_obj_ACTIVE");

                end_subTasks.checked = true;

            }else{
                disabled_li_sub_obj.classList.add("disabled_li_sub_obj");
                li_sub.classList.add(arr[0]);
            }

            li_sub.setAttribute("data-hierarchy", compteurLiSub.toString());

            const input_set = document.createElement("input");
            input_set.setAttribute("type", "text");
            // input_set.setAttribute("autofocus", "");
            input_set.classList.add('input_sub');
            input_set.onkeyup = function(e){inputSubEnter(e.key,this); saveTasks(getDate("h"));};

            input_set.value = allValues[i];

            end_subTasks.setAttribute("type", "checkbox");
            end_subTasks.classList.add("end");
            end_subTasks.onclick = function (){changeStateLiSub(end_subTasks);saveTasks(getDate("h"));}

            li_sub.appendChild(disabled_li_sub_obj);

            li_sub.appendChild(end_subTasks);

            li_sub.appendChild(input_set);

            const span = document.createElement("span");

            span.className = "close";
            span.classList.add("fas");
            span.classList.add("fa-times");

            span.onclick = function(){removeOne(this);saveTasks(getDate("h"));};
            li_sub.appendChild(span);

            // div.appendChild(li_sub);
            div.insertBefore(li_sub, staticContent);
        }
    }else{


        const li_sub = document.createElement("li");
        li_sub.classList.add('li_sub');
        li_sub.setAttribute("data-hierarchy", compteurLiSub.toString());

        const input_set = document.createElement("input");
        input_set.setAttribute("type", "text");
        input_set.classList.add('input_sub');
        input_set.onkeyup = function(e){inputSubEnter(e.key,this); saveTasks(getDate("h"));};

        const disabled_li_sub_obj = document.createElement("span");
        disabled_li_sub_obj.classList.add("disabled_li_sub_obj");

        const end_subTasks = document.createElement("input");
        end_subTasks.setAttribute("type", "checkbox");
        end_subTasks.classList.add("end");
        end_subTasks.onclick = function (){changeStateLiSub(end_subTasks);saveTasks(getDate("h"));}

        li_sub.appendChild(disabled_li_sub_obj);

        li_sub.appendChild(end_subTasks);

        li_sub.appendChild(input_set);

        const span = document.createElement("span");
        span.className = "close";
        span.classList.add("fas");
        span.classList.add("fa-times");

        // console.log(nbSubChild)

        span.onclick = function(){removeOne(this);saveTasks(getDate("h"));};
        li_sub.appendChild(span);

        // div.appendChild(li_sub);
        div.insertBefore(li_sub, staticContent);
    }

    const todoBanMain = element.closest('.todoBanMain');
    const dive = todoBanMain.querySelector('.collapsible_div_bodyContent');

    updateNBSubChild(dive, todoBanMain.dataset.num)
}

function changeStateLiSub(element){
    const parent = element.parentElement;
    const fst_child = element.parentElement.children[0];

    if(element.checked){
        parent.classList.add('li_sub_disabled');
        fst_child.classList.add('disabled_li_sub_obj_ACTIVE');
        parent.querySelector('.input_sub').disabled = true;
    }else{
        parent.classList.remove('li_sub_disabled');
        fst_child.classList.remove('disabled_li_sub_obj_ACTIVE');
        parent.querySelector('.input_sub').disabled = false;
    }
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



function developChild(element){
    const overlay = document.querySelector('.overlay');
    const el = element.closest('.todoBanMain').querySelector('.collapsible')

    if(el.classList.contains("active")){
        displayLink(false, overlay);
    }else{
        displayLink(true, overlay);
    }

    // console.log(collapsible_header)
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
function getDate(separator = "h"){
    const date_reminder = new Date();
    let h = date_reminder.getHours();
    if (h < 10) {
        h = "0" + h
    }
    let m = date_reminder.getMinutes();
    if (m < 10) {
        m = "0" + m
    }
    return h + separator + m;
}
function getDateDay(separator, sens){
    const date = new Date();
    let day = date.getDate("h");
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let output = "";
    if(sens === "EN"){
        output = year + separator + month + separator + day;
    }else if(sens === "FR"){
        output = day + separator + month + separator + year;
    }
    return output;
}

function setFinish(e){
    const parent = e.target.closest('.todoBanMain');

    if(parent.children[0].children[0].children[0].classList.contains('endTasks')){
        //logical not
        e.target.classList.remove('fas');
        e.target.classList.remove('fa-check-circle');
        e.target.classList.add('circle');
    }else{
        parent.children[0].children[0].children[0].classList.remove('specialTasks')
        parent.children[0].children[0].children[0].classList.remove('importantTasks')
        e.target.classList.remove('circle');
        e.target.classList.add('fas');
        e.target.classList.add('fa-check-circle');
    }

    parent.children[0].children[0].children[0].classList.toggle('endTasks');
    parent.children[1].children[0].classList.toggle('endTasks_text');
    parent.children[1].children[1].children[0].classList.toggle('endTasks_text');
    // parent.children[1].children[2].children[0].classList.toggle('endTasks_container');
    saveTasks(getDate("h"));
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
        // parent.children[1].children[2].children[0].classList.add('endTasks_container');

        i_zone_1.classList.remove('fas');
        i_zone_1.classList.remove('fa-check-circle');
        i_zone_1.classList.add('circle');

        menu.children[0].children[1].classList.add('disabledOptionsRC');
        menu.children[0].children[2].classList.add('disabledOptionsRC');

    }else if(parent.children[0].children[0].children[0].classList.contains('importantTasks')){

        txt_zone_2.innerHTML = "Enlever le filtre important";
        // parent.querySelector('.div_option_container').classList.remove('importantTasks_cross');
        //importantTasks_cross
        //specialTasks_cross
        menu.children[0].children[1].classList.remove('disabledOptionsRC');

    }else if(parent.children[0].children[0].children[0].classList.contains('specialTasks')){

        txt_zone_3.innerHTML = "Enlever le filtre special";
        // parent.querySelector('.div_option_container').classList.remove('specialTasks_cross');
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
        // parent.children[1].children[2].children[0].classList.remove('endTasks_container');

        menu.children[0].children[1].classList.remove('disabledOptionsRC');
        menu.children[0].children[2].classList.remove('disabledOptionsRC');

    }
    txt_zone_4.innerHTML = "Supprimer la tâche";

    function zone1(parent){
        //TODO: cant right click end tasks then click on check and save it
        parent.children[0].children[0].children[0].classList.toggle('endTasks');
        parent.children[1].children[0].classList.toggle('endTasks_text');
        parent.children[1].children[1].children[0].classList.toggle('endTasks_text');
        // parent.children[1].children[2].children[0].classList.toggle('endTasks_container');

        if(parent.children[0].children[0].children[0].classList.contains('endTasks')){
            parent.children[1].children[0].classList.remove('circle');
            parent.children[1].children[0].classList.add('fas');
            parent.children[1].children[0].classList.add('fa-check-circle');
        }else{
            parent.children[1].children[0].classList.add('circle');
            parent.children[1].children[0].classList.remove('fas');
            parent.children[1].children[0].classList.remove('fa-check-circle');
        }

        parent.children[0].children[0].children[0].classList.remove('importantTasks');
        parent.children[0].children[0].children[0].classList.remove('specialTasks');
    }
    function zone2(parent,element){
        if(element.classList.contains('disabledOptionsRC')){}else{
            parent.children[0].children[0].children[0].classList.toggle('importantTasks');
            // parent.children[1].children[2].children[0].classList.toggle('importantTasks_cross');
            parent.children[0].children[0].children[0].classList.remove('specialTasks');
        }
    }
    function zone3(parent,element){
        if(element.classList.contains('disabledOptionsRC')){}else{
            parent.children[0].children[0].children[0].classList.toggle('specialTasks');
            // parent.children[1].children[2].children[0].classList.toggle('specialTasks_cross');
            parent.children[0].children[0].children[0].classList.remove('importantTasks');
        }
    }
    function zone4(parent){
        parent.classList.add('slideOut');
        setTimeout(function (){
            parent.remove()
        }, 500)
    }
    function zone5(parent){
        const check_user_1 = document.querySelector('#check_user_1')
        const valueInput = parent.children[1].children[1].children[0].innerHTML;
        let user;
        if (check_user_1.checked) {user = "Nicolas"}else{user= "Thérence"}
        const text = `${user}` + " a partagé le contenu d'une note avec vous. " +
            `\"${valueInput}\"` + " est le titre de la note." + " La note a été créée le " + `${parent.dataset.date}` +
            " à " + `${parent.dataset.hour}` + ".";
        // console.log(text)

        share(valueInput, text, "todo")

    }
    function zone5b(parent){

        let hour = getDate("h");
        let date_act = getDateDay("/", "FR");

        const container = parent.children[0].children[0].children[0];
        container.classList.toggle('shareTask');

        let share_class = parent.className;
        let share_state = parent.children[0].children[0].children[0].className;
        let share_value = parent.children[1].children[1].children[0].innerHTML;
        let share_has = parent.children[1].children[1].children[1].innerHTML;
        let share_dataset = parent.dataset;


        const cTodo_share = {
            child_className : share_class,
            child_classNameState : share_state,
            child_value : share_value,
            childValue_has : share_has,
            childDataSet : share_dataset,
            lastSave : hour + "-" + date_act
        }
        //TODO : SEND cTodo_share TO SERVER
        console.log(cTodo_share);
    }

    if (document.getElementById("contextMenu").style.display === "flex")
        hideMenu();
    else{
        menu.style.display = 'flex';
        let out_height = window.innerHeight + window.scrollY - (e.pageY + menu.offsetHeight);

        if(e.pageY + menu.offsetHeight > window.innerHeight + window.scrollY){
            menu.style.top = e.pageY + out_height + "px";
        }else{
            menu.style.top = e.pageY + "px";
        }

        let out_width = window.innerWidth + window.scrollX - (e.pageX + 2*menu.offsetWidth);

        if(e.pageX + 2*menu.offsetWidth > window.innerWidth + window.scrollX){
            menu.style.left = e.pageX + out_width + "px";
        }else{
            menu.style.left = e.pageX + "px";
        }


        //END
        menu.children[0].children[0].onclick = function(){zone1(parent);saveTasks(getDate("h"));};
        //IMPORTANT
        menu.children[0].children[1].onclick = function(){zone2(parent,this);saveTasks(getDate("h"));};
        //SPECIAL
        menu.children[0].children[2].onclick = function(){zone3(parent,this);saveTasks(getDate("h"));};
        //DELETE
        menu.children[0].children[3].onclick = function(){zone4(parent);saveTasks(getDate("h"));};
        //SHARE
        menu.children[0].children[4].children[2].children[0].children[0].onclick = function(){zone5(parent);saveTasks(getDate("h"));};
        menu.children[0].children[4].children[2].children[0].children[1].onclick = function(){zone5b(parent);saveTasks(getDate("h"));};
    }
}
function hideMenu() {
    document.getElementById(
        "contextMenu").style.display = "none";
    document.getElementById(
        "contextMenuNote").style.display = "none";
}

let ctr_todos_chart = 0;

function createTask(
    keypress,
    filter,
    reminderQ,
    nbLS,
    stateLS,
    classLS,
    valueLS,
    hashtag,
    data_set,
    valueLS_subChild,
    todos_nbLS_subChild,
    todos_classLS_subChild,
    index) {

    const expand = document.createElement("i");
    expand.onclick = function(){developChild(this)};
    expand.classList.add("fas");
    expand.classList.add("fa-chevron-down");
    expand.classList.add("expandChevron");
    expand.classList.add("checkBox");
    const text = document.createElement("p");
    text.classList.add("textTask");
    const inputValue = input.value;
    const itag_end = document.createElement("i");
    itag_end.classList.add('circle');

    itag_end.onclick = setFinish;

    //---------------------------------------------------COLLAPSIBLE
    const todoBanMain = document.createElement("div");
    todoBanMain.classList.add('todoBanMain');
    // todoBanMain.setAttribute("data-", "important");

    const div_option = document.createElement("div");
    const div_option_container = document.createElement("div");
    div_option.classList.add('div_option');
    div_option_container.classList.add('div_option_container');
    const div_option_static = document.createElement("div");
    const div_option_container_static = document.createElement("div");
    div_option_static.classList.add('div_optionstatic');

    const numberOfElement = document.createElement("p");
    numberOfElement.classList.add('numberOfElement');

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
    collapsible_div_bodyContent_staticContent.classList.add('collapsible_div_bodyContent_staticContent');
    const ital = document.createElement("i");
    ital.classList.add("fas");
    ital.classList.add("fa-link");
    ital.setAttribute("data-name", "linkToNote");
    ital.setAttribute("data-state", "disabled");
    // ital.onclick = function(){linkToNoteC(this);saveTasks(false)};
    const itag_imp = document.createElement("i");
    itag_imp.classList.add("fas");
    itag_imp.classList.add("fa-exclamation-circle");
    itag_imp.setAttribute("data-name", "important");
    itag_imp.onclick = function(){setTodo(this);saveTasks(getDate("h"));};
    const itag_star = document.createElement("i");
    itag_star.classList.add("fas");
    itag_star.classList.add("fa-star");
    itag_star.setAttribute("data-name", "star");
    itag_star.onclick = function(){setTodo(this);saveTasks(getDate("h"));};
    //---------------------------------------------------COLLAPSIBLE
    const div_text = document.createElement("div");
    //---------------------------------------------------COLLAPSIBLE
    const itage = document.createElement("i");
    const itag = document.createElement("i");
    const itac = document.createElement("i");
    itage.classList.add("fas");
    itage.classList.add("fa-times");
    itage.onclick = function(){removeAll(this);saveTasks(getDate("h"));};
    itag.classList.add("fas");
    itag.classList.add("fa-plus-circle");
    itag.onclick = function(){
        addChild(this, false, false, todos_nbLS_subChild, index);
        developChild(this);
        saveTasks(false)
    };
    itag.setAttribute("name", "morebut");
    itac.classList.add("fas");
    itac.classList.add("fa-clock");
    // itac.onclick = function(){reminder(this)};
    itac.setAttribute("name", "reminder");
    //---------------------------------------------------RIGHT CLICK
    todoBanMain.oncontextmenu= rightClick;
    //---------------------------------------------------AppendChild
    collapsible_div_header.appendChild(expand);
    div_option_container_static.appendChild(ital);
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
    div_option_container.appendChild(itag);
    div_option_container.appendChild(itage);
    div_option.appendChild(div_option_container);
    todoBanMainContainer.appendChild(div_option);
    todoBanMain.appendChild(collapsible_ul);
    todoBanMain.appendChild(todoBanMainContainer);
    //---------------------------------------------------VALIDATION
    const spanhas = document.createElement("span");
    spanhas.classList.add('colorhastags');

    //---------------------------------------------------CHART

    const containerChart = document.createElement("div");
    containerChart.classList.add('containerChart');

    ctr_todos_chart++;

    const canvasChart = document.createElement("div");
    const canvasChart_p = document.createElement("p");
    canvasChart.classList.add('canvasChart');
    canvasChart_p.classList.add('canvasChart_p');

    canvasChart_p.innerHTML = todos_nbLS_subChild;

    //---------------------------------------------------

    const i_clock = document.createElement("i");
    i_clock.classList.add("fas");
    i_clock.classList.add("fa-clock");
    i_clock.classList.add("td-transform-none");
    i_clock.onclick = function(){showTime(this);};
    const time_p = document.createElement("p");
    const time_span = document.createElement("span");
    // time_span.classList.add("textTask_span");

    let hour,date_act;
    if (keypress === "input" || keypress === "button" || keypress === "submit") {
        compteurTodoBanMain++;
        hour = getDate("h");
        date_act = getDateDay("/", "FR");
        numberOfElement.innerText = "0 sous-tâche(s) restante(s)";
        if (inputValue !== '') {
            todoBanMain.setAttribute("data-hour", hour)
            todoBanMain.setAttribute("data-date", date_act);
            todoBanMain.setAttribute("data-reminder", reminderQ);

            todoBanMain.setAttribute("data-hierarchy", compteurTodoBanMain.toString());

            myUL.appendChild(todoBanMain);
            input.value = "";
            text.innerHTML = inputValue;

            if (filter !== false) {
                if (filter === "important") {
                    collapsible_div_header.classList.add('importantTasks')
                } else if (filter === "special") {
                    collapsible_div_header.classList.add('specialTasks')
                }
                myUL.appendChild(todoBanMain)
                input.value = "";
                text.innerHTML = inputValue;
            }
            const spanhas = document.createElement("span");
            spanhas.classList.add('colorhastags')
            let txt = "";

            if (inputValue.includes("#")) {
                let allhastags = inputValue.indexOf("#");
                const indices = [];
                while (allhastags !== -1) {
                    indices.push(allhastags);
                    allhastags = inputValue.indexOf("#", allhastags + 1);
                }
                for (let i = 0; i < indices.length; i++) {
                    txt = document.createTextNode(inputValue.substr(indices[i], inputValue.length).split(" ")[i]);
                    spanhas.appendChild(txt);
                    div_text.appendChild(spanhas);
                }
                input.value = "";
                text.innerHTML = inputValue.split("#")[0];
                i_clock.classList.add("td-padding");
            } else {
                txt = document.createTextNode("");
                spanhas.appendChild(txt);
                div_text.appendChild(spanhas);
                i_clock.classList.add("td-without-padding");
            }

            if (reminderQ !== "") { //from input
                let res, hour;
                let dated = new Date();
                time_p.classList.add("pickerHour");

                const u = (pickerHour.value.split("T")[0].split("-")).reverse().join('/');
                const y = (pickerHour.value.split("T")[1]);
                time_p.innerHTML = u + " à " + y;

                res = Math.round(( new Date(pickerHour.value).getTime() -
                        dated.getTime())/
                    (1000 * 3600 * 24));


                if (res < 0) {
                    time_span.innerHTML = Math.abs(res) + " " + "jour(s) de retard";
                    time_p.classList.add("td-color-red");
                    i_clock.classList.add("td-color-red");

                    setInterval(function(){reminderCheck(todoBanMain)},1000); //60000 : 1
                } else {
                    if(res < 1){
                        time_p.classList.add("td-color-orange");
                        i_clock.classList.add("td-color-orange");

                        hour = Math.round(( new Date(reminderQ).getTime() -
                                dated.getTime())/
                            (1000 * 3600));
                        if (hour < 0) {time_span.innerHTML = Math.abs(hour) + " " + "heures(s) de retard"}else{
                            time_span.innerHTML = hour + " " + "heures(s) restante(s)"
                        }

                        setInterval(function(){reminderCheck(todoBanMain)},1000); //60000 : 1

                    }else{
                        time_p.classList.add("td-color-green");
                        i_clock.classList.add("td-color-green");

                        time_span.innerHTML = res + " " + "jour(s) restant(s)";
                    }
                }

                div_text.appendChild(i_clock);
                time_p.appendChild(time_span);
                div_text.appendChild(time_p);
                pickerHour.value = "";
            }
            canvasChart.setAttribute("id", inputValue.replace(/\s/g, ""))
            canvasChart_p.innerHTML = "0";
            canvasChart.appendChild(canvasChart_p);
            containerChart.appendChild(canvasChart);
            div_text.appendChild(containerChart);
        }
    } else { //LS : ON RELOAD
        let res, hour;
        let dated = new Date();

        numberOfElement.innerText = `${todos_nbLS_subChild}` + " sous-tâche(s) restante(s)";
        text.innerHTML = valueLS.split("#")[0];

        if (Object.keys(valueLS_subChild).length !== 0) {
            addChild(todoBanMain, true, valueLS_subChild, todos_classLS_subChild);
        }

        if (hashtag !== "undefined") {
            spanhas.appendChild(document.createTextNode(hashtag));
            div_text.appendChild(spanhas);
        }
        todoBanMain.setAttribute("data-num", index)
        todoBanMain.setAttribute("data-hour", data_set.hour)
        todoBanMain.setAttribute("data-date", data_set.date)
        todoBanMain.setAttribute("data-hierarchy", data_set.hierarchy)

        if (data_set.reminder === "none" || data_set.reminder === "") {
            todoBanMain.setAttribute("data-reminder", "none")
        } else {
            todoBanMain.setAttribute("data-reminder", data_set.reminder)

            if (hashtag === "undefined" || hashtag === "") {
                i_clock.classList.add("td-without-padding");
            } else {
                i_clock.classList.add("td-padding");
            }

            time_p.classList.add("pickerHour");

            res = Math.round(( new Date(data_set.reminder).getTime() -
                    dated.getTime())/
                (1000 * 3600 * 24));

            if (res < 0) {
                time_span.innerHTML = Math.abs(res) + " " + "jour(s) de retard";
                time_p.classList.add("td-color-red");
                i_clock.classList.add("td-color-red");
                setInterval(function(){reminderCheck(todoBanMain)},1000); //60000 : 1
            } else {
                if(res < 1){
                    time_p.classList.add("td-color-orange");
                    i_clock.classList.add("td-color-orange");

                    hour = Math.round(( new Date(data_set.reminder).getTime() -
                            dated.getTime())/
                        (1000 * 3600));

                    if (hour < 0) {time_span.innerHTML = Math.abs(hour) + " " + "heures(s) de retard"}else{
                        time_span.innerHTML = hour + " " + "heures(s) restante(s)"
                    }

                    setInterval(function(){reminderCheck(todoBanMain)},1000); //60000 : 1

                }else{
                    time_p.classList.add("td-color-green");
                    i_clock.classList.add("td-color-green");

                    time_span.innerHTML = res + " " + "jour(s) restant(s)";
                }
            }

            const u = (data_set.reminder.split("T")[0].split("-")).reverse().join('/');
            const y = (data_set.reminder.split("T")[1]);
            time_p.innerHTML = u + " à " + y;

            div_text.appendChild(i_clock);
            time_p.appendChild(time_span);
            div_text.appendChild(time_p);
        }

        if (Object.keys(stateLS).length !== 0) {

            for (let i = 0; i < Object.keys(stateLS).length; i++) {
                collapsible_div_header.classList.add(stateLS[i]);
                if (stateLS[i] === "endTasks") {
                    todoBanMain.children[1].children[0].classList.toggle('endTasks_text');
                    todoBanMain.children[1].children[0].classList.add('fas');
                    todoBanMain.children[1].children[0].classList.add('fa-check-circle');
                    todoBanMain.children[1].children[0].classList.remove('circle');
                    todoBanMain.children[1].children[1].children[0].classList.toggle('endTasks_text');
                    // todoBanMain.children[1].children[2].children[0].classList.toggle('endTasks_container');
                } else if (stateLS[i] === "specialTasks") {
                    // todoBanMain.children[1].children[2].children[0].classList.toggle('specialTasks_cross');
                } else if (stateLS[i] === "importantTasks") {
                    // todoBanMain.children[1].children[2].children[0].classList.toggle('importantTasks_cross');
                } else {
                    // todoBanMain.children[1].children[0].classList.remove('fas');
                    // todoBanMain.children[1].children[0].classList.remove('fa-check-circle');
                    todoBanMain.children[1].children[0].classList.add('circle');
                }
            }

        }

        canvasChart.setAttribute("id", valueLS.replace(/\s/g, ""))
        canvasChart.appendChild(canvasChart_p);
        containerChart.appendChild(canvasChart);
        div_text.appendChild(containerChart);
        myUL.appendChild(todoBanMain);
    }
    createChart(todoBanMain,ctr_todos_chart);
    return true;
}

let storeElementOverDated = [];
let uniqueChars = [];

function reminderCheck(element){
    // console.log(element)

    let day, hour, min;
    let dated = new Date();

    day = Math.round(( new Date(element.dataset.reminder).getTime() -
            dated.getTime())/
        (1000 * 3600 * 24));

    hour = Math.round(( new Date(element.dataset.reminder).getTime() -
            dated.getTime())/
        (1000 * 3600));

    min = (new Date(element.dataset.reminder).getMinutes() - dated.getMinutes());

    if(day === 0 || day < 0){
        if(hour === 0 || hour < 0){
            if(min === 0 || min < 0){
                // console.log(element)

                element.children[1].children[1].children[2].classList.remove('td-color-orange')
                element.children[1].children[1].children[3].classList.remove('td-color-orange')
                element.children[1].children[1].children[2].classList.add('td-color-red')
                element.children[1].children[1].children[3].classList.add('td-color-red')

                storeElementOverDated.push(element);

                uniqueChars = [...new Set(storeElementOverDated)];
                return true;
            }else{return false}
        }else{return false}
    }


}


function showTime(element){
    element.parentElement.children[2].classList.add('bumpOnClick2');
    setTimeout(function (){
        element.parentElement.children[2].classList.remove('bumpOnClick2')
    },200)

    element.parentElement.children[3].classList.toggle('showHour')
}

function reverseString(str) {return str.split("").reverse().join("")}

function createVisibleLink(parent, child){
    console.log(parent);
    console.log(child);

    const overlay = document.createElement("div");
    overlay.classList.add('overlay');
    displayLink(true, overlay);
    overlay.style.height = main_height + "px";

    const segment = document.createElement("div");
    segment.classList.add('segment');
    const fromTop = parent.offsetTop + parent.offsetHeight/2; //+ todoContainer.offsetTop
    const heightDiv = (child.offsetTop - fromTop) + child.offsetHeight/2;

    segment.style.marginTop = fromTop + "px";
    segment.style.height = heightDiv + "px";

    const noVisibility = document.createElement("div");
    noVisibility.classList.add('noVisibility');

    noVisibility.style.height = main_height + "px";

    // overlay.appendChild(segment)
    // overlay.appendChild(noVisibility)
    noVisibility.appendChild(segment)
    overlay.appendChild(noVisibility)

    document.body.appendChild(overlay)
}

function displayLink(state, element){
    if(state){
        if(element){element.classList.add('show')}
    }else{element.classList.remove('show')}
}

function linkToNoteC(element){
    let comp_select = 0;

    const div = element.closest(".todoBanMain");
    descriptionLink.classList.add('show');

    for(let i = 0 ; i < myUL_note.childElementCount ; i++){
        myUL_note.children[i].classList.add('choosingNote');

        myUL_note.children[i].onclick = function (e){
            if(comp_select++ === 0){
                const res = e.target.closest('.noteCard');
                res.classList.add("noteChoose");
                myUL_note.children[i].querySelector('.txt_link_todo').innerText = "Todo " +
                    `\"${div.children[1].children[1].children[0].innerText}\"` + " sélectionnée";
                for(let i = 0 ; i < myUL_note.childElementCount ; i++){
                    myUL_note.children[i].classList.remove('choosingNote');
                }
                descriptionLink.classList.remove('show');
                createVisibleLink(div,myUL_note.children[i]);
            }
        }
    }
}

function print(title, value, color="green"){
    console.log("%c Print " + `${title}` + " : " + value, "color : " +`${color}`+ ";font-size:1.2em");
}

const arr_child_val = [];
const arr_child_class = [];

function storage(a,b){
    arr_child_val.push(a);
    arr_child_class.push(b);
    return {arr_child_val,arr_child_class};
}

function test(){
    const test = [];
    for(let i = 0 ; i <= 2; i++){
        for(let a = 0 ; a <= 4; a++){
            test.push([a, i]);
        }
    }
    console.log(test);
}


function reloadTasks(){
    const localStorageTodos = JSON.parse(localStorage.getItem("todos_test"));
    let nb_child = localStorageTodos.v;
    lastSaveTime.innerHTML =  localStorageTodos.s;

    for(let i = 0 ; i < nb_child ; i++){
        let todos_dataset_child = localStorageTodos.e[i][0];
        let todos_class = localStorageTodos.e[i][1];
        let todos_value_child_has = localStorageTodos.e[i][2];
        let todos_state_child = localStorageTodos.e[i][3];
        let todos_value_subChild = localStorageTodos.e[i][4];
        let todos_value_child = localStorageTodos.e[i][5];
        let todos_nb_subChild = localStorageTodos.e[i][6];
        let todos_class_subChild = localStorageTodos.e[i][7];

        createTask(
            false,
            false,
            false,
            nb_child,
            todos_state_child,
            todos_class,
            todos_value_child,
            todos_value_child_has,
            todos_dataset_child,
            todos_value_subChild,
            todos_nb_subChild,
            todos_class_subChild,
            i
        );
    }
}
const config = {
    strokeWidth: 10,
    easing: 'easeInOut',
    duration: 1400,
    color: '#9122b6',
    trailColor: '#cbbcbc',
    trailWidth: 1,
    svgStyle: null
}

// function createChart(element, i){
function createChart(element, value = 0.5){
    const div = element.closest('.todoBanMain');
    const allChart_containers = div.querySelector('.containerChart')
    // const a = ["0.9", "0.75", "0.9", "0.5"]
    const re = "#" + allChart_containers.children[0].id.replace(/\s/g, "");
    // new ProgressBar.Circle(re,config).animate(a[i - 1]);
    new ProgressBar.Circle(re,config).animate(value);
}

function changeChart(div, valueNum, index){
    const element = div.querySelector('.containerChart')
    console.log(element, valueNum, index)

    element.querySelector('.canvasChart').children[1].remove();

    div.querySelectorAll('.li_sub').forEach( function (child) {
        console.log(child.className)
    });


    createChart(element, .4);
}



function getShareTask(){
    const elem = 0 ;
    let nb_child = elem.child_nb;

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
    // console.log(parse_Note)
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

const pickerHour = document.querySelector('#pickerHour');
const clockChoice = document.querySelector('#clockChoice');

clockChoice.addEventListener('click', function() {
    pickerHour.classList.toggle('showPicker');
});

input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        createTask("input",false, pickerHour.value);
        saveTasks(getDate("h"));
        pickerHour.classList.remove('showPicker');

        todoBanMainID.classList.add('todoBanMainID_remove')
        setTimeout(function (){
            todoBanMainID.remove();
        }, 1000);
    }
}, false);
let toggleIMP = false;
let toggleSPE = false;

function createTaskButton(id){
    switch (id) {
        case "impTask_start":
            toggleIMP = true;
            toggleSPE = false;
            impTask_start.classList.toggle('importantTasks_color');
            speTask_start.classList.remove('specialTasks_color');
            clockChoice.classList.remove('clkTasks_color');
            // console.log(toggleIMP, toggleSPE)
            pickerHour.classList.remove('showPicker');
            break;
        case "speTask_start":
            toggleIMP = false;
            toggleSPE = true;
            speTask_start.classList.toggle('specialTasks_color');
            impTask_start.classList.remove('importantTasks_color');
            clockChoice.classList.remove('clkTasks_color');
            // console.log(toggleIMP, toggleSPE)
            pickerHour.classList.remove('showPicker');
            break;
        case "clockChoice":
            impTask_start.classList.remove('importantTasks_color');
            speTask_start.classList.remove('specialTasks_color');
            clockChoice.classList.toggle('clkTasks_color');
            break;
        case "button_start":
            // console.log(toggleIMP, toggleSPE)
            if(toggleIMP === true){
                if(createTask("submit","important", pickerHour.value) === true){
                    impTask_start.classList.remove('importantTasks_color');
                    speTask_start.classList.remove('specialTasks_color');
                    clockChoice.classList.remove('clkTasks_color');
                }
                toggleIMP = false;
                toggleSPE = false;
            }else if(toggleSPE === true){
                if(createTask("submit","special", pickerHour.value) === true){
                    speTask_start.classList.remove('specialTasks_color');
                    impTask_start.classList.remove('importantTasks_color');
                    clockChoice.classList.remove('clkTasks_color');
                }
                toggleIMP = false;
                toggleSPE = false;
            }else{
                createTask("submit",false, pickerHour.value);
                // console.log("ok")
                toggleIMP = false;
                toggleSPE = false;
            }
            // createTask("submit",false, pickerHour.value);
            saveTasks(getDate("h"));
            pickerHour.classList.remove('showPicker');
            break;
        default:
            impTask_start.classList.remove('importantTasks_color');
            speTask_start.classList.remove('specialTasks_color');
            clockChoice.classList.remove('clkTasks_color');
    }
}

butNote.addEventListener('click', function() {
    createNote("button");
    saveNote();

}, false);

// impTask_start.addEventListener('click', function (e){
//     createTask("button","important", false);
//     saveTasks(false);
// }, false);
//
// speTask_start.addEventListener('click', function (e){
//     createTask("button","special", false);
//     saveTasks(false);
//
// }, false);

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
    }, 500)
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

function createNote(keypress,nb,class_note,title_note,content,style){
    compteurCard++;
    const lin = document.createElement("li");
    const div = document.createElement("div");
    const divicon = document.createElement("div");
    const titre_in = document.createElement("input");
    const cont_in = document.createElement("textarea");

    const txt_link_todo = document.createElement("p");
    txt_link_todo.classList.add('txt_link_todo')
    txt_link_todo.innerHTML = "Aucun todo sélectionné."

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
    span.className = "close";
    span.classList.add("fas");
    span.classList.add("fa-times");

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
    lin.appendChild(txt_link_todo);

    if(keypress === "button"){
        let hour = getDate("h");
        let date_act = getDateDay("/", "FR");

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

// dm.addEventListener('click', function (){
//     dm.classList.toggle("spinMode");
//     document.documentElement.classList.toggle('toggle_mode');
//
//     let theme = "light";
//     if (document.documentElement.classList.contains("toggle_mode")) {
//         theme = "dark";
//     }
//     localStorage.setItem("theme", theme);
// })

refresh_but.addEventListener('click', function (){
    refresh_but_icon.classList.toggle("spinModeAll");

    setTimeout(function(){
        const localStorageTodos = JSON.parse(localStorage.getItem("todos_test"));
        lastSaveTime.innerHTML =  localStorageTodos.s;
    }, 100);

    menu.parentElement.classList.remove('clickMenu');
    menu_der.classList.remove('showMenu');

    saveTasks(getDate("h"));
});
account.addEventListener('click', function (e){
    if(e.target.tagName === 'I'){
        selector.classList.toggle('selectorVisibility')
    }
});

function chooseUser(id){
    console.log(id)
}
const filterTask = document.querySelector('.filter_selector');
filterTask.addEventListener('click', function (e){
    if(e.target.tagName === "P" || e.target.tagName === "I"){
        document.querySelector('.filter_selector').classList.add('bumpOnClick');
        setTimeout(function (){
            document.querySelector('.filter_selector').classList.remove('bumpOnClick')
        },200)
        document.querySelector('.categories').classList.toggle('categories_show')
    }else{
        document.querySelector('.categories').classList.remove('categories_show')
    }
});

const shareAll = document.querySelector('.shareAll');
shareAll.addEventListener('click', function (e){
    let shareAll_array = [];
    let shareAll_array_hast = [];
    for(let i = 0 ; i < myUL.childElementCount ; i++){
        shareAll_array.push(myUL.children[i].children[1].children[1].children[0].innerHTML);
        //TODO : add hastags to localsave
        shareAll_array_hast.push(myUL.children[i].children[1].children[1].children[1].innerHTML);
    }
    document.querySelector('.shareAllContainer').classList.add('bumpOnClick');
    setTimeout(function (){
        document.querySelector('.shareAllContainer').classList.remove('bumpOnClick')
    },200)

    share("All todos", shareAll_array, "todo")

});

function share(title, content, type){
    let multi = "";
    let tit;
    if(type === "todo"){
        if (Array.isArray(content)) {
            for(let i = 0 ; i < content.length ; i++){
                multi += "- " + `${content[i]}` + "\n";
            }
            tit = "Todo list";
        } else {
            multi = content;
            tit = "Todo : " + title;
        }
    }else{
        multi = content;
        tit = "Note : " + title;
    }

    navigator.share({
        title: tit,
        text: multi,
        url: 'https://nicolasvaillant.net',
    });
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

        menu.children[0].children[0].onclick = function(){zone1_note(parent);saveTasks(getDate("h"));};
        menu.children[0].children[1].onclick = function(){zone2_note(parent);saveTasks(getDate("h"));};
        menu.children[0].children[2].onclick = function(){zone3_note(parent);saveTasks(getDate("h"));};
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