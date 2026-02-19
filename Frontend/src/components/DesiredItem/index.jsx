import { Link } from "react-router";

const DesiredItem = ({ item }) => {
	return (
		<div>
			<Link to={`/reviews/${item.id}`}>{item.title}</Link>
		</div>
	);
};

export default DesiredItem;
