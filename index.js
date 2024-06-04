// console.log("Hello World!")
//To store Add New Item in the Cards format on the Editor
const state = { //const used as we dont want to change any Values here, var can also be used    ;; We can use any key other phter than state, state used as we use same in React to store certain data(can be any logical name as state)
    taskList: [
        {
            title: "",
            url: "",
            type: "",
            descripion: ""
        },
         {
            title: "",
            url: "",
            type: "",
            descripion: ""
        }, 
        {
            title: "",
            url: "",
            type: "",
            descripion: ""
        }
    ]
}


// DOM:
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

// console.log(taskContents);
// console.log(taskModal)