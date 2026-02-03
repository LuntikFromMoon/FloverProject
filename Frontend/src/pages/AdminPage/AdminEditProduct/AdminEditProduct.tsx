import  styles from "./AdminEditProduct.module.css"
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { ProductCategory } from '../../../types';

export const AdminEditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        imagePath: '',
        category_id: ''
    });

    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                const p = data.product || data;
                setFormData({
                    name: p.name,
                    price: p.price,
                    description: p.description,
                    imagePath: p.imagePath,
                    category_id: p.category_id || p.category?.id
                });
                setPreview(p.imagePath);
            });
        fetch('http://localhost:8000/api/product-category')
            .then(res => res.json())
            .then(data => setCategories(data.productCategories));
    }, [id]);

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
        const dataToSend = {
            name: formData.name,
            categoryId: Number(formData.category_id),
            description: formData.description,
            price: parseFloat(formData.price),
            imageBase64: formData.imagePath
        };

        try {
            const response = await fetch(`http://localhost:8000/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                console.log("Товар успешно обновлен!");
                navigate('/admin');
            } else {
                const errorData = await response.json();
                console.error("Ошибка от сервера:", errorData);
                alert("Ошибка при сохранении. Проверь консоль.");
            }
        } catch (err) {
            console.error("Сетевая ошибка:", err);
        }
    };

    return(
        <div className={styles.adminEditProduct}>
            <p className={styles.adminEditProduct__title}>Редактирование товара</p>

            <div className={styles.formGroup}>
                <label>Изображение товара</label>
                <div className={styles.imagePreviewWrapper}>
                    {preview && <img src={preview} alt="Превью" className={styles.imagePreview}/>}
                    <input type="file" accept="image/*" onChange={handleImageChange}/>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label>Название</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Цена (руб.)</label>
                <input
                    type="number"
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
                    rows={6}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                />
            </div>

            <div className={styles.adminEditProduct__buttons}>
                <button className={styles.adminEditProduct__saveBtn} onClick={handleSave}>Сохранить</button>
                <button className={styles.adminEditProduct__cancelBtn} onClick={() => navigate('/admin')}>Отмена</button>
            </div>
        </div>
    )
}