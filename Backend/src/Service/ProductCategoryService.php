<?php

declare(strict_types=1);

namespace App\Service;

use App\Repository\ProductCategoryRepository;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProductCategoryService
{
    public function __construct(
        private ProductCategoryRepository $productCategoryRepository
    )
    {
    }

    public function getAllProductCategories(): array
    {
        return $this->productCategoryRepository->findAll();
    }
}
