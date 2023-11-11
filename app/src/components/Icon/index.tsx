import * as phosphorIcon from "phosphor-react-native";

export const IconsMap = Object.freeze({
  Bus: phosphorIcon.Bus,
  Car: phosphorIcon.Car,
  Pallete: phosphorIcon.Palette,
  SwimmingPool: phosphorIcon.SwimmingPool,
  ForkKnife: phosphorIcon.ForkKnife,
  Hamburger: phosphorIcon.Hamburger,
  Storefront: phosphorIcon.Storefront,
  Reception: phosphorIcon.Disc
});


export type IconType = keyof typeof IconsMap;

export interface IconProps {
  type: IconType;
  color?: string;
  size?: string | number;
}

export function Icon({ type, size = 32, ...props }: IconProps) {
  const IconSelected = IconsMap[type];
  return <IconSelected size={size} {...props} />;
}