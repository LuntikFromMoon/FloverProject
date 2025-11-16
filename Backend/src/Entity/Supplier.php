<?php

namespace App\Entity;

class Supplier
{
    public function __construct(
        private int $id,
        private string $name,
        private string $phone
    ) {}

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getPhone(): string
    {
        return $this->phone;
    }
}
