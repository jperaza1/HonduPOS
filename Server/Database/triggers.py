import sqlite3

actions = ["INSERT", "UPDATE", "DELETE"]
con = sqlite3.connect("./pos.db")
cur = con.cursor()
cur.execute(
    "SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%'"
)
tables = []
for data in cur.fetchall():
    cur.execute("PRAGMA table_info({})".format(data[0]))
    tables.append({"name": data[0], "pk": cur.fetchone()[1]})

with open("queries.sql", "w") as f:
    f.write("-- Creating log tables\n")
    for table in tables:
        f.write(
            "CREATE TABLE {}_LOG(id PRIMARY KEY, accion text not null,affectado text not null, fecha text not null);\n".format(
                table["name"]
            )
        )
        f.write("\n")

    f.write("\n")
    f.write("\n")
    f.write("\n")

    for table in tables:
        f.write("--Making triggers for {}\n".format(table["name"]))
        for action in actions:
            if action is not "DELETE":
                f.write(
                    "CREATE TRIGGER {}_{}_TRIGGER AFTER {} ON {} BEGIN INSERT INTO {}_LOG(accion,affectado,fecha) values('{}',NEW.{},datetime('now')); END;\n".format(
                        table["name"],
                        action,
                        action,
                        table["name"],
                        table["name"],
                        action,
                        table["pk"],
                    )
                )
            else:
                f.write(
                    "CREATE TRIGGER {}_{}_TRIGGER AFTER {} ON {} BEGIN INSERT INTO {}_LOG(accion,affectado,fecha) values('{}',OLD.{},datetime('now')); END;\n".format(
                        table["name"],
                        action,
                        action,
                        table["name"],
                        table["name"],
                        action,
                        table["pk"],
                    )
                )
        f.write("\n")
