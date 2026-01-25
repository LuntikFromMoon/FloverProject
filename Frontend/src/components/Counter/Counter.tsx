// src/components/Counter/Counter.tsx
import { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import styles from './Counter.module.css';

interface CounterProps {
    count: number;
    min?: number;
    max?: number;
    onCountChange: (newCount: number) => void;
}

const Counter = ({
                     count,
                     min = 1,
                     max = 50,
                     onCountChange
                 }: CounterProps) => {

    const [inputValue, setInputValue] = useState(count.toString());


    useEffect(() => {
        setInputValue(count.toString());
    }, [count]);

    const increment = () => {
        if (count < max) {
            onCountChange(count + 1);
        }
    };

    const decrement = () => {
        if (count > min) {
            onCountChange(count - 1);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        const numValue = parseInt(value, 10);
        if (!isNaN(numValue) && numValue >= min && numValue <= max) {
            onCountChange(numValue);
        }
    };

    const handleInputBlur = () => {
        const numValue = parseInt(inputValue, 10);
        if (isNaN(numValue) || numValue < min || numValue > max) {
            setInputValue(count.toString()); // Возвращается старое, если ввели бред
        }
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            (e.target as HTMLInputElement).blur();
        }
    };

    return (
        <div className={styles.counter}>
            <button
                className={styles.counterButton}
                onClick={decrement}
                disabled={count <= min}
            >
                −
            </button>

            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                className={styles.counterInput}
                inputMode="numeric"
            />

            <button
                className={styles.counterButton}
                onClick={increment}
                disabled={count >= max}
            >
                +
            </button>
        </div>
    );
};

export default Counter;