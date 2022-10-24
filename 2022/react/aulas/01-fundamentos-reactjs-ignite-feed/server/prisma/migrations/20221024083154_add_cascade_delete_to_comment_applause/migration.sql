-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comments_applause" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comment_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "comments_applause_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "comments_applause_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_comments_applause" ("comment_id", "id", "user_id") SELECT "comment_id", "id", "user_id" FROM "comments_applause";
DROP TABLE "comments_applause";
ALTER TABLE "new_comments_applause" RENAME TO "comments_applause";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
