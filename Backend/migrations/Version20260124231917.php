<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260124231917 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE "order" DROP CONSTRAINT fk_f52993984d16c4dd');
        $this->addSql('DROP INDEX idx_f52993984d16c4dd');
        $this->addSql('ALTER TABLE "order" DROP shop_id');
        $this->addSql('ALTER TABLE "order" ALTER status_id DROP DEFAULT');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE "order" ADD shop_id SMALLINT NOT NULL');
        $this->addSql('ALTER TABLE "order" ALTER status_id SET DEFAULT 1');
        $this->addSql('ALTER TABLE "order" ADD CONSTRAINT fk_f52993984d16c4dd FOREIGN KEY (shop_id) REFERENCES shop (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_f52993984d16c4dd ON "order" (shop_id)');
    }
}
