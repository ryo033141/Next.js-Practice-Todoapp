-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_status_id_fkey";

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "status_id" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
