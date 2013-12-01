
// Module
module OnlineChat {
    // Class
    export class Chat {
        messages: KnockoutObservableArray<ServerMessage> = ko.observableArray();
        text = ko.observable("");

        private _chatHubProxy;
        // Constructor
        constructor() {
            this._chatHubProxy = (<any>$.connection).chatHub;

            $.connection.hub.start().done(() => {
                // Wire up Send button to call NewContosoChatMessage on the server.
                this._chatHubProxy.server.getAllMessages().done((data: IServerMessage[]) => {
                    if (data !== undefined) {
                        this.messages(_.map(data, (message) => {
                            return ServerMessage.create(message);
                        }));
                    }
                });
            });

            this._chatHubProxy.client.addMessage = (message: IServerMessage) => {
                this.messages.push(ServerMessage.create(message));
            };

        }
        public sendMessage() {
            var text = this.text();

            this.text("");

            function isNullOrWhiteSpace(str) {
                return str === null || str.match(/^\s*$/) !== null;
            }
            if (_.isString(text) && !isNullOrWhiteSpace(text)) {
                $.connection.hub.start().done(() => {
                    this._chatHubProxy.server.newChatMessage(text);
                });
            }

        }
    }

    export interface IServerMessage {
        User: string;
        Text: string;
        Time: string;
    }

    export class ServerMessage {
        User: string;
        Text: string;
        Time: Date;
        constructor() {

        }
        public static create(serverMessage: IServerMessage) {
            var newServerMessage = new ServerMessage();
            newServerMessage.User = serverMessage.User;
            newServerMessage.Time = new Date(Date.parse(serverMessage.Time));
            newServerMessage.Text = serverMessage.Text;
            return newServerMessage;
        }
    }
}