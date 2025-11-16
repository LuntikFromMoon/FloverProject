<?php

namespace App\Entity;

class Shop
{
    public function __construct(
        private int $id,
        private string $name,
        private string $city,
        private string $street,
        private string $build,
    ) {}

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function getStreet(): string
    {
        return $this->street;
    }

    public function getBuild(): string
    {
        return $this->build;
    }
}
