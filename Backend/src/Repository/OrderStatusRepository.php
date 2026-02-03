<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\OrderStatus;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<OrderStatus>
 */
class OrderStatusRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OrderStatus::class);
    }

    public function store(OrderStatus $orderStatus): int
    {
        $this->getEntityManager()->persist($orderStatus);
        $this->getEntityManager()->flush();
        return $orderStatus->getId();
    }

    public function findByName(string $name): ?OrderStatus
    {
        /** @var OrderStatus|null */
        return $this->findOneBy(['name' => $name]);
    }

    public function delete(OrderStatus $orderStatus): void
    {
        $this->getEntityManager()->remove($orderStatus);
        $this->getEntityManager()->flush();
    }
}
