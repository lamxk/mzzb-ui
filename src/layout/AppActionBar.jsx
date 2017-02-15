import React, {PropTypes} from "react";
import AppBar from "material-ui/AppBar";
import MenuItem from "material-ui/MenuItem";
import IconMenu from "material-ui/IconMenu";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import {sessionManager} from "../Api";

export default class AppActionBar extends React.Component {

  static propTypes = {
    barTitle: PropTypes.string.isRequired,
    showMenuIcon: PropTypes.bool.isRequired,
    handleShowLogin: PropTypes.func.isRequired,
    handleShowDrawer: PropTypes.func.isRequired,
  };

  static contextTypes = {
    isLogged: PropTypes.bool.isRequired,
    handleChangeLogin: PropTypes.func.isRequired,
    handleChangeAlert: PropTypes.func.isRequired,
  };

  render() {
    const {barTitle, showMenuIcon, handleShowLogin, handleShowDrawer} = this.props;
    const {isLogged, handleChangeLogin, handleChangeAlert} = this.context;

    const loginElement = (
      <FlatButton
        label="Login"
        onTouchTap={handleShowLogin}
      />
    );

    const handleLogout = async() => {
      try {
        await sessionManager.logout();
        handleChangeLogin();
      } catch (error) {
        handleChangeAlert(true, `Logout Error: ${error.message}`);
      }
    };
    const handleNotSupport = () => {
      handleChangeAlert(true, "Operation not supported");
    };
    const iconButton = <IconButton><MoreVertIcon /></IconButton>;
    const origin = {horizontal: "right", vertical: "top"};
    const loggedElement = (
      <IconMenu
        iconButtonElement={iconButton}
        targetOrigin={origin}
        anchorOrigin={origin}
      >
        <MenuItem primaryText="Refresh" onTouchTap={handleNotSupport}/>
        <MenuItem primaryText="Help" onTouchTap={handleNotSupport}/>
        <MenuItem primaryText="Sign out" onTouchTap={handleLogout}/>
      </IconMenu>
    );
    return (
      <AppBar
        title={barTitle}
        style={{position: "fixed", top: 0}}
        onLeftIconButtonTouchTap={handleShowDrawer}
        showMenuIconButton={showMenuIcon}
        iconElementRight={isLogged ? loggedElement : loginElement}
      />
    );
  }
}