import React from 'react';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import ControlWrapper from './control-wrapper.component';

import { controlPropTypes, statePropTypes } from './control.proptypes';

import { CONTROL_DEFAULTS } from '../form.constants';

const ControlSelect = ({ control, state, onChange }) => (
  <ControlWrapper
    control={control}
    state={state}
  >
    <Select
      id={control.key}
      value={state.value}
      onChange={e => onChange(control.key, e.target.value)}
      autoComplete={control.autocomplete || CONTROL_DEFAULTS.AUTOCOMPLETE}
      autoFocus={false}
      aria-describedby={`${control.key}-helper-text`}
    >
      {control.options && control.options.map(option => (
        <MenuItem key={option.value || option} value={option.value || option}>
          {option.label || option}
        </MenuItem>
      ))}
    </Select>
  </ControlWrapper>
);

ControlSelect.propTypes = {
  control: controlPropTypes.isRequired,
  state: statePropTypes.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ControlSelect;
