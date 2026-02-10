import ItemsCatalog from "../../components/ItemsCatalog";
import style from "./style.module.css";

export default function CatalogPage() {
	return (
		<div className={style.CatalogPage}>
			<ItemsCatalog />
		</div>
	);
}
