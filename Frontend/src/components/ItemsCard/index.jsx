import style from "./style.module.css";
import {useEffect, useState} from "react";
import {useAuth} from "../../context/userStore.jsx";
import {useReviewApi} from "../../api/useReviewApi.js";
import {useNavigate} from "react-router";


const ItemCard = ({item}) => {
    const {saveItems, items} = useAuth()
    const navigate = useNavigate();
    const onCardClick = async () => {
        const res = await useReviewApi.getReviewsByItemID(item.id)
        // console.log(res)
        if (res) {
            console.log(res);
            saveItems(res)
            console.log(items, '++++')
            navigate("/reviews")

        }

        return (
            <div className={style.card} onClick={() => onCardClick()}>
                <div className={style.images}></div>
                <div className={style.itemData}>
                    <span className={style.itemTitle}>{item.title}</span>
                </div>
            </div>
        );
    };

    export default ItemCard;
