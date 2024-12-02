package db

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func LoadEnvVariables() error {
	err := godotenv.Load("config//databasesql.env")
	if err != nil {
		return fmt.Errorf("не удалось загрузить .env файл: %v", err)
	}
	return nil
}

func Connect() error {
	dbUser := GetEnvVariable("DB_USER")
	dbPassword := GetEnvVariable("DB_PASSWORD")
	dbName := GetEnvVariable("DB_NAME")
	dbSslMode := GetEnvVariable("DB_SSLMODE")

	dbHost := GetEnvVariable("DB_HOST")
	if dbHost == "" {
		dbHost = "localhost"
	}

	connStr := fmt.Sprintf(
		"postgres://%s:%s@%s/%s?sslmode=%s",
		dbUser,
		dbPassword,
		dbHost,
		dbName,
		dbSslMode,
	)

	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		return fmt.Errorf("ошибка подключения к базе данных: %v", err)
	}

	err = DB.Ping()
	if err != nil {
		return fmt.Errorf("ошибка подключения к базе данных: %v", err)
	}

	fmt.Println("Успешное подключение к базе данных")
	return nil
}

func GetEnvVariable(key string) string {
	return os.Getenv(key)
}
