import React from "react";
import { useObserver } from "mobx-react-lite";

export function PresetEffectLists() {
    return useObserver(() => (
        <div className="w-full h-full flex justify-center items-center">
            <div>
                Preset effect lists!
            </div>
        </div>
    ));
}