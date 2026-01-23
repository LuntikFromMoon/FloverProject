<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    public function store(Product $product): int
    {
        $this->getEntityManager()->persist($product);
        $this->getEntityManager()->flush();
        return $product->getId();
    }

    public function delete(Product $product): void
    {
        $this->getEntityManager()->remove($product);
        $this->getEntityManager()->flush();
    }

    public function deleteById(int $id): void
    {
        $product = $this->getEntityManager()->getRepository(Product::class)->find($id);
        if (!$product) {
            throw new \RuntimeException();
        }

        $this->getEntityManager()->remove($product);
        $this->getEntityManager()->flush();
    }

    public function findWithFilters(
        ?int $category = null,
        ?float $minPrice = null,
        ?float $maxPrice = null,
        ?string $search = null,
        ?string $sort = null,
        string $order = 'asc'
    ): array {
        $qb = $this->createQueryBuilder('p');

        if ($category !== null) {
            $qb->andWhere('p.productCategory = :category')
               ->setParameter('category', $category);
        }

        if ($minPrice !== null) {
            $qb->andWhere('p.price >= :minPrice')
               ->setParameter('minPrice', $minPrice);
        }

        if ($maxPrice !== null) {
            $qb->andWhere('p.price <= :maxPrice')
               ->setParameter('maxPrice', $maxPrice);
        }

        if ($search !== null) {
            $qb->andWhere('p.name LIKE :search')
               ->setParameter('search', '%' . $search . '%');
        }

        if ($sort !== null) {
            $order = strtolower($order) === 'desc' ? 'DESC' : 'ASC';

            if ($sort === 'price') {
                $qb->orderBy('p.price', $order);
            } elseif ($sort === 'name') {
                $qb->orderBy('p.name', $order);
            }
        }

        return $qb->getQuery()->getResult();
    }
}
