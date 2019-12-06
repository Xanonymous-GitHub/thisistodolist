package gqlgen

import (
	"context"
) // THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct{}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) CreateTodo(ctx context.Context, input NewTodo) (*Todo, error) {
	panic("not implemented")
}
func (r *mutationResolver) CreateUser(ctx context.Context, input NewUser) (*UserNoPassword, error) {
	panic("not implemented")
}
func (r *mutationResolver) DeleteTodo(ctx context.Context, input DoTodo) (*Todo, error) {
	panic("not implemented")
}
func (r *mutationResolver) CompleteTodo(ctx context.Context, input DoTodo) (*Todo, error) {
	panic("not implemented")
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Todos(ctx context.Context) ([]*Todo, error) {
	panic("not implemented")
}
func (r *queryResolver) User(ctx context.Context) (*UserNoPassword, error) {
	panic("not implemented")
}
