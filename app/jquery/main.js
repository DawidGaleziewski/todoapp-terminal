// 'use strict'
// $(document).ready(
//     function(){
        // Variables
       const form = $('#main-form');
       const btnAdd = $('#add');
       const btnRemove = $('#remove');
       const btnClear = $('#clear');
       


    // Operations on local storage
       //get all tasks in local storage    
       const getTasks = function(){
        return JSON.parse(localStorage.getItem('tasks'));
       }

       //add new task to local storage
       const addTask = function(task){
            let newArray = getTasks();
            newArray.push(task);
            localStorage.setItem('tasks', JSON.stringify(newArray));
            return newArray;
       }

       // remove last task from local storage
       const removeLastTask =function(){
            let newArray = getTasks();
            newArray.pop();
            localStorage.setItem('tasks', JSON.stringify(newArray));
            return newArray;
       }

       const removeAllTasks = function(){
            let newArray = [];
            localStorage.setItem('tasks', JSON.stringify(newArray));
            return newArray;
       }

        // Update site with new tasks state
        const updateTaskState = function(){
            let currentTasks = $('#current-tasks');
            currentTasks.empty();
            getTasks().forEach((task)=> {
                currentTasks.append('<li>' + task + '</li>').addClass('dir');
            })
        }



        
       // Preventing form from refreshing on submit
        form.submit(function(event){
            event.preventDefault();
        })

        // Adding items to list
        btnAdd.click(function(){
            const input = $('#input').val();
            addTask(input);
            updateTaskState();
        })

        // Removing items
        btnRemove.click(function(){
            removeLastTask();
            updateTaskState();
        })

        // Clear all items
        btnClear.click(function(){
            removeAllTasks();
            updateTaskState();
        })

        // Creating folders 
        const foldersTray = $('folders-tray');
        getTasks().forEach((task)=>{
            foldersTray
            console.log(task)
        })

        
        
        // foldersTray
        // <div class="folder">
        // <span class="folder-title">
        //         New task
        // </span>
        // </div>

        // Load all tasks from local storage
        updateTaskState();

    //    console.log(currentTasks)
//     }
// )