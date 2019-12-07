package gqlgen

import (
	"context"
	"github.com/Xanonymous-GitHub/thisistodolist/controller"

	"github.com/Xanonymous-GitHub/thisistodolist/model"
)

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct{}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	db := controller.InitDB()
	defer db.Close()
	newtodo := &model.Todo{Content: input.Text}
	err := db.Insert(newtodo)
	controller.ErrHandle(err)
}
func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.UserNoPassword, error) {
	panic("not implemented")
}
func (r *mutationResolver) DeleteTodo(ctx context.Context, input model.DoTodo) (*model.Todo, error) {
	panic("not implemented")
}
func (r *mutationResolver) CompleteTodo(ctx context.Context, input model.DoTodo) (*model.Todo, error) {
	panic("not implemented")
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	panic("not implemented")
}
func (r *queryResolver) User(ctx context.Context) (*model.UserNoPassword, error) {
	panic("not implemented")
}
