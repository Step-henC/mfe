import {mount} from 'marketing/MarketingApp'; //from marketing webpackfederation plugin
import React, {useRef, useEffect} from 'react';


export default () => {
    const ref = useRef(null);

    useEffect(() => { //make sure mount runs this function only once!
mount(ref.current);
    });
    return <div ref={ref}></div>
}