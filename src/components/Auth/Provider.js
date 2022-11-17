import React, { useEffect, useState } from "react";

import UserContext from "./Context";

import { getCurrentUser } from "./API";

export default function Provider(props) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const login = (user) => setUser(user);

  const joinGroup = (group) =>
    setUser((prevState) => ({ user: { ...prevState.user, group } }));

  const leaveGroup = () =>
    setUser((prevState) => ({
      user: { ...prevState.user, group: null },
    }));

  const refresh = async () => {
    try {
      // If this application is client only, no login can occur, don't check.
      const user = process.env.REACT_APP_CLIENT_ONLY
        ? null
        : await getCurrentUser();
      setIsLoaded(true);
      setUser(user);
      // this.setState({ user, isLoaded: true });
    } catch (e) {
      setIsLoaded(true);
      setUser(null);
      // this.setState({ user: null, isLoaded: true });
    }
  };

  const logout = () => setUser(null);

  const state = {
    user: user,
    isLoaded: isLoaded,
    login: login,
    joinGroup: joinGroup,
    leaveGroup: leaveGroup,
    refresh: refresh,
    logout: logout,
  };
  useEffect(() => {
    refresh();
  }, []);
  // componentDidMount() {
  //   this.refresh();
  // }

  // render() {
  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
}
