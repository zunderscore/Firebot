"use strict";

const replaceVariableManager = require("./replace-variable-manager");

exports.loadReplaceVariables = () => {
    [
        'account-creation-date',
        'active-chat-user-count',
        'arg-array',
        'arg-count',
        'arg',
        'array-add',
        'array-filter',
        'array-find',
        'array-join',
        'array-length',
        'array-remove',
        'array-reverse',
        'array-shuffle',
        'bits-badge-tier',
        'bits-badge-unlocked-message',
        'bot',
        'category-image-url',
        'chat-message',
        'chat-messages',
        'cheer-bits',
        'cheer-message',
        'cheer-total-bits',
        'commafy',
        'command-trigger',
        'concat',
        'count',
        'counter',
        'currency',
        'current-viewer-count',
        'custom-role-user-count',
        'custom-variable',
        'custom-variable-created-data',
        'custom-variable-created-name',
        'custom-variable-expired-data',
        'custom-variable-expired-name',
        'date',
        'donation-amount-formatted',
        'donation-amount',
        'donation-from',
        'donation-message',
        'ensure-number',
        'eval-vars',
        'file-line-count',
        'follow-count',
        'game',
        'gift-count',
        'gift-duration',
        'gift-giver-user',
        'gift-receiver-user',
        'gift-receivers',
        'gift-sub-months',
        'gift-sub-type',
        'host-type',
        'host-viewer-count',
        'loop-count',
        'loop-item',
        'math',
        'number-ceil',
        'number-floor',
        'number-max',
        'number-min',
        'number-round',
        'ordinal-indicator',
        'preset-list-arg',
        'profile-page-bytebin-token',
        'quote',
        'raid-viewer-count',
        'random-active-viewer',
        'random-number',
        'random-viewer',
        'random-reddit-image',
        'random-dad-joke',
        'random-advice',
        'read-api',
        'read-file',
        'regexExec',
        'regexTest',
        'replace',
        'reward-description',
        'reward-cost',
        'reward-image-url',
        'reward-message',
        'reward-name',
        'stream-title',
        'streamer',
        'sub-count',
        'sub-points',
        'sub-message',
        'sub-months',
        'sub-streak',
        'sub-type',
        'target',
        'text-length',
        'text-lowercase',
        'text-scramble',
        'text-uppercase',
        'text-capitalize',
        'text-contains',
        'text-encode-for-html',
        'text-encode-for-url',
        'text-split',
        'text-substring',
        'text-trim',
        'time',
        'timeout-duration',
        'top-currency-user',
        'top-currency',
        'top-view-time',
        'uptime',
        'user-avatar-url',
        'user-exists',
        'user-id',
        'user-metadata',
        'user',
        'username',
        'usernameArray',
        'view-time',
        'whisper-message'
    ].forEach(filename => {
        let definition = require(`./builtin/${filename}.js`);
        replaceVariableManager.registerReplaceVariable(definition);
    });
};
