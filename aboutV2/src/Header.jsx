import React from "react";
import {
  Switcher,
  Notification,
  UserAvatar,
  Microscope,
  Explore,
  Information,
  VideoAdd,
} from "@carbon/react/icons";
import { Link } from "react-router-dom";
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from "@carbon/react";

const NavHeader = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="Airgapflux Main">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName element={Link} to="/" prefix="">
          <span style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                backgroundImage: `url('https://airgapflux.in/favicon.png')`,
                backgroundSize: "cover",
                width: "30px", // Adjust the width as needed
                height: "30px", // Adjust the height as needed
                marginRight: "10px",
              }}
            />
            Airgapflux Search
          </span>
        </HeaderName>

        <HeaderNavigation aria-label="Search">
          <HeaderMenuItem element={Link} to="https://airgapflux.in">
            <span style={{ display: "flex", alignItems: "center" }}>
              <Microscope size="20" style={{ marginRight: "10px" }} /> Search
            </span>
          </HeaderMenuItem>
        </HeaderNavigation>

        <HeaderNavigation aria-label="Explore">
          <HeaderMenuItem element={Link} to="https://explore.airgapflux.in">
            <span style={{ display: "flex", alignItems: "center" }}>
              <Explore size="20" style={{ marginRight: "10px" }} /> Explore
            </span>
          </HeaderMenuItem>
        </HeaderNavigation>

        <HeaderNavigation aria-label="About">
          <HeaderMenuItem element={Link} to="https://about.airgapflux.in">
            <span style={{ display: "flex", alignItems: "center" }}>
              <Information size="20" style={{ marginRight: "10px" }} /> About
            </span>
          </HeaderMenuItem>
        </HeaderNavigation>

        <HeaderNavigation aria-label="Add">
          <HeaderMenuItem element={Link} to="https://add.airgapflux.in">
            <span style={{ display: "flex", alignItems: "center" }}>
              <VideoAdd size="20" style={{ marginRight: "10px" }} /> Add
              resource
            </span>
          </HeaderMenuItem>
        </HeaderNavigation>

        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}
        >
          <SideNavItems>
            <HeaderSideNavItems>
              <HeaderMenuItem element={Link} to="https://airgapflux.in">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Microscope size="20" style={{ marginRight: "10px" }} />{" "}
                  Search
                </span>
              </HeaderMenuItem>
              <HeaderMenuItem element={Link} to="https://explore.airgapflux.in">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Explore size="20" style={{ marginRight: "10px" }} /> Explore
                </span>
              </HeaderMenuItem>
              <HeaderMenuItem element={Link} to="https://about.airgapflux.in/">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <Information size="20" style={{ marginRight: "10px" }} />{" "}
                  About
                </span>
              </HeaderMenuItem>
              <HeaderMenuItem element={Link} to="https://add.airgapflux.in/">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <VideoAdd size="20" style={{ marginRight: "10px" }} /> Add
                  resource
                </span>
              </HeaderMenuItem>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>

        {/* <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Notifications" tooltipAlignment="center">
            <Notification size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="User Avatar" tooltipAlignment="center">
            <UserAvatar size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end">
            <Switcher size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar> */}
      </Header>
    )}
  />
);

export default NavHeader;
