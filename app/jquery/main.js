'use strict'
$(document).ready(
    function(){
        // Variables
       const form = $('#main-form');
       const btnAdd = $('#add');
       const btnRemove = $('#remove');
       const btnClear = $('#clear');
       let currentTaskIndex = 0;
       
        
       // Preventing form from refreshing on submit
        form.submit(function(event){
            event.preventDefault();
        })

        // Adding items to list
        btnAdd.click(function(){
            let currentTasks = $('#current-tasks');
            const input = $('#input');
            currentTasks.append('<li>' + (currentTaskIndex + 1) +'. ' + input.val() + '</li>').addClass('dir');
            currentTaskIndex ++;
        })

        // Removing items
        btnRemove.click(function(){
            let currentTasks = $('#current-tasks');
            currentTasks.find('li').eq(currentTaskIndex - 1 ).remove()
            currentTaskIndex--
            console.log(currentTaskIndex)
        })

        // Clear all items
        btnClear.click(function(){
            let currentTasks = $('#current-tasks');
            currentTasks.empty();
        })

    //    console.log(currentTasks)
    }
)