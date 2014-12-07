var Pubnub = require('pubnub-browserify');
var ApiActions = require('../actions/ApiActions');
var Settings = require("./Settings");

module.exports = {

    init: function () {
        Pubnub = Pubnub.init({
            publish_key: Settings.pubNub.publishKey,
            subscribe_key: Settings.pubNub.subscribeKey
        });
    },

    publishAnswer: function (channel, message) {
        Pubnub.publish({
            channel: channel,
            message: message
        });
    },

    publishQuestion: function (text, lang, snippetId) {
        Pubnub.publish({
            channel: 'lang-' + lang,
            message: {text: text, lang: lang, snippetId: snippetId},
            callback: function (e) {
            },
            error: function (e) {
            }
        });
    },

    subscribeToChannel: function (channel, callback) {
        Pubnub.subscribe({
            channel: channel,
            callback: callback
        });
    },
    subscribeLangChannel: function (lang) {
        this.subscribeToChannel('lang-' + lang, function (m) {
            ApiActions.questionReceived(m.snippetId, m.text);
        });
    },

    subscribePrivateChannel: function (uid) {
        this.subscribeToChannel(uid, function (m) {
            ApiActions.answerReceived(m);
        });
    }
};
