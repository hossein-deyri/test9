import { Theme, useMediaQuery } from '@mui/material';

const useBreakpoints = () => {
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.up('xs'));
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const isXl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));
  const isXxl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xxl'));

  return { isXxl, isXl, isLg, isMd, isSm, isXs };
};

export default useBreakpoints;
