import React from "react";
import { useObserver } from "mobx-react-lite";

export function ViewerRoles() {
    return useObserver(() => (
        <div className="w-full h-full flex justify-center items-center">
            <div>
                Viewer Roles!
            </div>
        </div>
    ));
}