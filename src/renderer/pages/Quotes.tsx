import React from "react";
import { useObserver } from "mobx-react-lite";

export function Quotes() {
    return useObserver(() => (
        <div className="w-full h-full flex justify-center items-center">
            <div>
                Quotes!
            </div>
        </div>
    ));
}