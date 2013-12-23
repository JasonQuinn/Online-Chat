/// <reference path="../typings/underscore/underscore.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/knockout/knockout.d.ts" />

// Module
module OnlineChat {
    // Class
    export class Chat {
        messages: KnockoutObservableArray<ServerMessage> = ko.observableArray<ServerMessage>();
        text = ko.observable("");
        currentUser: string;
        private _chatRoom: string;

        private _chatHubProxy;
        // Constructor
        constructor(chatRoom: string, currentUser: string) {
            this._chatRoom = chatRoom;
            this._chatHubProxy = (<any>$).connection.chatHub;
            this.currentUser = currentUser;

            var changeTitle = (message: IServerMessage) => {
                if (message.User !== this.currentUser) {
                    (<any>$).titleAlert("New chat message!");
                }
            };

            (<any>$).connection.hub.start().done(() => {
                // Wire up Send button to call NewContosoChatMessage on the server.
                this._chatHubProxy.server.getAllMessages(this._chatRoom).done((data: IServerMessage[]) => {
                    if (data !== undefined) {
                        this.messages(_.map(data, (message) => {
                            return ServerMessage.create(message);
                        }));
                    }
                });
            });

            this._chatHubProxy.client.addMessage = (message: IServerMessage) => {
                this.messages.push(ServerMessage.create(message));

                changeTitle(message);
            };

        }
        public takeNewLine() {
            this.text(this.text()+'\n');
        }
        public sendMessage() {
            var text = this.text();

            this.text(null);

            function isNullOrWhiteSpace(str) {
                return str === null || str.match(/^\s*$/) !== null;
            }
            if (_.isString(text) && !isNullOrWhiteSpace(text)) {
                (<any>$).connection.hub.start().done(() => {
                    this._chatHubProxy.server.newChatMessage(this._chatRoom, text);
                });
            }
        }
    }

    export interface IServerMessage {
        User: string;
        Text: string;
        Time: string;
        IsCurrentUser: boolean;
    }

    export class ServerMessage {
        User: string;
        Text: string;
        Time: Date;
        IsCurrentUser: boolean;
        constructor() {

        }
        public static create(serverMessage: IServerMessage) {
            var newServerMessage = new ServerMessage();
            newServerMessage.User = serverMessage.User;
            newServerMessage.Time = new Date(Date.parse(serverMessage.Time));
            newServerMessage.Text = serverMessage.Text;
            newServerMessage.IsCurrentUser = serverMessage.IsCurrentUser;
            return newServerMessage;
        }
    }
}