<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260124163002 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE "order" ADD delivery_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE "order" ADD recipient_name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE "order" ADD recipient_phone VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE "order" ADD sender_name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE "order" ADD sender_phone VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE "order" ADD description VARCHAR(1000) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE "order" DROP delivery_date');
        $this->addSql('ALTER TABLE "order" DROP recipient_name');
        $this->addSql('ALTER TABLE "order" DROP recipient_phone');
        $this->addSql('ALTER TABLE "order" DROP sender_name');
        $this->addSql('ALTER TABLE "order" DROP sender_phone');
        $this->addSql('ALTER TABLE "order" DROP description');
    }
}
