import React from 'react';
import Tooltip, { TooltipProps } from './Tooltip';

const DarkTooltip = (props: TooltipProps) => {
  return <Tooltip {...props} tooltipColor="#000" tooltipTextColor="#fff" />;
};

export default DarkTooltip;
