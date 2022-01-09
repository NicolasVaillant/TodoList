// JS FILE

const array_stocked_element = [];
const array_stocked_child = [];
const array_stocked_child_all = [];
//saveTasks(hourSaveClick)
function saveTasks(hourSaveClick){

    // print("stored", true, "red")

    const array_stocked_all = [];
    const container = document.querySelector('#myUL');
    const todos = container.children;

    if(container.childElementCount !== 0){
        for(let i = 0 ; i <= container.childElementCount - 1; i++) {
            todos[i].querySelectorAll('.input_sub').forEach( function (child) {
                array_stocked_child.push(child.value);
            });

            array_stocked_element.push(
                todos[i].dataset,
                todos[i].classList,
                todos[i].querySelector('.colorhastags').innerHTML,
                todos[i].querySelector('.collapsible-header').classList,
                array_stocked_child.splice(0, array_stocked_child.length).filter(value => Object.keys(value).length !== 0),
                todos[i].querySelector('.textTask').innerHTML,
                todos[i].querySelectorAll('.li_sub').length
            )
            array_stocked_all.push(
                array_stocked_element.splice(0, array_stocked_element.length)
            )

            // setNbSubChild(todos[i],  todos[i].querySelectorAll('.li_sub').length)
        }
    }
    try{
        const stocked = {e : array_stocked_all, s : hourSaveClick, v : todos.length}
        localStorage.setItem("todos_test", JSON.stringify(stocked));
    }catch (e) {console.log(e)}
}