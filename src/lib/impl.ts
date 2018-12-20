import {TargetObject} from "./index";



export module Impl {
    export function prototypes(target: TargetObject) {
        let protos = [] as object[];
        if (typeof target === "function" ){
        }
        if (typeof target !== "object"){
            return [];
        }
        function recurse(proto: any) {
            if (!proto) return;
            protos.push(proto);

        }
    }
}