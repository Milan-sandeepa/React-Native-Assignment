import * as React from 'react';

export const navigationRef = React.createRef();


export function reset(name, params) {
    navigationRef.current?.reset({
        index: 0,
        routes: [{name, params}],
    });
}


