import { mount } from "auth/AuthApp"; //from auth webpackfederation plugin
import React, { useRef, useEffect } from "react";
import {useHistory} from 'react-router-dom' //need access to history object inside container

export default ({onSignIn}) => {
  const ref = useRef(null);
  const history = useHistory(); //this is history object in container

  useEffect(() => {
    const {onParentNavigate} = mount(ref.current, {
      initialPath: history.location.pathname, //need to change marketing app to this as well it just happens to work because its home
      onNavigate: ({pathname: nextPathName}) => { 

        //prevent infinite loop of mfe's updating each other's urls by adding a check
        const {pathname} = history.location; //remember location object has a pathname property

        if (pathname !== nextPathName) { //if container path NOT EQ to marketing path

            history.push(nextPathName) //tells history to navigate to this new path from marketing
        }
    },

    // onSignIn: () => {  //pass this to auth/src/bootstrap
    //     console.log('signe id')
    // }

//collapse down to just this
 onSignIn
    });


    history.listen(onParentNavigate);
  }, []); //only run once (empty array)


  return <div ref={ref}></div>;
};
