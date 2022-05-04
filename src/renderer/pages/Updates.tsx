import React from "react";
import { useObserver } from "mobx-react-lite";

export function Updates() {
    return useObserver(() => (
        <div className="w-full h-full flex justify-center items-center">
            <div>
                Updates!
            </div>
        </div>
    ));
}