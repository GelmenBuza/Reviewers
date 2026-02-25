import {useEffect, useState} from "react";
import ReviewForm from "../../components/ReviewForm";
import style from "./style.module.css";
import ReviewsCatalog from "../../components/ReviewsCatalog/index.jsx";
import {useItemsApi} from "../../api/useItemApi.js";
import {useParams} from "react-router";
import NavMenu from "../../components/Header";

export default function ReviewsPage() {

    const [title, setTitle] = useState("");
    const {itemId} = useParams();

    useEffect(() => {
        setTimeout(() => {
            const getItemTitle = async () => {
                setTitle((await useItemsApi.getItemById(itemId)).title);
            };
            getItemTitle();
        }, 500);
    }, []);
    return (
        <div className="pageContainer" style={{position: "relative"}}>
            <NavMenu/>
            <div className={style.contentContainer}>
                <div className={style.titleContainer}>
                    <h2 className={style.title}>
                        {title ? title : "Загрузка..."}
                    </h2>
                </div>
                <ReviewsCatalog
                    key={itemId}
                    itemId={itemId}
                />
            </div>
        </div>
    );
}
