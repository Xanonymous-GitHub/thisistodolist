package main

import (
	"github.com/99designs/gqlgen/handler"
	"github.com/Xanonymous-GitHub/thisistodolist/controller"
	"github.com/Xanonymous-GitHub/thisistodolist/graphql"
	"github.com/Xanonymous-GitHub/thisistodolist/graphql/reslover"
	prisma "github.com/Xanonymous-GitHub/thisistodolist/prisma/client"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	client := prisma.New(nil)
	workDir, _ := os.Getwd()
	fileDir := filepath.Join(workDir, "thisistodolist/dist")
	var resolver = &reslover.Resolver{
		Prisma: client,
	}
	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(middleware.URLFormat)
	router.Use(controller.Auth(client))
	controller.FileServer(router, "/", http.Dir(fileDir))
	router.Get("/", controller.IndexHandler)
	router.Get("/unfinished", controller.IndexHandler)
	router.Get("/finished", controller.IndexHandler)
	router.Get("/trashcan", controller.IndexHandler)
	router.Get("/settings", controller.IndexHandler)
	router.Get("/signin", controller.IndexHandler)
	router.Get("/signup", controller.IndexHandler)
	router.Post("/query", handler.GraphQL(graphql.NewExecutableSchema(graphql.Config{Resolvers: resolver})))
	http.ListenAndServe(":8888", router)
}

/*import (
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/go-chi/chi"
)

func main() {
	r := chi.NewRouter()

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hi"))
	})

	workDir, _ := os.Getwd()
	filesDir := filepath.Join(workDir, "thisistodolist/dist/js")
	FileServer(r, "/js", http.Dir(filesDir))

	http.ListenAndServe(":3333", r)
}*/
