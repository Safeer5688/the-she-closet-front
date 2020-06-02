export interface Product{
    _id: string;
    title: string;
    oldPrice: number;
    description: string;
    price: number;
    urduname:string;
    category: string;
    imageUrls: [];
    sizes: [];
    isSale: boolean;
    inStock: boolean;
}