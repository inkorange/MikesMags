/*
 DataStore | Chris West inkorange.com
 Cross component data management container with tie ins to Local Storage persistence
 */

module.exports = {
    _initStore: function (name) {
        if(!window.store) { // creating object if it doesn't exist
            window.store = {};
        }
        if(!window.store[name]) {
            window.store[name] = {};
            window.store[name].data = null;
            window.store[name].message = null;
            window.store[name].subscriptions = [];
        }
    },

    setStore: function(name, data, dataOptions) {
        var options = {
            persist: false
        };
        Object.assign(options, dataOptions);

        // initializes if not already done
        this._initStore(name);

        // sets the data to the store object
        window.store[name].data = data;

        // when a message is set, it would set it to the store data object
        window.store[name].message = options.message ? options.message : '';

        // if the setter contains a persist config, it will add it to local storage
        if(options.persist) {
            // save to LocalStorage
            localStorage.setItem(name, JSON.stringify(window.store[name].data));
        }

        var subscriptions = window.store[name].subscriptions ? window.store[name].subscriptions : [];
        if(subscriptions.length > 0) {
            subscriptions.forEach(function (fn) {
                fn(data, window.store[name].message); // executing each callback that is subscribed
            });
        }
    },
    
    getStore: function(name) {
        var data = {};

        // initializes if not already done
        this._initStore(name);

        if(!window.store[name].data) {
            var CachedData = JSON.parse(localStorage.getItem(name));
            //console.log('getting '+name+' form localStorage: ', CachedData);
            window.store[name].data = CachedData ? CachedData : '';
            data = window.store[name].data;
        } else {
            data = window.store[name].data;
        }
        return data;
    },
    
    subscribe: function(name, callbackFn) {
        this._initStore(name);
        window.store[name].subscriptions.push(callbackFn); // subscribing to this store.
    },
    
    getSubscribers: function(name) {
        return window.store[name].subscriptions;
    }
    
};