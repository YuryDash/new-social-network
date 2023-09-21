import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {NavLink} from "react-router-dom";
import {FC} from "react";

type Props = {
    name: string
    navigateTo: string
    muiIcon: React.ElementType
}

export const NavigationItem: FC<Props> = ({name, muiIcon, navigateTo}) => {
const MyComponent = muiIcon
    return (
        <ListItemButton component={NavLink} to={navigateTo}>
            <ListItemIcon>
                <MyComponent/>
            </ListItemIcon>
            <ListItemText primary={name}/>
        </ListItemButton>

    )
}