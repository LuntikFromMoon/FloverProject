<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Product;
use App\Repository\ProductCategoryRepository;
use App\Repository\ProductRepository;

class ProductService
{
    public function __construct(
        private ProductRepository $productRepository,
        private ProductCategoryRepository $productCategoryRepository,
        private ImageService $imageService,
    )
    {}

    public function createProduct(array $data): Product
    {
        $imagePath = $this->imageService->saveImageBase64("catalog/", $data["imageBase64"]);

        $category = $this->productCategoryRepository->getCategoryById($data['categoryId']);
        if (!$category) {
            throw new \RuntimeException("Category not found");
        }

        $product = new Product(
            null,
            $category,
            $data['name'],
            $data['description'],
            $data['price'],
            "/public/" . $imagePath
        );

        $productId = $this->productRepository->store($product);
        if (!$productId) {
            throw new \RuntimeException("Product not created");
        }

        return $product;
    }

    public function deleteProduct(int $id): void
    {
        $product = $this->productRepository->find($id);
        if (!$product) {
            throw new \RuntimeException("Product not found");
        }

        $this->productRepository->deleteById($id);
    }
}
