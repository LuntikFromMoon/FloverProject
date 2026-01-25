import styles from "./AdminPage.module.css"
import TrashBin from "../../assets/icons/TrashBin";
import {useEffect, useState} from "react";
import Edit from "../../assets/icons/Edit";
import {Link} from "react-router-dom";

export const AdminPage = () => {
    const [view, setView] =
        useState<'products' | 'orders' | 'statistics'>('products');
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<any>(null);
    const [stats, setStats] = useState<any[]>([]);

    const startEdit = (product: any) => {
        setEditingId(product.id);
        setEditForm({ ...product });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm(null);
    };

    const saveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/products/${editingId}`, {
                method: 'PUT', // или PUT, уточни у бэкендера
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });

            if (response.ok) {
                setProducts(prev => prev.map(p => p.id === editingId ? editForm : p));
                setEditingId(null);
            }
        } catch (err) {
            console.error("Ошибка при сохранении:", err);
        }
    };

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/change-status/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === orderId
                            ? { ...order, status: newStatus, availableStatus: [] } // Очищаем статусы после смены (или запрашиваем заново)
                            : order
                    )
                );
            } else {
                alert("Не удалось обновить статус");
            }
        } catch (err) {
            console.error("Ошибка при смене статуса:", err);
        }
    };

    useEffect(() => {
        if (view === 'products') {
            fetch('http://localhost:8000/api/products')
                .then(res => res.json())
                .then(data => setProducts(Array.isArray(data) ? data : data.products));
        } else if (view === 'orders') {
            fetch('http://localhost:8000/api/orders')
                .then(res => res.json())
                .then(data => setOrders(data.orders || []));
        } else if (view === 'statistics') {
            fetch('http://localhost:8000/api/statistics/sales-by-category')
                .then(res => res.json())
                .then(data => setStats(data.statistics || []))
                .catch(err => console.error("Ошибка статистики:", err));
        }
    }, [view]);

    const deleteProduct = (id: number) => {
        if (window.confirm("Удалить этот товар?")) {
            fetch(`http://localhost:8000/api/products/${id}`, { method: 'DELETE' })
                .then(() => setProducts(prev => prev.filter(p => p.id !== id)))
                .catch(err => console.error("Ошибка удаления:", err));
        }
    };

    return (
        <div className={styles.adminPage}>
            <div className={styles.adminPage__buttons}>
                <p
                    className={view === 'products' ? styles.activeTab : ''}
                    onClick={() => setView('products')}
                >
                    Каталог товаров
                </p>
                <p
                    className={view === 'orders' ? styles.activeTab : ''}
                    onClick={() => setView('orders')}
                >
                    Список заказов
                </p>
                <p
                    className={view === 'statistics' ? styles.activeTab : ''}
                    onClick={() => setView('statistics')}
                >
                    Статистика заказов
                </p>
            </div>
            {view === 'products' && (
                <div className={styles.adminPage__catalog}>
                    <Link to='/admin/product/add'>
                        <div className={styles.basketPage__addProd}>+</div>
                    </Link>
                    <div className={styles.basketPage__description}>
                        <p className={styles.basketPage__name}>Название</p>
                        <p className={styles.basketPage__coast}>Цена</p>
                        <p className={styles.basketPage__info}>Описание</p>
                        <p className={styles.basketPage__category}>Категория</p>
                    </div>
                    {products.map(product => (
                        <div key={product.id} className={styles.basketItem}>
                            <img src={product.imagePath} alt={product.name} className={styles.basketItem__img}/>
                            <p className={styles.basketItem__title}>{product.name}</p>
                            <p>{product.price} руб.</p>
                            <p className={styles.basketItem__info}>{product.description?.slice(0, 50)}...</p>
                            <p className={styles.basketItem__category}>{product.category?.name || product.category_id}</p>
                            <div className={styles.basketItem__binWrapper} onClick={() => deleteProduct(product.id)}>
                                <TrashBin/>
                            </div>
                            <Link to={`/admin/product/edit/${product.id}`} className={styles.basketItem__editWrapper}>
                                <Edit />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
            {view === 'orders' && (
                <div className={styles.adminPage__orders}>
                    <div className={styles.basketPage__description}>
                        <p>ID Заказа</p>
                        <p className={styles.addressTitle}>Адрес</p>
                        <p className={styles.totalPriceTitle}>Сумма</p>
                        <p className={styles.dataTitle}>Дата</p>
                        <p className={styles.statusTitle}>Статус</p>
                    </div>
                    {[...orders].reverse().map(order => (
                        <div key={order.id} className={styles.basketItem}>
                            <p className={styles.id}>#{order.id}</p>
                            <p className={styles.address}>{order.address}</p>
                            <p className={styles.totalPrice}>{order.totalPrice} руб.</p>

                            <div className={styles.deliveryTimeInfo}>
                                <p>{order.deliveryDate}</p>
                                <p className={styles.timeSmall}>{order.deliveryTime}</p>
                            </div>

                            <p className={styles.statusBadgeWrap}>
                                <span className={styles.statusBadge}>{order.status}</span>
                            </p>
                            <div className={styles.statusButtons}>
                                {order.availableStatus && order.availableStatus.length > 0 ? (
                                    order.availableStatus.map((status: string) => (
                                        <button
                                            key={status}
                                            className={styles.changeStatusBtn}
                                            onClick={() => handleStatusChange(order.id, status)}
                                        >
                                            {status}
                                        </button>
                                    ))
                                ) : (
                                    <span className={styles.finalStatus}>История закрыта</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {view === 'statistics' && (
                <div className={styles.adminPage__stats}>
                    <p className={styles.statsTitle}>Продажи по категориям</p>
                    <div className={styles.statsGrid}>
                        {stats.map(item => {
                            const maxSold = Math.max(...stats.map(s => s.totalSold), 1);
                            const progress = (item.totalSold / maxSold) * 100;

                            return (
                                <div key={item.categoryId} className={styles.statCard}>
                                    <div className={styles.statCard__info}>
                                        <p className={styles.statCard__name}>{item.categoryName}</p>
                                        <p className={styles.statCard__value}>{item.totalSold} шт.</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {stats.length === 0 && <p>Данных о продажах пока нет</p>}
                </div>
            )}
        </div>
    )
}