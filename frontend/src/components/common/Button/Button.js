import { Button, Icon, IconButton, Tooltip } from '@material-ui/core';
import React from 'react';

const Button_ = ({
  children, onClick, isTooltip, title,
}) => {
  return (isTooltip === true
    ?
      <Tooltip id="tooltip-icon" title={title} style={{ zIndex: '1000' }}>
        <IconButton onClick={onClick}>
          {children}
        </IconButton>
      </Tooltip>
    :
      <IconButton>
        {children}
      </IconButton>);
};

export default Button_;
