import { useEffect, useRef, useState} from 'react';
import './home_page.scss';
import '/src/assets/scripts/bgMap/map.css';
//import { useUserContext } from "../../../hooks/useUserContext";

//! because of React.Strict mode a null message is printed for the map useRef because the strcit Mode logs 2 times, and the 1st time is too soon maybe
export const HomePage = () => {
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);
  // const { authenticatedUser } = useUserContext();
  // const [selectedZone, setSelectedZone] = useState("no-choice");

  useEffect(() => {

      // Capture the current value of mapContainerRef at the time of effect execution
      const currentMapContainer = mapContainerRef.current;

    // Helper function to dynamically load scripts
    const loadScript = (scriptPath) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${scriptPath}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = scriptPath;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  Function to initialize the map
    // const initMap = () => {
    //   if (window.FlaMap && mapContainerRef.current) {
    //     mapInstance.current = new window.FlaMap(window.map_cfg);
    //     // Use the drawOnDomReady method with a callback
    //     mapInstance.current.drawOnDomReady(mapContainerRef.current.id, function() {
    //       // After map is drawn, bind the hover events
    //       // Object.keys(window.map_cfg.map_data).forEach(regionKey => {
    //       //   const regionData = window.map_cfg.map_data[regionKey];
    //       //   mapInstance.current.on('mouseover', regionKey, function() {
    //       //     mapInstance.current.setFillColor(regionKey, regionData.color_map_over);
    //       //   });
    //       //   mapInstance.current.on('mouseout', regionKey, function() {
    //       //     mapInstance.current.setFillColor(regionKey, regionData.color_map);
    //       //   });
    //       // });

          
    //       console.log("BG map drawn");
    //       console.log(mapInstance.current);

    //       // Assuming you have an ID for the element you want to change on hover
    //       const elementId = 'st3'; // Replace with your actual element ID

    //     // Hover in function
    //        const handleMouseOver = (e, id) => {
    //        mapInstance.current.setFillColor(id, '#009F58'); // Replace with the color you want
    //     };
    
    //     // Hover out function
    //        const handleMouseOut = (e, id) => {
    //        mapInstance.current.setFillColor(id, '#E50000'); // Replace with the original color
    //     };
    
    //     // Bind the hover events
    //        mapInstance.current.on('mouseover', elementId, handleMouseOver);
    //        mapInstance.current.on('mouseout', elementId, handleMouseOut);


    //     });
    //   }
    // };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    

    

  // Function to initialize the map
  const initMap = () => {

    if (!mapInstance.current && window.FlaMap && mapContainerRef.current) {
      mapInstance.current = new window.FlaMap(window.map_cfg);
      mapInstance.current.draw(mapContainerRef.current.id);
    }



    //********************************************************************************************************************** */
    console.log("bgMap:",mapInstance.current);
    // mapInstance.current.setColor(authenticatedUser.availableZoneIds, 'blue');
    // mapInstance.current.setColorOver(authenticatedUser.availableZoneIds, 'DarkBlue');
    


    
    //! console.log(mapInstance.current.fetchStateAttr('st3', 'color_map')); fetch names but cannot fetch color

          // Assuming you have an ID for the element you want to change on hover
           //const elementId = 'st3'; // Replace with your actual element ID

          // const event = 'mousedown';
          // mapInstance.current.on(event, (event, elementId, map) => {
          //   if(elementId === 'st3') {
          //     handleClick(event, elementId);
          //     //!setSelectedZone('st3');
              
          //   }
          //   if(elementId === 'st4'){
          //     handleClick(event, elementId);
          //     //!setSelectedZone('st4');
          //   }
          // });

          // const handleClick = (event, id) => {
          //   //mapInstance.current.setColor(id, '#E50000'); // Set the color to red
          //   mapInstance.current.setColorOver(id,'blue')
          //   mapInstance.current.setColor(id,'blue')
          // };
          // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // const event1 = 'mouseup';
          // mapInstance.current.on(event1, (event1, elementId, map) => {
          //   if(elementId === 'st3') {
          //     handleOut(event1, elementId);
          //   }
          // });

          // const handleOut = (e, id) => {
          //  // mapInstance.current.setColorOver(id, '#366CA3'); // Set the color to red
          // };
          // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // const event2 = 'mouseout';
          // mapInstance.current.on(event2, (event2, elementId, map) => {
          //   if(elementId === 'st3') {
          //     handleOutt(event2, elementId);
          //   }
          // });

          // const handleOutt = (e, id) => {
          //   mapInstance.current.setColorOver(id, '#366CA3'); // Set the color to red
          // };
         //********************************************************************************************************************** */

          //???????????????????????????????????????????
          //! Disable hover effect on mobile the color of each zone must be the same as the normal color
          //! must be applied to all zones probably in a loop, but only for the open website, not the CMS
          // const matchMedia = window.matchMedia('(pointer: coarse)');
          // if(matchMedia.matches) {
          //   mapInstance.current.setColorOver('st3','#7798bb')
          // }
          //????????????????????????????????????????????

  };


    // Load the necessary scripts and initialize the map
    Promise.all([
      loadScript('/src/assets/scripts/bgMap/raphael.min.js'),
      loadScript('/src/assets/scripts/bgMap/settings.js'),
      loadScript('/src/assets/scripts/bgMap/paths.js'),
      loadScript('/src/assets/scripts/bgMap/map.js')
    ]).then(initMap)
      .catch(console.error) //? here in the catch I should return <PageLoader>, because if not the page will stay blank. If there is error with loading the scripts I must just reload the page where I will be using this
      //!!!!!!!!!!!!!!!!!!!!!!this whole thing related to the map must be extracted to a separate jsx component!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

 
    

    // Clean up the map instance on component unmount
    return () => {
      if (currentMapContainer) {
         // Remove the map container's content on cleanup
      currentMapContainer.innerHTML = '';
      }
      mapInstance.current = null;

      // if(mapInstance.current){
      //   mapInstance.current.destroy();
      // }
    };

  }, []);

  return (
    <div className="home_page">
      <div className="home_page__container">
      <div ref={mapContainerRef} id="map-container"></div>
      </div>
    </div>
  );
};
