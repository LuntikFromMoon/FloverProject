import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../AdminEditProduct/AdminEditProduct.module.css"; // Используем те же стили

export const AdminAddProduct = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        imagePath: '',
        category_id: ''
    });

    const [categories, setCategories] = useState<any[]>([]);
    const [preview, setPreview] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);

    // Загружаем только категории
    useEffect(() => {
        fetch('http://localhost:8000/api/product-category')
            .then(res => res.json())
            .then(data => setCategories(data.productCategories || data))
            .catch(err => console.error("Ошибка категорий:", err));
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreview(base64String);
                setFormData(prev => ({ ...prev, imagePath: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        const fieldsToValidate = [
            formData.name,
            formData.price,
            formData.description,
            formData.imagePath,
            formData.category_id
        ];

        // 2. Проверяем: каждое поле должно существовать, не быть пустым и не состоять из одних пробелов
        const allFilled = fieldsToValidate.every(value =>
            value && String(value).trim() !== ''
        );

        if (!allFilled) {
            setIsError(true);
            return;
        }

        // 3. Формируем данные для бэкенда
        const dataToSend = {
            name: formData.name,
            categoryId: Number(formData.category_id),
            description: formData.description,
            price: parseFloat(formData.price),
            imageBase64: formData.imagePath
        };
        console.log("JSON для отправки:", JSON.stringify(dataToSend));
        try {
            const response = await fetch(`http://localhost:8000/api/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                console.log("Товар успешно добавлен!");
                navigate('/admin');
            } else {
                const errorText = await response.text();
                console.error("Сервер ответил ошибкой:", errorText);
                console.log("Не удалось сохранить товар. Проверьте данные.");
            }
        } catch (err) {
            console.error("Ошибка сети:", err);
            console.log("Проблема с подключением к серверу.");
        }
    };

    return (
        <div className={styles.adminEditProduct}>
            <p className={styles.adminEditProduct__title}>Добавление нового товара</p>

            <div className={styles.formGroup}>
                <label>Фото</label>
                <div className={styles.imagePreviewWrapper}>
                    {preview && <img src={preview} alt="Превью" className={styles.imagePreview} />}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label>Название</label>
                <input
                    type="text"
                    placeholder="Внесите имя..."
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Цена</label>
                <input
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Категория</label>
                <select
                    value={formData.category_id}
                    onChange={e => setFormData({...formData, category_id: e.target.value})}
                >
                    <option value="">Выберите категорию</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label>Описание</label>
                <textarea
                    rows={5}
                    placeholder="Расскажите о товаре..."
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                />
            </div>

            <div className={styles.adminEditProduct__buttons}>
                <button className={styles.adminEditProduct__saveBtn} onClick={handleSave}>Создать</button>
                <button className={styles.adminEditProduct__cancelBtn} onClick={() => navigate('/admin')}>Отмена</button>
            </div>
            {isError && <p style={{color: '#d15a5a', marginTop: '10px'}}>Пожалуйста, заполните все(!) поля</p>}
        </div>
    );
};