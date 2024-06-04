// console.log("Hello World!")
//To store Add New Item in the Cards format on the Editor
// const state = { //const used as we dont want to change any Values here, var can also be used    ;; We can use any key other phter than state, state used as we use same in React to store certain data(can be any logical name as state)
//     taskList: [
//         {
//             title: "",
//             url: "",
//             type: "",
//             descripion: ""
//         },
//          {
//             title: "",
//             url: "",
//             type: "",
//             descripion: ""
//         }, 
//         {
//             title: "",
//             url: "",
//             type: "",
//             descripion: ""
//         }
//     ]
// }

const state = {     //Used this in JS84
    taskList: []
};

// DOM:
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

// console.log(taskContents);
// console.log(taskModal)

const htmlTaskContent = ({id, title, description, type, url}) =>  
`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card__header gap-2">
                <button type="button" class="btn btn-outline-primary mr-2" name=${id}>     <!-- Edit Button1 -->     <!-- Primary is BLUE -->
                    <i class="fa-solid fa-pencil" name=${id}></i>
                </button>
                 <button type="button" class="btn btn-outline-danger mr-2" name=${id} onclick="deleteTask.apply(this, arguments)">     <!-- Edit Button2 -->     <!-- Danger is RED --><!-- "openTask" alone will not work, We have to write this line full JS130 -->
                    <i class="fa-solid fa-trash" name=${id}></i>
                </button>
            </div>     <!-- This HTML code card is Dynamic right now, Copy same in HTML in last of Body Tag to view this HTML code Function in Static Mode -->
            <div class="card-body">     <!-- Check if user entered the URL or not -->
                ${
                    url ? `<img src=${url} alt='card image top' class="card-img-top md-3 rounded"/>` :
                        `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScujirQqIFjN5GuM1565_-DIX6OyU_96HzNBl_BAX8GL0JzMs8&s" alt='card image top' class="card-img-top md-3 rounded"/>`
                }
                <h4 class="task__card__title card-title">${title}</h4>
                <p class="description card-text">${description}</p>
                <div class="tags text-white d-flex flex-wrap">
                    <span class="badge text-bg-primary m-1">${type}</span>
                </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask" id=${id} onclick="openTask.apply(this, arguments)">Open Task</button>     <!-- On Click, GOTO openTask...   (JS121) -->     <!-- "openTask" alone will not work, We have to write this line full (JS120) -->
            </div>
        </div>
    </div>
`;


const htmlModalContent = ({id, title, description, url}) => {
    const date = new Date(parseInt(id));
    return `<div id=${id}>
        ${
            url ? `<img src=${url} alt='card image top' class="img-fluid rounded"/>` :
                    `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScujirQqIFjN5GuM1565_-DIX6OyU_96HzNBl_BAX8GL0JzMs8&s" alt='card image top' class="img-fluid rounded"/>`
        }
        </div>
        <strong class="text-sm text-muted">Created on: ${date.toDateString()}</strong>
        <h2 class="my-3">${title}</h2>
        <p class="lead">${description}</p>
    `
}


const updateLocalStorage = () => {
    localStorage.setItem("task", JSON.stringify({   //Browser Local Storage     //JSON is a format
        tasks: state.taskList,      //Used from JS26
    }))
}

const loadInitialData = () => {     //HTML28
    const localStorageCopy = JSON.parse(localStorage.task);

    if(localStorageCopy) state.taskList = localStorageCopy.tasks;       //IF localStorageCopy has some data, THEN state.tasklist...

    state.taskList.map((cardDate) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
    })
}


const handleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById('imageUrl').value,
        title: document.getElementById('taskTitle').value,      //HTML81 -id name here
        description: document.getElementById('taskDescription').value,
        type: document.getElementById('tags').value,
    };

    if(input.title == "" || input.description == "" || input.type=="" ){
        return alert("Please first fill out all the mandatory fields")
    }

    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent({...input, id}))

    state.taskList.push({...input, id});        //When we click on Save button, we should have 1 Card added/created
    updateLocalStorage();
}



const openTask = (e) => {       //JS60
    if(!e) e = window.event;

    const getTask = state.taskList.find(({id}) => id == e.target.id);       //e=event
    taskModal.innerHTML = htmlModalContent(getTask);        //"htmlModalContent" has its partimeters present in an object called "getTask"
    // console.log("opentask activated");
}



const deleteTask = (e) => {
    if(!e) e = window.event;

    const targetId = e.target.getAttribute("name");
    const type = e.target.tagName;
    // console.log(targetId);
    // console.log(type);

    const removeTask = state.taskList.filter(({id})=> id!== targetId)
    // console.log(removeTask)
    state.taskList = removeTask;

    updateLocalStorage()

    if(type === "BUTTON"){
        // console.log(e.target.parentNode.parentNode.parentNode)   //3parents
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode       //4parents
        )
    }
  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(       //5parents
            e.target.parentNode.parentNode.parentNode.parentNode        //4parents
  )
}    


const searchTask = (e) => {     //e=event       //HTML212
       if(!e) e = window.event;

       while(taskContents.firstChild){
        taskContents.removeChild(taskContents.firstChild)
       }

       const resultData = state.taskList.filter(({title})=> title.includes(e.target.value))
       console.log(resultData);

       resultData.map((cardData) => {
         taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData))
       })
}