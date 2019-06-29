// 'use strict'
// $(document).ready(
//     function(){
        // Variables
       const form = $('#main-form');
       const btnAdd = $('#add');
       const btnRemove = $('#remove');
       const btnClear = $('#clear');
       if (localStorage.getItem('tasks') === null){
            localStorage.setItem('tasks',JSON.stringify([]))
       }
       


    // Operations on local storage

        // Update site with new tasks state
        const updateTaskState = function(){
            const currentTasks = $('#current-tasks');
            currentTasks.empty();
            getTasks().forEach((task)=> {
                currentTasks.append('<li>' + task + '</li>').addClass('dir');
            })

            createFolders();
        }

       //get all tasks in local storage    
       const getTasks = function(){
        return JSON.parse(localStorage.getItem('tasks'));
       }

       //add new task to local storage
       const addTask = function(task){
            
            let newArray = getTasks();
            const input = $('#input');
            newArray.push(input.val());
            input.val('');
            // console.log(localStorage)
            localStorage.setItem('tasks', JSON.stringify(newArray));
            updateTaskState();

       }

       // remove last task from local storage
       const removeLastTask =function(){
            const newArray = getTasks();
            newArray.pop();
            localStorage.setItem('tasks', JSON.stringify(newArray));
            updateTaskState();
       }

       const removeAllTasks = function(){
            const newArray = [];
            localStorage.setItem('tasks', JSON.stringify(newArray));
            updateTaskState();
            
       }





        
       // Preventing form from refreshing on submit
        form.submit(function(event){
            event.preventDefault();
        })

        // seems the button gets clicked two times for some reason
        // Adding items to list
        btnAdd.click(function(){
            addTask() 
        })
                
        

        // Removing items
        btnRemove.click(function(){
            removeLastTask();
        })

        // Clear all items
        btnClear.click(function(){
            removeAllTasks();
        })

        // Creating folders 
        const createFolders = function(){
            const foldersTray = $('#folders-tray');
            foldersTray.empty();
            const tasks = getTasks()
            tasks.forEach((task)=>{
                foldersTray.append(
                    `<div class="folder">
                        <span class="folder__icon">
    
                        </span>
                        <span class="folder__title">
                                ${task}
                        </span>
                    </div>`);    
            })
        }

        // createFolders()

        // Load all tasks from local storage
        updateTaskState();
        createFolders();

    //    console.log(currentTasks)
//     }
// )