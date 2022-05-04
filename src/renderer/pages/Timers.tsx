import React from "react";
import { useObserver } from "mobx-react-lite";

export function Timers() {
    return useObserver(() => (
        <div className="w-full h-full flex justify-center items-center">
            <div>
                Timers!
            </div>
        </div>
    ));
}