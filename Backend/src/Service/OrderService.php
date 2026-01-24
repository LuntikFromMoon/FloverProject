<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Order;
use App\Entity\OrderStatus;
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

        $deliveryDateStr = $data['deliveryDate'] . ' ' . $data['deliveryTime'];
        $deliveryFullDate = \DateTime::createFromFormat('d.m.Y H:i', $deliveryDateStr, new \DateTimeZone('Europe/Moscow'));

        if (!$deliveryFullDate) {
            throw new \RuntimeException('Invalid delivery date or time format');
        }

        $minDeliveryTime = new \DateTime('+1 hour');
        if ($deliveryFullDate < $minDeliveryTime) {
            throw new \RuntimeException('Delivery date must be at least 1 hour from now');
        }

        try {
            $this->entityManager->beginTransaction();

            $order = new Order(
                null,
                $shop,
                $status,
                $user,
                new \DateTime('now', new \DateTimeZone('Europe/Moscow')),
                $deliveryFullDate,
                $data['address'],
                $data['recipientName'],
                $data['recipientPhone'],
                $data['senderName'],
                $data['senderPhone'],
                $data['description'],
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

    public function changeStatus(int $id, string $statusName): void
    {
        $order = $this->orderRepository->findOrderById($id);
        if (!$order) {
            throw new \RuntimeException("Order with id {$id} not found");
        }

        $status = $this->orderStatusRepository->findByName($statusName);
        if (!$status) {
            throw new \RuntimeException("Status not found");
        }

        $currentStatus = $order->getStatus()->getName();
        $availableStatuses = OrderStatus::getAvailableStatuses($currentStatus);

        if (!in_array($statusName, $availableStatuses, true)) {
            throw new \RuntimeException("Cannot change status from {$currentStatus} to {$statusName}. Available statuses: " . implode(', ', $availableStatuses));
        }

        $order->setStatus($status);

        try {
            $this->orderRepository->store($order);
        } catch (\Exception $e) {
            throw new \RuntimeException("Error updating order status");
        }
    }

    public function getNextStatus($currentStatusName): array
    {
        return OrderStatus::getAvailableStatuses($currentStatusName);
    }

    public function getSalesByCategory(): array
    {
        return $this->productInOrderRepository->getSalesByCategory();
    }
}
