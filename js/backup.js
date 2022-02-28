// JS FILE

const array_stocked_element = [];
const array_stocked_child = [];
const array_stocked_class_child = [];

//Sauvegarde des tâches
function saveTasks(hourSaveClick) {

    const array_stocked_all = [];
    const container = document.querySelector('#myUL');
    const container_not = document.querySelector('#myUL:not(#myUL_overlay)');
    const todos = container.children;

    if (container_not.childElementCount !== 0) {
        for (let i = 0; i <= container_not.childElementCount - 1; i++) {
            todos[i].querySelectorAll('.input_sub').forEach(function (child) {
                array_stocked_child.push(child.value);
            });
            todos[i].querySelectorAll('.li_sub').forEach(function (child) {
                array_stocked_class_child.push(child.className);
            });

            array_stocked_element.push(
                todos[i].dataset,
                todos[i].classList,
                todos[i].querySelector('.colorhastags').innerHTML,
                todos[i].querySelector('.collapsible-header').classList,
                array_stocked_child.splice(0, array_stocked_child.length).filter(value => Object.keys(value).length !== 0),
                todos[i].querySelector('.textTask').innerHTML,
                todos[i].querySelectorAll('.li_sub').length,
                array_stocked_class_child.splice(0, array_stocked_class_child.length).filter(value => Object.keys(value).length !== 0),
                todos[i].querySelector('.creator').innerHTML
            )
            // if(array_stocked_all.length !==)
            // console.log(array_stocked_all)
            array_stocked_all.push(
                array_stocked_element.splice(0, array_stocked_element.length)
            )

        }
    }
    try {
        const stocked = {e: array_stocked_all, s: hourSaveClick, v: todos.length}

        localStorage.setItem("todos_test", JSON.stringify(stocked));

    } catch (e) {
        console.warn(e)
    }
}

//Envoi des données au serveur [NOT USED]
function send() {
    fetch('https://todo.nicolasvaillant.net/php/test.json')
        .then(response => response.text())
        .then(data => console.log(data));

    // const xml = new XMLHttpRequest();
    // xml.onreadystatechange = function() {
    //     if( xml.readyState === 4 && xml.status === 200 ){
    //         console.log(xml.responseText);
    //     }
    // };
    //
    // xml.open("POST", "https://todo.nicolasvaillant.net/php/data.php", false);
    // xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // // xml.send("format=json");
    // let data = JSON.stringify(stocked);
    // xml.send(data);

}
