import ItemsCatalog from "../../components/ItemsCatalog";
import style from "./style.module.css";
import NavMenu from "../../components/Header";

export default function CatalogPage() {
	return (
		<div className="pageContainer">
			<NavMenu />
			<ItemsCatalog />
		</div>
	);
}
