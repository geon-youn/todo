class ToggleItem {
    constructor() {
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

class ToDoListItem extends ToggleItem {
    constructor(title, description, dueDate, category, subtasks) {
        super();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.category = category;
        this.subtasks = subtasks;
    }

    updateCategory(oldCat, newCat) {
        if (this.category === oldCat) {
            this.category = newCat;
        }
    }
}

class SubTask extends ToggleItem {
    constructor(task) {
        super();
        this.task = task;
    }
}

const toDoList = (function () {
    const _DEFAULT = 'Default';
    const _categories = [];
    const _toDo = [];
    let _id = 0;

    const _updateCategory = function (oldCat, newCat) {
        _toDo.map(function () {
            this.updateCategory(oldCat, newCat);
        });
    };

    const addToDo = function (title, description, dueDate, category, subtasks) {
        _toDo.push({
            id: _id++,
            task: new ToDoListItem(
                title,
                description,
                dueDate,
                category,
                subtasks
            ),
        });
    };

    const removeToDo = function (id) {
        _toDo = _toDo.filter((todo) => todo.id !== id);
    };

    const addCategory = function (name) {
        if (name === _DEFAULT) {
            console.log(`${name} is a default category.`);
            return;
        } else if (_categories.includes(name)) {
            console.log(`${name} is already a category.`);
            return;
        }
        _categories.push(name);
    };

    const removeCategory = function (name) {
        if (name === _DEFAULT) {
            console.log('Cannot remove the default category');
            return;
        } else if (!_categories.includes(name)) {
            console.log(`${name} is not a category.`);
            return;
        }
        _categories.splice(_categories.indexOf(name), 1);
        _updateCategory(name, _DEFAULT);
    };

    const getToDos = function () {
        return _toDo;
    };

    const getCategories = function () {
        return [[_DEFAULT] + [..._categories]];
    };

    return {
        addToDo,
        removeToDo,
        addCategory,
        removeCategory,
        getToDos,
        getCategories,
    };
})();

export default toDoList;