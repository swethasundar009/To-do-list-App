class TodoList {
  constructor() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      this.taskInput = document.getElementById('taskInput');
      this.addTaskBtn = document.getElementById('addTask');
      this.todoList = document.getElementById('todoList');

      this.bindEvents();
      this.renderTasks();
  }

  bindEvents() {
      this.addTaskBtn.addEventListener('click', () => this.addTask());
      this.taskInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') this.addTask();
      });
  }

  addTask() {
      const taskText = this.taskInput.value.trim();
      
      if (!taskText) {
          alert('Please enter a task!');
          return;
      }

      const task = {
          id: Date.now(),
          text: taskText,
          completed: false
      };

      this.tasks.push(task);
      this.saveTasks();
      this.renderTasks();
      this.taskInput.value = '';
  }

  editTask(id) {
      const task = this.tasks.find(task => task.id === id);
      const newText = prompt('Edit task:', task.text);

      if (newText !== null && newText.trim() !== '') {
          task.text = newText.trim();
          this.saveTasks();
          this.renderTasks();
      }
  }

  deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
      this.renderTasks();
  }

  toggleTask(id) {
      const task = this.tasks.find(task => task.id === id);
      task.completed = !task.completed;
      this.saveTasks();
      this.renderTasks();
  }

  saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  renderTasks() {
      this.todoList.innerHTML = '';
      
      this.tasks.forEach(task => {
          const taskElement = document.createElement('div');
          taskElement.className = `todo-item ${task.completed ? 'completed' : ''}`;
          
          taskElement.innerHTML = `
              <input type="checkbox" ${task.completed ? 'checked' : ''}>
              <span class="todo-text">${task.text}</span>
              <div class="todo-actions">
                  <button class="edit-btn"><i class="fas fa-edit"></i></button>
                  <button class="delete-btn"><i class="fas fa-trash"></i></button>
              </div>
          `;

          const checkbox = taskElement.querySelector('input[type="checkbox"]');
          const editBtn = taskElement.querySelector('.edit-btn');
          const deleteBtn = taskElement.querySelector('.delete-btn');

          checkbox.addEventListener('change', () => this.toggleTask(task.id));
          editBtn.addEventListener('click', () => this.editTask(task.id));
          deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

          this.todoList.appendChild(taskElement);
      });
  }
}

// Initialize the Todo List
document.addEventListener('DOMContentLoaded', () => {
  new TodoList();
});