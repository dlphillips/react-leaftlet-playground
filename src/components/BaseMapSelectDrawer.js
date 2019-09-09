import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import Radio from '@material-ui/core/Radio'
import Tooltip from '@material-ui/core/Tooltip'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

import * as tileLayers from './Maps/tileLayers.json'

const useStyles = makeStyles({
  list: {
    width: 275,
    padding: '10px'
  },
  fullList: {
    width: 'auto'
  }
})

export default function TemporaryDrawer (props) {
  const classes = useStyles()

  const [baseMap, setBaseMap] = useState('')

  const baseMapChange = newBaseMap => {
    setBaseMap(newBaseMap)
    props.getBaseLayer(newBaseMap)
  }

  const RenderLayerOptions = () => {
    return tileLayers.layers.map(layer => (
      <Tooltip title={layer.name} placement='top' key={layer.name}>
        <FormControlLabel
          value={layer.name}
          control={<Radio />}
          label={layer.name}
        />
      </Tooltip>
    ))
  }

  const sideList = side => (
    <div
      className={classes.list}
      role='presentation'
      onClick={props.toggleDrawer()}
      onKeyDown={props.toggleDrawer()}
    >
      <FormControl component='fieldset'>
        <RadioGroup
          aria-label='base map'
          name='baseMap'
          className={classes.group}
          value={baseMap}
          onChange={e => baseMapChange(e.target.value)}
        >
          {RenderLayerOptions()}
        </RadioGroup>
      </FormControl>
    </div>
  )
  return (
    <div>
      <Drawer open={props.drawerState} onClose={props.toggleDrawer()}>
        {sideList('left')}
      </Drawer>
    </div>
  )
}
