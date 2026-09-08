import { Icon, type IconifyIcon } from "@iconify/react";

type ThreeDIconProps = {
  icon: IconifyIcon;
  label?: string;
  className?: string;
};

export function ThreeDIcon({ icon, label, className = "" }: ThreeDIconProps) {
  return (
    <Icon
      icon={icon}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}
