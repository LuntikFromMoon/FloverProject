<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Product;
use App\Entity\ProductCategory;
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
            null
        );

        $productId = $this->productRepository->store($product);
        if (!$productId) {
            throw new \RuntimeException("Product not created");
        }

        $imagePath = $this->imageService->saveImageBase64("catalog/", $data["imageBase64"]);
        $product->setImagePath("/public/" . $imagePath);
        $this->productRepository->store($product);

        return $product;
    }

    public function updateProduct(int $id, array $data): Product
    {
        if (!$product = $this->productRepository->find($id)) {
            throw new \RuntimeException("Product not found");
        }

        $product->setName($data['name']);
        $product->setDescription($data['description']);
        $product->setPrice($data['price']);

        $category = $this->productCategoryRepository->getCategoryById($data['categoryId']);
        if (!$category) {
            throw new \RuntimeException("Category not found");
        }

        $product->setProductCategory($category);

        try {
            $this->productRepository->store($product);
        } catch ( \Exception $e ) {
            throw new \RuntimeException($e->getMessage());
        }

        if (isset($data['imageBase64'])) {
            try {
                $this->productRepository->store($product);
            } catch ( \Exception $e ) {
                throw new \RuntimeException($e->getMessage());
            }

            $imagePath = $this->imageService->saveImageBase64("catalog/", $data["imageBase64"]);
            $product->setImagePath("/public/" . $imagePath);
            $this->productRepository->store($product);
        }

        return $product;
    }

    public function deleteProduct(int $id): void
    {
        $product = $this->productRepository->find($id);
        if (!$product) {
            throw new \RuntimeException("Product not found");
        }

        $imagePath = $product->getImagePath();
        if ($imagePath) {
            $relativePath = str_replace("/public/", "", $imagePath);
            $this->imageService->deleteImage($relativePath);
        }

        $this->productRepository->delete($product);
    }
}
