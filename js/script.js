//JS FILE
// 27/02/2022/19h

let compteurCard, compteurLiSub = 0;

const colorNotes = ["rgb(181, 222, 255)", "rgb(252, 255, 166)", "rgb(193, 255, 215)", "rgb(240, 217, 255)"]

const list = document.querySelector('ul');
const content_div = document.querySelector('.content');
const addTask_bar = document.querySelector('.addTask_bar');
const date = document.querySelector('.date');
const lastSaveTime = document.querySelector('.lastSaveTime');
const input = document.getElementById("myInput");
const myUL = document.getElementById("myUL");
const myUL_note = document.getElementById("myUL_note");
const dm = document.querySelector("#dm");
const refresh_but = document.querySelector("#rb");
const refresh_but_icon = document.querySelector("#rb_icon");

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

const more__todo = document.querySelector('.more--todo');
const more__todo__but = document.querySelector('.more--todo--but');
const more__todo__content = document.querySelector('.more--todo--content');


const menu = document.querySelector('#menu');
const menu_der = document.querySelector('.menu_der');
const content = document.querySelector('.content');

const pickerHour = document.querySelector('#pickerHour');
const hashtag_button = document.querySelector('#hashtag_button');
const clockChoice = document.querySelector('#clockChoice');
const datetime__container = document.querySelector('.datetime--container');
const hashtag__container = document.querySelector('.hashtag--container');
const hashtag__creation = document.querySelector('#hashtag--creation');

let main_height = 0;

//Chargement des fonctions de base au rafraichissement du navigateur
window.onload = function () {

    // MicroModal.init();

    //Vérification de la première connexion
    if (!localStorage.getItem("todo_first_co") === true ||
        !localStorage.getItem("todo_first_co") === "true") {
        introJs().start();
        introJs().addHints();
        todoBanMainID.style.display = "block";
        tutoTodo.style.display = "block";
        localStorage.setItem("todo_first_co", "true");
    }

    //On cherche à télécharger les éléments s'ils existent dans le localStorage
    // if(JSON.parse(localStorage.getItem("Node_note")) !== null){reloadNote()}
    if (JSON.parse(JSON.parse(localStorage.getItem("todos_test")).e.length !== 0)) {
        reloadTasks()
    } else {
        console.warn("Reload unavailable")
    }

    //Affichage du nombre d'éléments dans la zone de filtre
    nb_label.innerHTML = "(" + myUL.childElementCount + "/" + myUL.childElementCount + ")";
    main_height = Math.max(document.documentElement.offsetHeight, document.documentElement.scrollHeight);

}

//Modification du clique droit sur une tâche
todoBanMainID.oncontextmenu = function (e) {
    rightClick;
    //Animation
    e.target.closest('#todoBanMainID').classList.add('bumpOnRClick');
    setTimeout(function () {
        e.target.closest('#todoBanMainID').classList.remove('bumpOnRClick')
    }, 200)
};

//Supprime éléments du clique droit lors d'un clique hors de la fenètre
window.onclick = function () {
    hideMenu()
}

//Masquage de l'affichage du clique droit du navigateur
window.oncontextmenu = function (e) {
    e.preventDefault()
}

//Gestion de l'affichage de l'élément au clique droit lors du scroll
window.onscroll = function () {
    const menu = document.getElementById("contextMenu");
    if (menu.style.display === "flex") {
        let out_height = window.innerHeight + window.scrollY - (menu.offsetTop + menu.offsetHeight);
        if (menu.offsetTop + menu.offsetHeight > window.innerHeight + window.scrollY) {
            menu.style.top = menu.offsetTop + out_height + "px";
        } else {
            menu.style.top = menu.offsetTop + "px";
        }
        let out_width = window.innerWidth + window.scrollX - (menu.offsetLeft + menu.offsetWidth);
        if (menu.offsetLeft + menu.offsetWidth > window.innerWidth + window.scrollX) {
            menu.style.left = menu.offsetLeft + out_width + "px";
        } else {
            menu.style.left = menu.offsetLeft + "px";
        }
    }
}

//Fonction de filtrage des tâches [NOT USED]
function filterTasks(check_id) {
    const nbElem = [];
    const items = [];
    for (let i = 0; i < myUL.childElementCount; i++) {
        if (myUL.childElementCount !== 0) {

            if (check_id === "all") {
                myUL.children[i].style.display = "";
                nbElem.push(true)
            } else {
                if (myUL.children[i].children[0].children[0].children[0].classList.contains(check_id)) {
                    myUL.children[i].style.display = "";
                    nbElem.push(true)
                } else {
                    myUL.children[i].style.display = "none";
                    nbElem.push(false)
                }
            }
            const counts = {};
            for (const num of nbElem) {
                counts[num] = counts[num] ? counts[num] + 1 : 1;
            }

            if (counts[false] === myUL.childElementCount) {
                nothingToShow.style.display = "flex";
                if (check_id === "importantTasks") {
                    nothingToShow_more.innerHTML = "Cliquer sur \"<i class='fas fa-exclamation-circle'></i>\" pour ajouter " +
                        "une tâche importante."
                    items.push(counts)
                } else if (check_id === "specialTasks") {
                    nothingToShow_more.innerHTML = "Cliquer sur \"<i class='fas fa-star'></i>\" pour ajouter " +
                        "une tâche spéciale."
                    items.push(counts)
                }
            } else {
                items.push(counts)
                nothingToShow.style.display = "none";
            }
        } else {
            // console.log("ok")
        }
    }
    if (check_id === "reminder") {
        nb_label.innerHTML = "(" + uniqueChars.length + "/" + myUL.childElementCount + ")"
        console.log(uniqueChars.length)
        for (let i = 0; i < uniqueChars.length; i++) {
            // myUL.appendChild(uniqueChars[i])
            // console.log(uniqueChars[i])
        }

    } else {
        if (isNaN(items[myUL.childElementCount - 1].true)) {
            nb_label.innerHTML = "(" + 0 + "/" + (myUL.childElementCount) + ")"
        } else {
            // console.log(items[myUL.childElementCount - 1].true)
            nb_label.innerHTML = "(" + items[myUL.childElementCount - 1].true + "/" +
                (myUL.childElementCount) + ")"
        }
    }


    // console.log(items[myUL.childElementCount - 1].true)
    // nb_label_all.innerHTML = items;

//    faire un test sur style: none des children pour afficher ou non
//    nothingToShow.classList.add('show');
}

//Affichage du menu "..." pour afficher les paramètres supplémentaires
menu.addEventListener('click', function () {
    menu_der.classList.toggle('showMenu');
    menu.parentElement.classList.toggle('clickMenu');
}, false);

//Raccourci pour créer une nouvelle tâche fille
function inputSubEnter(key, element) {
    if (key === 'Enter') {
        addChild(element)
    }
}

//Suppression de la tâche sélectionnée
function removeAll(element) {
    element.closest('.todoBanMain').classList.add('slideOut')
    // nb_label.innerHTML = "(" + myUL.childElementCount + "/" + myUL.childElementCount+ ")";
    setTimeout(function () {
        element.closest('.todoBanMain').remove();
        saveTasks(getDate());
    }, 500)
}

//MAJ du nombre de tâche fille dans l'affichage rapide des graphiques
function updateNBSubChild(element, index) {
    const todoBanMain = element.closest('.todoBanMain');
    const div = todoBanMain.querySelector('.collapsible_div_bodyContent');
    const numberOfElement = div.querySelector('.numberOfElement');
    const canvasChart_p = todoBanMain.querySelector('.canvasChart_p');

    setTimeout(function () {
        const localStorageTodos = JSON.parse(localStorage.getItem("todos_test"));
        // numberOfElement.innerText = `${localStorageTodos.e[index][6]}` + " sous-tâche(s) restante(s)";
        canvasChart_p.innerText = localStorageTodos.e[index][6];

        changeChart(todoBanMain, localStorageTodos.e[index][6], index);

    }, 300);

}

//Suppression d'une tâche fille
function removeOne(element) {
    const todoBanMain = element.closest('.todoBanMain');
    const div = todoBanMain.querySelector('.collapsible_div_bodyContent');
    element.parentElement.classList.add('slideOut');
    setTimeout(function () {
        element.parentElement.remove();
        saveTasks(getDate("h"));
    }, 200)

    updateNBSubChild(div, todoBanMain.dataset.num)
}

//Ajout d'une tâche fille
function addChild(element, localstorage, valueLS, classLS) {
    compteurLiSub++;

    const div = element.closest('.todoBanMain').querySelector('.collapsible_div_bodyContent')
    const staticContent = div.children[0];

    if (localstorage === true) {
        // print("valueLS", allValues, "red")


        let allValues = valueLS.filter(value => Object.keys(value).length !== 0);

        for (let i = 0; i < allValues.length; i++) {
            const li_sub = document.createElement("li");
            const disabled_li_sub_obj = document.createElement("span");
            const end_subTasks = document.createElement("input");
            let arr = classLS[i].split(" ");

            if (arr.length === 2) {
                li_sub.classList.add(arr[0]);
                li_sub.classList.add(arr[1]);

                disabled_li_sub_obj.classList.add("disabled_li_sub_obj");
                disabled_li_sub_obj.classList.add("disabled_li_sub_obj_ACTIVE");

                end_subTasks.checked = true;

            } else {
                disabled_li_sub_obj.classList.add("disabled_li_sub_obj");
                li_sub.classList.add(arr[0]);
            }

            li_sub.setAttribute("data-hierarchy", compteurLiSub.toString());

            const input_set = document.createElement("input");
            input_set.setAttribute("type", "text");
            // input_set.setAttribute("autofocus", "");
            input_set.classList.add('input_sub');
            input_set.onkeyup = function (e) {
                inputSubEnter(e.key, this);
                saveTasks(getDate("h"));
            };

            input_set.value = allValues[i];

            end_subTasks.setAttribute("type", "checkbox");
            end_subTasks.classList.add("end");
            end_subTasks.onclick = function () {
                changeStateLiSub(end_subTasks);
                saveTasks(getDate("h"));
            }

            li_sub.appendChild(disabled_li_sub_obj);

            li_sub.appendChild(end_subTasks);

            li_sub.appendChild(input_set);

            const span = document.createElement("span");

            span.className = "close";
            span.classList.add("fas");
            span.classList.add("fa-times");

            span.onclick = function () {
                removeOne(this);
                saveTasks(getDate("h"));
            };
            li_sub.appendChild(span);

            // div.appendChild(li_sub);
            div.insertBefore(li_sub, staticContent);
        }
    } else {

        const li_sub = document.createElement("li");
        li_sub.classList.add('li_sub');
        li_sub.setAttribute("data-hierarchy", compteurLiSub.toString());

        const input_set = document.createElement("input");
        input_set.setAttribute("type", "text");
        input_set.classList.add('input_sub');
        input_set.onkeyup = function (e) {
            inputSubEnter(e.key, this);
            saveTasks(getDate("h"));
        };

        const disabled_li_sub_obj = document.createElement("span");
        disabled_li_sub_obj.classList.add("disabled_li_sub_obj");

        const end_subTasks = document.createElement("input");
        end_subTasks.setAttribute("type", "checkbox");
        end_subTasks.classList.add("end");
        end_subTasks.onclick = function () {
            changeStateLiSub(end_subTasks);
            saveTasks(getDate("h"));
        }

        li_sub.appendChild(disabled_li_sub_obj);

        li_sub.appendChild(end_subTasks);

        li_sub.appendChild(input_set);

        const span = document.createElement("span");
        span.className = "close";
        span.classList.add("fas");
        span.classList.add("fa-times");

        span.onclick = function () {
            removeOne(this);
            saveTasks(getDate("h"));
        };
        li_sub.appendChild(span);

        div.insertBefore(li_sub, staticContent);

        const todoBanMain = element.closest('.todoBanMain');
        const dive = todoBanMain.querySelector('.collapsible_div_bodyContent');


        updateNBSubChild(dive, todoBanMain.dataset.num)
    }
}

//Modification de l'état de la tâche fille lors du clique sur la checkbox
function changeStateLiSub(element) {
    const parent = element.parentElement;
    const todoBanMain = element.closest('.todoBanMain');
    const fst_child = element.parentElement.children[0];

    if (element.checked) {
        parent.classList.add('li_sub_disabled');
        fst_child.classList.add('disabled_li_sub_obj_ACTIVE');
        parent.querySelector('.input_sub').disabled = true;
    } else {
        parent.classList.remove('li_sub_disabled');
        fst_child.classList.remove('disabled_li_sub_obj_ACTIVE');
        parent.querySelector('.input_sub').disabled = false;
    }

    updateNBSubChild(element, todoBanMain.dataset.num);
}

//Lien d'une tâche vers une note [NOT USED]
function linkToNote(element) {
    const dup = element.parentElement.parentElement;
    const clone = dup.cloneNode(true);
    clone.classList.add('noteCard');
    // dup.parentNode.appendChild(clone);
}

//Affichage des informations supplémentaires pour chaque tâche
function developChild(element) {
    const overlay = document.querySelector('.overlay');
    const el = element.closest('.todoBanMain').querySelector('.collapsible')

    if (el.classList.contains("active")) {
        displayLink(false, overlay);
    } else {
        displayLink(true, overlay);
    }

    $('.collapsible').collapsible()
}

//Modification de l'état de la tâche lors du clique sur les boutons concernés
function setTodo(element) {
    const div = element.closest(".todoBanMain");

    const header = div.querySelector('.collapsible-header');
    const i_imp = div.querySelector('.fa-exclamation-circle');
    const i_star = div.querySelector('.fa-star');

    if (header.classList.contains("endTasks")) {
    } else {
        if (element.dataset.name === "star") {
            if (header.classList.contains("importantTasks")) {
            } else {
                if (header.classList.contains("specialTasks")) {
                    i_star.classList.remove("specialTasks_color");
                    i_imp.classList.remove("disabledOptionsRC");
                    header.classList.remove("specialTasks");
                } else {
                    i_star.classList.add("specialTasks_color");
                    header.classList.add("specialTasks");

                    i_imp.classList.remove("importantTasks_color");
                    i_imp.classList.add("disabledOptionsRC");
                    header.classList.remove("importantTasks");
                }
            }
        } else {
            if (header.classList.contains("specialTasks")) {
            } else {
                if (header.classList.contains("importantTasks")) {
                    i_imp.classList.remove("importantTasks_color");
                    i_star.classList.remove("disabledOptionsRC");
                    header.classList.remove("importantTasks");
                } else {
                    i_imp.classList.add("importantTasks_color");
                    header.classList.add("importantTasks");

                    i_star.classList.add("disabledOptionsRC");
                    i_star.classList.remove("specialTasks_color");
                    header.classList.remove("specialTasks");
                }
            }

        }
    }
    return header.classList;
}

//Récupération de l'heure
function getDate(separator = "h") {
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

//Récupération de la date du jour
function getDateDay(separator, sens) {
    const date = new Date();
    let day = date.getDate("h");
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let output = "";
    if (sens === "EN") {
        output = year + separator + month + separator + day;
    } else if (sens === "FR") {
        output = day + separator + month + separator + year;
    }
    return output;
}

//Modification de l'état de la tâche, fin de tâche
function setFinish(e) {
    const parent = e.target.closest('.todoBanMain');

    const header = parent.querySelector('.collapsible-header');
    const i_imp = parent.querySelector('.fa-exclamation-circle');
    const i_star = parent.querySelector('.fa-star');

    if (header.classList.contains("endTasks")) {
        header.classList.remove('endTasks');
        i_imp.classList.remove('disabledOptionsRC');
        i_star.classList.remove('disabledOptionsRC');
        parent.querySelector('.textTask').classList.remove('endTasks_text');
    } else {
        header.classList.add('endTasks');
        i_imp.classList.add('disabledOptionsRC');
        i_star.classList.add('disabledOptionsRC');
        parent.querySelector('.textTask').classList.add('endTasks_text');

        header.classList.remove('importantTasks');
        header.classList.remove('specialTasks');

        i_imp.classList.remove('importantTasks_color');
        i_star.classList.remove('specialTasks_color');
    }

    saveTasks(getDate("h"));
}

//Fonction du clicque droit
function rightClick(e) {
    e.preventDefault();
    document.getElementById("contextMenuNote").style.display = "none";

    const parent = e.target.closest('.todoBanMain');
    const header = parent.querySelector('.collapsible-header');
    const i_imp = parent.querySelector('.fa-exclamation-circle');
    const i_star = parent.querySelector('.fa-star');

    parent.classList.add('bumpOnRClick');
    setTimeout(function () {
        parent.classList.remove('bumpOnRClick')
    }, 200)

    const i_zone_1 = document.querySelector('#i_zone_1');
    const txt_zone_1 = document.querySelector('.txt_zone_1');
    const txt_zone_2 = document.querySelector('.txt_zone_2');
    const txt_zone_3 = document.querySelector('.txt_zone_3');
    const txt_zone_4 = document.querySelector('.txt_zone_4');

    const menu = document.getElementById("contextMenu")

    menu.querySelector('#info_to_show').innerHTML = "Créée le " + `${parent.dataset.date}` +
        " à " + `${parent.dataset.hour}`;

    txt_zone_2.innerHTML = "Ajouter le filtre important";
    txt_zone_3.innerHTML = "Ajouter le filtre special";

    txt_zone_1.innerHTML = "Marquer comme terminée";
    i_zone_1.classList.add('fas');
    i_zone_1.classList.add('fa-check-circle');


    if (parent.querySelector('.checkbox_todo_end').checked === true) {
        txt_zone_1.innerHTML = "Marquer comme non terminée";

        parent.querySelector('.option--container').classList.add('endTasks_text');
        parent.querySelector('.div_option_container').classList.add('endTasks_text');

        menu.querySelector('#impTask').classList.add('disabledOptionsRC');
        menu.querySelector('#speTask').classList.add('disabledOptionsRC');

    } else if (header.classList.contains('importantTasks')) {
        txt_zone_2.innerHTML = "Enlever le filtre important";
        menu.querySelector('#impTask').classList.remove('disabledOptionsRC');
        menu.querySelector('#speTask').classList.add('disabledOptionsRC');

        i_star.classList.add('disabledOptionsRC');
        i_imp.classList.remove('disabledOptionsRC');

    } else if (header.classList.contains('specialTasks')) {
        txt_zone_3.innerHTML = "Enlever le filtre special";
        menu.querySelector('#speTask').classList.remove('disabledOptionsRC');
        menu.querySelector('#impTask').classList.add('disabledOptionsRC');

        i_imp.classList.add('disabledOptionsRC');
        i_star.classList.remove('disabledOptionsRC');
    } else {
        txt_zone_1.innerHTML = "Marquer comme terminée";
        txt_zone_2.innerHTML = "Ajouter le filtre important";
        txt_zone_3.innerHTML = "Ajouter le filtre special";

        parent.querySelector('.checkbox_todo_end').classList.remove('endTasks_text');
        parent.querySelector('.textTask').classList.remove('endTasks_text');

        menu.querySelector('#speTask').classList.remove('disabledOptionsRC');
        menu.querySelector('#impTask').classList.remove('disabledOptionsRC');

    }
    txt_zone_4.innerHTML = "Supprimer la tâche";

    function zone1(parent) {

        const header = parent.querySelector('.collapsible-header');
        const i_imp = parent.querySelector('.fa-exclamation-circle');
        const i_star = parent.querySelector('.fa-star');

        if (parent.querySelector('.checkbox_todo_end').checked === true) {
            parent.querySelector('.checkbox_todo_end').checked = false;
            header.classList.remove('endTasks');
            parent.querySelector('.checkbox_todo_end').classList.remove('endTasks_text');
            parent.querySelector('.textTask').classList.remove('endTasks_text');

            i_imp.classList.remove('disabledOptionsRC');
            i_star.classList.remove('disabledOptionsRC');

        } else {
            parent.querySelector('.checkbox_todo_end').checked = true;
            header.classList.add('endTasks');
            parent.querySelector('.checkbox_todo_end').classList.add('endTasks_text');
            parent.querySelector('.textTask').classList.add('endTasks_text');

            header.classList.remove('importantTasks');
            header.classList.remove('specialTasks');
            i_imp.classList.remove('importantTasks_color');
            i_star.classList.remove('specialTasks_color');

            i_imp.classList.add('disabledOptionsRC');
            i_star.classList.add('disabledOptionsRC');
        }
    }

    function zone2(parent, element) {
        if (element.classList.contains('disabledOptionsRC')) {
        } else {

            const header = parent.querySelector('.collapsible-header');
            const i_imp = parent.querySelector('.fa-exclamation-circle');
            const i_star = parent.querySelector('.fa-star');

            if (header.classList.contains("importantTasks")) {
                header.classList.remove('importantTasks');
                i_imp.classList.remove('importantTasks_color');

                i_imp.classList.remove('disabledOptionsRC');
                i_star.classList.remove('disabledOptionsRC');
            } else {
                header.classList.add('importantTasks');
                i_imp.classList.add('importantTasks_color');
                header.classList.remove('specialTasks');

                i_imp.classList.remove('disabledOptionsRC');
                i_star.classList.add('disabledOptionsRC');
            }
        }
    }

    function zone3(parent, element) {
        if (element.classList.contains('disabledOptionsRC')) {
        } else {
            const header = parent.querySelector('.collapsible-header');
            const i_imp = parent.querySelector('.fa-exclamation-circle');
            const i_star = parent.querySelector('.fa-star');

            if (header.classList.contains("specialTasks")) {
                header.classList.remove('specialTasks');
                i_star.classList.remove('specialTasks_color');

                i_imp.classList.remove('disabledOptionsRC');
                i_star.classList.remove('disabledOptionsRC');
            } else {
                header.classList.add('specialTasks');
                i_star.classList.add('specialTasks_color');
                header.classList.remove('importantTasks');

                i_imp.classList.add('disabledOptionsRC');
                i_star.classList.remove('disabledOptionsRC');
            }
        }
    }

    function zone4(parent) {
        parent.classList.add('slideOut');
        setTimeout(function () {
            parent.remove()
        }, 500)
    }

    function zone5(parent) {
        const check_user_1 = document.querySelector('#check_user_1');
        const valueInput = parent.querySelector('.textTask').innerHTML;

        let user;
        if (check_user_1.checked) {
            user = "Nicolas"
        } else {
            user = "Thérence"
        }
        const text = `${user}` + " a partagé le contenu d'une note avec vous. " +
            `\"${valueInput}\"` + " est le titre de la note." + " La note a été créée le " + `${parent.dataset.date}` +
            " à " + `${parent.dataset.hour}` + ".";

        share(valueInput, text, "todo")

    }

    let arrayShare__child = [];
    let arrayShare__child__class = [];

    let arrayShare = [];

    function zone5b(parent) {

        let hour = getDate("h");
        let date_act = getDateDay("/", "FR");

        const container = parent.querySelector('.collapsible-header');
        container.classList.toggle('shareTask');

        let share_state = parent.querySelector('.collapsible-header').className;
        let share_value = parent.querySelector('.textTask').innerHTML;
        let share_has = parent.querySelector('.colorhastags').innerHTML;
        let share_dataset = parent.dataset;

        parent.querySelectorAll('.input_sub').forEach(function (child) {
            arrayShare__child.push(child.value);
        });

        parent.querySelectorAll('.li_sub').forEach(function (child) {
            arrayShare__child__class.push(child.className);
        });

        arrayShare.push(
            parent.dataset,
            parent.classList,
            parent.querySelector('.colorhastags').innerHTML,
            parent.querySelector('.collapsible-header').classList,
            arrayShare__child.splice(0, arrayShare__child.length).filter(value => Object.keys(value).length !== 0),
            parent.querySelector('.textTask').innerHTML,
            parent.querySelectorAll('.li_sub').length,
            arrayShare__child__class.splice(0, arrayShare__child__class.length).filter(value => Object.keys(value).length !== 0),
            parent.querySelector('.creator').innerHTML
        )

        const task__share = {e: arrayShare}

        //TODO : send data to server
        console.log(task__share);
    }

    if (document.getElementById("contextMenu").style.display === "flex")
        hideMenu();
    else {
        menu.style.display = 'flex';
        let out_height = window.innerHeight + window.scrollY - (e.pageY + menu.offsetHeight);

        if (e.pageY + menu.offsetHeight > window.innerHeight + window.scrollY) {
            menu.style.top = e.pageY + out_height + "px";
        } else {
            menu.style.top = e.pageY + "px";
        }

        let out_width = window.innerWidth + window.scrollX - (e.pageX + 2 * menu.offsetWidth);

        if (e.pageX + 2 * menu.offsetWidth > window.innerWidth + window.scrollX) {
            menu.style.left = e.pageX + out_width + "px";
        } else {
            menu.style.left = e.pageX + "px";
        }

        //END
        menu.querySelector('#endTask').onclick = function () {
            zone1(parent);
            saveTasks(getDate("h"));
        };
        //IMPORTANT
        menu.querySelector('#impTask').onclick = function () {
            zone2(parent, this);
            saveTasks(getDate("h"));
        };
        //SPECIAL
        menu.querySelector('#speTask').onclick = function () {
            zone3(parent, this);
            saveTasks(getDate("h"));
        };
        //DELETE
        menu.querySelector('#deleteTask').onclick = function () {
            zone4(parent);
            saveTasks(getDate("h"));
        };
        //SHARE
        menu.querySelector('#share--text').onclick = function () {
            zone5(parent);
            saveTasks(getDate("h"));
        };
        menu.querySelector('#share--task').onclick = function () {
            zone5b(parent);
            saveTasks(getDate("h"));
        };
    }
}

//Cacher l'élément au clique droit
function hideMenu() {
    document.getElementById(
        "contextMenu").style.display = "none";
    document.getElementById(
        "contextMenuNote").style.display = "none";
}

let ctr_todos_chart = 0;
let ctr_card = 0;
let array_id = [];


//Création d'une tâche [MAIN]
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
    creator_user,
    index) {

    //Expand task : fa-chevron-right
    const expand = document.createElement("i");
    expand.onclick = function () {
        developChild(this)
    };
    expand.classList.add("fas");
    expand.classList.add("fa-chevron-down");
    expand.classList.add("expandChevron");
    expand.classList.add("checkBox");
    //texte principal
    const text = document.createElement("p");
    text.classList.add("textTask");
    //Valeur rentrée par l'utilisateur
    const inputValue = input.value;
    //checkBox toggle end task
    const itag_end = document.createElement('input')
    itag_end.classList.add('checkbox_todo_end');
    itag_end.setAttribute("type", "checkbox");
    itag_end.onclick = setFinish;

    //---------------------------------------------------COLLAPSIBLE
    const todoBanMain = document.createElement("div");
    todoBanMain.classList.add('todoBanMain');

    // todoBanMain.setAttribute('draggable', true)

    todoBanMain.addEventListener('dragstart', handleDragStart);
    todoBanMain.addEventListener('dragover', handleDragOver);
    todoBanMain.addEventListener('dragenter', handleDragEnter);
    todoBanMain.addEventListener('dragleave', handleDragLeave);
    todoBanMain.addEventListener('dragend', handleDragEnd);
    todoBanMain.addEventListener('drop', handleDrop);

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
    collapsible_div_header.classList.add('collapsible-header');

    collapsible_div_header.classList.add('nd--collapsible-header');

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
    itag_imp.onclick = function () {
        setTodo(this);
        saveTasks(getDate("h"));
    };
    const itag_star = document.createElement("i");
    itag_star.classList.add("fas");
    itag_star.classList.add("fa-star");
    itag_star.setAttribute("data-name", "star");
    itag_star.onclick = function () {
        setTodo(this);
        saveTasks(getDate("h"));
    };
    //---------------------------------------------------COLLAPSIBLE
    const div_text = document.createElement("div");
    div_text.classList.add("option--container");
    div_text.classList.add("nd--option--container");
    //---------------------------------------------------COLLAPSIBLE
    const itage = document.createElement("i");
    const itag = document.createElement("i");
    // const itac = document.createElement("i");
    itage.classList.add("fas");
    itage.classList.add("fa-times");
    itage.onclick = function () {
        removeAll(this);
        saveTasks(getDate("h"));
    };
    itag.classList.add("fas");
    itag.classList.add("fa-plus-circle");
    itag.onclick = function () {
        addChild(this, false, false, todos_nbLS_subChild, index);
        developChild(this);
        saveTasks(false)
    };
    itag.setAttribute("name", "morebut");
    //---------------------------------------------------RIGHT CLICK
    todoBanMain.oncontextmenu = rightClick;
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
    div_text.appendChild(itag_end);
    div_text.appendChild(text);
    todoBanMainContainer.appendChild(div_text);
    div_option_container.appendChild(itag);
    div_option_container.appendChild(itage);
    div_option.appendChild(div_option_container);
    todoBanMainContainer.appendChild(div_option);
    todoBanMain.appendChild(collapsible_ul);
    todoBanMain.appendChild(todoBanMainContainer);
    //---------------------------------------------------VALIDATION
    const spanhas = document.createElement("span");
    spanhas.classList.add('colorhastags');
    spanhas.onclick = function (e) {
        showAllHas(this)
    };
    //---------------------------------------------------CHART

    const containerChart = document.createElement("div");
    containerChart.classList.add('containerChart');

    ctr_todos_chart++;

    const canvasChart = document.createElement("div");
    const canvasChart_p = document.createElement("p");
    canvasChart.classList.add('canvasChart');
    canvasChart_p.classList.add('canvasChart_p');

    canvasChart_p.innerHTML = todos_nbLS_subChild;

    //---------------------------------------------------CREATOR
    const containerCreator = document.createElement("div");
    containerCreator.classList.add('containerCreator');
    const creator = document.createElement("p");
    creator.classList.add('creator');

    //---------------------------------------------------

    const i_clock = document.createElement("i");
    i_clock.classList.add("fas");
    i_clock.classList.add("fa-clock");
    i_clock.classList.add("td-transform-none");
    i_clock.classList.add("td-padding");

    const time_p = document.createElement("p");
    const time_span = document.createElement("span");
    time_span.classList.add('date--span')
    let hour, date_act;

    const localStorageTodos = JSON.parse(localStorage.getItem("todos_test"));

    if (keypress === "input" || keypress === "button" || keypress === "submit") {
        hour = getDate("h");
        date_act = getDateDay("/", "FR");
        numberOfElement.innerText = "0 sous-tâche(s) restante(s)";
        if (inputValue !== '') {

            if (localStorageTodos === null) {
                todoBanMain.setAttribute("data-num", ctr_card++)
                todoBanMain.setAttribute("data-hierarchy", ctr_card++);
            } else {
                todoBanMain.setAttribute("data-num", localStorageTodos.v)
                todoBanMain.setAttribute("data-hierarchy", localStorageTodos.v);
            }

            todoBanMain.setAttribute("data-hour", hour)
            todoBanMain.setAttribute("data-date", date_act);
            todoBanMain.setAttribute("data-reminder", reminderQ);

            myUL.appendChild(todoBanMain);
            input.value = "";
            text.innerHTML = inputValue;

            if (filter !== false) {
                if (filter === "important") {
                    collapsible_div_header.classList.add('importantTasks');
                    itag_imp.classList.add('importantTasks_color');
                    itag_star.classList.add('disabledOptionsRC');
                } else if (filter === "special") {
                    itag_star.classList.add('specialTasks_color');
                    itag_imp.classList.add('disabledOptionsRC');
                    collapsible_div_header.classList.add('specialTasks')
                }
                myUL.appendChild(todoBanMain)
                input.value = "";
                text.innerHTML = inputValue;
            }
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

            } else {
                txt = document.createTextNode("");
                spanhas.appendChild(txt);
                div_text.appendChild(spanhas);
            }


            if (reminderQ !== "") { //from input
                let res, hour;
                let dated = new Date();
                time_p.classList.add("date--deadline");

                const u = (pickerHour.value.split("T")[0].split("-")).reverse().join('/');
                const y = (pickerHour.value.split("T")[1]);
                time_p.innerHTML = u + " à " + y;

                res = Math.round((new Date(pickerHour.value).getTime() -
                        dated.getTime()) /
                    (1000 * 3600 * 24));


                if (res < 0) {
                    time_span.innerHTML = Math.abs(res) + " " + "jour(s) de retard";
                    time_p.classList.add("td-color-red");
                    i_clock.classList.add("td-color-red");

                    setInterval(function () {
                        reminderCheck(todoBanMain)
                    }, 1000); //60000 : 1
                } else {
                    if (res < 1) {
                        time_p.classList.add("td-color-orange");
                        i_clock.classList.add("td-color-orange");

                        hour = Math.round((new Date(reminderQ).getTime() -
                                dated.getTime()) /
                            (1000 * 3600));
                        if (hour < 0) {
                            time_span.innerHTML = Math.abs(hour) + " " + "heures(s) de retard"
                        } else {
                            time_span.innerHTML = hour + " " + "heures(s) restante(s)"
                        }

                        setInterval(function () {
                            reminderCheck(todoBanMain)
                        }, 1000); //60000 : 1

                    } else {
                        time_p.classList.add("td-color-green");
                        i_clock.classList.add("td-color-green");

                        time_span.innerHTML = res + " " + "jour(s) restant(s)";
                    }
                }

                i_clock.onclick = function () {
                    showTime(this)
                };
                div_text.appendChild(i_clock);
                time_p.appendChild(time_span);
                div_text.appendChild(time_p);
                pickerHour.value = "";
            } else {
                i_clock.setAttribute('data-display', 'hidden')
                i_clock.setAttribute('data-state', 'no-interaction');
                div_text.appendChild(i_clock);
                time_p.appendChild(time_span);
                div_text.appendChild(time_p);
            }

            array_id.push(inputValue.replace(/\s/g, ""))

            const set = new Set(array_id);
            const duplicates = array_id.filter(item => {
                if (set.has(item)) {
                    set.delete(item);
                } else {
                    return item;
                }
            });

            if (duplicates.length !== 0) {
                canvasChart.setAttribute("id", inputValue.split(" ")[0].replace(/\s/g, "")
                    + Math.floor(Math.random() * 10000));
            } else {
                canvasChart.setAttribute("id", inputValue.split(" ")[0].replace(/\s/g, ""))
            }

            if (duplicates.length !== 0) {
                canvasChart.setAttribute("id", inputValue.split(" ")[0].replace(/\s/g, "")
                    + Math.floor(Math.random() * 10000));
            } else {
                canvasChart.setAttribute("id", inputValue.split(" ")[0].replace(/\s/g, ""))
            }

            canvasChart_p.innerHTML = "0";
            canvasChart.appendChild(canvasChart_p);
            containerChart.appendChild(canvasChart);
            div_text.appendChild(containerChart);

            creator.innerText = "Nicolas Vaillant";
            containerCreator.appendChild(creator);
            div_text.appendChild(containerCreator);
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
            if (hashtag === '') {
                spanhas.setAttribute('data-state', 'no-interaction');
                spanhas.setAttribute('data-display', 'hidden');
            }

            spanhas.appendChild(document.createTextNode(hashtag));
            div_text.appendChild(spanhas);
        }
        todoBanMain.setAttribute("data-num", index)
        todoBanMain.setAttribute("data-hour", data_set.hour)
        todoBanMain.setAttribute("data-date", data_set.date)
        todoBanMain.setAttribute("data-hierarchy", data_set.hierarchy)

        if (data_set.reminder === "none" || data_set.reminder === "") {
            todoBanMain.setAttribute("data-reminder", "none");
            i_clock.setAttribute('data-display', 'hidden');
            i_clock.setAttribute('data-state', 'no-interaction');
            time_p.classList.add("date--deadline");
        } else {
            todoBanMain.setAttribute("data-reminder", data_set.reminder)

            i_clock.classList.add("td-padding");
            time_p.classList.add("date--deadline");

            res = Math.round((new Date(data_set.reminder).getTime() -
                    dated.getTime()) /
                (1000 * 3600 * 24));

            if (res < 0) {
                time_span.innerHTML = Math.abs(res) + " " + "jour(s) de retard";
                time_p.classList.add("td-color-red");
                i_clock.classList.add("td-color-red");
                setInterval(function () {
                    reminderCheck(todoBanMain)
                }, 1000); //60000 : 1
            } else {
                if (res < 1) {
                    time_p.classList.add("td-color-orange");
                    i_clock.classList.add("td-color-orange");

                    hour = Math.round((new Date(data_set.reminder).getTime() -
                            dated.getTime()) /
                        (1000 * 3600));

                    if (hour < 0) {
                        time_span.innerHTML = Math.abs(hour) + " " + "heures(s) de retard"
                    } else {
                        time_span.innerHTML = hour + " " + "heures(s) restante(s)"
                    }

                    setInterval(function () {
                        reminderCheck(todoBanMain)
                    }, 1000); //60000 : 1

                } else {
                    time_p.classList.add("td-color-green");
                    i_clock.classList.add("td-color-green");

                    time_span.innerHTML = res + " " + "jour(s) restant(s)";
                }
            }


            const u = (data_set.reminder.split("T")[0].split("-")).reverse().join('/');
            const y = (data_set.reminder.split("T")[1]);
            time_p.innerHTML = u + " à " + y;

        }

        i_clock.onclick = function () {
            showTime(this)
        };
        div_text.appendChild(i_clock);
        time_p.appendChild(time_span);
        div_text.appendChild(time_p);

        if (Object.keys(stateLS).length !== 0) {

            for (let i = 0; i < Object.keys(stateLS).length; i++) {
                collapsible_div_header.classList.add(stateLS[i]);

                const checkbox = todoBanMain.querySelector('.checkbox_todo_end');
                const textTask = todoBanMain.querySelector('.textTask');
                const i_imp = todoBanMain.querySelector('.fa-exclamation-circle');
                const i_star = todoBanMain.querySelector('.fa-star');


                if (stateLS[i] === "endTasks") {

                    checkbox.checked = true;
                    checkbox.classList.add('endTasks_text');
                    textTask.classList.add('endTasks_text');

                    i_imp.classList.add('disabledOptionsRC');
                    i_star.classList.add('disabledOptionsRC');

                } else if (stateLS[i] === "specialTasks") {
                    i_star.classList.add('specialTasks_color');
                    i_imp.classList.add('disabledOptionsRC');
                } else if (stateLS[i] === "importantTasks") {
                    i_imp.classList.add('importantTasks_color');
                    i_star.classList.add('disabledOptionsRC');
                } else {
                }
            }

        }

        array_id.push(valueLS.replace(/\s/g, ""))

        const set = new Set(array_id);
        const duplicates = array_id.filter(item => {
            if (set.has(item)) {
                set.delete(item);
            } else {
                return item;
            }
        });

        if (duplicates.length !== 0) {
            canvasChart.setAttribute("id", valueLS.replace(/\s/g, "")
                + Math.floor(Math.random() * 10000));
        } else {
            canvasChart.setAttribute("id", valueLS.replace(/\s/g, ""))
        }

        canvasChart.appendChild(canvasChart_p);
        containerChart.appendChild(canvasChart);
        div_text.appendChild(containerChart);

        creator.innerText = creator_user;
        containerCreator.appendChild(creator);
        div_text.appendChild(containerCreator);

        myUL.appendChild(todoBanMain);
    }

    createChart(todoBanMain, todos_nbLS_subChild);
    return true;
}

let storeElementOverDated = [];
let uniqueChars = [];

const modal__has = document.querySelector('#modal__has')
const modal__container = document.querySelector('.modal__container')

//Montre tous les hashtags groupés
function showAllHas(element) {
    const parent = element.closest('.todoBanMain');
    const container = myUL.querySelectorAll('.todoBanMain');
    const content_overlay = document.createElement('div');
    const header = document.createElement('div');
    const header_l = document.createElement('div');
    const close_popup = document.createElement('i');
    const txt_popup = document.createElement('p');
    const lbl_popup = document.createElement('p');
    content_overlay.classList.add('content_overlay');
    header.classList.add('header_popup');
    header_l.classList.add('header_l');
    txt_popup.classList.add('txt_popup');
    lbl_popup.classList.add('lbl_popup');
    close_popup.classList.add('fas');
    close_popup.classList.add('fa-times');
    close_popup.classList.add('close_popup');


    if (content_overlay.childElementCount === 0) {
        modal__container.classList.add('modal__show');
        setTimeout(function () {
            modal__container.classList.add('modal__show__bg');
        }, 800)

        // myUL.classList.add('zoom_out');

        let array_has = [];

        container.forEach(function (todo) {
            const has = todo.querySelector('.colorhastags');
            array_has.push(has.innerHTML)
        })

        var indices = [];
        var e = element.innerHTML;
        var idx = array_has.indexOf(e);
        while (idx != -1) {
            indices.push(idx);
            idx = array_has.indexOf(e, idx + 1);
        }
        for (let i = 0; i < indices.length; i++) {
            const content_overlay_todo = document.createElement('div')
            const cont_ov_but = document.createElement('i')
            const cont_ov_but_lbl = document.createElement('p')
            const con_ov_container = document.createElement('div')
            con_ov_container.classList.add('con_ov_container');
            content_overlay_todo.classList.add('content_overlay_todo');
            cont_ov_but_lbl.classList.add('cont_ov_but_lbl');
            cont_ov_but.classList.add('fas');
            cont_ov_but.classList.add('fa-chevron-down');
            cont_ov_but.classList.add('cont_ov_but');
            cont_ov_but_lbl.innerHTML = "Afficher la tâche";
            var new_c = container[indices[i]].cloneNode(true);
            new_c.classList.add('readOnly')
            con_ov_container.appendChild(cont_ov_but_lbl)
            con_ov_container.appendChild(cont_ov_but)
            content_overlay_todo.appendChild(con_ov_container)
            new_c.appendChild(content_overlay_todo)

            content_overlay_todo.onclick = function () {
                hasToTasks(this)
            }
            content_overlay.appendChild(new_c)
        }

        txt_popup.innerHTML = "Tâches en lecture seule"
        lbl_popup.innerHTML = `${indices.length} tâches sélectionnées`
        header_l.onclick = function () {
            remAllHas(this)
        }

        header_l.appendChild(close_popup);
        header_l.appendChild(txt_popup);
        header.appendChild(header_l);
        header.appendChild(lbl_popup);

        modal__has.appendChild(header);
        modal__has.appendChild(content_overlay);
    }
}

//Relie les tâches affichés dans la fonctions showAllHas avec les toutes les tâches
function hasToTasks(element) {
    const todo = element.closest('.todoBanMain');
    const parent = element.closest('#modal__has');
    const allTodo = document.querySelectorAll('.todoBanMain:not(.readOnly):not(#todoBanMainID)');
    const index = todo.dataset.num;
    remAllHas(parent);

    allTodo[index].classList.add('highlightTodo');
    setTimeout(function () {
        allTodo[index].classList.remove('highlightTodo')
    }, 1000)
}

//Suppression de tous les éléments du modal après sa fermeture
function remAllHas(element) {

    modal__container.classList.remove('modal__show__bg');
    modal__has.classList.add('modal__content_d');

    setTimeout(function () {
        modal__container.classList.remove('modal__show');
        modal__has.classList.remove('modal__content_d');
    }, 700)

    // myUL.classList.remove('zoom_out');

    const parent = element.closest('#modal__has')
    setTimeout(function () {
        parent.querySelector('.content_overlay').remove();
        parent.querySelector('.header_popup').remove();
    }, 1500)

}

//Fonction de calcul des deadLines
function reminderCheck(element) {

    let day, hour, min;
    let dated = new Date();

    day = Math.round((new Date(element.dataset.reminder).getTime() -
            dated.getTime()) /
        (1000 * 3600 * 24));

    hour = Math.round((new Date(element.dataset.reminder).getTime() -
            dated.getTime()) /
        (1000 * 3600));

    min = (new Date(element.dataset.reminder).getMinutes() - dated.getMinutes());

    if (day === 0 || day < 0) {
        if (hour === 0 || hour < 0) {
            if (min === 0 || min < 0) {

                element.querySelector('.fa-clock').classList.remove('td-color-orange')
                element.querySelector('.date--deadline').classList.remove('td-color-orange')
                element.querySelector('.fa-clock').classList.add('td-color-red')
                element.querySelector('.date--deadline').classList.add('td-color-red')

                storeElementOverDated.push(element);

                uniqueChars = [...new Set(storeElementOverDated)];
                return true;
            } else {
                return false
            }
        } else {
            return false
        }
    }
}

//Affichage de la deadLine
function showTime(element) {
    const clock = element.closest('.option--container').querySelector('.fa-clock');
    const deadline = element.closest('.option--container').querySelector('.date--deadline');
    clock.classList.add('bumpOnClick2');
    setTimeout(function () {
        clock.classList.remove('bumpOnClick2')
    }, 200)
    deadline.classList.toggle('showHour')
}

//Fonction expérimentale
function reverseString(str) {
    return str.split("").reverse().join("")
}

//Fonction de création des liens entre les tâches et les notes [NOT USED]
function createVisibleLink(parent, child) {

    const overlay = document.createElement("div");
    overlay.classList.add('overlay');
    displayLink(true, overlay);
    overlay.style.height = main_height + "px";

    const segment = document.createElement("div");
    segment.classList.add('segment');
    const fromTop = parent.offsetTop + parent.offsetHeight / 2; //+ todoContainer.offsetTop
    const heightDiv = (child.offsetTop - fromTop) + child.offsetHeight / 2;

    segment.style.marginTop = fromTop + "px";
    segment.style.height = heightDiv + "px";

    const noVisibility = document.createElement("div");
    noVisibility.classList.add('noVisibility');

    noVisibility.style.height = main_height + "px";

    noVisibility.appendChild(segment)
    overlay.appendChild(noVisibility)

    document.body.appendChild(overlay)
}

//Fonction d'affichage des liens entre les tâches et les notes [NOT USED]
function displayLink(state, element) {
    if (state) {
        if (element) {
            element.classList.add('show')
        }
    } else {
        element.classList.remove('show')
    }
}

//Fonction principale des liens entre les tâches et les notes [NOT USED]
function linkToNoteC(element) {
    let comp_select = 0;

    const div = element.closest(".todoBanMain");
    descriptionLink.classList.add('show');

    for (let i = 0; i < myUL_note.childElementCount; i++) {
        myUL_note.children[i].classList.add('choosingNote');

        myUL_note.children[i].onclick = function (e) {
            if (comp_select++ === 0) {
                const res = e.target.closest('.noteCard');
                res.classList.add("noteChoose");
                myUL_note.children[i].querySelector('.txt_link_todo').innerText = "Todo " +
                    `\"${div.children[1].children[1].children[0].innerText}\"` + " sélectionnée";
                for (let i = 0; i < myUL_note.childElementCount; i++) {
                    myUL_note.children[i].classList.remove('choosingNote');
                }
                descriptionLink.classList.remove('show');
                createVisibleLink(div, myUL_note.children[i]);
            }
        }
    }
}

//Fonction d'écriture stylisée dans la console de debug
function print(title, value, color = "green") {
    console.log("%c Print " + `${title}` + " : " + value, "color : " + `${color}` + ";font-size:1.2em");
}

const arr_child_val = [];
const arr_child_class = [];

//Fonction expérimentale
function storage(a, b) {
    arr_child_val.push(a);
    arr_child_class.push(b);
    return {arr_child_val, arr_child_class};
}

//Fonction expérimentale
function test() {
    const test = [];
    for (let i = 0; i <= 2; i++) {
        for (let a = 0; a <= 4; a++) {
            test.push([a, i]);
        }
    }
    console.log(test);
}

//Fonction de chargement des tâches depuis le localStorage
function reloadTasks() {
    const localStorageTodos = JSON.parse(localStorage.getItem("todos_test"));
    let nb_child = localStorageTodos.v;
    lastSaveTime.innerHTML = localStorageTodos.s;

    for (let i = 0; i < nb_child; i++) {

        let todos_dataset_child = localStorageTodos.e[i][0];
        let todos_class = localStorageTodos.e[i][1];
        let todos_value_child_has = localStorageTodos.e[i][2];
        let todos_state_child = localStorageTodos.e[i][3];
        let todos_value_subChild = localStorageTodos.e[i][4];
        let todos_value_child = localStorageTodos.e[i][5];
        let todos_nb_subChild = localStorageTodos.e[i][6];
        let todos_class_subChild = localStorageTodos.e[i][7];
        let todos_creator = localStorageTodos.e[i][8];

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
            todos_creator,
            i
        );
    }
}

const color_a = [
    "#43c900",
    "#88e200",
    "#d3fc00",
    "#eb8e00",
    "#fe0300",
    "#6e6c6c"
]

let array_li_sub = [];
let new_array_li_sub = [];

//Fonction de création des graphiques
function createChart(element, todos_nbLS_subChild, value_onchange, flag_change) {

    let hw_li_dis = 0;

    const div = element.closest('.todoBanMain');
    const li_subs = div.querySelectorAll('.li_sub');

    const allChart_containers = div.querySelector('.containerChart')

    li_subs.forEach(function (e) {
        if (e.classList.contains('li_sub_disabled')) {
            hw_li_dis++
        }
    })

    if (todos_nbLS_subChild === 0 || hw_li_dis === 0) {
        value = 0
    } else {
        value = hw_li_dis / todos_nbLS_subChild
    }

    let color;

    if (value > 0 && value <= .2) {
        color = color_a[4];
    } else if (value > .2 && value <= .4) {
        color = color_a[3];
    } else if (value > .4 && value <= .6) {
        color = color_a[2];
    } else if (value > .6 && value <= .8) {
        color = color_a[1];
    } else if (value > .8 && value <= 1) {
        color = color_a[0];
    } else {
        color = color_a[5];
    }

    const config = {
        strokeWidth: 10,
        easing: 'easeInOut',
        duration: 1400,
        color: color,
        trailColor: '#cbbcbc',
        trailWidth: 1,
        svgStyle: null
    }

    const re = "#" + allChart_containers.children[0].id.replace(/\s/g, "");
    try {
        new ProgressBar.Circle(re.toString(), config).animate(value)
    } catch (e) {
        console.warn(e)
    }
}

//Fonction de modification des graphiques
function changeChart(parent, valueNum, index) {
    let hw_li_dis_change = 0;

    const div = parent.closest('.todoBanMain');
    const element = parent.querySelector('.containerChart');

    const li_subs = div.querySelectorAll('.li_sub');

    li_subs.forEach(function (e) {
        if (e.classList.contains('li_sub_disabled')) {
            hw_li_dis_change++
        }
    })

    // console.log(hw_li_dis_change);
    element.querySelector('.canvasChart').children[1].remove();

    setTimeout(function () {
        const localStorageTodos = JSON.parse(localStorage.getItem("todos_test"));
        createChart(element, localStorageTodos.e[index][6], hw_li_dis_change, true);
    }, 100);
}

//Fonction expérimentale [NOT USED]
function getShareTask() {
    const elem = 0;
    let nb_child = elem.child_nb;

    for (let i = 0; i < nb_child; i++) {
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

//Fonction de chargement des notes depuis le localStorage
function reloadNote() {
    const parse_Note = JSON.parse(localStorage.getItem("Node_note"));
    let nb_child = parse_Note.child_nb;

    for (let i = 0; i < nb_child; i++) {
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

//Affichage de l'input du choix de la date/heure
clockChoice.addEventListener('click', function () {
    pickerHour.classList.toggle('showPicker');
    hashtag_button.classList.toggle('hashtag_button__on');

    datetime__container.classList.toggle('showPicker--container');
});

//Affichage de l'input pour l'hashtag
hashtag_button.addEventListener('click', function () {
    hashtag__creation.classList.toggle('showPicker');
    hashtag__container.classList.toggle('showPicker--container');

});

//Affichage des options suplémentaires pour la création d'une tâche
more__todo__but.addEventListener('click', function (e) {

    //TODO : Animation d'apparition à tester
    //
    // more__todo.classList.add('bumpOnClick_reverse');
    // setTimeout(function (){
    //     more__todo.classList.remove('bumpOnClick_reverse')
    // },200)

    more__todo__content.classList.toggle('more--todo--show');
    // more__todo__but.classList.toggle('more--todo--show--but');
});

//Création d'une tâche lors de l'appuie sur la touche "entrer"
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {

        createTask("input", false, pickerHour.value);
        saveTasks(getDate("h"));
        pickerHour.classList.remove('showPicker');
        datetime__container.classList.remove('showPicker--container');
        more__todo__content.classList.remove('more--todo--show');
        more__todo__but.classList.remove('more--todo--show--but');

        todoBanMainID.classList.add('todoBanMainID_remove')
        setTimeout(function () {
            todoBanMainID.remove();
        }, 1000);
    }
}, false);

let toggleIMP = false;
let toggleSPE = false;
let change__state__imp = 0;
let change__state__spe = 0;

//Fonction d'ajout d'état avancé lors de la création de tâche
function createTaskButton(id) {
    switch (id) {
        case "impTask_start":
            //Si le bouton tâche important est cliqué
            if (change__state__imp === 0) {
                change__state__imp++;
                toggleIMP = true;
                impTask_start.classList.add('importantTasks_color');
                stateNextTask('Le statut de la tâche est défini sur important', true)
            } else if (change__state__imp >= 1) {
                change__state__imp = 0;
                toggleIMP = false;
                impTask_start.classList.remove('importantTasks_color');
                stateNextTask('', false)
            }
            change__state__spe = 0;
            toggleSPE = false;
            speTask_start.classList.remove('specialTasks_color');
            break;
        case "speTask_start":
            //Si le bouton tâche spécial est cliqué
            if (change__state__spe === 0) {
                change__state__spe++;
                toggleSPE = true;
                speTask_start.classList.add('specialTasks_color');
                stateNextTask('Le statut de la tâche est défini sur spécial', true)
            } else if (change__state__spe >= 1) {
                change__state__spe = 0;
                toggleSPE = false;
                speTask_start.classList.remove('specialTasks_color');
                stateNextTask('', false)
            }
            change__state__imp = 0;
            toggleIMP = false;
            impTask_start.classList.remove('importantTasks_color');
            break;
        case "clockChoice":
            //Si le bouton d'ajout de deadline est cliqué
            impTask_start.classList.remove('importantTasks_color');
            speTask_start.classList.remove('specialTasks_color');
            clockChoice.classList.toggle('clkTasks_color');
            break;
        case "button_start":
            //On vérifie que l'input n'est pas vide
            if (input.value === "") {
                //TODO : DESIGN de l'alerte à modifier [1]
                // alert("La tâche ne peut pas être vide !")
                sweetAlert();
                break;
            } else {
                //On enlève chacune des class de style au tooltip
                more__todo__content.classList.remove('more--todo--show');
                more__todo__but.classList.remove('more--todo--show--but');
                datetime__container.classList.remove('showPicker--container');
                clockChoice.classList.remove('clkTasks_color');
                clockChoice.classList.remove('clkTasks_color');
                pickerHour.classList.remove('showPicker');
                stateNextTask('', false)
                change__state__spe = 0;
                change__state__imp = 0;

                //Vérification de l'état des flags lors de la création de la tâche
                if (toggleIMP === true) {
                    if (createTask("submit", "important", pickerHour.value) === true) {
                        impTask_start.classList.remove('importantTasks_color');
                        speTask_start.classList.remove('specialTasks_color');
                    }
                    toggleIMP = false;
                    toggleSPE = false;
                } else if (toggleSPE === true) {
                    if (createTask("submit", "special", pickerHour.value) === true) {
                        speTask_start.classList.remove('specialTasks_color');
                        impTask_start.classList.remove('importantTasks_color');
                    }
                    toggleIMP = false;
                    toggleSPE = false;
                } else {
                    createTask("submit", false, pickerHour.value);
                    toggleIMP = false;
                    toggleSPE = false;
                }

                //Sauvegarde de la création de la tâche
                saveTasks(getDate("h"));
                break;
            }
        default:
            //Etat par défaut de la machine d'état
            impTask_start.classList.remove('importantTasks_color');
            speTask_start.classList.remove('specialTasks_color');
            clockChoice.classList.remove('clkTasks_color');
            stateNextTask('', false)
            toggleIMP = false;
            toggleSPE = false;
    }
}

//Fonction décrivant l'état prit par la tâche en cours de création
function stateNextTask(text, state) {
    const filterTop__state = document.querySelector('.filterTop--state');
    filterTop__state.innerHTML = text;
    state === true ? filterTop__state.classList.add('filterTop--state--on') :
        filterTop__state.classList.remove('filterTop--state--on')
}

//Création d'une note lors au clique sur le bouton concerné
butNote.addEventListener('click', function () {
    createNote("button");
    saveNote();

}, false);

function filterElements(input, div) {
    let filter, ul, li;
    filter = input.value.toUpperCase();

    let container, text__todo;
    let valueTitle, valueContent;
    ul = document.getElementById(div);

    if (div === 'myUL') { //task

        container = ul.querySelectorAll('.todoBanMainContainer')

        // console.log(text__todo)

        for (let i = 0; i < container.length; i++) {
            valueTitle = container[i].querySelector('.textTask').innerHTML;

            // console.log(valueTitle)

            if (valueTitle.toUpperCase().indexOf(filter) > -1) {
                container[i].closest('.todoBanMain').classList.remove('hiddenTodo__filter');
                // container[i].closest('.todoBanMain').querySelector('.collapsible').classList.remove('hiddenTodo__filter');
            } else {
                container[i].closest('.todoBanMain').classList.add('hiddenTodo__filter');
                // container[i].closest('.todoBanMain').querySelector('.collapsible').classList.add('hiddenTodo__filter');
            }
        }

    } else { //note
        li = ul.getElementsByTagName('li');

        for (let i = 0; i < li.length; i++) {

            valueTitle = li[i].querySelector('input').value;
            valueContent = li[i].querySelector('.contentNote').value;

            if (valueTitle.toUpperCase().indexOf(filter) > -1 ||
                valueContent.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
}


function toTop(element) {
    const elem = element.parentElement.parentElement;
    compteurCard++;
    elem.setAttribute("data-name", compteurCard.toString());

    const classname = document.getElementsByClassName('noteCard');
    const divs = [];
    for (let i = 0; i < classname.length; ++i) {
        divs.push(classname[i]);
    }
    divs.sort(function (a, b) {
        return a.dataset.name.localeCompare(b.dataset.name);
    });


    divs.forEach(function (el) {
        myUL_note.insertBefore(el, myUL_note.childNodes[0]);
    });
}

function changeColor(element) {
    //Ajout d'un test pour éviter de retomber directement sur la même couleur
    const elem = element.closest('.noteCard');

    const colorNotes = ["rgb(181, 222, 255)", "rgb(252, 255, 166)", "rgb(193, 255, 215)", "rgb(240, 217, 255)"]

    const index = colorNotes.indexOf(elem.style.background);
    if (index > -1) {
        colorNotes.splice(index, 1);
    }
    elem.style.background = colorNotes[Math.floor(Math.random() * colorNotes.length)];
}

function removeNote(element) {
    element.parentElement.parentElement.parentElement.classList.add('slideOut')
    setTimeout(function () {
        element.parentElement.parentElement.parentElement.remove();
    }, 500)
}

let mouse = false;

function mouseEnter(element) {
    mouse = true;
    infoNote(element);
}

function mouseLeave(element) {
    setTimeout(function () {
        mouse = false;
        infoNote(element);
    }, 100)
}

function infoNote(element) {
    const res = element.parentElement.parentElement.parentElement.children[1];
    if (mouse) {
        element.classList.add('expendNoteOption_active'); //i
        res.classList.add('expendNoteOption'); //option
        res.onmouseleave = function () {
            mouseLeave(this)
        };
    } else {
        res.children[0].children[0].children[1].children[0].classList.remove('expendNoteOption_active');
        element.classList.remove('expendNoteOption');
    }
}

function createNote(keypress, nb, class_note, title_note, content, style) {
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
    lin.oncontextmenu = rightClickNote;

    cont_in.onkeyup = function () {
        saveNote()
    };
    titre_in.onkeyup = function () {
        saveNote()
    };

    const itagi = document.createElement("i");

    itagi.classList.add("fas");
    itagi.classList.add("fa-info-circle");

    itagi.onmouseover = function () {
        mouseEnter(this)
    };

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
    itagp.onclick = function () {
        changeColor(this);
        saveNote()
    };

    itagtt.classList.add("fas");
    itagtt.classList.add("fa-chevron-circle-up");
    itagtt.onclick = function () {
        toTop(this);
        saveNote();
    };

    itagtl.classList.add("fas");
    // itagtl.classList.add("fa-link");
    itagtl.classList.add("fa-share-square");
    itagtl.onclick = function () {
        linkToNote(this);
        saveNote();
    };

    // divOption.appendChild(itagtt);
    // divOption.appendChild(itagp);
    // divOption.appendChild(itagtl);
    //------------------------------------
    const span = document.createElement("span");
    span.className = "close";
    span.classList.add("fas");
    span.classList.add("fa-times");

    span.onclick = function () {
        removeNote(this);
        saveNote();
    };

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

    if (keypress === "button") {
        let hour = getDate("h");
        let date_act = getDateDay("/", "FR");

        lin.setAttribute("data-hour", hour)
        lin.setAttribute("data-date", date_act);

        lin.setAttribute("data-name", compteurCard);
        lin.style.background = colorNotes[Math.floor(Math.random() * colorNotes.length)];
        myUL_note.appendChild(lin);
    } else { //LS
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

function saveData() {
    post(url, {value: xxxxxxx}).then(r =>
        console.log(r)
    );
}

window.post = function (url, data) {
    return fetch(url, {method: "POST", body: JSON.stringify(data)});
}
window.get = function (url) {
    return fetch(url, {method: "GET", mode: "cors"});
}

function getData() {
    const xmltype_2 = new XMLHttpRequest();
    xmltype_2.onreadystatechange = function () {
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

//Rafraichissement forcé de la sauvegarde
refresh_but.addEventListener('click', function () {
    refresh_but_icon.classList.toggle("spinModeAll");

    //TODO : DESIGN de l'alerte à modifier [2]
    alert("Sauvegarde forçée.")

    setTimeout(function () {
        const localStorageTodos = JSON.parse(localStorage.getItem("todos_test"));
        lastSaveTime.innerHTML = localStorageTodos.s;
    }, 100);

    menu.parentElement.classList.remove('clickMenu');
    menu_der.classList.remove('showMenu');

    saveTasks(getDate("h"));
});
account.addEventListener('click', function (e) {
    if (e.target.tagName === 'I') {
        selector.classList.toggle('selectorVisibility')
    }
});

function chooseUser(id = "check_user_1") {
    console.log(id)
}

const filterTask = document.querySelector('.filter_selector');
filterTask.addEventListener('click', function (e) {
    if (e.target.tagName === "P" || e.target.tagName === "I") {
        document.querySelector('.filter_selector').classList.add('bumpOnClick');
        setTimeout(function () {
            document.querySelector('.filter_selector').classList.remove('bumpOnClick')
        }, 200)
        document.querySelector('.categories').classList.toggle('categories_show')
    } else {
        document.querySelector('.categories').classList.remove('categories_show')
    }
});

const shareAll = document.querySelector('.shareAll');
shareAll.addEventListener('click', function (e) {
    let shareAll_array = [];
    let shareAll_array_hast = [];
    for (let i = 0; i < myUL.childElementCount; i++) {
        shareAll_array.push(myUL.children[i].querySelector('.textTask').innerHTML);
        //TODO : add hastags to localsave
        shareAll_array_hast.push(myUL.children[i].children[1].children[1].children[1].innerHTML);
    }
    document.querySelector('.shareAllContainer').classList.add('bumpOnClick');
    setTimeout(function () {
        document.querySelector('.shareAllContainer').classList.remove('bumpOnClick')
    }, 200)

    share("All todos", shareAll_array, "todo")

});

function share(title, content, type) {
    let multi = "";
    let tit;
    if (type === "todo") {
        if (Array.isArray(content)) {
            for (let i = 0; i < content.length; i++) {
                multi += "- " + `${content[i]}` + "\n";
            }
            tit = "Todo list";
        } else {
            multi = content;
            tit = "Todo : " + title;
        }
    } else {
        multi = content;
        tit = "Note : " + title;
    }

    navigator.share({
        title: tit,
        text: multi,
        url: 'https://nicolasvaillant.net',
    });
}

function rightClickNote(e) {
    e.preventDefault();
    document.getElementById(
        "contextMenu").style.display = "none";
    const parent = e.target.closest('.noteCard');

    parent.classList.add('bumpOnRClick');
    setTimeout(function () {
        parent.classList.remove('bumpOnRClick')
    }, 200)

    function zone1_note(parent) {

    }

    function zone2_note(parent) {

    }

    function zone3_note(parent) {

    }

    if (document.getElementById("contextMenuNote").style.display === "block")
        hideMenu();
    else {
        const menu = document.getElementById("contextMenuNote")
        menu.style.display = 'flex';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";

        menu.children[0].children[0].onclick = function () {
            zone1_note(parent);
            saveTasks(getDate("h"));
        };
        menu.children[0].children[1].onclick = function () {
            zone2_note(parent);
            saveTasks(getDate("h"));
        };
        menu.children[0].children[2].onclick = function () {
            zone3_note(parent);
            saveTasks(getDate("h"));
        };
    }
}

function saveNote() {
    const containerNote = document.querySelector('#myUL_note');
    const containerNoteChildren = containerNote.children;

    //CHILD-------------------------------------------
    let childClass = {
        length: 0,
        findClass: function ajoutElem(elem) {
            [].push.call(this, elem);
        }
    };
    let childStyle = {
        length: 0,
        findStyle: function ajoutElem(elem) {
            [].push.call(this, elem);
        }
    };
    let childTitle = {
        length: 0,
        findValue: function ajoutElem(elem) {
            [].push.call(this, elem);
        }
    };
    let childContent = {
        length: 0,
        findValueC: function ajoutElem(elem) {
            [].push.call(this, elem);
        }
    };
    let childDataSet = {
        length: 0,
        findDataSet: function ajoutElem(elem) {
            [].push.call(this, elem);
        }
    };

    if (containerNoteChildren.length !== 0) {
        for (let i = 0; i < containerNoteChildren.length; i++) {
            childClass.findClass(containerNoteChildren[i].className);
            childStyle.findStyle(containerNoteChildren[i].style.background);
            childTitle.findValue(containerNoteChildren[i].children[0].children[0].value);
            childContent.findValueC(containerNoteChildren[i].children[2].value);
            childDataSet.findDataSet(containerNoteChildren[i].dataset);
        }
    }

    const cNote = {
        child_nb: containerNote.childElementCount,
        child_className: childClass,
        child_style: childStyle,
        child_title: childTitle,
        child_content: childContent,
        childDataSet: childDataSet,
    }
    localStorage.setItem("Node_note", JSON.stringify(cNote));
}


function handleDragStart(e) {
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    // this.style.background = "red";

    let items = document.querySelectorAll('.todoBanMain');
    items.forEach(function (item) {
        item.classList.remove('over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    return false;
}

function handleDragEnter(e) {
    this.classList.add('over')
}

function handleDragLeave(e) {
    this.classList.remove('over')
}

function handleDrop(e) {
    e.stopPropagation();

    if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}


function sweetAlert() {
    Swal.fire({
        title: 'La tâche ne peut pas être vide',
        text: 'Ajouter un texte pour la tâche',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Corriger',
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('#myInput').focus();
        }
    })
}