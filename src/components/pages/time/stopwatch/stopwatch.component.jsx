import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import PlayIcon from '@material-ui/icons/PlayArrowOutlined';
import StopIcon from '@material-ui/icons/StopOutlined';
import ResetIcon from '@material-ui/icons/SettingsBackupRestoreOutlined';
import LapIcon from '@material-ui/icons/FlagOutlined';

import Section from '../../../commons/section/section.container';
import LapsActionsMenu from './laps-actions-menu/laps-actions-menu.container';

import styles from './stopwatch.styles';

const useStyles = makeStyles(styles);

const Stopwatch = ({ activeTimer, resetTimer, addStopwatchLap, clearStopwatchLaps, clock, laps, ...props }) => {
  const classes = useStyles();
  const [noOfVisibleLaps, changeNoOfVisibleLaps] = useState(10);
  const active = activeTimer === 'stopwatch';
  const formattedElapsedTime = clock
    ? moment().hour(0).minute(0).second(clock).format('HH:mm:ss')
    : '00:00:00';

  const handleStartStopClick = () => {
    const { setActiveTimer, startTimer, stopTimer, intervalID, increaseTimer } = props;

    if (activeTimer === 'stopwatch') {
      setActiveTimer(null);
      clearInterval(intervalID);
      stopTimer();
    } else {
      const timestamp = moment().valueOf();
      const interval = setInterval(() => increaseTimer(), 1000);
      setActiveTimer('stopwatch');
      startTimer(timestamp, interval);
    }
  };

  return (
    <Container maxWidth="md">

      <Section>
        <Typography variant="body1">
          A clock that can be started and stopped in order to measure the exact time of an event,
          especially a sports event.
        </Typography>
      </Section>

      <Section title="Stopwatch">
        <Typography variant="h2" align="center">
          {formattedElapsedTime}
        </Typography>
        <Grid spacing={2} justify="center" alignItems="center" className={classes.buttonContainer} container>
          <Grid xs="auto" item>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={handleStartStopClick}
            >
              {active ? (
                <Fragment>
                  Stop
                  <StopIcon />
                </Fragment>
              ) : (
                <Fragment>
                  Start
                  <PlayIcon />
                </Fragment>
              )}
            </Button>
          </Grid>
          <Grid xs="auto" item>
            <Button
              type="submit"
              variant="contained"
              size="small"
              color="primary"
              onClick={resetTimer}
              disabled={clock === 0 || active}
            >
              Reset
              <ResetIcon />
            </Button>
          </Grid>
          <Grid xs="auto" item>
            <Button
              type="submit"
              variant="contained"
              size="small"
              color="primary"
              onClick={() => addStopwatchLap(clock)}
              disabled={!active}
            >
              Lap
              <LapIcon />
            </Button>
          </Grid>
        </Grid>
      </Section>

      <Section title="Laps">
        <Grid spacing={0} justify="flex-end" alignItems="flex-start" container>
          <Grid xs="auto" item>
            <LapsActionsMenu noOfVisibleLaps={noOfVisibleLaps} changeNoOfVisibleLaps={changeNoOfVisibleLaps} />
          </Grid>
          <Grid xs={12} item>
            {laps.length ? [...laps].reverse().splice(0, noOfVisibleLaps).map((lap, index) => (
              <Typography key={Math.random() + lap} variant="body1" align="center">
                <Typography variant="body2" className={clsx(classes.lapText, classes.lapIndex)}>
                  {`${laps.length - index}.`}
                </Typography>
                <Typography variant="body2" className={classes.lapText}>
                  {moment().hour(0).minute(0).second(lap).format('HH:mm:ss')}
                </Typography>
              </Typography>
            )) : (
              <Typography variant="body1" align="center">
                There is no registered lap yet...
              </Typography>
            )}
          </Grid>
        </Grid>
      </Section>

    </Container>
  );
};

Stopwatch.propTypes = {
  activeTimer: PropTypes.string,
  intervalID: PropTypes.number,
  clock: PropTypes.number.isRequired,
  laps: PropTypes.arrayOf(PropTypes.number),
  setActiveTimer: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  increaseTimer: PropTypes.func.isRequired,
  addStopwatchLap: PropTypes.func.isRequired,
  clearStopwatchLaps: PropTypes.func.isRequired
};

Stopwatch.defaultProps = {
  activeTimer: null,
  intervalID: null,
  laps: []
};

export default Stopwatch;
