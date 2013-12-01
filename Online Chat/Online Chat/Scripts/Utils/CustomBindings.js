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
})();
//# sourceMappingURL=CustomBindings.js.map
