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
       let taskArrayForNoLocalStorage = [];

       if ( localStorageIsAvailable() && localStorage.getItem('tasks') === null ){
            localStorage.setItem('tasks',JSON.stringify([]))
       }


    // Operations on local storage
       //More info on best practises:
       //https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API

        //Test local storage for availability
        function localStorageIsAvailable(){
            try {
                // Test if local storage can be set
                const testString = 'localStorage';
                localStorage.setItem(testString, testString);
                localStorage.removeItem(testString);

                // If no error occures return true
                return true
            } catch(e){
                // Error control if issue occures
                return e instanceof DOMException && (
                    // everything except Firefox
                    e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === 'QuotaExceededError' ||
                    // Firefox
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                    // acknowledge QuotaExceededError only if there's something already stored
                    (storage && storage.length !== 0);
            }
        }

        // Alert user on local storage potential issues
        function alertOnLocalStorageIssues(){
            
            if(localStorageIsAvailable()){
                var alert = $('#ls-issues-alert') 
                alert.addClass('hide-alert')
               
            }
        }

        alertOnLocalStorageIssues()

        console.log(localStorageIsAvailable()) 

        // Update site with new tasks state
        const updateTaskState = function(){
            const currentTasks = $('#current-tasks');
            currentTasks.empty();
            console.log(getTasks())
            getTasks().forEach((task)=> {
                const listItem = $('<li>' + task + '</li>');
                
                if(task.length > 20) {
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
        if(localStorageIsAvailable()){
            return JSON.parse(localStorage.getItem('tasks'));
        } else {
            return taskArrayForNoLocalStorage;
        }
       }

       //add new task to local storage
       const addTask = function(task){
            
            const input = $('#input');
            if(input.val() !== ''){
                let newArray = getTasks();
                newArray.push(input.val());
                input.val('');
                // console.log(localStorage)

                if(localStorageIsAvailable()){
                    localStorage.setItem('tasks', JSON.stringify(newArray));
                } else {
                    taskArrayForNoLocalStorage = newArray
                }
                updateTaskState();
            }
       }

       // remove last task from local storage
       const removeLastTask =function(){
            const newArray = getTasks();
            newArray.pop();

            if(localStorageIsAvailable()){
                localStorage.setItem('tasks', JSON.stringify(newArray));
            }

            updateTaskState();
       }

       const removeAllTasks = function(){
            const newArray = [];

            if(localStorageIsAvailable()){
                localStorage.setItem('tasks', JSON.stringify(newArray));
            } else{
                taskArrayForNoLocalStorage = [];
            }
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