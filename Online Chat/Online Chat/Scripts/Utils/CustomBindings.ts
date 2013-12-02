
(function () {
    var tempKoHandlers: any = ko.bindingHandlers;

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

    tempKoHandlers.ctrlReturnAction = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {

            var value = ko.utils.unwrapObservable(valueAccessor());

            $(element).keydown(function (e) {
                if (e.which === 13 && e.ctrlKey === true) {
                    value(viewModel);
                }
            });
        }
    };

    var getPrettyTime = (date: Date): string => {
        var today = new Date();
        var dateString = "";
        if (date.toDateString() == today.toDateString()) {

        }
        
        var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        //If in the last week        
        if (date > new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)) {
            //If not today
            if(date.getDay() !== today.getDay()){
                dateString += days[date.getDay()] + ' ';
            }
        }
        else {
            //If different days
            if (date.getDate() !== today.getDate() || date.getMonth() !== today.getMonth() || date.getFullYear() !== today.getFullYear()) {
                dateString += date.getDate() + ' ';
            }
            //If different months
            if (date.getMonth() !== today.getMonth() || date.getFullYear() !== today.getFullYear()) {
                dateString += months[date.getMonth()] + ' ';
            }
            //If different years
            if (date.getFullYear() !== today.getFullYear()) {
                dateString += date.getFullYear() + ' ';
            }
        }
        var addZero = (num: number) => {
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