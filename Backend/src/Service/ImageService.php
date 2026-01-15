<?php

declare(strict_types=1);

namespace App\Service;

class ImageService
{
    private string $uploadDir = "../../Frontend/public/";

    public function saveImageBase64(string $imageDir, string $base64): string
    {
        $base64Data = explode(',', $base64);
        $image = base64_decode($base64Data[1]);
        $extension = $this->getMimeTypeByBase64($base64);

        $imageName = $this->generateFileName($extension);
        $imagePath = $imageDir . $imageName;

        file_put_contents($this->uploadDir . $imagePath, $image);

        return $imagePath;
    }

    public function generateFileName(string $extension): string
    {
        return uniqid("product_image_", true) . ".$extension";
    }

    // TODO: Ограничить возможные расширения
    public function getMimeTypeByBase64(string $base64): string
    {
        $base64Data = explode(',', $base64);
        $mimePart = explode('/', $base64Data[0])[1];

        return explode(';', $mimePart)[0];
    }
}
