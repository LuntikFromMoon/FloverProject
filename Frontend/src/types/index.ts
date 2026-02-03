export interface ProductCategory {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imagePath: string;
    category_id?: number;
    category?: ProductCategory;
}

export interface Order {
    id: number;
    address: string;
    totalPrice: number;
    deliveryDate: string;
    deliveryTime: string;
    status: string;
    availableStatus: string[];
}

export interface SalesStatistics {
    categoryId: number;
    categoryName: string;
    totalSold: number;
}
