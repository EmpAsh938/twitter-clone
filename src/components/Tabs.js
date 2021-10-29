import "../css/Tabs.css";

const Tabs = ({Icon, title}) => {
    return (
        <div className="tabs">
            <Icon className="tabs__icon" />
            <h3 className="tabs__title">{title}</h3>
        </div>
    )
}

export default Tabs
