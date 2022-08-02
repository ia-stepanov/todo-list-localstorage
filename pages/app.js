const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function (arrOfTasks = []) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // Elements UI
  const listContainer = document.querySelector('.tasks-list-section .list-group');
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];

  // Events
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);
  listContainer.addEventListener('click', checkboxHandler);

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
      'mt-2'
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
    // // li.appendChild(inputCheck);
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

    // 2px solid #28a745;
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

      console.log(objOfTasks[id]);
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
})(tasks);
