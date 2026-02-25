import style from "./style.module.css";
import ReviewForm from "../../components/ReviewForm";
import NavMenu from "../../components/Header";

function CreateReviewPage() {
    return (
        <div className={`pageContainer`}>
            <NavMenu/>
            <ReviewForm/>
        </div>
    );
}

export default CreateReviewPage;
