import { useRef, useEffect } from 'react';

const deepCompareEquals = (a, b) => {
    for(let p in a){
        if(a.hasOwnProperty(p)){
            if(a[p] !== b[p]){
                return false;
            }
        }
    }
    for(var p in b){
        if(b.hasOwnProperty(p)){
            if(a[p] !== b[p]){
                return false;
            }
        }
    }
    return true;
}

const useDeepCompareMemoize = value => {
    const ref = useRef();
    
    if(!ref.current || !deepCompareEquals(value, ref.current))
        ref.current = value

    return ref.current
}

const useDeepCompareEffect = (callback, dependencies) => {
    useEffect(callback, useDeepCompareMemoize(dependencies))
}

export default useDeepCompareEffect;