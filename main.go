package main

import (
	"./controller"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func main() {

	router := gin.Default()
	router.Delims("[[", "]]")
	router.LoadHTMLGlob("./*.html")
	router.Static("/css", "./css")
	router.Static("/js", "./js")
	router.StaticFile("/favicon.ico", "./favicon.ico")
	router.Use(controller.CheckCookie())
	router.GET("/lists", controller.Getlists)
	router.POST("/todolist", controller.Newtodo)
	router.PUT("/todolist/:id/describe", controller.ChangeDescribe)
	router.PUT("/todolist/:id/status", controller.ChangeStatus)
	router.DELETE("/todolist/:id", controller.Deletetodo)
	router.POST("/signin", controller.VerifiesUser)
	router.POST("/signup", controller.CreateNewuser)
	router.NoRoute(controller.Gettingtodolist)
	router.Run(":80")

}
