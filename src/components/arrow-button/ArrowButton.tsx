import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	onClick: OnClick;
	isFormVisible: boolean;
}

export const ArrowButton = (props: ArrowButtonProps) => {
	const { onClick, isFormVisible } = props;
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${isFormVisible ? styles.container_open: ''}`}
			onClick={onClick}
		>
			<img src={arrow} alt='иконка стрелочки' className={`${styles.arrow} ${isFormVisible ? styles.arrow_open: ''}`} />
		</div>
	);
};
