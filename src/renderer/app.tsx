import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SideNav } from "./components";
import { appRoutes } from "./constants";
import {
    Commands,
    ChatFeed,
    Events,
    Timers,
    ChannelRewards,
    PresetEffectLists,
    Hotkeys,
    Counters,
    EffectQueues,
    Games,
    Moderation,
    Currency,
    Quotes,
    Viewers,
    ViewerRoles,
    Settings,
    Updates
 } from "./pages";

const App = () => (
    <>
        <div className="bp3-dark w-full h-full bg-gray-700 text-white">
            <Router>
                <SideNav />
                <div
                    style={{
                        paddingLeft: "65px",
                    }}
                    className="h-full w-full"
                >
                    <Switch>
                        <Route exact path={appRoutes.COMMANDS}>
                            <Commands />
                        </Route>
                        <Route path={appRoutes.CHAT_FEED}>
                            <ChatFeed />
                        </Route>
                        <Route path={appRoutes.EVENTS}>
                            <Events />
                        </Route>
                        <Route path={appRoutes.TIMERS}>
                            <Timers />
                        </Route>
                        <Route path={appRoutes.CHANNEL_REWARDS}>
                            <ChannelRewards />
                        </Route>
                        <Route path={appRoutes.PRESET_EFFECT_LISTS}>
                            <PresetEffectLists />
                        </Route>
                        <Route path={appRoutes.HOTKEYS}>
                            <Hotkeys />
                        </Route>
                        <Route path={appRoutes.COUNTERS}>
                            <Counters />
                        </Route>

                        <Route path={appRoutes.EFFECT_QUEUES}>
                            <EffectQueues />
                        </Route>
                        <Route path={appRoutes.GAMES}>
                            <Games />
                        </Route>
                        <Route path={appRoutes.MODERATION}>
                            <Moderation />
                        </Route>
                        <Route path={appRoutes.CURRENCY}>
                            <Currency />
                        </Route>
                        <Route path={appRoutes.QUOTES}>
                            <Quotes />
                        </Route>
                        <Route path={appRoutes.VIEWERS}>
                            <Viewers />
                        </Route>
                        <Route path={appRoutes.VIEWER_ROLES}>
                            <ViewerRoles />
                        </Route>
                        <Route path={appRoutes.SETTINGS}>
                            <Settings />
                        </Route>
                        <Route path={appRoutes.UPDATES}>
                            <Updates />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    </>
);

export default App;
