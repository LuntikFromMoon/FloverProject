<?php

namespace App\Entity;

class ShopHasSupplier
{
    public function __construct(
        private int $id,
        private int  $shopId,
        private int $supplierId,
    ) {}

    public function getId(): int
    {
        return $this->id;
    }

    public function getShopId(): int
    {
        return $this->shopId;
    }

    public function getSupplierId(): int
    {
        return $this->supplierId;
    }
}
