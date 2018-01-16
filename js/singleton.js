(function () {
    'use strict';

    function Http() {
        var instance;

        Http = function Http () {
            return instance;
        };

        Http.prototype = this;
        instance = new Http();
        instance.constructor = Http;

        return instance;
    }

    Http.prototype.makeRequest = function (method, endpoint) {
        var xhr = new XMLHttpRequest();

        xhr.open(method, endpoint, true);

        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status !== 200) {
                console.log('The request has been failed with following status: ', xhr.statusText);
                return;
            }

            console.log('The request has been successfully send');
            console.table(JSON.parse(xhr.response));
        };
    };

    var http = new Http();
    http.makeRequest('GET', 'http://api.openweathermap.org/data/2.5/weather?' + serialize(weather));

})();
