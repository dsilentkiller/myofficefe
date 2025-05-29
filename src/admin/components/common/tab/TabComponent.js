// TabComponent.jsx
import React from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";

const TabComponent = ({ activeTab, toggle, children }) => {
    return (
        <div className="card">
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => toggle("1")}
                    >
                        General Information
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => toggle("2")}
                    >
                        Address
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => toggle("3")}
                    >
                        Company Info
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
                {children}
            </TabContent>
        </div>
    );
};

export default TabComponent;
