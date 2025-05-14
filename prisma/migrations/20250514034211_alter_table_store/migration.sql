/*
  Warnings:

  - You are about to drop the column `email` on the `stores` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `stores` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "stores_email_key";

-- AlterTable
ALTER TABLE "stores" DROP COLUMN "email",
DROP COLUMN "password";
