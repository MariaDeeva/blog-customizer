import { useEffect } from "react";

type TUseClose = {
  isFormVisible: boolean;
  onClose: () => void;
  rootRef: React.RefObject<HTMLElement>;
};
// кастомные хуки всегда должны начинаться с глагола `use`, чтобы реакт понял, что это хук. Он следит за их вызовами
export function useClose({isFormVisible, onClose, rootRef}: TUseClose) {
  useEffect(() => {
    if (!isFormVisible) return; // останавливаем действие эффекта, если закрыто

   
    function handleClickOutside(event: MouseEvent) {
      const { target } = event;
      const isOutsideClick =
        target instanceof Node && // проверяем, что это `DOM`-элемент
        rootRef.current &&
        !rootRef.current.contains(target);  // проверяем, что кликнули на элемент, который находится не внутри нашего блока
      if (isOutsideClick) {
        onClose();
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    //  обязательно удаляем обработчики в `clean-up`- функции
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не при любой перерисовке компонента
  }, [isFormVisible, onClose, rootRef]);
}