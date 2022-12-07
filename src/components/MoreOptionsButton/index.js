import { IconButton } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Tooltip from '@material-ui/core/Tooltip'
import ChatIcon from '@material-ui/icons/Chat'
import React from 'react'

import useSignal from '../../hooks/useSignal'
import SideMenu from '../SideMenu'
import styles from './styles'

export default function MoreOptionsButton({
  classes,
  participants,
  room,
  localParticipant
}) {
  const { listOfMessages } = useSignal({ room });
  const titleToolTip = 'Chat';
  const localClasses = styles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = () => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState(!state);
  };

  return (
    <div>
      <Tooltip title={titleToolTip} aria-label="add">
        <IconButton
          onClick={toggleDrawer()}
          edge="start"
          color="inherit"
          aria-label="mic"
          className={localClasses.infoButton}
        >
          <ChatIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Drawer
        open={state}
        onClose={toggleDrawer(false)}
        classes={{ paper: localClasses.paper }}
      >
        <SideMenu
          className={localClasses.root}
          room={room}
          participants={participants}
          localParticipant={localParticipant}
          listOfMessages={listOfMessages}
        ></SideMenu>
      </Drawer>
    </div>
  );
}
