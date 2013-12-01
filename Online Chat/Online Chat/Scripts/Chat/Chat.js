// Module
var OnlineChat;
(function (OnlineChat) {
    // Class
    var Chat = (function () {
        // Constructor
        function Chat() {
            var _this = this;
            this.messages = ko.observableArray();
            this.text = ko.observable("");
            this._chatHubProxy = ($.connection).chatHub;

            //chatHubProxy.server.GetAllMessages = function (name, message) {
            //    console.log(name + ' ' + message);
            //};
            $.connection.hub.start().done(function () {
                // Wire up Send button to call NewContosoChatMessage on the server.
                _this._chatHubProxy.server.getAllMessages().done(function (data) {
                    if (data !== undefined) {
                        _this.messages(_.map(data, function (message) {
                            return ServerMessage.create(message);
                        }));
                    }
                });

                _this._chatHubProxy.server.newChatMessage("TestJason", "MessageTest");
            });

            this._chatHubProxy.client.addMessage = function (message) {
                _this.messages.push(ServerMessage.create(message));
            };
        }
        Chat.prototype.sendMessage = function () {
            var _this = this;
            var text = this.text();

            this.text("");

            function isNullOrWhiteSpace(str) {
                return str === null || str.match(/^\s*$/) !== null;
            }
            if (_.isString(text) && !isNullOrWhiteSpace(text)) {
                $.connection.hub.start().done(function () {
                    _this._chatHubProxy.server.newChatMessage(text);
                });
            }
        };
        return Chat;
    })();
    OnlineChat.Chat = Chat;

    var ServerMessage = (function () {
        function ServerMessage() {
        }
        ServerMessage.create = function (serverMessage) {
            var newServerMessage = new ServerMessage();
            newServerMessage.User = serverMessage.User;
            newServerMessage.Time = new Date(Date.parse(serverMessage.Time));
            newServerMessage.Text = serverMessage.Text;
            return newServerMessage;
        };
        return ServerMessage;
    })();
    OnlineChat.ServerMessage = ServerMessage;
})(OnlineChat || (OnlineChat = {}));
//# sourceMappingURL=Chat.js.map
