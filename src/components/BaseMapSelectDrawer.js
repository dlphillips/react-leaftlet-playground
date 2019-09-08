import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

export default function TemporaryDrawer (props) {
  const classes = useStyles()

  console.log(props.drawerState)

  const sideList = side => (
    <div
      className={classes.list}
      role='presentation'
      onClick={props.toggleDrawer()}
      onKeyDown={props.toggleDrawer()}
    >
      <List>
        {['Base Map 1', 'Base Map 2', 'Base Map 3', 'Base Map 4'].map(
          (text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
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
