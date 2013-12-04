// Module
var OnlineChat;
(function (OnlineChat) {
    // Class
    var Chat = (function () {
        // Constructor
        function Chat(chatRoom) {
            var _this = this;
            this.messages = ko.observableArray();
            this.text = ko.observable("");
            this._chatRoom = chatRoom;
            this._chatHubProxy = ($.connection).chatHub;

            $.connection.hub.start().done(function () {
                // Wire up Send button to call NewContosoChatMessage on the server.
                _this._chatHubProxy.server.getAllMessages(_this._chatRoom).done(function (data) {
                    if (data !== undefined) {
                        _this.messages(_.map(data, function (message) {
                            return ServerMessage.create(message);
                        }));
                    }
                });
            });

            this._chatHubProxy.client.addMessage = function (message) {
                _this.messages.push(ServerMessage.create(message));
            };
        }
        Chat.prototype.takeNewLine = function () {
            this.text(this.text() + '\n');
        };
        Chat.prototype.sendMessage = function () {
            var _this = this;
            var text = this.text();

            this.text(null);

            function isNullOrWhiteSpace(str) {
                return str === null || str.match(/^\s*$/) !== null;
            }
            if (_.isString(text) && !isNullOrWhiteSpace(text)) {
                $.connection.hub.start().done(function () {
                    _this._chatHubProxy.server.newChatMessage(_this._chatRoom, text);
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
