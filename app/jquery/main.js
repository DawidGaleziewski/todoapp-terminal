'use strict'
$(document).ready(
    function(){
        // remove preloader
         $('.preloader').addClass('stop-preloader');
        
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
                const listItem = $('<li>' + task + '</li>');
                
                if(task.length > 50) {
                    listItem.addClass('trim-long-text')
                    
                    listItem.click(function(){
                        listItem.toggleClass('trim-long-text');
                        listItem.toggleClass('highlight-long-text')
                    })
                }

                listItem.addClass('dir');

                currentTasks.append(listItem)
            })

            createFolders();
        }

       //get all tasks in local storage    
       const getTasks = function(){
        return JSON.parse(localStorage.getItem('tasks'));
       }

       //add new task to local storage
       const addTask = function(task){
            
            const input = $('#input');
            if(input.val() !== ''){
                let newArray = getTasks();
                newArray.push(input.val());
                input.val('');
                // console.log(localStorage)
                localStorage.setItem('tasks', JSON.stringify(newArray));
                updateTaskState();
            }
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

                const folder = $(`<div class="folder">
                <span class="folder__icon">
                </span>
                </div>`);

                const folderTitle = $(`
                    <span class="folder__title">
                        ${task}
                    </span>
                `)

                // Trim text if the title is longer than it should
                if(task.length > 15) {
                    folderTitle.addClass('trim-long-text');
                    folderTitle.click(function(){
                        folderTitle.toggleClass('trim-long-text');
                        folderTitle.toggleClass('highlight-long-text')
                    })
                }

                folder.append(folderTitle)

                foldersTray.append(folder)
    
            })
            
        }


        // Load all tasks from local storage
        updateTaskState();
        createFolders();

    //    console.log(currentTasks)
    }
)