package controller

import (
	"net/http"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "thisistodolist/dist/index.html")
}
