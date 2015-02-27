function Event(sender) {
    this._sender = sender;
    this._listeners = [];
}

Event.prototype = {
    attach: function (listener) {
        this._listeners.push(listener);
    },
    notify: function (args) {
        var index;

        for (index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this._sender, args);
        }
    }
};

/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
function ResumeModel() {
    var items = loadResumeJson();
    this.data = items;

    this.itemAdded = new Event(this);
    this.itemRemoved = new Event(this);
    this.selectedIndexChanged = new Event(this);
}

ListModel.prototype = {
    getItems: function () {
        return [].concat(this._items);
    },

    addItem: function (item) {
        this._items.push(item);
        this.itemAdded.notify({
            item: item
        });
    },

    removeItemAt: function (index) {
        var item;

        item = this._items[index];
        this._items.splice(index, 1);
        this.itemRemoved.notify({
            item: item
        });
        if (index === this._selectedIndex) {
            this.setSelectedIndex(-1);
        }
    },

    getSelectedIndex: function () {
        return this._selectedIndex;
    },

    setSelectedIndex: function (index) {
        var previousIndex;

        previousIndex = this._selectedIndex;
        this._selectedIndex = index;
        this.selectedIndexChanged.notify({
            previous: previousIndex
        });
    }
};

/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */
function ResumeView(model) {
    this._model = model;
}

function ShortView(model) {
    this._model = model;

    this.addButtonClicked = new Event(this);

    var _this = this;

    this._elements.addButton.click(function () {
        _this.addButtonClicked.notify();
    });
}

ListView.prototype = {
    show: function () {
        var _this = this;
        var items = this.model.getItems();
        //From the model get the name and name details items and create a div to display, add it to the dom
        //Pass to controller to attach event listener on object
        //Attach click listener to this item
        /*whateverItem.click(function () {
            _this.addButtonClicked.notify();
        });*/
    },

    rebuildList: function () {
        var list, items, key;

        list = this._elements.list;
        list.html('');

        items = this._model.getItems();
        for (key in items) {
            if (items.hasOwnProperty(key)) {
                list.append($('<option>' + items[key] + '</option>'));
            }
        }
        this._model.setSelectedIndex(-1);
    }
};

/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
function Controller(model, shortView, resumeView) {
    this.model = model;
    this.shortView = shortView;
    this.resumeView = resumeView;

    var _this = this;

    this._view.listModified.attach(function (sender, args) {
        _this.updateSelected(args.index);
    });

    this._view.addButtonClicked.attach(function () {
        _this.addItem();
    });

    this._view.delButtonClicked.attach(function () {
        _this.delItem();
    });
}

ListController.prototype = {
    addItem: function () {
        var item = window.prompt('Add item:', '');
        if (item) {
            this._model.addItem(item);
        }
    },

    delItem: function () {
        var index;

        index = this._model.getSelectedIndex();
        if (index !== -1) {
            this._model.removeItemAt(this._model.getSelectedIndex());
        }
    },

    updateSelected: function (index) {
        this._model.setSelectedIndex(index);
    }
};

$(function () {
    var model = new ResumeModel(),
        shortView = new ShortView();
        resumeView = new ResumeView(model, {
            'list': $('#list'),
            'addButton': $('#plusBtn'),
            'delButton': $('#minusBtn')
        }),
        controller = new Controller(model, shortView, resumeView);

    view.show();
});