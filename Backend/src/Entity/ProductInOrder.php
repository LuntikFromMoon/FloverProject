<?php

namespace App\Entity;

class ProductInOrder
{
    public function __construct(
        private int $id,
        private int $productId,
        private int $orderId,
        private int $productQuantity,
    ) {}

    public function getId(): int
    {
        return $this->id;
    }

    public function getProductId(): int
    {
        return $this->productId;
    }

    public function getOrderId(): int
    {
        return $this->orderId;
    }

    public function getProductQuantity(): int
    {
        return $this->productQuantity;
    }
}
