/*
  Warnings:

  - You are about to drop the column `bottom` on the `components` table. All the data in the column will be lost.
  - You are about to drop the column `left` on the `components` table. All the data in the column will be lost.
  - You are about to drop the column `right` on the `components` table. All the data in the column will be lost.
  - You are about to drop the column `top` on the `components` table. All the data in the column will be lost.
  - Added the required column `x` to the `components` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `components` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "components" DROP COLUMN "bottom",
DROP COLUMN "left",
DROP COLUMN "right",
DROP COLUMN "top",
ADD COLUMN     "x" INTEGER NOT NULL,
ADD COLUMN     "y" INTEGER NOT NULL;
