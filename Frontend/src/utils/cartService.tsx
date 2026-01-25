export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    count: number;
}

export const getCart = (): CartItem[] => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

export const addToCart = (item: CartItem) => {
    const cart = getCart();
    const existingItem = cart.find(i => i.id === item.id);

    if (existingItem) {
        existingItem.count += item.count;
    } else {
        cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
};

export const updateCartQuantity = (id: number, newCount: number) => {
    let cart = getCart();
    cart = cart.map(item => item.id === id ? { ...item, count: newCount } : item);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
};

export const removeFromCart = (id: number) => {
    const cart = getCart().filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
};