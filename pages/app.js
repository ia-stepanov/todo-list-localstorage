const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body: 'Не&nbsp;причиняй никому боли обманом; твои мысли должны быть чистыми и&nbsp;справедливыми, так&nbsp;же как и&nbsp;слова.\r\n',
    title: 'Честность',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body: 'Реши выполнить&nbsp;то, что должно; что решил&nbsp;&mdash; выполняй неуклонно.\r\n',
    title: 'Решительность',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body: 'Не&nbsp;теряй времени попусту; занимайся чем-то полезным, что приносит пользу тебе и&nbsp;людям.\r\n',
    title: 'Трудолюбие',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body: 'Найди каждой вещи своё место, каждому делу&nbsp;&mdash; свое время.\r\n',
    title: 'Порядок',
  },
];

(function (arrOfTasks = []) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };
  let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';

  // Elements UI
  const listContainer = document.querySelector('.tasks-list-section .list-group');
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  const themeSelect = document.getElementById('themeSelect');
  const btnShowAllTasks = document.querySelectorAll('.btn.btn-primary.m-1')[0];
  const btnShowUncompletedTasks = document.querySelectorAll('.btn.btn-primary.m-1')[1];

  // Events
  setTheme(lastSelectedTheme);
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);
  listContainer.addEventListener('click', checkboxHandler);
  themeSelect.addEventListener('change', onThemeSelectHandler);
  btnShowAllTasks.addEventListener('click', showAllTasks);
  btnShowUncompletedTasks.addEventListener('click', showUncompletedTasks);

  // Отрисовать все задачи
  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error('Передайте список задач!');
      return;
    }

    addAlert(tasksList);

    const fragment = document.createDocumentFragment();

    Object.values(tasksList).forEach((task) => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });

    listContainer.appendChild(fragment);
  }

  // Шаблон задачи
  function listItemTemplate({ _id, completed, title, body } = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2',
      'my-2'
    );
    li.style.borderRadius = '0.25rem';
    li.style.boxShadow = `${completed ? '0 0 10px #007bff80' : ''}`;
    li.style.border = `${completed ? '1px solid #007bff' : ''}`;
    li.setAttribute('data-task-id', _id);

    // const span = document.createElement('span');
    // span.textContent = title;
    // span.style.fontWeight = 'bold';

    // const deleteBtn = document.createElement('btn');
    // deleteBtn.textContent = 'Удалить';
    // deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

    // const article = document.createElement('p');
    // article.textContent = body;
    // article.classList.add('mt-2', 'w-100');

    // li.appendChild(span);
    // li.appendChild(inputCheck);
    // li.appendChild(deleteBtn);
    // li.appendChild(article);

    const idCheck = `defaultCheck${Math.floor(Math.random() * (100000 - 1) + 1)}`;

    li.innerHTML = `
    <span style="font-weight: bold;">${title}</span>
    <p class="mt-2 w-100">${body}</p>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" ${
        completed ? 'checked' : ''
      } id="${idCheck}" >
      <label class="custom-control-label" for="${idCheck}">Задача выполнена</label>
    </div>
    <btn class="btn btn-danger ml-auto delete-btn">Удалить</btn>
    `;

    return li;
  }

  // Добавить задачу в список задач
  function onFormSubmitHandler(e) {
    e.preventDefault();

    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert('Пожалуйста, введите заголовок и/или текст.');
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem);
    form.reset();
    removeAlert();
  }

  // Создать новую задачу
  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask;

    return { ...newTask };
  }

  // Удалить задачу
  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Вы уверены, что хотите удалить задачу: ${title}?`);

    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
      addAlert(objOfTasks);
    }
  }

  // Обработчик чекбоксов
  function checkboxHandler({ target }) {
    if (target.classList.contains('custom-control-input')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = !target.checked;

      if (confirmed) {
        parent.style.border = '';
        parent.style.boxShadow = '';
        objOfTasks[id].completed = false;
      } else {
        parent.style.border = '1px solid #007bff';
        parent.style.boxShadow = '0 0 10px #007bff80';
        objOfTasks[id].completed = true;
      }
    }
  }

  // Добавить предупреждение
  function addAlert(tasksList) {
    let isEmptyArrOfTasks = Object.entries(tasksList).length === 0;

    if (!isEmptyArrOfTasks) return;
    const alert = document.createElement('span');
    alert.style.cssText = `
    display: flex;
    justify-content: center;
    color: #808080;
    font-size: 1.25rem;
    `;
    alert.dataset.alert = '';
    alert.textContent = 'Массив с задачами пустой';
    listContainer.insertAdjacentElement('afterend', alert);
  }

  // Удалить предупреждение
  function removeAlert() {
    const alert = document.querySelector('[data-alert]');

    if (!alert) return;
    alert.remove();
  }

  // Обработчик селектов
  function onThemeSelectHandler(e) {
    const selectedTheme = themeSelect.value;
    const isConfirmed = confirm(
      `Вы действительно хотите изменить тему: ${selectedTheme}`
    );

    if (!isConfirmed) {
      themeSelect.value = lastSelectedTheme;
      return;
    }

    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
    localStorage.setItem('app_theme', selectedTheme);
  }

  // Выбор светлой|темной темы
  function setTheme(name) {
    const selectedThemeObj = themes[name];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }

  // Показать все задачи
  function showAllTasks() {
    // if (!target.classList.contains('btn', 'btn-primary', 'm-1')) return;
    const elemListContainer = listContainer.querySelectorAll('li');

    elemListContainer.forEach((el) => {
      const confirmed = el.querySelector('.custom-control-input').checked;

      if (!confirmed) return;
      el.classList.add('d-flex');
      el.style.display = '';
    });
  }

  // Показать незавершенные задачи
  function showUncompletedTasks() {
    const elemListContainer = listContainer.querySelectorAll('li');

    elemListContainer.forEach((el) => {
      const confirmed = el.querySelector('.custom-control-input').checked;

      if (!confirmed) return;
      el.classList.remove('d-flex');
      el.style.display = 'none';
    });
  }
})(tasks);
