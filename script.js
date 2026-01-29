let tasks = [];

  function addTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const priority = document.getElementById('taskPriority').value;

    if (title === '') return alert('Please enter a task');

    tasks.push({
      id: Date.now(),
      title,
      priority,
      completed: false
    });

    document.getElementById('taskTitle').value = '';
    renderTasks();
  }

  function toggleTask(id) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
  }

  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
  }

  function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `priority-${task.priority}` + (task.completed ? ' completed' : '');

      li.innerHTML = `
        <span>${task.title}</span>
        <div>
          <button class="small" onclick="toggleTask(${task.id})">✔</button>
          <button class="small" onclick="deleteTask(${task.id})">🗑</button>
        </div>
      `;

      list.appendChild(li);
    });

    updateProgress();
  }

  function updateProgress() {
    if (tasks.length === 0) {
      document.getElementById('progressFill').style.width = '0%';
      document.getElementById('progressText').innerText = '0% Completed';
      return;
    }

    const completed = tasks.filter(t => t.completed).length;
    const percent = Math.round((completed / tasks.length) * 100);

    document.getElementById('progressFill').style.width = percent + '%';
    document.getElementById('progressText').innerText = percent + '% Completed';
  }