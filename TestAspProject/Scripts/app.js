const timeout = 30 * 1000;
const latestCount = 5;

angular.module('msgcenter-app', [])
    .controller('ctrl', ['$http', '$timeout', function ($http, $timeout) {
        this.types = { 'all': undefined, 'latest': latestCount };
        this.latestCount = latestCount;
        this.type = 'latest';
        this.messages = [];
        this.send = function send() {
            var val = this.textInput;
            $http.post('/logic/parse', { input: val })
                .then(r => r.data)
                .then(msg => {
                    var message = {
                        type: msg.IsValid,
                        text: msg.Message || val,
                        date: Date.now()
                    };
                    this.messages.unshift(message);
                    return message;
                })
                .then(message => $timeout(() => message.removed = true, timeout));
        };
        var vm = this;
        this.removed = function removed(el) {
            return !el.removed || vm.type === 'all';
        };
        this.removeMessage = function removeMessage(msg) {
            msg.removed = true;
        }

    }]);
