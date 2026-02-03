<?php

namespace App\Entity;

class OrderStatus
{
    public function __construct(
        private int $id,
        private string $name
    ) {}

    /**
     * @return array<string>
     */
    public static function getAvailableStatuses(string $currentStatus): array
    {
        $availableStatuses = [
            'В ожидании подтверждения' => ['Принят в обработку', 'Отменён'],
            'Принят в обработку' => ['В доставке', 'Отменён'],
            'В доставке' => ['Доставлен', 'Отменён'],
            'Доставлен' => [],
            'Отменён' => []
        ];

        return $availableStatuses[$currentStatus] ?? [];
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
