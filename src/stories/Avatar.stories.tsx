import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Avatar,
  AvatarGroup,
  Badge,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import FolderIcon from '@mui/icons-material/Folder';
import { brandColors } from '../tokens';
import { semanticTokens } from '../tokens';

/**
 * # Avatar
 * 
 * Avatars represent people or entities. They can display images,
 * icons, or initials as fallbacks.
 * 
 * ## Types
 * - **Image Avatar**: Photo or custom image
 * - **Letter Avatar**: Initials when no image available
 * - **Icon Avatar**: Generic icon representation
 * 
 * ## Design Guidelines
 * - Use consistent sizing within a context
 * - Provide meaningful alt text for images
 * - Use letter avatars when images aren't available
 * - Consider using avatar groups for team displays
 */

interface AvatarDemoProps {
  variant?: 'basic' | 'sizes' | 'variants' | 'groups' | 'badges' | 'colors';
}

const AvatarDemo = ({ variant = 'basic' }: AvatarDemoProps) => {
  if (variant === 'sizes') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Avatar Sizes</Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Standard Sizes</Typography>
            <Stack direction="row" spacing={3} alignItems="center">
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ width: 24, height: 24 }}>S</Avatar>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>24px</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ width: 32, height: 32 }}>S</Avatar>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>32px</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>40px</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ width: 56, height: 56 }}>L</Avatar>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>56px</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ width: 80, height: 80 }}>XL</Avatar>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>80px</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar sx={{ width: 120, height: 120, fontSize: 48 }}>XXL</Avatar>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>120px</Typography>
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>In Context</Typography>
            <Stack direction="row" spacing={3}>
              {/* Comment style */}
              <Paper sx={{ p: 2, display: 'flex', gap: 2, maxWidth: 300 }}>
                <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>
                <Box>
                  <Typography variant="subtitle2">John Doe</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Left a comment on your report
                  </Typography>
                </Box>
              </Paper>

              {/* Profile card style */}
              <Paper sx={{ p: 3, textAlign: 'center', width: 200 }}>
                <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}>JD</Avatar>
                <Typography variant="h6">John Doe</Typography>
                <Typography variant="body2" color="text.secondary">Product Manager</Typography>
              </Paper>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'variants') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Avatar Variants</Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Shapes</Typography>
            <Stack direction="row" spacing={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar>AB</Avatar>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>Circular</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar variant="rounded">AB</Avatar>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>Rounded</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar variant="square">AB</Avatar>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>Square</Typography>
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>With Icons</Typography>
            <Stack direction="row" spacing={2}>
              <Avatar>
                <PersonIcon />
              </Avatar>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <WorkIcon />
              </Avatar>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <FolderIcon />
              </Avatar>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Image Avatars</Typography>
            <Stack direction="row" spacing={2}>
              <Avatar 
                alt="User 1"
                src="https://i.pravatar.cc/150?img=1"
              />
              <Avatar 
                alt="User 2"
                src="https://i.pravatar.cc/150?img=2"
              />
              <Avatar 
                alt="User 3"
                src="https://i.pravatar.cc/150?img=3"
              />
              <Avatar 
                alt="User 4"
                src="https://i.pravatar.cc/150?img=4"
              />
              <Avatar 
                alt="User 5"
                src="https://i.pravatar.cc/150?img=5"
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'groups') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Avatar Groups</Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Basic Group</Typography>
            <AvatarGroup max={4}>
              <Avatar alt="User 1" src="https://i.pravatar.cc/150?img=1" />
              <Avatar alt="User 2" src="https://i.pravatar.cc/150?img=2" />
              <Avatar alt="User 3" src="https://i.pravatar.cc/150?img=3" />
              <Avatar alt="User 4" src="https://i.pravatar.cc/150?img=4" />
              <Avatar alt="User 5" src="https://i.pravatar.cc/150?img=5" />
              <Avatar alt="User 6" src="https://i.pravatar.cc/150?img=6" />
            </AvatarGroup>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Letter Avatars Group</Typography>
            <AvatarGroup max={5}>
              <Avatar sx={{ bgcolor: brandColors.primary.main }}>JD</Avatar>
              <Avatar sx={{ bgcolor: brandColors.secondary.main }}>SM</Avatar>
              <Avatar sx={{ bgcolor: brandColors.primary.light }}>RK</Avatar>
              <Avatar sx={{ bgcolor: brandColors.secondary.light, color: 'black' }}>AL</Avatar>
              <Avatar sx={{ bgcolor: semanticTokens.colors.avatar.backgrounds[0] }}>PT</Avatar>
              <Avatar sx={{ bgcolor: semanticTokens.colors.status.success.text }}>MN</Avatar>
              <Avatar sx={{ bgcolor: semanticTokens.colors.status.warning.text }}>OP</Avatar>
            </AvatarGroup>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Different Sizes</Typography>
            <Stack direction="row" spacing={4} alignItems="center">
              <Box>
                <Typography variant="caption" display="block" sx={{ mb: 1 }}>Small</Typography>
                <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 12 } }}>
                  <Avatar>A</Avatar>
                  <Avatar>B</Avatar>
                  <Avatar>C</Avatar>
                  <Avatar>D</Avatar>
                </AvatarGroup>
              </Box>
              <Box>
                <Typography variant="caption" display="block" sx={{ mb: 1 }}>Medium</Typography>
                <AvatarGroup max={3}>
                  <Avatar>A</Avatar>
                  <Avatar>B</Avatar>
                  <Avatar>C</Avatar>
                  <Avatar>D</Avatar>
                </AvatarGroup>
              </Box>
              <Box>
                <Typography variant="caption" display="block" sx={{ mb: 1 }}>Large</Typography>
                <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 56, height: 56 } }}>
                  <Avatar>A</Avatar>
                  <Avatar>B</Avatar>
                  <Avatar>C</Avatar>
                  <Avatar>D</Avatar>
                </AvatarGroup>
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>In Context - Team Card</Typography>
            <Paper sx={{ p: 3, maxWidth: 350 }}>
              <Typography variant="subtitle1" gutterBottom>Project Team</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <AvatarGroup max={4}>
                  <Avatar alt="Alice" src="https://i.pravatar.cc/150?img=1" />
                  <Avatar alt="Bob" src="https://i.pravatar.cc/150?img=2" />
                  <Avatar alt="Charlie" src="https://i.pravatar.cc/150?img=3" />
                  <Avatar alt="David" src="https://i.pravatar.cc/150?img=4" />
                  <Avatar alt="Eve" src="https://i.pravatar.cc/150?img=5" />
                </AvatarGroup>
                <Typography variant="body2" color="text.secondary">
                  5 members
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'badges') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Avatars with Badges</Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Online Status</Typography>
            <Stack direction="row" spacing={3}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: semanticTokens.colors.avatar.online,
                    color: semanticTokens.colors.avatar.online,
                    boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
                    '&::after': {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      animation: 'ripple 1.2s infinite ease-in-out',
                      border: '1px solid currentColor',
                      content: '""',
                    },
                  },
                  '@keyframes ripple': {
                    '0%': { transform: 'scale(.8)', opacity: 1 },
                    '100%': { transform: 'scale(2.4)', opacity: 0 },
                  },
                }}
              >
                <Avatar alt="Online User" src="https://i.pravatar.cc/150?img=1" />
              </Badge>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: semanticTokens.colors.avatar.away,
                    boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
                  },
                }}
              >
                <Avatar alt="Away User" src="https://i.pravatar.cc/150?img=2" />
              </Badge>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: semanticTokens.colors.avatar.busy,
                    boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
                  },
                }}
              >
                <Avatar alt="Busy User" src="https://i.pravatar.cc/150?img=3" />
              </Badge>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: semanticTokens.colors.avatar.offline,
                    boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
                  },
                }}
              >
                <Avatar alt="Offline User" src="https://i.pravatar.cc/150?img=4" />
              </Badge>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Notification Badges</Typography>
            <Stack direction="row" spacing={3}>
              <Badge badgeContent={4} color="primary">
                <Avatar alt="User" src="https://i.pravatar.cc/150?img=5" />
              </Badge>
              <Badge badgeContent={99} color="secondary">
                <Avatar alt="User" src="https://i.pravatar.cc/150?img=6" />
              </Badge>
              <Badge badgeContent="99+" color="error">
                <Avatar alt="User" src="https://i.pravatar.cc/150?img=7" />
              </Badge>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Icon Badges</Typography>
            <Stack direction="row" spacing={3}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Avatar sx={{ width: 22, height: 22, border: '2px solid white', bgcolor: 'primary.main' }}>
                    <WorkIcon sx={{ fontSize: 12 }} />
                  </Avatar>
                }
              >
                <Avatar alt="Manager" src="https://i.pravatar.cc/150?img=8" sx={{ width: 56, height: 56 }} />
              </Badge>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }

  if (variant === 'colors') {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Avatar Colors</Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>Brand Colors</Typography>
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ bgcolor: brandColors.primary.main }}>JD</Avatar>
              <Avatar sx={{ bgcolor: brandColors.secondary.main }}>SM</Avatar>
              <Avatar sx={{ bgcolor: brandColors.primary.light }}>RK</Avatar>
              <Avatar sx={{ bgcolor: brandColors.secondary.light, color: 'black' }}>AL</Avatar>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Semantic Colors</Typography>
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ bgcolor: 'success.main' }}>✓</Avatar>
              <Avatar sx={{ bgcolor: 'warning.main', color: 'black' }}>!</Avatar>
              <Avatar sx={{ bgcolor: 'error.main' }}>×</Avatar>
              <Avatar sx={{ bgcolor: 'info.main' }}>i</Avatar>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Custom Palette</Typography>
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Using semantic avatar tokens from design system
            </Typography>
            <Stack direction="row" spacing={2}>
              {semanticTokens.colors.avatar.backgrounds.map((color, i) => (
                <Avatar key={color} sx={{ bgcolor: color }}>
                  {String.fromCharCode(65 + i)}
                </Avatar>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>Gradient Avatars</Typography>
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Using gradient tokens from design system
            </Typography>
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ background: semanticTokens.colors.gradients.primary }}>G1</Avatar>
              <Avatar sx={{ background: semanticTokens.colors.gradients.secondary }}>G2</Avatar>
              <Avatar sx={{ background: semanticTokens.colors.gradients.accent }}>G3</Avatar>
              <Avatar sx={{ background: semanticTokens.colors.gradients.avatarCool }}>G4</Avatar>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }

  // basic variant (default)
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>Basic Avatars</Typography>
      <Stack spacing={4}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>Image Avatars</Typography>
          <Stack direction="row" spacing={2}>
            <Avatar alt="John Doe" src="https://i.pravatar.cc/150?img=1" />
            <Avatar alt="Jane Smith" src="https://i.pravatar.cc/150?img=2" />
            <Avatar alt="Mike Johnson" src="https://i.pravatar.cc/150?img=3" />
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Letter Avatars</Typography>
          <Stack direction="row" spacing={2}>
            <Avatar>JD</Avatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>SM</Avatar>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>RK</Avatar>
            <Avatar sx={{ bgcolor: 'error.main' }}>AL</Avatar>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Icon Avatars</Typography>
          <Stack direction="row" spacing={2}>
            <Avatar>
              <PersonIcon />
            </Avatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <WorkIcon />
            </Avatar>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <FolderIcon />
            </Avatar>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>Fallback (broken image)</Typography>
          <Stack direction="row" spacing={2}>
            <Avatar alt="John Doe" src="/broken-image.jpg" />
            <Avatar alt="Jane Smith" src="/broken-image.jpg">JS</Avatar>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

const meta: Meta<typeof AvatarDemo> = {
  title: 'Data Display/Avatar',
  component: AvatarDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Avatars for representing users and entities.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['basic', 'sizes', 'variants', 'groups', 'badges', 'colors'],
      description: 'Avatar demo variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive Avatar playground - use Controls to customize.
 * Try changing the variant shape and content.
 */
export const Playground: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['circular', 'rounded', 'square'],
      description: 'Avatar shape variant',
    },
    children: {
      control: 'text',
      description: 'Avatar content (initials)',
    },
  },
  render: (args: { variant?: 'circular' | 'rounded' | 'square'; children?: string }) => (
    <Stack direction="row" spacing={2} sx={{ p: 4 }}>
      <Avatar variant={args.variant}>{args.children}</Avatar>
      <Avatar variant={args.variant} sx={{ bgcolor: brandColors.primary.main }}>{args.children}</Avatar>
      <Avatar variant={args.variant} sx={{ bgcolor: brandColors.secondary.main }}>{args.children}</Avatar>
    </Stack>
  ),
  args: {
    variant: 'circular',
    children: 'AB',
  },
};

/**
 * Basic avatar usage.
 */
export const Basic: Story = {
  args: {
    variant: 'basic',
  },
};

/**
 * Different avatar sizes.
 */
export const Sizes: Story = {
  args: {
    variant: 'sizes',
  },
};

/**
 * Avatar shape variants.
 */
export const Variants: Story = {
  args: {
    variant: 'variants',
  },
};

/**
 * Avatar groups for teams.
 */
export const Groups: Story = {
  args: {
    variant: 'groups',
  },
};

/**
 * Avatars with status badges.
 */
export const Badges: Story = {
  args: {
    variant: 'badges',
  },
};

/**
 * Avatar color options.
 */
export const Colors: Story = {
  args: {
    variant: 'colors',
  },
};
