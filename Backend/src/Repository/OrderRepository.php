<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Order;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Order>
 */
class OrderRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Order::class);
    }

    public function store(Order $order): int
    {
        $this->getEntityManager()->persist($order);
        $this->getEntityManager()->flush();
        $id = $order->getId();
        if ($id === null) {
            throw new \RuntimeException('Failed to generate order ID');
        }
        return $id;
    }

    public function delete(Order $order): void
    {
        $this->getEntityManager()->remove($order);
        $this->getEntityManager()->flush();
    }

    public function deleteById(int $id): void
    {
        $order = $this->getEntityManager()->getRepository(Order::class)->find($id);
        if (!$order) {
            throw new \RuntimeException();
        }

        $this->getEntityManager()->remove($order);
        $this->getEntityManager()->flush();
    }

    /**
     * @return array<Order>
     */
    public function findAllOrders(): array
    {
        return $this->findAll();
    }

    public function findOrderById(int $id): ?Order
    {
        return $this->find($id);
    }
}
