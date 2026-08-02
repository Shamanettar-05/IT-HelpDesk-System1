function DashboardCard(props) {

    return (

        <div style={props.cardStyle}>

            <h3 style={props.titleStyle}>
                {props.title}
            </h3>

            <h1 style={props.numberStyle}>
                {props.value}
            </h1>

        </div>

    );

}

export default DashboardCard;