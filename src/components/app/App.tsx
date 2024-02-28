import clsx from "clsx";
import { Article } from "../article";
import { ArticleParamsForm } from "../article-params-form";
import { ArticleStateType, defaultArticleState } from "src/constants/articleProps";
import { CSSProperties, useState } from "react";
import styles from './App.module.scss';

export const App = () => {
  const [pageState, setPageState] = useState(defaultArticleState);

  const updatePageState = (newState: ArticleStateType) => {
    setPageState(newState);
  };

  return (
    <div
      className={clsx(styles.main)}
      style={
        {
          '--font-family': pageState.fontFamilyOption.value,
          '--font-size': pageState.fontSizeOption.value,
          '--font-color': pageState.fontColor.value,
          '--container-width': pageState.contentWidth.value,
          '--bg-color': pageState.backgroundColor.value,

        } as CSSProperties
      }>
      <ArticleParamsForm pageState={pageState} updatePageState={updatePageState} />
      <Article />
    </div>
  );
};