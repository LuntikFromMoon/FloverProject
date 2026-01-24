<?php

declare(strict_types=1);

namespace App\Controller;

use App\Repository\ProductRepository;
use App\Service\ProductService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProductController extends AbstractController
{
    public function __construct(
        private ProductService    $productService,
        private ProductRepository $productRepository,
    )
    {
    }

    #[Route('/api/products', name: 'api_products_show', methods: ['GET'])]
    public function getProducts(Request $request): JsonResponse
    {
        $category = $request->query->get('category');
        $minPrice = $request->query->get('minPrice');
        $maxPrice = $request->query->get('maxPrice');
        $search = $request->query->get('search');
        $sort = $request->query->get('sort');
        $order = $request->query->get('order', 'asc');

        $products = $this->productRepository->findWithFilters(
            is_numeric($category) ? (int) $category : null,
            is_numeric($minPrice) ? (float) $minPrice : null,
            is_numeric($maxPrice) ? (float) $maxPrice : null,
            $search,
            $sort,
            $order
        );

        $data = array_map(function ($product) {
            return [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'imagePath' => $product->getImagePath(),
                'category' => [
                    'id' => $product->getProductCategory()->getId(),
                    'name' => $product->getProductCategory()->getName(),
                ],
            ];
        }, $products);

        return $this->json($data);
    }

    #[Route('/api/products', name: 'api_create_product', methods: ['POST'])]
    public function createProduct(Request $request): JsonResponse
    {
        $data = $request->toArray();

        $this->productService->createProduct($data);

        return $this->json(['status' => 'success']);
    }

    #[Route('/api/products/{id}', name: 'api_get_product', methods: ['GET'])]
    public function getProduct(int $id): JsonResponse
    {
        $product = $this->productRepository->find($id);
        if (!$product) {
            return $this->json([
                'status' => 'error',
                'message' => 'Product not found',
            ], 404);
        }

        return $this->json([
            'status' => 'success',
            'product' => [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'imagePath' => $product->getImagePath(),
                'category' => [
                    'id' => $product->getProductCategory()->getId(),
                    'name' => $product->getProductCategory()->getName(),
                ],
            ],
        ]);
    }


    #[Route('/api/products/{id}', name: 'api_update_product', methods: ['PUT'])]
    public function updateProduct(Request $request, int $id): JsonResponse
    {
        $data = $request->toArray();

        try {
            $product = $this->productService->updateProduct($id, $data);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ]);
        }

        return $this->json([
            'status' => 'success',
            'product' => [
                'id' => $id,
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'imagePath' => $product->getImagePath(),
                'category' => [
                    'id' => $product->getProductCategory()->getId(),
                    'name' => $product->getProductCategory()->getName(),
                ]
            ]
        ]);
    }

    #[Route('/api/products/{id}', name: 'api_delete_product', methods: ['DELETE'])]
    public function deleteProduct(int $id): JsonResponse
    {
        $this->productService->deleteProduct($id);

        return $this->json([
            'status' => 'success',
            'message' => "Product with id $id has been deleted",
        ]);
    }
}
