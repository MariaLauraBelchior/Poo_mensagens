-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "quantityLikes" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL
);
