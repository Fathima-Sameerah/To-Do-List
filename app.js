document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const todoList = document.getElementById('todoList');
    const allTasksBtn = document.getElementById('allTasksBtn');
    const completedTasksBtn = document.getElementById('completedTasksBtn');
    const incompleteTasksBtn = document.getElementById('incompleteTasksBtn');
  
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    function saveToLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    function renderTodos() {
      todoList.innerHTML = '';
      todos.forEach((todo, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = todo.task;
        if (todo.completed) {
          listItem.classList.add('completed');
        }
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
          todos.splice(index, 1);
          saveToLocalStorage();
          renderTodos();
        });
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', () => {
          todos[index].completed = !todos[index].completed;
          saveToLocalStorage();
          renderTodos();
        });
        listItem.appendChild(deleteBtn);
        listItem.appendChild(completeBtn);
        todoList.appendChild(listItem);
      });
    }
  
    function filterTodos(status) {
      if (status === 'all') {
        renderTodos();
      } else {
        const filteredTodos = todos.filter(todo => {
          return status === 'completed' ? todo.completed : !todo.completed;
        });
        todoList.innerHTML = '';
        filteredTodos.forEach(todo => {
          const listItem = document.createElement('li');
          listItem.textContent = todo.task;
          if (todo.completed) {
            listItem.classList.add('completed');
          }
          todoList.appendChild(listItem);
        });
      }
    }
  
    addTaskBtn.addEventListener('click', () => {
      const task = taskInput.value.trim();
      if (task !== '') {
        todos.push({ task, completed: false });
        saveToLocalStorage();
        renderTodos();
        taskInput.value = '';
      }
    });
  
    allTasksBtn.addEventListener('click', () => filterTodos('all'));
    completedTasksBtn.addEventListener('click', () => filterTodos('completed'));
    incompleteTasksBtn.addEventListener('click', () => filterTodos('incomplete'));
  
    renderTodos();
  });
  