import { mount } from "marketing/MarketingApp"; //from marketing webpackfederation plugin
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom"; //need access to history object inside container

export default () => {
  const ref = useRef(null);
  const history = useHistory(); //this is history object in container

  useEffect(() => {
    //make sure mount runs this function only once!
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathName }) => {
        //listen funtion in marketing that calls this, has an object called "location" that has a pathname field. we destructred pathname and renaming with colon

        //prevent infinite loop of mfe's updating each other's urls by adding a check
        const { pathname } = history.location; //remember location object has a pathname property

        if (pathname !== nextPathName) {
          //if container path NOT EQ to marketing path

          history.push(nextPathName); //tells history to navigate to this new path from marketing
        }
      },
    });

    history.listen(onParentNavigate);
  }, []); //only run once (empty array)

  return <div ref={ref}></div>;
};
