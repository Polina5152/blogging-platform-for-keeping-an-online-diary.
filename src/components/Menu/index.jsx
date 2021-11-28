import { 
    Header,
    Menu,
    Button,
    Avatar,
} from "grommet";
import { Home, Add, Login, Logout} from "grommet-icons";

import "./Menu.css"

const MenuComponent = ( props ) => {
    const { 
        onClickAddPost,
        onClickHome,
        logout,
        activeUser,
        onClickLogin,
    } = props;

    const exit = () => {
        logout()
    }

    return (
        <div >
            <Header background="brand">
            <Button onClick={onClickHome} icon={<Home />} hoverIndicator />
            { activeUser  && 
                <Button onClick={onClickAddPost} icon={<Add />} hoverIndicator /> 
            }
            { activeUser && 
                <div className="user_menu" >
                    <Avatar className="avatar_menu" size="medium" src={ activeUser.avatar} /> 
                    <Menu 
                    label={activeUser.name}
                        items={ 
                        [
                        { label: 'Exit', onClick: () => exit(),  icon: <Logout/> }
                        ] 
                    }
                    >
                    </Menu>
                </div>
            } 
            { !activeUser &&
            <Button 
            label="Login" 
            icon={<Login />} 
            hoverIndicator 
            onClick={onClickLogin} />
            }
          </Header>
        </div>
    )
}

export default MenuComponent;