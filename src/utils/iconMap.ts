import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import PregnantWomanOutlinedIcon from "@mui/icons-material/PregnantWomanOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import type { SvgIconComponent } from "@mui/icons-material";

const iconMap: Record<string, SvgIconComponent> = {
  groups: GroupsOutlinedIcon,
  apartment: ApartmentOutlinedIcon,
  menu_book: MenuBookOutlinedIcon,
  school: SchoolOutlinedIcon,
  support_agent: SupportAgentOutlinedIcon,
  description: DescriptionOutlinedIcon,
  how_to_reg: HowToRegOutlinedIcon,
  favorite: FavoriteBorderOutlinedIcon,
  child_care: ChildCareOutlinedIcon,
  monitor_heart: MonitorHeartOutlinedIcon,
  radiology: DocumentScannerOutlinedIcon,
  accessibility_new: AccessibilityNewOutlinedIcon,
  pregnant_woman: PregnantWomanOutlinedIcon,
  medical_services: MedicalServicesOutlinedIcon,
  content_cut: ContentCutOutlinedIcon,
  local_hospital: LocalHospitalOutlinedIcon,
  psychology: PsychologyOutlinedIcon,
  auto_stories: AutoStoriesOutlinedIcon,
  trending_up: TrendingUpOutlinedIcon,
  schedule: ScheduleOutlinedIcon,
  location: LocationOnOutlinedIcon,
  arrow_forward: ArrowForwardIcon,
  quote: FormatQuoteIcon,
  arrow_back: ArrowBackIcon,
  chevron_left: ChevronLeftIcon,
  chevron_right: ChevronRightIcon,
  check: CheckCircleOutlineIcon,
};

export function getIcon(name: string): SvgIconComponent {
  return iconMap[name] || MenuBookOutlinedIcon;
}

export {
  ArrowForwardIcon,
  FormatQuoteIcon,
  ArrowBackIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ScheduleOutlinedIcon,
  LocationOnOutlinedIcon,
  CheckCircleOutlineIcon,
};
