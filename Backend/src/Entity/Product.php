<?php

namespace App\Entity;

class Product
{
    public function __construct(
        private ?int $id,
        private ProductCategory $productCategory,
        private string $name,
        private string $description,
        private float $price,
        private ?string $imagePath,
    ) {}

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProductCategory(): ProductCategory
    {
        return $this->productCategory;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function setProductCategory(ProductCategory $productCategory): void
    {
        $this->productCategory = $productCategory;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function setPrice(float $price): void
    {
        $this->price = $price;
    }

    public function setImagePath(?string $imagePath): void
    {
        $this->imagePath = $imagePath;
    }
}
