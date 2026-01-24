<?php

declare(strict_types=1);

namespace App\Controller;

use App\Repository\ProductCategoryRepository;
use App\Repository\ProductRepository;
use App\Service\ProductCategoryService;
use App\Service\ProductService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProductCategoryController extends AbstractController
{
    public function __construct(
        private ProductCategoryService $productCategoryService,
    )
    {
    }

    #[Route('/api/product-category', name: 'api_get_all_product_category', methods: ['GET'])]
    public function getAllProductCategories(): JsonResponse
    {
        $productCategories = $this->productCategoryService->getAllProductCategories();

        $productCategoriesData = array_map(function ($productCategory) {
            return [
                'id' => $productCategory->getId(),
                'name' => $productCategory->getName(),
            ];
        }, $productCategories);

        return $this->json([
            'status' => 'success',
            'productCategories' => $productCategoriesData,
        ]);
    }
}
