<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\ProductCategory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ProductCategory>
 */
class ProductCategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProductCategory::class);
    }

    public function store(ProductCategory $product): int
    {
        $this->getEntityManager()->persist($product);
        $this->getEntityManager()->flush();
        return $product->getId();
    }

    public function getCategoryById(int $id): ?ProductCategory
    {
        /** @var ProductCategory|null */
        return $this->find($id);
    }

    public function delete(ProductCategory $product): void
    {
        $this->getEntityManager()->remove($product);
        $this->getEntityManager()->flush();
    }
}

