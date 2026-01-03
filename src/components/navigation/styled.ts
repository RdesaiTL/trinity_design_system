/**
 * Navigation - Styled Components
 * Shared styled components for navigation
 */

import { styled, alpha } from '@mui/material/styles';
import { Button, IconButton, InputBase, Box } from '@mui/material';
import { brandColors } from '../../tokens';

// ============================================================================
// SEARCH COMPONENTS
// ============================================================================

export const Search = styled('div')<{ focused?: string }>(({ theme, focused }) => ({
  position: 'relative',
  borderRadius: 12,
  backgroundColor: focused === 'true' ? theme.palette.common.white : alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: focused === 'true' ? theme.palette.common.white : alpha(theme.palette.common.white, 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  maxWidth: 400,
  transition: theme.transitions.create(['background-color']),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    minWidth: 300,
  },
}));

export const SearchIconWrapper = styled('div')<{ focused?: string }>(({ theme, focused }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: focused === 'true' ? brandColors.primary.main : alpha(theme.palette.common.white, 0.5),
}));

export const StyledInputBase = styled(InputBase)<{ focused?: string }>(({ theme, focused }) => ({
  color: focused === 'true' ? brandColors.primary.main : 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 4, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: 14,
    '&::placeholder': {
      color: focused === 'true' ? brandColors.neutral.gray500 : alpha(theme.palette.common.white, 0.5),
      opacity: 1,
    },
  },
}));

export const ClearButton = styled(IconButton)<{ show?: string }>(({ show }) => ({
  position: 'absolute',
  right: 4,
  top: '50%',
  transform: 'translateY(-50%)',
  padding: 4,
  opacity: show === 'true' ? 1 : 0,
  pointerEvents: show === 'true' ? 'auto' : 'none',
  color: brandColors.neutral.gray500,
  '&:hover': {
    backgroundColor: alpha(brandColors.neutral.gray500, 0.1),
  },
}));

// ============================================================================
// SELECTOR COMPONENTS
// ============================================================================

export const ClientSelector = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  color: theme.palette.common.white,
  borderRadius: 12,
  padding: '6px 12px',
  textTransform: 'none',
  fontSize: 14,
  fontWeight: 400,
  minWidth: 180,
  justifyContent: 'space-between',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
}));

// ============================================================================
// ICON BUTTON VARIANTS
// ============================================================================

export const HeaderIconButton = styled(IconButton)(({ theme }) => ({
  color: alpha(theme.palette.common.white, 0.7),
  padding: 8,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    color: theme.palette.common.white,
  },
}));

// ============================================================================
// LOGO WRAPPER
// ============================================================================

export const LogoWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});
