<?php

declare(strict_types=1);

namespace App\Entity;

class Order
{
    public function __construct(
        private ?int $id,
        private Shop $shop,
        private OrderStatus $status,
        private User $user,
        private \DateTime $createdAt,
        private string $address,
        private float $totalPrice,
    ) {}

    public function getId(): int
    {
        return $this->id;
    }

    public function getShop(): Shop
    {
        return $this->shop;
    }

    public function getStatus(): OrderStatus
    {
        return $this->status;
    }

    public function getUser(): User
    {
        return $this->user;
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
