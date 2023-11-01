/*
  Warnings:

  - Changed the type of `course_tuition` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "course_tuition",
ADD COLUMN     "course_tuition" INTEGER NOT NULL;
