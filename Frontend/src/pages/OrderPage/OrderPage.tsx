import styles from './OrderPage.module.css'
import {useNavigate} from "react-router-dom";
import { getCart } from '../../utils/cartService';
import {useState} from "react";

export const OrderPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        receiverName: '',
        receiverPhone: '',
        address: '',
        deliveryDate: new Date().toISOString().split('T')[0],
        deliveryTime: '',
        senderName: '',
        senderPhone: '',
        comment: ''
    });

    const [isError, setIsError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setIsError(false);
    };

    const cartItems = getCart();
    const totalCost = cartItems.reduce((sum, item) => sum + (item.price * item.count), 0);

    const handleOrderSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();

        const { ...requiredFields } = formData;
        const allFilled = (Object.keys(requiredFields) as Array<keyof typeof requiredFields>).every(key => {
            const value = requiredFields[key];
            return String(value).trim() !== '';
        });

        if (!allFilled) {
            setIsError(true);
            return;
        }

        const selectedDateTime = new Date(`${formData.deliveryDate}T${formData.deliveryTime}`);
        const minAllowedTime = new Date();
        minAllowedTime.setHours(minAllowedTime.getHours() + 1);

        if (selectedDateTime < minAllowedTime) {
            setIsError(true);
            return;
        }

        const orderData = {
            address: formData.address,
            deliveryDate: formData.deliveryDate.split('-').reverse().join('.'),
            deliveryTime: formData.deliveryTime, // ЧЧ:ММ
            recipientName: formData.receiverName,
            recipientPhone: formData.receiverPhone,
            senderName: formData.senderName,
            senderPhone: formData.senderPhone,
            description: formData.comment,
            totalPrice: totalCost,
            products: cartItems.map(item => ({
                productId: item.id,
                quantity: item.count
            }))
        };
        try {
            const response = await fetch('http://localhost:8000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                console.log("Заказ успешно оформлен!");
                localStorage.removeItem('cart');
                window.dispatchEvent(new Event('cart-updated'));
                navigate('/');
            } else {
                const error = await response.json();
                console.error("Ошибка сервера:", error);
                console.log("Не удалось оформить заказ. Проверьте данные.");
            }
        } catch (err) {
            console.error("Ошибка сети:", err);
            console.log("Произошла ошибка при отправке заказа.");
        }
    };

    return (
        <div className={styles.orderPage}>
            <p className={styles.orderPage__title}>Оформление заказа</p>
            <div className={styles.orderPage__content}>
                <div className={styles.orderPage__fieldsWrapper}>
                    <div className={styles.orderPage__firstField}>
                        <p className={styles.orderPage__subtitle}>1. Контакты получателя</p>
                        <div className={styles.orderPage__firstFieldInputs}>
                            <div className={styles.orderPage__firstFieldInputsRow}>
                                <div className={`${styles.inputGroup} ${styles.firstInputGroup}`}>
                                    <label>Имя*</label>
                                    <input
                                        type="text"
                                        name="receiverName"
                                        value={formData.receiverName}
                                        onChange={handleChange}
                                        placeholder="Введите имя"/>
                                </div>
                                <div className={`${styles.inputGroup} ${styles.firstInputGroup}`}>
                                    <label>Город</label>
                                    <input type="text" value="Йошкар-Ола" disabled className={styles.disabledInput}/>
                                    <small>Пока доставляем только здесь</small>
                                </div>
                            </div>
                            <div className={styles.orderPage__firstFieldInputsRow}>
                                <div className={`${styles.inputGroup} ${styles.firstInputGroup}`}>
                                    <label>Телефон*</label>
                                    <input
                                        type="tel"
                                        name="receiverPhone"
                                        value={formData.receiverPhone}
                                        onChange={handleChange}
                                        placeholder="+7 (___) ___-__-__"/>
                                </div>
                                <div className={`${styles.inputGroup} ${styles.firstInputGroup}`}>
                                    <label>Адрес доставки*</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Улица, дом, квартира"/>
                                </div>
                            </div>
                            <div className={styles.orderPage__firstFieldInputsRow}>
                                <div className={`${styles.inputGroup} ${styles.firstInputGroup}`}>
                                    <label>Дата доставки*</label>
                                    <input
                                        type="date"
                                        min={new Date().toISOString().split('T')[0]}
                                        name="deliveryDate"
                                        value={formData.deliveryDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={`${styles.inputGroup} ${styles.firstInputGroup}`}>
                                    <label>Время*</label>
                                    <input
                                        type="time"
                                        name="deliveryTime"
                                        value={formData.deliveryTime}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.orderPage__info}>
                        <div className={styles.orderPage__secondField}>
                            <p className={styles.orderPage__subtitle}>2. Контакты отправителя</p>
                            <div className={styles.inputGroup}>
                                <label>Имя*</label>
                                <input
                                    type="text"
                                    name="senderName"
                                    value={formData.senderName}
                                    onChange={handleChange}
                                    placeholder="Введите ваше имя"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Телефон*</label>
                                <input
                                    type="tel"
                                    name="senderPhone"
                                    value={formData.senderPhone}
                                    onChange={handleChange}
                                    placeholder="+7 (___) ___-__-__"
                                />
                            </div>
                        </div>
                        <div className={styles.orderPage__thirdField}>
                            <p className={styles.orderPage__subtitle}>3. Детали доставки</p>
                            <div className={styles.inputGroup}>
                                <label>Комментарий к заказу</label>
                                <textarea
                                    className={styles.commentArea}
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    placeholder="Напишите ваши пожелания"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>
                    <p className={styles.orderPage__reference}>* - обязательные поля</p>
                </div>
                <div className={styles.orderPage__cheque}>
                    <p className={styles.orderPage__chequeTitle}>Ваш заказ</p>
                    {cartItems.map(item => (
                        <div className={styles.orderPage__chequeRow} key={item.id}>
                            <p className={styles.orderPage__chequeRowTitle}>{item.title}</p>
                            <p className={styles.orderPage__chequeRowQuantity}>{item.count}</p>
                            <p className={styles.orderPage__chequeRowCost}>
                                {(item.price * item.count).toFixed(2)} руб.
                            </p>
                        </div>
                    ))}
                    <div className={styles.orderPage__chequeRowTotal}>
                        <p className={styles.orderPage__chequeTotalTitle}>Всего</p>
                        <p className={styles.orderPage__chequeTotalCost}>{totalCost.toFixed(2)} руб.</p>
                    </div>
                    <p className={styles.orderPage__orderBut} onClick={handleOrderSubmit}>
                        Оформить заказ
                    </p>
                    {isError && (
                        <p className={styles.errorHint}>
                            Пожалуйста, проверьте заполненность обязательных полей, а также время доставки (нам нужен минимум 1 час для подготовки)
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
};