import toDoList from './todo';
import { format } from 'date-fns';
import './style.css';

const main = document.querySelector('.container');
let _current_cat = toDoList.default_cat;
let _hide_maker = false;
const _today = new Date();

for (const c of ['Woo', 'Wee', 'Foo', 'Bar']) {
    toDoList.addCategory(c);
}
// console.log(toDoList.getCategories());

const _header = function () {
    const top = document.createElement('div');
    top.classList.add('header');
    top.textContent = 'To Do List';
    return top;
};

const _side = function () {
    const side = document.createElement('div');
    side.classList.add('side-panel');

    // Categories
    const list = document.createElement('ul');
    for (let cat of toDoList.getCategories()) {
        const li = document.createElement('li');
        if (cat === _current_cat) {
            li.classList.add('current-cat');
        } else {
            li.addEventListener('click', () => {
                _current_cat = cat;
                _display();
            });
        }
        const div = document.createElement('div');
        div.textContent = cat;
        li.append(div);
        if (cat !== toDoList.default_cat && cat === _current_cat) {
            const btn = document.createElement('button');
            btn.textContent = '✕';
            btn.addEventListener('click', () => {
                toDoList.removeCategory(cat);
                _current_cat = toDoList.default_cat;
                _display();
            });
            li.append(btn);
        }
        list.append(li);
    }

    // Add new category
    const div = document.createElement('div');
    div.classList.add('new-cat');
    const input = document.createElement('input');
    input.placeholder = 'New Category';
    const btn = document.createElement('button');
    btn.addEventListener('click', () => {
        if (input.value === '') {
            return;
        }
        toDoList.addCategory(input.value);
        _current_cat = input.value;
        _display();
    });
    btn.textContent = 'Add';
    div.append(input, btn);

    side.append(list, div);
    return side;
};

const _makeToDo = function () {
    const div = document.createElement('div');
    if (!_hide_maker) {
        div.textContent = '+ new task';
        div.classList.add('new-task');
        div.addEventListener('click', () => {
            _hide_maker = true;
            _display();
        });
    } else {
        div.classList.add('todo-maker');

        const subdiv1 = document.createElement('div');
        subdiv1.classList.add('todo-1');
        const task = document.createElement('input');
        task.placeholder = 'Task Name*';
        subdiv1.append(task);

        const subdiv2 = document.createElement('div');
        subdiv2.classList.add('todo-2');
        const desc = document.createElement('textarea');
        desc.placeholder = 'Description';
        subdiv2.append(desc);

        const subdiv3 = document.createElement('div');
        subdiv3.classList.add('todo-3');
        const date = document.createElement('input');
        date.type = 'date';
        date.value = format(_today, 'yyyy-MM-dd');
        date.min = format(_today, 'yyyy-MM-dd');
        const div2 = document.createElement('div');
        const add = document.createElement('button');
        add.classList.add('add');
        add.textContent = '✓';

        add.addEventListener('click', () => {
            if (task.value === '') {
                return;
            }
            let time;
            if (date.value === '') {
                time = '';
            } else {
                // time = format(date.valueAsDate, 'MMM d, yyyy');
                const year = +date.value.substring(0, 4);
                const month = +date.value.substring(5, 7);
                const day = +date.value.substring(8, 10);
                const t = new Date(Date.parse(date.value))
                    .toUTCString()
                    .split(' ')
                    .slice(0, 4);
                time = `${t[0].replace(',', '')} ${t[2]} ${t[1]}, ${t[3]}`;
            }
            toDoList.addToDo(task.value, desc.value.replace('\n', '\r\n'), time, _current_cat);
            console.log(toDoList.getToDos());
            _hide_maker = false;
            _display();
        });

        const cancel = document.createElement('button');
        cancel.classList.add('cancel');
        cancel.textContent = '✕';

        cancel.addEventListener('click', () => {
            _hide_maker = false;
            _display();
        });

        div2.append(add, cancel);
        subdiv3.append(date, div2);

        div.append(subdiv1, subdiv2, subdiv3);
    }
    return div;
};

const _toDos = function () {
    const div = document.createElement('div');
    div.classList.add('todos');
    div.append(_makeToDo());
    console.log(toDoList.getCatToDos(_current_cat));
    for (let todo of toDoList.getCatToDos(_current_cat)) {
        const todo_div = document.createElement('div');
        todo_div.setAttribute('data-id', `${todo.id}`);
        todo_div.classList.add('todo');

        const title = document.createElement('div');
        title.classList.add('td-title');
        title.textContent = todo.task.title;

        const desc = document.createElement('div');
        desc.classList.add('td-desc');
        desc.textContent = todo.task.description;

        const complete = document.createElement('button');
        
        const remove = document.createElement('button');
        desc.append(complete, remove);

        const dueDate = document.createElement('div');
        dueDate.classList.add('td-dd');
        dueDate.textContent = todo.task.dueDate;

        todo_div.append(title, dueDate, desc);

        div.append(todo_div);
    }
    return div;
};

const _display = function () {
    main.textContent = '';
    main.append(_header(), _side(), _toDos());
};

_display();
