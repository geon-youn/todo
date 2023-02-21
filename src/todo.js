class ToggleItem {
    constructor() {
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

class ToDoListItem extends ToggleItem {
    constructor(title, description, dueDate, category) {
        super();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.category = category;
    }

    updateCategory(oldCat, newCat) {
        if (this.category === oldCat) {
            this.category = newCat;
        }
    }
}

const toDoList = (function () {
    const default_cat = 'Default';
    const _categories = [];
    const _toDo = [
        {
            "id": 0,
            "task": {
                "completed": false,
                "title": "Go grocery shopping",
                "description": "- Bananas\r\n- Milk\r\n- Your mom",
                "dueDate": "Mon Feb 20, 2023",
                "category": "Default"
            }
        },
        {
            "id": 1,
            "task": {
                "completed": false,
                "title": "Hiking trip",
                "description": "Don't forget water!",
                "dueDate": "Tue Feb 21, 2023",
                "category": "Default"
            }
        },
        {
            "id": 2,
            "task": {
                "completed": false,
                "title": "2DB3 Assignment",
                "description": "",
                "dueDate": "Tue Feb 28, 2023",
                "category": "Default"
            }
        }
    ];
    let _id = 0;

    const _updateCategory = function (oldCat, newCat) {
        _toDo.map(e => {
            e.task.updateCategory(oldCat, newCat);
        });
    };

    const addToDo = function (title, description, dueDate, category) {
        _toDo.push({
            id: _id++,
            task: new ToDoListItem(title, description, dueDate, category),
        });
    };

    const removeToDo = function (id) {
        _toDo = _toDo.filter((todo) => todo.id !== id);
    };

    const addCategory = function (name) {
        if (name === default_cat) {
            console.log(`${name} is a default category.`);
            return;
        } else if (_categories.includes(name)) {
            console.log(`${name} is already a category.`);
            return;
        }
        _categories.push(name);
    };

    const removeCategory = function (name) {
        if (name === default_cat) {
            console.log('Cannot remove the default category');
            return;
        } else if (!_categories.includes(name)) {
            console.log(`${name} is not a category.`);
            return;
        }
        _categories.splice(_categories.indexOf(name), 1);
        _updateCategory(name, default_cat);
    };

    const getToDos = function () {
        return _toDo;
    };

    const getCatToDos = function (catName) {
        return _toDo.filter((todo) => todo.task.category === catName);
    };

    const getCategories = function () {
        return [default_cat, ..._categories];
    };

    return {
        addToDo,
        removeToDo,
        addCategory,
        removeCategory,
        getToDos,
        getCatToDos,
        getCategories,
        default_cat,
    };
})();

export default toDoList;
