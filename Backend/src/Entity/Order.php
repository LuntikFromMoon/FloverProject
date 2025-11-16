<?php

declare(strict_types=1);

namespace App\Entity;

class Order
{
    public function __construct(
        private int $id,
        private int $shopId,
        private int $statusId,
        private int $userId,
        private \DateTime $createdAt,
        private string $address,
        private float $totalPrice,
    ) {}

    public function getId(): int
    {
        return $this->id;
    }

    public function getProductId(): int
    {
        return $this->productId;
    }

    public function getShopId(): int
    {
        return $this->shopId;
    }

    public function getStatusId(): int
    {
        return $this->statusId;
    }

    public function getUserId(): int
    {
        return $this->userId;
    }

    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }

    public function getAddress(): string
    {
        return $this->address;
    }

    public function getTotalPrice(): float
    {
        return $this->totalPrice;
    }
}
