import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
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

const AddressForm = (props) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [baseMap, setBaseMap] = React.useState('A');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.getFormValues(address, city, state, zip, baseMap);
  }

  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      <Typography variant="h6" gutterBottom>
        Enter address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address"
            value={address}
            fullWidth
            autoComplete="billing address-line1"
            onChange={e => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={city}
            fullWidth
            autoComplete="billing address-level2"
            onChange={e => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            value={state}
            fullWidth
            onChange={e => setState(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            value={zip}
            fullWidth
            autoComplete="billing postal-code"
            onChange={e => setZip(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel component="legend">Base Map</FormLabel>
          <RadioGroup
            aria-label="base map"
            name="baseMap"
            className={classes.group}
            value={baseMap}
            onChange={e => setBaseMap(e.target.value)}
          >
            <FormControlLabel value="A" control={<Radio />} label="Base Map A" />
            <FormControlLabel value="B" control={<Radio />} label="Base Map B" />
            <FormControlLabel value="C" control={<Radio />} label="Base Map C" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default AddressForm;
