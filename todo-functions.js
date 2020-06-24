//Fetch existing todos from localStorage 
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try{
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }

}


// Save todos to localStorage 
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}



//Render application todos based on filters 
const renderTodos = function(todos, filters) {
        let filteredTodos = todos.filter(function(todo) {
           return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        })
    
        filteredTodos = filteredTodos.filter(function (todo) {
            if (filters.hideCompleted) {
                return !todo.completed
            } else {
                return true
            }
        })
  
        const incompletedTodos = filteredTodos.filter(function (todo) {
            return !todo.completed
        })
    
        document.querySelector('#todoDiv').innerHTML = ''
        document.querySelector('#todoDiv').appendChild(generateSummaryDOM(incompletedTodos))
        
        filteredTodos.forEach(function(todo) {
            document.querySelector('#todoDiv').appendChild(generateTodoDOM(todo))
       })
    
}


// Remove Todo from the list
const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id 
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle todo function
const toggleTodo = function(id) {
    const todo = todos.find(function(todo) {
        return todo.id === id
    })

    if (todo !== undefined) {
        todo.completed = !todo.completed
    }
}



const generateTodoDOM = function (todo) {
    // todoEl is the container that will hold all the other pieces necessary for each to-do created
    // This function will then return only one item containing a checkbox, text, and a delete button
    const todoEl = document.createElement('div')
    
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')
    
    
    // Setup todo checkbox 
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('change', function () {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    

    // Actual content user types
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)


    // Setup the remove button
    removeButton.textContent = 'x'
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', function () {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    // Return complete element with checkbox, text, and delete button
    return todoEl

}


const generateSummaryDOM = function (incompletedTodos) {
    const summary = document.createElement('h2')
        summary.textContent = `You have ${incompletedTodos.length} todos left`
        return summary
}


