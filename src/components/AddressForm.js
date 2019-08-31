import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    props.getFormValues(address, city, state, zip);
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
            id="zip"
            name="zip"
            label="Zip / Postal code"
            value={zip}
            fullWidth
            autoComplete="billing postal-code"
            onChange={e => setZip(e.target.value)}
          />
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
            Find Address
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default AddressForm;
