package controller

import (
	"fmt"
	"net/http"

	"../model"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func Gettingtodolist(c *gin.Context) {
	c.HTML(200, "index.html", nil)
}
func Getlists(c *gin.Context) {
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
	var todos []model.TodoSQLmodel
	if username == "admin" {
		db.Table("todo").Find(&todos)
	} else {
		err = db.Table("todo").Where("username=?", username).Find(&todos).Error
		if err != nil {
			panic(err)
		}
	}
	fmt.Println(todos)
	c.JSON(http.StatusOK, todos)
}
func Newtodo(c *gin.Context) {
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()
	if err != nil {
		panic("failed to connect database")
	}
	var newtodo model.TodoSQLmodel
	c.BindJSON(&newtodo)
	newtodo.Username, err = c.Cookie("username")
	if err != nil {
		panic("cookie get error")
	}
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
func ChangeStatus(c *gin.Context) {
	id := c.Param("id")
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()
	if err != nil {
		panic("failed to connect database")
	}
	var status model.Status
	c.BindJSON(&status)
	fmt.Println(status.Status)
	db.Table("todo").Where("todo_id=?", id).Update("todo_status", status.Status)
	c.JSON(http.StatusOK, nil)
}
func ChangeDescribe(c *gin.Context) {
	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic("failed to connect database")
	}
	id := c.Param("id")
	var describe model.TodoSQLmodel
	c.BindJSON(&describe)
	err = db.Where("todo_id=?", id).Update("todo_describe=?", describe.Describe).Error
	if err != nil {
		c.String(http.StatusBadRequest, "")
	} else {
		c.String(200, "")
	}
}
func Deletetodo(c *gin.Context) {

	db, err := gorm.Open("mysql", "wayne:Fuck06050@/todolist?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()
	if err != nil {
		panic("failed to connect database")
	}
	db.Table("todo").Where("todo_id=?", c.Param("id")).Delete(model.TodoSQLmodel{})
}
