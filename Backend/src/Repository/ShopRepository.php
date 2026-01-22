<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Shop;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ShopRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Shop::class);
    }

    public function store(Shop $shop): int
    {
        $this->getEntityManager()->persist($shop);
        $this->getEntityManager()->flush();
        return $shop->getId();
    }

    public function delete(Shop $shop): void
    {
        $this->getEntityManager()->remove($shop);
        $this->getEntityManager()->flush();
    }

    public function deleteById(int $id): void
    {
        $shop = $this->getEntityManager()->getRepository(Shop::class)->find($id);
        if (!$shop) {
            throw new \RuntimeException();
        }

        $this->getEntityManager()->remove($shop);
        $this->getEntityManager()->flush();
    }
}
