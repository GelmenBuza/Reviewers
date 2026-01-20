import {useAuth} from "../../context/userStore.jsx";
import {useEffect, useState} from "react";

const review = []

export default function Index() {

    const {user} = useAuth()
    const [sort, setSort] = useState('name')
    const [products, setProducts] = useState(review)

    // useEffect(() => {
    //         if (sort === 'name') {
    //             const sortedProducts = [...review].sort((a, b) => {
    //                     if (a.title.toLowerCase() < b.title.toLowerCase()) {
    //                         return -1;
    //                     }
    //                     if (a.title.toLowerCase() > b.title.toLowerCase()) {
    //                         return 1;
    //                     }
    //                     return 0;
    //                 }
    //             )
    //             setProducts(sortedProducts)
    //         } else {
    //             setProducts(review)
    //         }
    //     }
    //     ,
    //     [sort]
    // )

    return (
    <div>
        {/*{user.role === 'manager' && (*/}
        {/*    <select name="sortSelect" id="sortSelect" onChange={(e) => setSort(e.target.value)}>*/}
        {/*        <option value='none' selected>Не сортировать</option>*/}
        {/*        <option value='name'>Сортировать</option>*/}
        {/*    </select>*/}
        {/*)}}*/}
        <div className={}>
            {products.map((item) => (<div key={item.id}>
                <span>{item.title}</span>
                <p>{item.description}</p>
            </div>))}
        </div>

    </div>
)
}