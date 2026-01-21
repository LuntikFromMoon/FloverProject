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
}
