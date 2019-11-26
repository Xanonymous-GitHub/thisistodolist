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
	router.Use(controller.CheckCookie())
	router.NoRoute(controller.Gettingtodolist)
	router.POST("/todolist", controller.Newtodo)
	router.PUT("/todolist/:id/describe", controller.ChangeDescribe)
	router.PUT("/todolist/:id/status", controller.ChangeStatus)
	router.DELETE("/todolist/:id", controller.Deletetodo)
	router.POST("/signin", controller.VerifiesUser)
	router.POST("/signup", controller.CreateNewuser)
	router.Run(":8888")

}
