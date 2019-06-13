import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

import styles from './snackbars.styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

class Snackbars extends React.PureComponent {
  static propTypes = {
    notifications: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.number.isRequired,
      variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
      message: PropTypes.string.isRequired
    })),
    removeNotification: PropTypes.func.isRequired
  };

  static defaultProps = {
    notifications: []
  };

  getSnackbarContentIcon = variant => {
    const { classes } = this.props;
    const Icon = variantIcon[variant];

    return <Icon className={clsx(classes.icon, classes.iconVariant)} />;
  };

  handleSnackbarClose = (reason, key) => {
    const { removeNotification } = this.props;

    if (reason === 'timeout') removeNotification(key);
  };

  render() {
    const { notifications, removeNotification, classes } = this.props;

    return (
      <Box className={classes.box}>
        {[...notifications].reverse().map((notification, index) => (
          <Snackbar
            key={notification.key}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            classes={{ root: classes.snackbar }}
            autoHideDuration={(notifications.length - index + 1) * 10000}
            onClose={(e, reason) => this.handleSnackbarClose(reason, notification.key)}
            message={(
              <span id={`${notification.key}-snackbar`} className={classes.message}>
                {this.getSnackbarContentIcon(notification.variant)}
                {notification.message}
              </span>
            )}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => removeNotification(notification.key)}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
            ContentProps={{
              className: clsx(classes[notification.variant], classes.snackbarContent)
            }}
            open
          />
        ))}
      </Box>
    );
  }
}

export default withStyles(styles)(Snackbars);
