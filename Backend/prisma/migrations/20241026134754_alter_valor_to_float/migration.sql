/*
  Warnings:

  - You are about to alter the column `valor` on the `Financas` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Financas" (
    "id_financas" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT,
    "categoria" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Financas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Financas" ("categoria", "created_at", "descricao", "id_financas", "tipo", "userId", "valor") SELECT "categoria", "created_at", "descricao", "id_financas", "tipo", "userId", "valor" FROM "Financas";
DROP TABLE "Financas";
ALTER TABLE "new_Financas" RENAME TO "Financas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
