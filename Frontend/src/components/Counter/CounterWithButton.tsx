// src/components/CounterWithButton/CounterWithButton.tsx
import { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import styles from './CounterWithButton.module.css';

interface CounterWithButtonProps {
    min?: number;
    max?: number;
    initial?: number;
    onAddToCart?: (quantity: number) => void;
}

const CounterWithButton = ({
                               min = 1,
                               max = 50,
                               initial = 1,
                               onAddToCart
                           }: CounterWithButtonProps) => {
    const [count, setCount] = useState(initial);
    const [inputValue, setInputValue] = useState(initial.toString());
    const [isEditing, setIsEditing] = useState(false);

    // Синхронизируем inputValue с count
    useEffect(() => {
        if (!isEditing) {
            setInputValue(count.toString());
        }
    }, [count, isEditing]);

    const increment = () => {
        if (count < max) {
            setCount(prev => prev + 1);
        }
    };

    const decrement = () => {
        if (count > min) {
            setCount(prev => prev - 1);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        // Если пустое значение, оставляем как есть
        if (value === '') return;

        const numValue = parseInt(value, 10);

        // Проверяем, что это число и оно в пределах min-max
        if (!isNaN(numValue)) {
            if (numValue >= min && numValue <= max) {
                setCount(numValue);
            }
        }
    };

    const handleInputBlur = () => {
        setIsEditing(false);

        // Если input пустой, возвращаем предыдущее значение
        if (inputValue === '') {
            setInputValue(count.toString());
            return;
        }

        const numValue = parseInt(inputValue, 10);

        // Если не число или вне диапазона, сбрасываем
        if (isNaN(numValue) || numValue < min || numValue > max) {
            setInputValue(count.toString());
        } else {
            setCount(numValue);
        }
    };

    const handleInputFocus = () => {
        setIsEditing(true);
    };

    const handleInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        // Разрешаем только цифры и управляющие клавиши
        if (!/[0-9]|Backspace|Delete|Tab|Enter/.test(e.key)) {
            e.preventDefault();
        }

        // Enter подтверждает ввод
        if (e.key === 'Enter') {
            handleInputBlur();
            e.currentTarget.blur();
        }
    };

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(count);
        } else {
            console.log(`Добавлено ${count} товара(ов) в корзину`);
        }
    };

    return (
        <div className={styles.counterWrapper}>
            {/* Счетчик с input */}
            <div className={styles.counter}>
                <button
                    className={styles.counterButton}
                    onClick={decrement}
                    disabled={count <= min}
                    aria-label="Уменьшить количество"
                >
                    −
                </button>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                        onKeyDown={handleInputKeyPress}
                        className={styles.counterInput}
                        aria-label="Количество товара"
                        inputMode="numeric"
                    />
                    {parseInt(inputValue) > max && (
                        <span className={styles.errorText}>Макс: {max}</span>
                    )}
                </div>

                <button
                    className={styles.counterButton}
                    onClick={increment}
                    disabled={count >= max}
                    aria-label="Увеличить количество"
                >
                    +
                </button>
            </div>

            {/* Кнопка добавления в корзину */}
            <button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
                disabled={count < min || count > max}
            >
                Добавить в корзину
            </button>
        </div>
    );
};

export default CounterWithButton;