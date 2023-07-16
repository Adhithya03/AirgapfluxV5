import React from 'react';
import { Switcher, Notification, UserAvatar ,Search,Explore,Information} from '@carbon/react/icons';
import { Link } from 'react-router-dom';
import { Header, HeaderContainer, HeaderName, HeaderNavigation, HeaderMenuButton, HeaderMenuItem, HeaderGlobalBar, HeaderGlobalAction, SkipToContent, SideNav, SideNavItems, HeaderSideNavItems, } from '@carbon/react';


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
          Airgapflux
        </HeaderName>

        <HeaderNavigation aria-label="Search">
          <HeaderMenuItem element={Link} to="https://airgapflux.in">
            Search
          </HeaderMenuItem>
        </HeaderNavigation>
        <HeaderNavigation aria-label="Explore">
          <HeaderMenuItem element={Link} to="https://explore.airgapflux.in">
            Explore
          </HeaderMenuItem>
        </HeaderNavigation>

        <HeaderNavigation aria-label="About">
          <HeaderMenuItem element={Link} to="https://about.airgapflux.in">
            About
          </HeaderMenuItem>
        </HeaderNavigation>

        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}
        >
          <SideNavItems>
            <HeaderSideNavItems>
              <br />
              <HeaderMenuItem element={Link} to="https://airgapflux.in"><Search size='14'/>  Search</HeaderMenuItem>
              <br />


              <HeaderMenuItem element={Link} to="https://explore.airgapflux.in"><Explore size='14'/>  Explore</HeaderMenuItem>
              <br />

              <HeaderMenuItem element={Link} to="https://about.airgapflux.in/"><Information size='14'/>  About</HeaderMenuItem>
              {/* <HeaderMenuItem element={Link} to="https://airgapflux.in/about/">About</HeaderMenuItem> */}
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