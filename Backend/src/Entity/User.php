<?php

declare(strict_types=1);

namespace App\Entity;

class User
{
    public function __construct(
        private ?int $id,
        private UserRole $userRole,
        private string $firstName,
        private string $lastName,
        private string $surname,
        private \DateTime $birthDate,
        private ?string $phone,
        private string $email,
        private string $password,
    ) {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserRole(): UserRole
    {
        return $this->userRole;
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function getSurname(): string
    {
        return $this->surname;
    }

    public function getBirthDate(): \DateTime
    {
        return $this->birthDate;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }
}
