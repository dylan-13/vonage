import { Container } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import GroupIcon from '@material-ui/icons/Group'
import PersonIcon from '@material-ui/icons/Person'
import React from 'react'

import Chat from '../Chat'
import MeetingInfo from '../MeetingInfo'

function TabPanel(props) {
  //   const [value, setValue] = React.useState(0);
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>{children}</Box>
        </Container>
      )}
    </div>
  )
}

const SideMenu = ({ participants, room, localParticipant, listOfMessages }) => {
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    }
  }

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Chat" {...a11yProps(0)} />
          <Tab label="List of Participants" {...a11yProps(1)} />
          <Tab label="Meeting info" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Chat room={room} listOfMessages={listOfMessages} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MeetingInfo roomId={room.roomId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List>
          {participants && (
            //Adding +! as currently participants do not include self
            <>
              <ListItem key={"participants_counter"}>
                <ListItemIcon>
                  <GroupIcon variant="contained" color="primary" />
                </ListItemIcon>
                Participants ({participants.length + 1})
              </ListItem>
            </>
          )}
          {localParticipant && (
            <>
              <ListItem key={localParticipant.id}>
                <ListItemIcon>
                  <PersonIcon variant="contained" color="primary" />
                </ListItemIcon>
                <ListItemText primary={localParticipant.name} />
              </ListItem>
              <Divider />
            </>
          )}
          {participants &&
            participants?.length > 0 &&
            participants.map((e) => {
              return (
                <>
                  <ListItem key={e.id}>
                    <ListItemIcon>
                      <PersonIcon variant="contained" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={e.name} />
                  </ListItem>

                  <Divider />
                </>
              )
            })}
        </List>
      </TabPanel>
    </div>
  )
}

export default SideMenu
