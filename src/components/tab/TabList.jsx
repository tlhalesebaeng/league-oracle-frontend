import TabItem from './TabItem.jsx';
import './TabList.css';

const TabList = ({ tabList, activeTab, onChangeTab }) => {
    return (
        <section className="tab-list">
            <ul>
                {tabList.map((tab) => {
                    // Check if the current tab is active
                    const isActive = activeTab === tab.name;

                    // Add the active style if its active
                    const activeStyle = isActive ? 'active' : undefined;

                    return (
                        <TabItem
                            onClick={() => onChangeTab(tab.name)}
                            className={activeStyle}
                            key={tab.id}
                        >
                            {tab.name}
                        </TabItem>
                    );
                })}
            </ul>
        </section>
    );
};

export default TabList;
