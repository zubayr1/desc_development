import sqlite3
import os

def connect_db(db_name):
    if os.path.exists(db_name):
        conn = sqlite3.connect(db_name)
        return conn
    else:
        print(f"Database {db_name} does not exist.")
        return None

def list_tables(conn):
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    return [table[0] for table in tables]

def fetch_data_from_table(conn, table_name):
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table_name};")
    rows = cursor.fetchall()
    return rows

def print_table_schema(conn, table_name):
    cursor = conn.cursor()
    cursor.execute(f"PRAGMA table_info({table_name});")
    columns = cursor.fetchall()
    print(f"Schema for table {table_name}:")
    for col in columns:
        print(f"{col[1]} ({col[2]})")

def main():
    # Let user select database
    print("Which database do you want to check?")
    print("1. users.db")
    print("2. acceptor.db")
    print("3. initiator.db")
    db_choice = input("Enter the number (1-3): ")

    db_map = {
        "1": "users.db",
        "2": "acceptor.db",
        "3": "initiator.db"
    }

    if db_choice not in db_map:
        print("Invalid choice. Exiting.")
        return

    db_name = db_map[db_choice]
    conn = connect_db(db_name)

    if conn:
        # List available tables
        tables = list_tables(conn)
        if not tables:
            print("No tables found in this database.")
            conn.close()
            return

        print(f"Tables in {db_name}: {', '.join(tables)}")

        # Let user select a table to inspect
        table_choice = input(f"Which table do you want to inspect? (Enter table name): ")
        if table_choice not in tables:
            print(f"Table {table_choice} does not exist.")
            conn.close()
            return

        # Display table schema
        print_table_schema(conn, table_choice)

        # Fetch and display data
        rows = fetch_data_from_table(conn, table_choice)
        if rows:
            print(f"\nData in {table_choice}:")
            for row in rows:
                print(row)
        else:
            print(f"No data found in table {table_choice}.")

        conn.close()

if __name__ == '__main__':
    main()