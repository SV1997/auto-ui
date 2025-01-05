-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workshop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "workshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "components" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "workshopId" INTEGER NOT NULL,
    "top" INTEGER NOT NULL,
    "left" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "bottom" INTEGER NOT NULL,
    "right" INTEGER NOT NULL,

    CONSTRAINT "components_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workshop" ADD CONSTRAINT "workshop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "components" ADD CONSTRAINT "components_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
