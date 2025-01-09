const taskName = document.getElementById("taskName");
const priority = document.getElementById("priority");
const deadline = document.getElementById("deadline");
const addTask = document.getElementById("addTask");
const taskList = document.querySelector(".taskList");

addTask.addEventListener("click", () => {
    const task = taskName.value;
    const priorityValue = priority.value;
    const deadlineValue = deadline.value;

    if(deadlineValue === ""){
        alert("Please enter a deadline");
        return;
    }

    const selectedDate = new Date(deadlineValue);
    const today = new Date();
    if(today > selectedDate){
        alert("deadline must be in the future");
        return;
    }

    const div = document.createElement("div");
    div.innerHTML = `<p>${task}</p>
                    <p>Priority: ${priorityValue}</p>
                    <p>Deadline: ${deadlineValue}</p>
                    <button class="markDone">Mark Done</button>`;
    taskList.appendChild(div);            

    taskName.value = "";
    priority.value = "Top Priority";
    deadline.value = "";
})

taskList.addEventListener("click", (event) => {
    if(event.target.classList.contains("markDone")){
        event.target.parentNode.remove();
    }
})