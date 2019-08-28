import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from './top-tabs.styles';

const useStyles = makeStyles(styles);

const TopTabs = ({ items, selectedByDefault }) => {
  const classes = useStyles();
  const [selected, updateSelected] = useState(
    items.map(({ to }) => to).includes(selectedByDefault)
      ? selectedByDefault
      : items[0].to
  );

  return (
    <Tabs
      value={selected}
      onChange={(e, value) => updateSelected(value)}
      className={classes.root}
      TabIndicatorProps={{ className: classes.indicator }}
    >
      {items.map(item => (
        <Tab
          key={item.key}
          value={item.to}
          label={item.label}
          className={classes.tab}
          component={Link}
          to={item.to}
          disableRipple
        />
      ))}
    </Tabs>
  );
};

TopTabs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    to: PropTypes.string
  })).isRequired,
  selectedByDefault: PropTypes.string.isRequired
};

export default TopTabs;
