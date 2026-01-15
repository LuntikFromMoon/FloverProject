<?php

namespace App\Entity;

class ProductCategory
{
    public function __construct(
        private int $id,
        private ?string $name,
    ) {}

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }
}
