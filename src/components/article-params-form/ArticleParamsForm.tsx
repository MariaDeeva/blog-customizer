import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import styles from './ArticleParamsForm.module.scss';
import React, { useRef, useState, useEffect } from 'react';
import { Select } from '../select';
import { Separator } from '../separator';
import { OptionType, defaultArticleState, contentWidthArr, fontColors, fontFamilyOptions, fontSizeOptions, backgroundColors, ArticleStateType } from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { forceReRender } from '@storybook/react';
import { useClose } from '../hooks/useClose';

type ArticleParamsFormProps = {
	pageState: ArticleStateType;
	updatePageState: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ updatePageState }: ArticleParamsFormProps) => {
	const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
	const [fontFamily, setFontFamily] = useState(defaultArticleState.fontFamilyOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [contentWidth, setContentWidth] = useState(defaultArticleState.contentWidth);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [backgroundColor, setBackgroundColor] = useState(defaultArticleState.backgroundColor);
	const formRef = useRef<HTMLDivElement>(null)
	const handleToggleForm = () => setIsFormVisible(!isFormVisible);

	const handleResetForm = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);
		setBackgroundColor(defaultArticleState.backgroundColor);
	};

	const handleChange = (type: keyof ArticleStateType, value: OptionType) => {
		switch (type) {
			case 'fontFamilyOption':
				setFontFamily(value);
				break;
			case 'fontSizeOption':
				setFontSize(value);
				break;
			case 'fontColor':
				setFontColor(value);
				break;
			case 'contentWidth':
				setContentWidth(value);
				break;
			case 'backgroundColor':
				setBackgroundColor(value);
				break;
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updatePageState({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			contentWidth: contentWidth,
			backgroundColor: backgroundColor,
		});
		setIsFormVisible(false);
	};
	useClose({
        isFormVisible,
        onClose: () => setIsFormVisible(false),
        rootRef: formRef,
    });

	return (
		<div ref={formRef}>
			<ArrowButton onClick={handleToggleForm} isFormVisible={isFormVisible} />
			<aside className={`${styles.container} ${isFormVisible ? styles.container_open : ''}`} >
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text
						size={31}
						weight={800}
						fontStyle="normal"
						uppercase
						align='left'
					>Задайте параметры
					</Text>

					<Select
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={(value) => handleChange('fontFamilyOption', value)}
						title="Шрифт"
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={fontSize}
						onChange={(value) => handleChange('fontSizeOption', value)}
						name='fontSize'
						title='Размер шрифта'></RadioGroup>
					<Select
						options={fontColors}
						selected={fontColor}
						onChange={(value) => handleChange('fontColor', value)}
						title="Цвет шрифта"
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						onChange={(value) => handleChange('backgroundColor', value)}
						title="Цвет фона"
					/>

					<Select
						options={contentWidthArr}
						selected={contentWidth}
						onChange={(value) => handleChange('contentWidth', value)}
						title="Ширина контента"
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};