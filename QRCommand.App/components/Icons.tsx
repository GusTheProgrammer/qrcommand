import {
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  LucideIcon,
  MoonStar,
  Sun,
  Menu,
  PenIcon,
  TrashIcon,
  X,
} from "lucide-react-native";
import { cssInterop } from "nativewind";

function interopIcon(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

interopIcon(Info);
interopIcon(MoonStar);
interopIcon(Sun);
interopIcon(ChevronDown);
interopIcon(ChevronUp);
interopIcon(Check);
interopIcon(Menu);
interopIcon(PenIcon);
interopIcon(TrashIcon);
interopIcon(X);

export {
  Info,
  MoonStar,
  Sun,
  ChevronDown,
  ChevronUp,
  Check,
  Menu,
  PenIcon,
  TrashIcon,
  X,
};
