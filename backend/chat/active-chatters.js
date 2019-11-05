"use strict";

const { ipcMain } = require("electron");
const settings = require("../common/settings-access").settings;
const logger = require("../logwrapper");
const Chat = require("../common/mixer-chat");

// Active user toggle
let activeUserListStatus = settings.getActiveChatUserList() === false ? false : true;

// User Timeout Settings
let userInactiveTimeSetting = settings.getActiveChatUserListTimeout() != null ? settings.getActiveChatUserListTimeout() : 10;
let inactiveTimer = userInactiveTimeSetting * 60000;

// Timer and chatter list.
let cycleActiveTimer = [];
let activeChatters = [];

function addOrUpdateActiveChatter(user) {
    if (!activeUserListStatus) {
        return;
    }

    let date = new Date;
    let currentTime = date.getTime();

    let existingUserIndex = activeChatters.findIndex((obj => obj.userId === user.user_id));

    // If user exists, update their time and stop.
    if (existingUserIndex !== -1) {
        logger.debug(user.user_name + " is still active in chat. Updating their time.");
        activeChatters[existingUserIndex].time = currentTime;
        return;
    }

    // Else, we're going to push the new user to the active chatter array.
    logger.debug(user.user_name + " has become active in chat. Adding them to active chatter list.");
    user = {
        userId: user.user_id,
        username: user.user_name,
        time: currentTime
    };
    activeChatters.push(user);
}

function clearInactiveChatters() {
    logger.debug("Clearing inactive people from active chatters list.");
    let date = new Date;
    let currentTime = date.getTime();
    let expiredTime = currentTime - inactiveTimer;
    for (let userIndex in activeChatters) {
        if (activeChatters[userIndex] != null) {
            let user = activeChatters[userIndex];
            if (user.time <= expiredTime) {
                logger.debug(user.username + " has gone inactive in chat. Removing them from active chatter list.");
                activeChatters.splice(userIndex, 1);
            }
        }
    }
}

function getActiveChatters() {
    return activeChatters;
}

function cycleActiveChatters() {
    let chatConnected = Chat.getChatStatus();
    if (!chatConnected) {
        return;
    }

    logger.info("Starting Active Chatters Loop");

    // Just in case
    clearInterval(cycleActiveTimer);

    // We have permission to start up the loop now. Let's do this...
    cycleActiveTimer = setInterval(function() {
        clearInactiveChatters();
    }, 60000);

    return;
}

ipcMain.on("setActiveChatUsers", function(event, value) {
    logger.debug('Changing active chat user enabled to: ' + value);
    if (value === false) {
        logger.debug('Stopping active user timeout cycle.');
        clearInterval(cycleActiveTimer);
    }
    activeUserListStatus = settings.getActiveChatUserList() === false ? false : true;
});

ipcMain.on("setActiveChatUserTimeout", function(event, value) {
    logger.debug('Changing active chat user timeout to: ' + value);

    // Make sure we have a valid value, then set it.
    value = parseInt(inactiveTimer);
    if (isNaN(value)) {
        return 10;
    }
    inactiveTimer = value;

    // Restart our timer with the new value.
    cycleActiveChatters();
});

// Export Functions
exports.getActiveChatters = getActiveChatters;
exports.addOrUpdateActiveChatter = addOrUpdateActiveChatter;
exports.cycleActiveChatters = cycleActiveChatters;