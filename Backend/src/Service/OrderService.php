<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Order;
use App\Entity\ProductInOrder;
use App\Repository\OrderRepository;
use App\Repository\OrderStatusRepository;
use App\Repository\ProductInOrderRepository;
use App\Repository\ProductRepository;
use App\Repository\ShopRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

class OrderService
{
    public function __construct(
        private OrderRepository $orderRepository,
        private ShopRepository $shopRepository,
        private OrderStatusRepository $orderStatusRepository,
        private UserRepository $userRepository,
        private ProductRepository $productRepository,
        private ProductInOrderRepository $productInOrderRepository,
        private EntityManagerInterface $entityManager
    )
    {
    }

    public function createOrder(array $data, int $userId): Order
    {
        if (!$user = $this->userRepository->find($userId)) {
            throw new \RuntimeException('User not found');
        }

        if (!$shop = $this->shopRepository->find($data['shopId'])) {
             throw new \RuntimeException("Shop not found");
        }

        if (!$status = $this->orderStatusRepository->find(1)) {
            throw new \RuntimeException("Status not found");
        }

        if (!isset($data['products']) || !is_array($data['products'])) {
            throw new \RuntimeException("Products array is required");
        }

        try {
            $this->entityManager->beginTransaction();

            $order = new Order(
                null,
                $shop,
                $status,
                $user,
                new \DateTime(),
                $data['address'],
                $data['totalPrice'],
            );

            $orderId = $this->orderRepository->store($order);

            foreach ($data['products'] as $productData) {
                if (!isset($productData['productId']) || !isset($productData['quantity'])) {
                    throw new \RuntimeException("Each product must have productId and quantity");
                }

                $product = $this->productRepository->find($productData['productId']);
                if (!$product) {
                    throw new \RuntimeException("Product with id {$productData['productId']} not found");
                }

                $productInOrder = new ProductInOrder(
                    null,
                    $product,
                    $order,
                    $productData['quantity'],
                );

                $this->productInOrderRepository->store($productInOrder);
            }

            $this->entityManager->commit();
        } catch (\Exception $e) {
            $this->entityManager->rollback();
            throw new \RuntimeException("Error creating order: " . $e->getMessage());
        }

        return $order;
    }

    public function getAllOrders(): array
    {
        return $this->orderRepository->findAllOrders();
    }

    public function getOrderById(int $id): ?Order
    {
        return $this->orderRepository->findOrderById($id);
    }

    public function deleteOrderById(int $id): void
    {
        $this->orderRepository->deleteById($id);
    }
}
