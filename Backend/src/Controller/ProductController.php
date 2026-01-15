<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\ProductService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Product;

class ProductController extends AbstractController
{
    public function __construct(
        private ProductService $productService,
        private EntityManagerInterface $entityManager
    )
    {}

    #[Route('/api/products', name: 'api_products', methods: ['GET'])]
    public function getProducts(): JsonResponse
    {
        $productRepository = $this->entityManager->getRepository(Product::class);
        $products = $productRepository->findAll();

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

    #[Route('/api/products', name: 'api_products_create', methods: ['POST'])]
    public function addProduct(Request $request): JsonResponse
    {
        $data = $request->toArray();

        $this->productService->createProduct($data);

        return $this->json(['status' => 'success']);
    }
}
