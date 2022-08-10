
//variables to be used
let dropdown = document.getElementById("dropdown");
let mobiledropdown = document.getElementById('mobile-menu');
let clickTarget = document.getElementById("user-menu-button");
let mobileMenuButton = document.getElementById("mobile-menu-button");
let closemodal = document.getElementById("close-button");
let modal = document.getElementById('modal');
let addbutton = document.getElementById('add-button');
let modalContent = document.getElementById('modal-content');
let modalClickable = document.getElementById('modal-clickable');
let newtodo = document.getElementById('new-todo');

//Initial behavior
mobiledropdown.style.display = "none";
modal.style.display = "none";

//Hide and show additional menus (side)
function hideTransition(e) {
    e.classList.remove("transition", "ease-out", "duration-100", "transform", "opacity-100", "scale-100");
    e.classList.add("transition", "ease-in", "duration-75", "transform", "opacity-100", "scale-100");
    e.classList.remove("opacity-100", "scale-100");
    e.classList.add("transform", "opacity-0", "scale-95");
}
function show(e) {
    if (e.classList.contains("opacity-0")) {
        e.classList.add("transition", "ease-out", "duration-100", "transform", "opacity-0", "scale-95");
        e.classList.remove("opacity-0", "scale-95");
        e.classList.add("opacity-100", "scale-100");
    } else {
        hideTransition(e);
    }

}

//Click out closes the tab
function toggle(e) {
    if (e.style.display == "block") {
        e.style.display = "none";
    }
    else {
        e.style.display = "block";
    }
}

//Toggle classes
clickTarget.addEventListener('click', function () { show(dropdown) });
mobileMenuButton.addEventListener('click', function () { toggle(mobiledropdown) });
addbutton.addEventListener('click', function () { toggle(modal); });
closemodal.addEventListener('click', function () {
    toggle(modal);
});
newtodo.addEventListener('click', function () { toggle(modal) })

//Clicking on modal area = no hiding of modal variable
modalContent.onclick = () => {
    modalContent.style.display = 'block';
};

//Clicking on off the modal content will hide the area.
window.onclick = e => {
    if (e.target === modalClickable) {
        modal.style.display = 'none';
    }
};

//function to delete an entry
function deleteTodo(id) {
    intid = parseInt(id);
    console.log('ID sent: ' + id);
    //.filter() makes a new array without the id used
    list = list.filter(item => item.id !== intid);
    localStorage.setItem("todo", JSON.stringify(list));
    console.log(list);
    location.reload();
};

//function to put in everything in divs first
function renderList(o) {
    for (let object of Object.entries(o)) {
        let start = document.getElementById("start-todo");
        let div = document.createElement("div");
        let div2 = document.createElement("div");
        let div3 = document.createElement("div");
        let div4 = document.createElement("div");

        div.classList.add("bg-slate-50", "h-96", "rounded-md", "drop-shadow-xl");
        div.id = "todo";
        start.appendChild(div);

        div2.classList.add("bg-violet-400", "rounded-tl-md", "rounded-tr-md", "p-4", "text-size-10", "text-2xl", "inset-x-0", "top-0", "font-bold");
        //Array[0]
        div2.innerText = object[1]["title"];
        div.appendChild(div2);

        div3.classList.add("p-2");
        div3.innerText = object[1]["content"];
        div.appendChild(div3);

        div4.classList.add("absolute", "bottom-0", "right-0", "rounded-br-md", "rounded-bl-md", "inset-x-0", "h-8", "bg-red-100", "hover:bg-red-400", "hover:text-white", "text-center", "cursor-pointer");
        div4.id = object[1]["id"];
        div4.innerText = "Delete";
        div.appendChild(div4);

        //Add delete function event listener to all loaded items
        document.getElementById('' + object[1]["id"] + '').addEventListener("click", function () {
            deleteTodo('' + object[1]["id"] + '');
        })
    }
};

//Modal localstorage
//localStorage.clear();
let list = [];
let id = 0;

if (localStorage.getItem("todo") != null) {
    //retrieve list from localstorage if the storage is not null
    let retrievedList = localStorage.getItem("todo");
    let retrievedListArray = JSON.parse(retrievedList);
    //if localstorage is detected but has no length, it will not get the latest id or retrieve list from array since it has no data
    if (retrievedListArray.length !== 0) {
        id = retrievedListArray[retrievedListArray.length - 1]["id"];
        list = retrievedListArray;
    }
};


let submit = document.getElementById("submit");

submit.addEventListener("click", function () {
    id++;
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let start = document.getElementById("start-todo");
    console.log("Done");
    let pass = {
        id: id,
        title: title,
        content: content
    };

    list.push(pass);
    localStorage.setItem("todo", JSON.stringify(list));
    console.log(list);

    let div = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    var div4 = document.createElement("div");

    div.classList.add("bg-slate-50", "h-96", "rounded-md", "drop-shadow-xl");
    div.id = "todo";
    start.appendChild(div);

    div2.classList.add("bg-violet-400", "rounded-tl-md", "rounded-tr-md", "p-4", "text-size-10", "text-2xl", "inset-x-0", "top-0", "font-bold");
    div2.innerText = title;
    div.appendChild(div2);

    div3.classList.add("p-2");
    div3.innerText = content;
    div.appendChild(div3);

    div4.classList.add("absolute", "bottom-0", "right-0", "rounded-br-md", "rounded-bl-md", "inset-x-0", "h-8", "bg-red-100", "hover:bg-red-400", "hover:text-white", "text-center", "cursor-pointer");
    div4.id = id;
    div4.innerText = "Delete";
    div.appendChild(div4);

    //Add delete function event listener to new item
    document.getElementById('' + id + '').addEventListener("click", function () {
        deleteTodo('' + id + '');
    })

    toggle(modal);
});

//Call renderList
renderList(list);

