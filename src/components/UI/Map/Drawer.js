import React from 'react';
import { Paper, Drawer, IconButton, Divider} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Card from './Card'

const MyDrawer = (props) => {
    return(
        <div>
            <Drawer 
                    style={{width:'200px'}}
                    variant="persistent"
                    anchor="left"
                    open={true}
                    >
                        <div >
                            <IconButton >
                                <ChevronRightIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                        {props.places.map(p => (
                            <Card image={p.image} title={p.title} description={p.description}/>
                        ))}
                        </List>
                        <Divider />
            </Drawer>
        </div>
    )
}

export default MyDrawer;