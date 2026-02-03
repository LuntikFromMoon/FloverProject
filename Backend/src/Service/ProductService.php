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

    /**
     * @param array{name: string, description: string, price: float, categoryId: int, imageBase64: string} $data
     */
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

    /**
     * @param array{name?: string, description?: string, price?: float, categoryId?: int, imageBase64?: string} $data
     */
    public function updateProduct(int $id, array $data): Product
    {
        if (!isset($data['name'], $data['description'], $data['price'], $data['categoryId'])) {
            throw new \RuntimeException("Missing required fields");
        }

        /** @var Product|null $product */
        $product = $this->productRepository->find($id);
        if (!$product) {
            throw new \RuntimeException("Product not found");
        }

        /** @var string $name */
        $name = $data['name'];
        $product->setName($name);

        /** @var string $description */
        $description = $data['description'];
        $product->setDescription($description);

        /** @var float $price */
        $price = $data['price'];
        $product->setPrice($price);

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
        /** @var Product|null $product */
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
