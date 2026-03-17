/*
  Warnings:

  - Added the required column `category` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE menu_id_seq;
ALTER TABLE "Menu" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('menu_id_seq');
ALTER SEQUENCE menu_id_seq OWNED BY "Menu"."id";
