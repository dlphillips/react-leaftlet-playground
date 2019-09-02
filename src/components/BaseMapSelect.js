import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import * as tileLayers from './Maps/tileLayers.json';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

const BaseMapSelect = (props) => {
  const [baseMap, setBaseMap] = useState('');

  const classes = useStyles();

  const RenderLayerOptions = () => {
    return tileLayers.layers.map(layer => (
      <Tooltip title={layer.name} placement="top" key={layer.name} >
        <FormControlLabel value={layer.name} control={<Radio />} label={layer.name} />
      </Tooltip>
    ));
  }

  const baseMapChange = (newBaseMap) => {
    setBaseMap(newBaseMap);
    props.getBaseLayer(newBaseMap);
  }

  return (
    <FormControl component="fieldset">
      <Typography variant="h6" gutterBottom>
        Select Base Map
      </Typography>
    <Grid item xs={12}>
      <RadioGroup
        aria-label="base map"
        name="baseMap"
        className={classes.group}
        value={baseMap}
        onChange={e => baseMapChange(e.target.value)}
        >
        {RenderLayerOptions()}
      </RadioGroup>
    </Grid>
    </FormControl>
  );
};

export default BaseMapSelect;
