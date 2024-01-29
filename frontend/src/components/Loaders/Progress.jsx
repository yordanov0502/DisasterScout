import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

export const Progress = () => {
  //? disableShrink property of CircularProgress is used for optimal animation performance on eventual heavy load
  return (
    <Box
      sx={{
        position: "fixed", // The position: 'fixed' style removes the Box from the normal document flow. This means it won't affect the layout of other elements since it's positioned in relation to the viewport, not the document flow.
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        // zIndex: 1200,  the z-index property is only necessary when there's a need to control the stacking order of multiple elements that overlap.
      }}
    >
      <Box sx={{ height: 40 }}>
        <Fade
          in={true}
          style={{
            transitionDelay: "800ms",
          }}
          unmountOnExit
        >
          <CircularProgress disableShrink color="success" />
        </Fade>
      </Box>
    </Box>
  );
};
