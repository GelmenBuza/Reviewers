import cameraSvg from "../../assets/camera.svg";
import style from "./style.module.css";

const ImagePlaceholder = () => {
	return (
		<div className={style.container}>
			<img
				src={cameraSvg}
				className={style.svg}
				alt="Иконка фотоаппарата"
			/>
			<span className={style.text}>Изоображение отсутвствует</span>
		</div>
	);
};

export default ImagePlaceholder;
