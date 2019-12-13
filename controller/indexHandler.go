package controller

import (
	"html/template"
	"net/http"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	index, _ := template.New("").Delims("[(", ")]").ParseFiles("dist/index.html")
	index.Execute(w, nil)
}