// Load the application once the DOM is ready, using `jQuery.ready`:

_.templateSettings = {
    interpolate: /\<\@\=(.+?)\@\>/gim,
    evaluate: /\<\@(.+?)\@\>/gim,
    escape: /\<\@\-(.+?)\@\>/gim
};

$(function () {

    // User Model
    // ----------

    // Our basic **User** model has `content`, `order`, and `done` attributes.
    window.User = Backbone.Model.extend({

        // Default attributes for the todo.
        defaults: {
            id: "null",
            login: "null",
            password: "null",
            email: "null",
            firstName: "null",
            lastName: "null",
            birthDate: "null",
            role: "null"
        },

        // Ensure that each todo created has `content`.
        initialize: function () {
            if (!this.get("id")) {
                this.set({"id": this.defaults.id});
                this.set({"login": this.defaults.login});
                this.set({"password": this.defaults.password});
                this.set({"email": this.defaults.email});
                this.set({"firstName": this.defaults.firstName});
                this.set({"lastName": this.defaults.lastName});
                this.set({"birthDate": this.defaults.birthDate});
                this.set({"role": this.defaults.role});
            }
        }
    });

    // User Collection
    // ---------------

    // The collection of todos is backed by *localStorage* instead of a remote
    // server.
    window.TodoList = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: User,

        url: "http://10.11.20.69:8080/RESTfull_Server/serviceUsers/users"

    });

    // Create our global collection of **Users**.
    window.Users = new TodoList;

    // User Item View
    // --------------

    // The DOM element for a user item...
    window.TodoView = Backbone.View.extend({

        //... is a list tag.
        tagName: "tr",

        // Cache the template function for a single item.
        template: _.template($('#item-template').html()),

        // The DOM events specific to an item.
        events: {
            "click .check": "toggleDone",
            "click .edit": "edit",
            "click .destroy": "destroy"
        },

        initialize: function () {
            this.model.bind('change', this.render, this);
            this.model.on('destroy', this.remove, this);
//            this.model.on('edit', this.edit, this);
        },

        // Re-render the contents of the user item.
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            this.setContent();
            return this;
        },

        // To avoid XSS (not that it would be harmful in this particular app),
        // we use `jQuery.text` to set the contents of the todo item.
        setContent: function () {
            this.$('.userLogin').text(this.model.get('login'));
            this.$('.userFirstName').text(this.model.get('firstName'));
            this.$('.userLastName').text(this.model.get('lastName'));
            this.$('.userEmail').text(this.model.get('email'));
            var role = this.model.get('role');
            this.$('.userRole').text(role.name);
            this.$('.userBirthDate').text(this.model.get('birthDate'));
//            this.$('.editUser').attr("onclick", "editFormShow('" + this.model.get('login') + "')");
        },

        // Remove this view from the DOM.
        remove: function () {
            if (confirm("Are you sure ?")) {
                Backbone.ajax({
                    type: "post",
                    url: "delete",
                    cache: false,
                    clearForm: true,
                    data: 'login=' + this.model.get('login')
                })
                $(this.el).remove();
            }
        },

        // Remove the item, destroy the model.
        destroy: function () {
            this.model.destroy();
        }

    });

    // The Application
    // ---------------

    window.AppView = Backbone.View.extend({

        el: $("#userapp"),

        initialize: function () {
            _.bindAll(this, 'addOne', 'addAll', 'render');

            Users.bind('reset', this.addAll, this);
            Users.bind('add', this.addOne, this);
            Users.bind('all', this.render, this);
            Users.fetch();
        },

        addOne: function (user) {
            var view = new TodoView({model: user});
            this.$("#user-list").append(view.render().el);
        },

        addAll: function () {
            Users.each(this.addOne);
        }
    });

    // Finally, we kick things off by creating the **App**.
    window.App = new AppView;

});
