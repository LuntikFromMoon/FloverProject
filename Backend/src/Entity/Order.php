<?php

declare(strict_types=1);

namespace App\Entity;

class Order
{
    public function __construct(
        private ?int $id,
        private OrderStatus $status,
        private User $user,
        private \DateTime $createdAt,
        private \DateTime $deliveryDate,
        private string $address,
        private string $recipientName,
        private string $recipientPhone,
        private string $senderName,
        private string $senderPhone,
        private string $description,
        private float $totalPrice,
    ) {}

    public function setStatus(OrderStatus $status): void
    {
        $this->status = $status;
    }

    public function getDeliveryDate(): \DateTime
    {
        return $this->deliveryDate;
    }

    public function setDeliveryDate(\DateTime $deliveryDate): void
    {
        $this->deliveryDate = $deliveryDate;
    }

    public function getRecipientName(): string
    {
        return $this->recipientName;
    }

    public function setRecipientName(string $recipientName): void
    {
        $this->recipientName = $recipientName;
    }

    public function getRecipientPhone(): string
    {
        return $this->recipientPhone;
    }

    public function setRecipientPhone(string $recipientPhone): void
    {
        $this->recipientPhone = $recipientPhone;
    }

    public function getSenderName(): string
    {
        return $this->senderName;
    }

    public function setSenderName(string $senderName): void
    {
        $this->senderName = $senderName;
    }

    public function getSenderPhone(): string
    {
        return $this->senderPhone;
    }

    public function setSenderPhone(string $senderPhone): void
    {
        $this->senderPhone = $senderPhone;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatus(): OrderStatus
    {
        /** @var OrderStatus */
        return $this->status;
    }

    public function getUser(): User
    {
        /** @var User */
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
