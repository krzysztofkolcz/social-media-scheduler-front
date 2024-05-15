import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useAccount from '../hooks/useAccount';

export interface MenuListItemProps {
  text: string;
  isOpened: boolean;
  index: number;
  icon: JSX.Element;
  linkComponent?: React.ElementType;
//   onClick?: () => void
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export default function LeftMenuListItem(props: MenuListItemProps) {
  const {logout} = useAccount();

    return (
        <ListItem key={props.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: props.isOpened ? 'initial' : 'center',
                    px: 2.5,
                }}
                LinkComponent={props.linkComponent}
                onClick={props.onClick}
                // onClick={logout}
            >
            <ListItemIcon
                sx={{
                minWidth: 0,
                mr: props.isOpened ? 3 : 'auto',
                justifyContent: 'center',
                }}
            >
            {props.icon}
            </ListItemIcon>
            <ListItemText primary={props.text} sx={{ opacity: props.isOpened ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>

    )
}