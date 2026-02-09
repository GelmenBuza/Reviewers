import {useState} from "react";
import ItemsCatalog from "../../components/ItemsCatalog";
import ReviewForm from "../../components/ReviewForm";
import style from "./style.module.css";
import ReviewsCatalog from "../../components/ReviewsCatalog/index.jsx";
import {useAuth} from "../../context/userStore.jsx";

export default function ReviewsPage(item) {
    const [createFlag, setCreateFlag] = useState(false);
    const [refreshCatalog, setRefreshCatalog] = useState(false);
    const {reviews} = useAuth()
    console.log(reviews)
    return (
        <div className={style.ReviewsPage}>
            <ReviewsCatalog refreshCatalog={refreshCatalog}/>
        </div>
    );
}
