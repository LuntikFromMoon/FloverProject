<?php

namespace App\Entity;

class ShopHasSupplier
{
    public function __construct(
        private int $id,
        private Shop $shop,
        private Supplier $supplier,
    ) {}

    public function getId(): int
    {
        return $this->id;
    }

    public function getShop(): Shop
    {
        return $this->shop;
    }

    public function getSupplier(): Supplier
    {
        return $this->supplier;
    }
}
