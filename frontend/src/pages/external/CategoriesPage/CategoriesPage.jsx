import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, ButtonBase, Typography, styled } from "@mui/material";
import './categories_page.scss';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  borderRadius: '10px',
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
  borderRadius: '10px',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  borderRadius: '10px',
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
  borderRadius: '10px',
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));


export const CategoriesPage = () => {

  const navigate = useNavigate();

  //? Cleanup effect to reset scroll position when component unmounts
  useEffect(() => {
    return () => {
      window.scroll({ top: 0, behavior: 'auto' });
    };
  }, []);
 
  return (
    <div className="categories_page">

       <div className="categories_page__sector1">

        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '25%' }}>
          {
            <ImageButton
              focusRipple
              key={"image1"}
              style={{
                width: '100%',
                height: 300
              }}
              onClick={() => navigate("/category?type=SEISMIC_ACTIVITY")}
            >
              <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/seismic_activity.jpg)` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  Сеизмична активност
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          }
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '25%' }}>
          {
            <ImageButton
              focusRipple
              key={"image2"}
              style={{
                width: '100%',
                height: 300
              }}
            >
              <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/road_conditions.jpg)` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  Пътни условия
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          }
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '25%' }}>
          {
            <ImageButton
              focusRipple
              key={"image3"}
              style={{
                width: '100%',
                height: 300
              }}
            >
              <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/public_conditions.jpg)` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  Обществени условия
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          }
        </Box>

       </div>

     

       <div className="categories_page__sector2">

        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '25%' }}>
          {
            <ImageButton
              focusRipple
              key={"image4"}
              style={{
                width: '100%',
                height: 300
              }}
            >
              <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/meteorological_conditions.jpg)` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  Метеорологични условия
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          }
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '25%' }}>
          {
            <ImageButton
              focusRipple
              key={"image5"}
              style={{
                width: '100%',
                height: 300
              }}
              onClick={() => navigate("/category?type=SPACE_PHENOMENON")}
            >
              <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/space_phenomenon.jpg)` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  Космическо явление
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          }
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '25%' }}>
          {
            <ImageButton
              focusRipple
              key={"image6"}
              style={{
                width: '100%',
                height: 300
              }}
              onClick={() => navigate("/category?type=MILITARY_CONDITIONS")}
            >
              <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/military_conditions.jpg)` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  Военни условия
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          }
        </Box>

       </div>

    </div>
  );
};