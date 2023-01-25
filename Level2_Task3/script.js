
var newtask = document.getElementById("new-task");
var addb = document.getElementsByTagName("button")[0];
var incomplete = document.getElementById("incomplete-tasks");
var completeTasks = document.getElementById("completed-tasks");
var removeButton = document.getElementsByClassName("delete");
var completedRemoveButton = completeTasks.getElementsByClassName("delete");

showincl();
showComplete();


function createnewtaskElement(str, i) {

    var listItem = document.createElement("li");
    var label = document.createElement("label");
    var checkBox = document.createElement("input");
    var span = document.createElement("span");
    var deleteButton = document.createElement("button");
    label.className = "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect";
    label.setAttribute("for", (i + 1));
    checkBox.type = "checkbox";
    checkBox.id = (i + 1);
    checkBox.setAttribute("onclick", "completed(this)");
    checkBox.className = "mdl-checkbox__input";
    span.className = "mdl-checkbox__label";
    span.id = "text-" + (Number(i) + 1);
    span.innerText = str;
    deleteButton.className = "mdl-button mdl-js-button mdl-js-ripple-effect delete";
    deleteButton.innerText = "Delete";
    deleteButton.id = i + 1;
    label.appendChild(checkBox);
    label.appendChild(span);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    return listItem;

};

function completedTaskElement(str, i) {
    var listItem = document.createElement("li");
    var span = document.createElement("span");
    var icon = document.createElement("i");
    var deleteButton = document.createElement("button");
    listItem.className = "mdl-list";
    span.className = "mdl-list__item-primary-content";
    icon.className = "material-icons mdl-list__item-icon";
    icon.innerText = "done";
    str = document.createTextNode(str);
    span.appendChild(icon);
    span.appendChild(str);
    deleteButton.className = "mdl-button mdl-js-button mdl-js-ripple-effect delete";
    deleteButton.innerText = "Delete";
    deleteButton.id = i + 1;
    listItem.appendChild(span);
    listItem.appendChild(deleteButton);

    return listItem;

};

function completed(element) {
    var id = element.getAttribute('id');
    var complete = getCompletedData();
    str = document.getElementById("text-" + Number(id)).innerText;
    complete.push(str);
    localStorage.setItem('complete', JSON.stringify(complete));
    completeTasks.appendChild(completedTaskElement(str, complete.length - 1));
    completedRemoveButton[complete.length - 1].addEventListener('click', deletecl);
    var data = getData();
    data.splice(id - 1, 1);
    localStorage.setItem('todo', JSON.stringify(data));
    incomplete.innerHTML = "";
    showincl();
    componentHandler.upgradeDom();
};

function getData() {
    var data = new Array;
    var data_str = localStorage.getItem('todo');
    if (data_str != null) {
        data = JSON.parse(data_str);
    }
    return data;
};

function getCompletedData() {
    var data = new Array;
    var data_str = localStorage.getItem('complete');
    if (data_str != null) {
        data = JSON.parse(data_str);
    }
    return data;
};


function addTask() {
    var data = getData();
    var task = newtask.value;
    if (task != "") {
        data.push(newtask.value);
        localStorage.setItem('todo', JSON.stringify(data));
        add(newtask.value, data.length - 1);
        newtask.value = "";
        componentHandler.upgradeDom();
    }
    return false;
};

function add(str, i) {
    incomplete.appendChild(createnewtaskElement(str, i));
    removeButton[i].addEventListener('click', deleteincl);
};
function showincl() {
    var data = getData();
    for (var i = 0; i < data.length; i++) {
        incomplete.appendChild(createnewtaskElement(data[i], i));
        removeButton[i].addEventListener('click', deleteincl);
    }
};

function showComplete() {
    var complete = getCompletedData();
    for (var i = 0; i < complete.length; i++) {
        completeTasks.appendChild(completedTaskElement(complete[i], i));
        completedRemoveButton[i].addEventListener('click', deletecl);
    }

};

function deleteincl() {
    var id = this.getAttribute('id');
    var data = getData();
    data.splice(id - 1, 1);
    localStorage.setItem('todo', JSON.stringify(data));
    incomplete.innerHTML = "";
    showincl();
    componentHandler.upgradeDom();
    return false;
};

function deletecl() {
    var id = this.getAttribute('id');
    var data = getCompletedData();
    data.splice(id - 1, 1);
    localStorage.setItem('complete', JSON.stringify(data));
    completeTasks.innerHTML = "";
    showComplete();
    return false;
};

addb.addEventListener("click", addTask);