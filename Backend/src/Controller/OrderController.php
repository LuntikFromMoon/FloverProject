<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\OrderService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class OrderController extends AbstractController
{
    public function __construct(
        private OrderService $orderService
    )
    {
    }

    #[Route('/api/orders', name: 'api_create_order', methods: ['POST'])]
    public function createOrder(Request $request): JsonResponse
    {
        $data = $request->toArray();

        $order = $this->orderService->createOrder($data, 1);

        return $this->json([
            'status' => 'success',
            'order' => [
                'id' => $order->getId(),
                'shop' => [
                    'shopId' => $order->getShop()->getId(),
                    'city' => $order->getShop()->getCity(),
                    'street' => $order->getShop()->getStreet(),
                    'build' => $order->getShop()->getBuild(),

                ],
                'status' => $order->getStatus()->getName(),
                'createdAt' => $order->getCreatedAt()->format('Y-m-d H:i:s'),
                'deliveryDate' => $order->getDeliveryDate()->format('Y-m-d H:i:s'),
                'address' => $order->getAddress(),
                'recipientName' => $order->getRecipientName(),
                'recipientPhone' => $order->getRecipientPhone(),
                'senderName' => $order->getSenderName(),
                'senderPhone' => $order->getSenderPhone(),
                'description' => $order->getDescription(),
                'totalPrice' => $order->getTotalPrice(),
            ]
        ]);
    }

    #[Route('/api/orders', name: 'api_get_orders', methods: ['GET'])]
    public function getOrders(): JsonResponse
    {
        $orders = $this->orderService->getAllOrders();

        $ordersData = array_map(function ($order) {
            return [
                'id' => $order->getId(),
                'shop' => [
                    'shopId' => $order->getShop()->getId(),
                    'city' => $order->getShop()->getCity(),
                    'street' => $order->getShop()->getStreet(),
                    'build' => $order->getShop()->getBuild(),
                ],
                'status' => $order->getStatus()->getName(),
                'createdAt' => $order->getCreatedAt()->format('Y-m-d H:i:s'),
                'address' => $order->getAddress(),
                'totalPrice' => $order->getTotalPrice(),
            ];
        }, $orders);

        return $this->json([
            'status' => 'success',
            'orders' => $ordersData,
        ]);
    }

    #[Route('/api/orders/{id}', name: 'api_get_order', methods: ['GET'])]
    public function getOrder(int $id): JsonResponse
    {
        $order = $this->orderService->getOrderById($id);

        if (!$order) {
            return $this->json([
                'status' => 'error',
                'message' => 'Order not found',
            ], 404);
        }

        return $this->json([
            'status' => 'success',
            'order' => [
                'id' => $order->getId(),
                'shop' => [
                    'shopId' => $order->getShop()->getId(),
                    'city' => $order->getShop()->getCity(),
                    'street' => $order->getShop()->getStreet(),
                    'build' => $order->getShop()->getBuild(),
                ],
                'status' => $order->getStatus()->getName(),
                'createdAt' => $order->getCreatedAt()->format('Y-m-d H:i:s'),
                'address' => $order->getAddress(),
                'totalPrice' => $order->getTotalPrice(),
            ]
        ]);
    }

    #[Route('/api/orders/{id}', name: 'api_delete_order', methods: ['DELETE'])]
    public function deleteOrder(int $id): JsonResponse
    {
        try {
            $this->orderService->deleteOrderById($id);

            return $this->json([
                'status' => 'success',
                'message' => 'Order deleted successfully',
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => 'Failed to delete order',
            ], 500);
        }
    }
}
