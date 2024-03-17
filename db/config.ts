import { defineDb, defineTable, column } from "astro:db";

const Users = defineTable({
  columns: {
    id: column.text(),
    username: column.text(),
    password: column.text(),
    email: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Users },
});
