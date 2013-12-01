(function () {
    var tempKoHandlers = ko.bindingHandlers;

    tempKoHandlers.returnAction = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            $(element).keydown(function (e) {
                if (e.which === 13) {
                    value(viewModel);
                }
            });
        }
    };

    var getPrettyTime = function (date) {
        var today = new Date();
        var dateString = "";
        if (date.toDateString() == today.toDateString()) {
        }

        var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        if (date > new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)) {
            if (date.getDay() !== today.getDay()) {
                dateString += days[date.getDay()] + ' ';
            }
        } else {
            if (date.getDate() !== today.getDate() || date.getMonth() !== today.getMonth() || date.getFullYear() !== today.getFullYear()) {
                dateString += date.getDate() + ' ';
            }

            if (date.getMonth() !== today.getMonth() || date.getFullYear() !== today.getFullYear()) {
                dateString += months[date.getMonth()] + ' ';
            }

            if (date.getFullYear() !== today.getFullYear()) {
                dateString += date.getFullYear() + ' ';
            }
        }
        var addZero = function (num) {
            return (num < 10 ? '0' : '') + num;
        };
        dateString += addZero(date.getHours()) + ':' + addZero(date.getMinutes());
        return dateString;
    };

    tempKoHandlers.prettyTime = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor);
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor);
            var dateString = getPrettyTime(value());
            $(element).text(dateString);
        }
    };
})();
//# sourceMappingURL=CustomBindings.js.map
