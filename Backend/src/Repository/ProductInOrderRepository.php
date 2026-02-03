<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\ProductInOrder;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ProductInOrder>
 */
class ProductInOrderRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProductInOrder::class);
    }

    public function store(ProductInOrder $productInOrder): void
    {
        $this->getEntityManager()->persist($productInOrder);
        $this->getEntityManager()->flush();
    }

    /**
     * @return array<array{categoryId: int, categoryName: string, totalSold: int}>
     */
    public function getSalesByCategory(): array
    {
        return $this->createQueryBuilder('pio')
            ->select('pc.id as categoryId', 'pc.name as categoryName', 'SUM(pio.productQuantity) as totalSold')
            ->innerJoin('pio.product', 'p')
            ->innerJoin('p.productCategory', 'pc')
            ->groupBy('pc.id', 'pc.name')
            ->orderBy('totalSold', 'DESC')
            ->getQuery()
            ->getResult();
    }
}