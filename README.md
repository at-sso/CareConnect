## Running the Application

NOTE: Docker might not work yet. Instead, run the npm commands.

1. **Start the Docker containers** for MariaDB:

   ```bash
   docker-compose up -d
   ```

2. **Initialize the Database**:
   You need to apply the SQL schema from `db/init.sql` to your database. This can be done using a MySQL client or by running:

   ```bash
   Get-Content db/init.sql | docker exec -i care_connect_db mariadb -uroot -pAdminroot123
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

## Testing the Application

You can test the application with the following credentials:

- **Cedula**: 123456789
- **Password**: password123

For password reset functionality, the token will be displayed in the console, as the application is running locally without email capabilities.
