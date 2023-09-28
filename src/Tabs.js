import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function CustomTabs({ selectedTab, onSelectTab}) {
  return (
    <Tabs onSelect={onSelectTab} selectedIndex={selectedTab}>
      <TabList>
        <Tab>Table</Tab>
        <Tab>Graph</Tab>
      </TabList>

      <TabPanel>
        {/* Component to display table */}
      </TabPanel>
      <TabPanel>
        {/* Component to display table */}
      </TabPanel>
    </Tabs>
  );
}

export default CustomTabs;