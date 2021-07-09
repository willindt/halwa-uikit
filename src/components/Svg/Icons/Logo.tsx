import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface MobileLogoProps extends SvgProps {
  isDark: boolean;
}

const Icon: React.FC<MobileLogoProps> = ({ isDark, ...props }) => {
  return (
    <Svg viewBox="0 0 150 40" {...props}>
      <image width="150" height="40" href={isDark ? '/images/egg/LogoTextNewDark.png' : '/images/egg/LogoTextNewWhite.png'}/>
    </Svg>
  );
};

export default Icon;
