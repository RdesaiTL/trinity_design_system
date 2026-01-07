import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SxProps, Theme, Box } from '@mui/material';

// Material Icons - Static imports
import Home from '@mui/icons-material/Home';
import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MoreVert from '@mui/icons-material/MoreVert';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/Save';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import ContentCut from '@mui/icons-material/ContentCut';
import Undo from '@mui/icons-material/Undo';
import Redo from '@mui/icons-material/Redo';
import Refresh from '@mui/icons-material/Refresh';
import Download from '@mui/icons-material/Download';
import Upload from '@mui/icons-material/Upload';
import Share from '@mui/icons-material/Share';
import Print from '@mui/icons-material/Print';
import FilterList from '@mui/icons-material/FilterList';
import Sort from '@mui/icons-material/Sort';
import Search from '@mui/icons-material/Search';
import ZoomIn from '@mui/icons-material/ZoomIn';
import ZoomOut from '@mui/icons-material/ZoomOut';
import Check from '@mui/icons-material/Check';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Error from '@mui/icons-material/Error';
import Warning from '@mui/icons-material/Warning';
import Info from '@mui/icons-material/Info';
import Help from '@mui/icons-material/Help';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import Chat from '@mui/icons-material/Chat';
import Send from '@mui/icons-material/Send';
import Notifications from '@mui/icons-material/Notifications';
import NotificationsOff from '@mui/icons-material/NotificationsOff';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import Folder from '@mui/icons-material/Folder';
import FolderOpen from '@mui/icons-material/FolderOpen';
import Image from '@mui/icons-material/Image';
import VideoLibrary from '@mui/icons-material/VideoLibrary';
import Audiotrack from '@mui/icons-material/Audiotrack';
import Description from '@mui/icons-material/Description';
import Link from '@mui/icons-material/Link';
import AttachFile from '@mui/icons-material/AttachFile';
import Person from '@mui/icons-material/Person';
import Group from '@mui/icons-material/Group';
import PersonAdd from '@mui/icons-material/PersonAdd';
import PersonRemove from '@mui/icons-material/PersonRemove';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import Key from '@mui/icons-material/Key';
import BarChart from '@mui/icons-material/BarChart';
import PieChart from '@mui/icons-material/PieChart';
import ShowChart from '@mui/icons-material/ShowChart';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingDown from '@mui/icons-material/TrendingDown';
import Storage from '@mui/icons-material/Storage';
import TableChart from '@mui/icons-material/TableChart';
import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Bookmark from '@mui/icons-material/Bookmark';
import Flag from '@mui/icons-material/Flag';
import LocalOffer from '@mui/icons-material/LocalOffer';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Schedule from '@mui/icons-material/Schedule';
import LocationOn from '@mui/icons-material/LocationOn';
import Language from '@mui/icons-material/Language';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GridView from '@mui/icons-material/GridView';
import ViewList from '@mui/icons-material/ViewList';
import ViewColumn from '@mui/icons-material/ViewColumn';
import Fullscreen from '@mui/icons-material/Fullscreen';
import FullscreenExit from '@mui/icons-material/FullscreenExit';
import ViewSidebar from '@mui/icons-material/ViewSidebar';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause';
import Stop from '@mui/icons-material/Stop';
import SkipNext from '@mui/icons-material/SkipNext';
import SkipPrevious from '@mui/icons-material/SkipPrevious';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOff from '@mui/icons-material/VolumeOff';
import Code from '@mui/icons-material/Code';
import Terminal from '@mui/icons-material/Terminal';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Cloud from '@mui/icons-material/Cloud';
import CloudUpload from '@mui/icons-material/CloudUpload';
import CloudDownload from '@mui/icons-material/CloudDownload';
import Wifi from '@mui/icons-material/Wifi';
import WifiOff from '@mui/icons-material/WifiOff';
import Battery90 from '@mui/icons-material/Battery90';
import PowerSettingsNew from '@mui/icons-material/PowerSettingsNew';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import FlashOn from '@mui/icons-material/FlashOn';
import CardGiftcard from '@mui/icons-material/CardGiftcard';
import LocalShipping from '@mui/icons-material/LocalShipping';
import Inventory from '@mui/icons-material/Inventory';
import Layers from '@mui/icons-material/Layers';
import Security from '@mui/icons-material/Security';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import Timeline from '@mui/icons-material/Timeline';

// Feather Icons - Static imports
import {
  Home as FeatherHome,
  Menu as FeatherMenu,
  X as FeatherX,
  ArrowLeft as FeatherArrowLeft,
  ArrowRight as FeatherArrowRight,
  ArrowUp as FeatherArrowUp,
  ArrowDown as FeatherArrowDown,
  ChevronLeft as FeatherChevronLeft,
  ChevronRight as FeatherChevronRight,
  ChevronUp as FeatherChevronUp,
  ChevronDown as FeatherChevronDown,
  MoreVertical as FeatherMoreVertical,
  MoreHorizontal as FeatherMoreHorizontal,
  Plus as FeatherPlus,
  Minus as FeatherMinus,
  Edit2 as FeatherEdit2,
  Trash2 as FeatherTrash2,
  Save as FeatherSave,
  Copy as FeatherCopy,
  Clipboard as FeatherClipboard,
  Scissors as FeatherScissors,
  RotateCcw as FeatherRotateCcw,
  RotateCw as FeatherRotateCw,
  RefreshCw as FeatherRefreshCw,
  Download as FeatherDownload,
  Upload as FeatherUpload,
  Share2 as FeatherShare2,
  Printer as FeatherPrinter,
  Filter as FeatherFilter,
  Search as FeatherSearch,
  ZoomIn as FeatherZoomIn,
  ZoomOut as FeatherZoomOut,
  Check as FeatherCheck,
  CheckCircle as FeatherCheckCircle,
  AlertCircle as FeatherAlertCircle,
  AlertTriangle as FeatherAlertTriangle,
  Info as FeatherInfo,
  HelpCircle as FeatherHelpCircle,
  Mail as FeatherMail,
  Phone as FeatherPhone,
  MessageSquare as FeatherMessageSquare,
  Send as FeatherSend,
  Bell as FeatherBell,
  BellOff as FeatherBellOff,
  File as FeatherFile,
  Folder as FeatherFolder,
  FolderPlus as FeatherFolderPlus,
  Image as FeatherImage,
  Video as FeatherVideo,
  Music as FeatherMusic,
  FileText as FeatherFileText,
  Link as FeatherLink,
  Paperclip as FeatherPaperclip,
  User as FeatherUser,
  Users as FeatherUsers,
  UserPlus as FeatherUserPlus,
  UserMinus as FeatherUserMinus,
  Settings as FeatherSettings,
  LogOut as FeatherLogOut,
  LogIn as FeatherLogIn,
  Lock as FeatherLock,
  Unlock as FeatherUnlock,
  Key as FeatherKey,
  BarChart2 as FeatherBarChart2,
  PieChart as FeatherPieChart,
  TrendingUp as FeatherTrendingUp,
  TrendingDown as FeatherTrendingDown,
  Database as FeatherDatabase,
  Grid as FeatherGrid,
  Star as FeatherStar,
  Heart as FeatherHeart,
  Bookmark as FeatherBookmark,
  Flag as FeatherFlag,
  Tag as FeatherTag,
  Calendar as FeatherCalendar,
  Clock as FeatherClock,
  MapPin as FeatherMapPin,
  Globe as FeatherGlobe,
  Eye as FeatherEye,
  EyeOff as FeatherEyeOff,
  List as FeatherList,
  Columns as FeatherColumns,
  Maximize as FeatherMaximize,
  Minimize as FeatherMinimize,
  Sidebar as FeatherSidebar,
  Play as FeatherPlay,
  Pause as FeatherPause,
  Square as FeatherSquare,
  SkipForward as FeatherSkipForward,
  SkipBack as FeatherSkipBack,
  Volume2 as FeatherVolume2,
  VolumeX as FeatherVolumeX,
  Code as FeatherCode,
  Terminal as FeatherTerminal,
  ExternalLink as FeatherExternalLink,
  Cloud as FeatherCloud,
  UploadCloud as FeatherUploadCloud,
  DownloadCloud as FeatherDownloadCloud,
  Wifi as FeatherWifi,
  WifiOff as FeatherWifiOff,
  Battery as FeatherBattery,
  Power as FeatherPower,
  Sun as FeatherSun,
  Moon as FeatherMoon,
  Zap as FeatherZap,
  Gift as FeatherGift,
  Package as FeatherPackage,
  Box as FeatherBox,
  Layers as FeatherLayers,
  Shield as FeatherShield,
  Award as FeatherAward,
  Activity as FeatherActivity,
} from 'react-feather';

// ============================================
// ICON LIBRARY TYPES
// ============================================

export type IconLibrary = 'material' | 'feather';

export type IconSize = 'xs' | 'small' | 'medium' | 'large' | 'xl';

export interface IconContextType {
  library: IconLibrary;
  setLibrary: (library: IconLibrary) => void;
}

export interface TrinityIconProps {
  /** Icon name - use the same name across libraries when possible */
  name: string;
  /** Size of the icon */
  size?: IconSize;
  /** Override the default library from context */
  library?: IconLibrary;
  /** Custom color - can use theme colors or hex */
  color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error' | string;
  /** Custom styles */
  sx?: SxProps<Theme>;
  /** Additional class name */
  className?: string;
}

// ============================================
// ICON SIZE MAPPING
// ============================================

export const iconSizeMap: Record<IconSize, number> = {
  xs: 16,
  small: 20,
  medium: 24,
  large: 32,
  xl: 48,
};

// ============================================
// MATERIAL ICONS MAP
// ============================================

const materialIconsMap: Record<string, React.ComponentType<{ sx?: SxProps<Theme>; className?: string }>> = {
  'home': Home,
  'menu': Menu,
  'close': Close,
  'back': ArrowBack,
  'forward': ArrowForward,
  'up': ArrowUpward,
  'down': ArrowDownward,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ExpandLess,
  'chevron-down': ExpandMore,
  'more-vertical': MoreVert,
  'more-horizontal': MoreHoriz,
  'add': Add,
  'remove': Remove,
  'edit': Edit,
  'delete': Delete,
  'save': Save,
  'copy': ContentCopy,
  'paste': ContentPaste,
  'cut': ContentCut,
  'undo': Undo,
  'redo': Redo,
  'refresh': Refresh,
  'download': Download,
  'upload': Upload,
  'share': Share,
  'print': Print,
  'filter': FilterList,
  'sort': Sort,
  'search': Search,
  'zoom-in': ZoomIn,
  'zoom-out': ZoomOut,
  'check': Check,
  'check-circle': CheckCircle,
  'error': Error,
  'warning': Warning,
  'info': Info,
  'help': Help,
  'success': CheckCircle,
  'email': Email,
  'phone': Phone,
  'chat': Chat,
  'send': Send,
  'notification': Notifications,
  'notification-off': NotificationsOff,
  'file': InsertDriveFile,
  'folder': Folder,
  'folder-open': FolderOpen,
  'image': Image,
  'video': VideoLibrary,
  'audio': Audiotrack,
  'document': Description,
  'link': Link,
  'attachment': AttachFile,
  'user': Person,
  'users': Group,
  'user-add': PersonAdd,
  'user-remove': PersonRemove,
  'settings': Settings,
  'logout': Logout,
  'login': Login,
  'lock': Lock,
  'unlock': LockOpen,
  'key': Key,
  'chart': BarChart,
  'pie-chart': PieChart,
  'line-chart': ShowChart,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  'database': Storage,
  'table': TableChart,
  'star': Star,
  'star-outline': StarBorder,
  'heart': Favorite,
  'heart-outline': FavoriteBorder,
  'bookmark': Bookmark,
  'flag': Flag,
  'tag': LocalOffer,
  'calendar': CalendarToday,
  'clock': Schedule,
  'location': LocationOn,
  'globe': Language,
  'eye': Visibility,
  'eye-off': VisibilityOff,
  'grid': GridView,
  'list': ViewList,
  'columns': ViewColumn,
  'maximize': Fullscreen,
  'minimize': FullscreenExit,
  'sidebar': ViewSidebar,
  'play': PlayArrow,
  'pause': Pause,
  'stop': Stop,
  'skip-forward': SkipNext,
  'skip-back': SkipPrevious,
  'volume': VolumeUp,
  'volume-off': VolumeOff,
  'code': Code,
  'terminal': Terminal,
  'external-link': OpenInNew,
  'cloud': Cloud,
  'cloud-upload': CloudUpload,
  'cloud-download': CloudDownload,
  'wifi': Wifi,
  'wifi-off': WifiOff,
  'battery': Battery90,
  'power': PowerSettingsNew,
  'sun': LightMode,
  'moon': DarkMode,
  'zap': FlashOn,
  'gift': CardGiftcard,
  'package': LocalShipping,
  'box': Inventory,
  'layers': Layers,
  'shield': Security,
  'award': EmojiEvents,
  'activity': Timeline,
};

// ============================================
// FEATHER ICONS MAP
// ============================================

const featherIconsMap: Record<string, React.ComponentType<{ size?: number; color?: string; className?: string }>> = {
  'home': FeatherHome,
  'menu': FeatherMenu,
  'close': FeatherX,
  'back': FeatherArrowLeft,
  'forward': FeatherArrowRight,
  'up': FeatherArrowUp,
  'down': FeatherArrowDown,
  'chevron-left': FeatherChevronLeft,
  'chevron-right': FeatherChevronRight,
  'chevron-up': FeatherChevronUp,
  'chevron-down': FeatherChevronDown,
  'more-vertical': FeatherMoreVertical,
  'more-horizontal': FeatherMoreHorizontal,
  'add': FeatherPlus,
  'remove': FeatherMinus,
  'edit': FeatherEdit2,
  'delete': FeatherTrash2,
  'save': FeatherSave,
  'copy': FeatherCopy,
  'paste': FeatherClipboard,
  'cut': FeatherScissors,
  'undo': FeatherRotateCcw,
  'redo': FeatherRotateCw,
  'refresh': FeatherRefreshCw,
  'download': FeatherDownload,
  'upload': FeatherUpload,
  'share': FeatherShare2,
  'print': FeatherPrinter,
  'filter': FeatherFilter,
  'sort': FeatherArrowUp, // No direct equivalent, using ArrowUp
  'search': FeatherSearch,
  'zoom-in': FeatherZoomIn,
  'zoom-out': FeatherZoomOut,
  'check': FeatherCheck,
  'check-circle': FeatherCheckCircle,
  'error': FeatherAlertCircle,
  'warning': FeatherAlertTriangle,
  'info': FeatherInfo,
  'help': FeatherHelpCircle,
  'success': FeatherCheckCircle,
  'email': FeatherMail,
  'phone': FeatherPhone,
  'chat': FeatherMessageSquare,
  'send': FeatherSend,
  'notification': FeatherBell,
  'notification-off': FeatherBellOff,
  'file': FeatherFile,
  'folder': FeatherFolder,
  'folder-open': FeatherFolderPlus,
  'image': FeatherImage,
  'video': FeatherVideo,
  'audio': FeatherMusic,
  'document': FeatherFileText,
  'link': FeatherLink,
  'attachment': FeatherPaperclip,
  'user': FeatherUser,
  'users': FeatherUsers,
  'user-add': FeatherUserPlus,
  'user-remove': FeatherUserMinus,
  'settings': FeatherSettings,
  'logout': FeatherLogOut,
  'login': FeatherLogIn,
  'lock': FeatherLock,
  'unlock': FeatherUnlock,
  'key': FeatherKey,
  'chart': FeatherBarChart2,
  'pie-chart': FeatherPieChart,
  'line-chart': FeatherTrendingUp,
  'trending-up': FeatherTrendingUp,
  'trending-down': FeatherTrendingDown,
  'database': FeatherDatabase,
  'table': FeatherGrid,
  'star': FeatherStar,
  'star-outline': FeatherStar,
  'heart': FeatherHeart,
  'heart-outline': FeatherHeart,
  'bookmark': FeatherBookmark,
  'flag': FeatherFlag,
  'tag': FeatherTag,
  'calendar': FeatherCalendar,
  'clock': FeatherClock,
  'location': FeatherMapPin,
  'globe': FeatherGlobe,
  'eye': FeatherEye,
  'eye-off': FeatherEyeOff,
  'grid': FeatherGrid,
  'list': FeatherList,
  'columns': FeatherColumns,
  'maximize': FeatherMaximize,
  'minimize': FeatherMinimize,
  'sidebar': FeatherSidebar,
  'play': FeatherPlay,
  'pause': FeatherPause,
  'stop': FeatherSquare,
  'skip-forward': FeatherSkipForward,
  'skip-back': FeatherSkipBack,
  'volume': FeatherVolume2,
  'volume-off': FeatherVolumeX,
  'code': FeatherCode,
  'terminal': FeatherTerminal,
  'external-link': FeatherExternalLink,
  'cloud': FeatherCloud,
  'cloud-upload': FeatherUploadCloud,
  'cloud-download': FeatherDownloadCloud,
  'wifi': FeatherWifi,
  'wifi-off': FeatherWifiOff,
  'battery': FeatherBattery,
  'power': FeatherPower,
  'sun': FeatherSun,
  'moon': FeatherMoon,
  'zap': FeatherZap,
  'gift': FeatherGift,
  'package': FeatherPackage,
  'box': FeatherBox,
  'layers': FeatherLayers,
  'shield': FeatherShield,
  'award': FeatherAward,
  'activity': FeatherActivity,
};

// For backwards compatibility - export iconNameMap
export const iconNameMap = Object.keys(materialIconsMap).reduce((acc, key) => {
  acc[key] = { material: key, feather: key };
  return acc;
}, {} as Record<string, { material: string; feather: string }>);

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get all available icon names
 */
export const getAvailableIcons = (): string[] => Object.keys(materialIconsMap);

/**
 * Check if an icon name is available
 */
export const hasIcon = (name: string): boolean => name in materialIconsMap;

/**
 * Get the library-specific icon name
 */
export const getIconName = (name: string, library: IconLibrary): string | null => {
  const map = library === 'material' ? materialIconsMap : featherIconsMap;
  return name in map ? name : null;
};

// ============================================
// ICON CONTEXT
// ============================================

const IconContext = createContext<IconContextType | undefined>(undefined);

export const useIconLibrary = (): IconContextType => {
  const context = useContext(IconContext);
  if (!context) {
    return {
      library: 'material',
      setLibrary: () => console.warn('IconProvider not found. Wrap your app with <IconProvider>'),
    };
  }
  return context;
};

// ============================================
// ICON PROVIDER
// ============================================

interface IconProviderProps {
  children: ReactNode;
  defaultLibrary?: IconLibrary;
}

export const IconProvider: React.FC<IconProviderProps> = ({ 
  children, 
  defaultLibrary = 'material' 
}) => {
  const [library, setLibrary] = useState<IconLibrary>(defaultLibrary);

  return (
    <IconContext.Provider value={{ library, setLibrary }}>
      {children}
    </IconContext.Provider>
  );
};

// ============================================
// ICON COMPONENT
// ============================================

export const Icon: React.FC<TrinityIconProps> = ({
  name,
  size = 'medium',
  library: libraryProp,
  color = 'inherit',
  sx,
  className,
}) => {
  const { library: contextLibrary } = useIconLibrary();
  const activeLibrary = libraryProp || contextLibrary;
  
  const pixelSize = iconSizeMap[size];
  
  // Helper to get color value for MUI
  const getColorValue = () => {
    if (color === 'inherit') return 'inherit';
    if (color === 'primary') return 'primary.main';
    if (color === 'secondary') return 'secondary.main';
    if (color === 'action') return 'action.active';
    if (color === 'disabled') return 'action.disabled';
    if (color === 'error') return 'error.main';
    return color;
  };

  if (activeLibrary === 'feather') {
    const FeatherIcon = featherIconsMap[name];
    
    if (!FeatherIcon) {
      console.warn(`Feather icon "${name}" not found`);
      return null;
    }

    // For Feather icons, handle color differently
    const featherColor = color === 'inherit' ? 'currentColor' : 
      color.startsWith('#') || color.startsWith('rgb') ? color : undefined;

    return (
      <Box
        component="span"
        className={className}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: pixelSize,
          height: pixelSize,
          color: !featherColor ? getColorValue() : undefined,
          ...sx,
        }}
      >
        <FeatherIcon 
          size={pixelSize} 
          color={featherColor}
        />
      </Box>
    );
  }

  // Material Icons
  const MuiIcon = materialIconsMap[name];

  if (!MuiIcon) {
    console.warn(`Material icon "${name}" not found`);
    return null;
  }

  return (
    <MuiIcon
      className={className}
      sx={{
        fontSize: pixelSize,
        color: getColorValue(),
        ...sx,
      }}
    />
  );
};

// ============================================
// ICON LIBRARY SWITCHER COMPONENT
// ============================================

import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

interface IconLibrarySwitcherProps {
  showLabel?: boolean;
}

export const IconLibrarySwitcher: React.FC<IconLibrarySwitcherProps> = ({ 
  showLabel = true 
}) => {
  const { library, setLibrary } = useIconLibrary();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {showLabel && (
        <Typography variant="body2" color="text.secondary">
          Icon Library:
        </Typography>
      )}
      <ToggleButtonGroup
        value={library}
        exclusive
        onChange={(_, newLibrary: IconLibrary | null) => {
          if (newLibrary) setLibrary(newLibrary);
        }}
        size="small"
      >
        <ToggleButton value="material">
          <Icon name="layers" size="small" library="material" />
          <Typography variant="caption" sx={{ ml: 0.5 }}>Material</Typography>
        </ToggleButton>
        <ToggleButton value="feather">
          <Icon name="layers" size="small" library="feather" />
          <Typography variant="caption" sx={{ ml: 0.5 }}>Feather</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Icon;
