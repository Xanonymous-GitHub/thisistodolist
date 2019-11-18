package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

type (
	LoginForm struct {
		Username string `json:"username" gorm : "primary_key;column:username"`
		Password string `json:"password" gorm : "column : password" `
	}
	TodoSQLmodel struct {
		Describe string `json:"user_input" gorm:"column:todo_describe"`
		Status   bool   `json:"status" gorm:"column:todo_status"`
		ID       uint   `json:"item_id" gorm:"primary_key;column:todo_id"`
		Username string `json:"username" gorm:"column:username"`
	}
	Status struct {
		Status bool `json:"status"`
	}
)

func main() {

	router := gin.Default()
	router.Delims("[[", "]]")
	router.LoadHTMLGlob("./*.html")
	router.Static("/css", "./css")
	router.Static("/js", "./js")
	router.Use(checkCookie())
	router.GET("/todolist", gettingtodolist)
	router.GET("/todolist/lists", getlists)
	router.POST("/todolist", newtodo)
	router.PUT("/todolist/:id", changeStatus)
	router.DELETE("/todolist/:id", deletetodo)
	router.GET("/login", getlogin)
	router.POST("/login", verifiesUser)
	router.POST("/register", createNewuser)
	router.Run(":8888")

}
func gettingtodolist(c *gin.Context) {
	c.HTML(200, "index.html", nil)
}
func getlists(c *gin.Context) {
	username, err := c.Cookie("username")
	if err != nil {
		c.String(403, "")
		return
	}
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()
	if err != nil {
		panic("failed to connect database")
	}
	var todos []TodoSQLmodel
	if username == "admin" {
		db.Table("todo").Find(&todos)
	} else {
		db.Table("todo").Where("username=?", username).Find(&todos)
	}
	c.JSON(http.StatusOK, todos)
}
func newtodo(c *gin.Context) {
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()
	if err != nil {
		panic("failed to connect database")
	}
	var newtodo TodoSQLmodel
	c.BindJSON(&newtodo)
	if newtodo.Describe == "" {
		c.JSON(403, nil)
	} else {
		err := db.Create(&newtodo).Error
		if err != nil {
			c.String(403, "")
			return
		}
		fmt.Println(newtodo)
		c.JSON(http.StatusOK, newtodo)
	}
}
func changeStatus(c *gin.Context) {
	id := c.Param("id")
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()
	if err != nil {
		panic("failed to connect database")
	}
	var status Status
	c.BindJSON(&status)
	fmt.Println(status.Status)
	db.Table("todo").Where("todo_id=?", id).Update("todo_status", status.Status)
	c.JSON(http.StatusOK, nil)
}
func deletetodo(c *gin.Context) {

	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()
	if err != nil {
		panic("failed to connect database")
	}
	db.Table("todo").Where("todo_id=?", c.Param("id")).Delete(TodoSQLmodel{})
}
func getlogin(c *gin.Context) {
	c.HTML(200, "login.html", nil)
}
func verifiesUser(c *gin.Context) {
	var userinfo LoginForm
	c.BindJSON(&userinfo)
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()

	if err != nil {
		panic("failed to connect database")
	}

	if db.Table("userinfo").Where("username=? password=?", userinfo.Username, userinfo.Password).First(&userinfo).RecordNotFound() {
		c.String(403, "")
	} else {
		c.SetCookie("username", userinfo.Username, 1000, "/", "35.189.167.203", false, true)
		c.SetCookie("password", userinfo.Password, 1000, "/", "35.189.167.203", false, true)
		c.String(200, "")
	}
}
func createNewuser(c *gin.Context) {
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist??charset=utf8&parseTime=True&loc=Local")
	defer db.Close()
	if err != nil {
		panic("failed to connect database")
	}
	var newuser LoginForm
	c.BindJSON(&newuser)
	err = db.Create(&newuser).Error
	if err != nil {
		c.String(403, "")
	} else {
		c.SetCookie("username", newuser.Username, 1000, "/", "35.189.167.203", false, true)
		c.SetCookie("password", newuser.Password, 1000, "/", "35.189.167.203", false, true)
		c.String(200, "")
	}

}
func checkCookie() gin.HandlerFunc {
	return func(c *gin.Context) {
		username, err := c.Cookie("username")
		if err != nil {
			c.Redirect(http.StatusUnauthorized, "/login")
			c.Abort()
			return
		}
		password, err := c.Cookie("password")
		if err != nil {
			c.Redirect(http.StatusUnauthorized, "/login")
			c.Abort()
			return
		}
		db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
		defer db.Close()

		if err != nil {
			panic("failed to connect database")
		}
		var userinfo LoginForm
		if db.Table("userinfo").Where("username=? password=?", username, password).First(&userinfo).RecordNotFound() {
			c.SetCookie("username", "", -1, "/", "35.189.167.203", false, true)
			c.SetCookie("password", "", -1, "/", "35.189.167.203", false, true)
			c.Redirect(http.StatusUnauthorized, "/login")
			c.Abort()
			return
		}

		c.Next()
	}
}
func (todo *TodoSQLmodel) TableName() string {
	return "todo"
}
