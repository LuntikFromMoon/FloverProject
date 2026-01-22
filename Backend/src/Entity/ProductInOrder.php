<?php

declare(strict_types=1);

namespace App\Entity;

class ProductInOrder
{
    public function __construct(
        private ?int $id,
        private Product $product,
        private Order $order,
        private int $productQuantity,
    ) {}

    public function getId(): int
    {
        return $this->id;
    }

    public function getProduct(): Product
    {
        return $this->product;
    }

    public function getOrder(): Order
    {
        return $this->order;
    }

    public function getProductQuantity(): int
    {
        return $this->productQuantity;
    }
}
