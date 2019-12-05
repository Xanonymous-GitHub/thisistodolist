package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	echo.NotFoundHandler = func(c echo.Context) error {
		return c.File("./index.html")
	}
	server := echo.New()
	server.Pre(middleware.HTTPSNonWWWRedirect())
	server.Use(middleware.Logger())
	server.StartTLS(":443", "./certs/server.crt", "./certs/server.key")
}
