import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {NavLink} from "react-router-dom";
import {FC} from "react";

type Props = {
    name: string
    navigateTo: string
    muiIcon: React.ElementType
    oncklickCallback?: () => void
}

export const NavigationItem: FC<Props> = ({name, muiIcon, navigateTo,oncklickCallback}) => {
const MyComponent = muiIcon
    return (
        <ListItemButton onClick={oncklickCallback} component={NavLink} to={navigateTo}>
            <ListItemIcon>
                <MyComponent/>
            </ListItemIcon>
            <ListItemText primary={name}/>
        </ListItemButton>

    )
}