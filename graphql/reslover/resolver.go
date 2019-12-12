package reslover

import (
	"context"
	"fmt"
	"github.com/Xanonymous-GitHub/thisistodolist/controller"

	graphql1 "github.com/Xanonymous-GitHub/thisistodolist/graphql"
	"github.com/Xanonymous-GitHub/thisistodolist/model"
	prisma "github.com/Xanonymous-GitHub/thisistodolist/prisma/client"
)

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct {
	Prisma *prisma.Client
}

func (r *Resolver) Mutation() graphql1.MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Query() graphql1.QueryResolver {
	return &queryResolver{r}
}
func (r *Resolver) Todo() graphql1.TodoResolver {
	return &todoResolver{r}
}
func (r *Resolver) User() graphql1.UserResolver {
	return &userResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) ChangeTodos(ctx context.Context, input *model.ChangeTodosInput) (*prisma.BatchPayload, error) {
	ctxuser := controller.ForContext(ctx)
	user, err := r.Prisma.User(prisma.UserWhereUniqueInput{Username: &ctxuser}).Exec(ctx)
	if err != nil || user == nil || user.UserLevel == prisma.LevelRestricted {
		return nil, fmt.Errorf("Access denied")
	}
	if user.UserLevel == prisma.LevelAdmin {
		output, err := r.Prisma.UpdateManyTodoes(prisma.TodoUpdateManyParams{
			Where: &prisma.TodoWhereInput{IDIn: input.ID},
			Data: prisma.TodoUpdateManyMutationInput{
				Deleted:   input.Deleted,
				Content:   input.Content,
				Completed: input.Completed,
				Private:   input.Private,
				Locked:    input.Locked,
			},
		}).Exec(ctx)
		return &output, err
	}
	output, err := r.Prisma.UpdateManyTodoes(prisma.TodoUpdateManyParams{
		Where: &prisma.TodoWhereInput{IDIn: input.ID, And: []prisma.TodoWhereInput{
			{Author: &prisma.UserWhereInput{Username: &user.Username}}}},
		Data: prisma.TodoUpdateManyMutationInput{
			Deleted:   input.Deleted,
			Content:   input.Content,
			Completed: input.Completed,
			Private:   input.Private,
			Locked:    input.Locked,
		},
	}).Exec(ctx)
	return &output, err
}
func (r *mutationResolver) ChangeUser(ctx context.Context, input *model.ChangeUserInput) (*prisma.User, error) {
	panic("not implemented")
}
func (r *mutationResolver) CreateTodo(ctx context.Context, input *model.CreatTodoInput) (*prisma.Todo, error) {
	panic("not implemented")
}
func (r *mutationResolver) CreateUser(ctx context.Context, input *model.CreatUserInput) (*prisma.User, error) {
	panic("not implemented")
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Me(ctx context.Context) (*prisma.User, error) {
	panic("not implemented")
}
func (r *queryResolver) Users(ctx context.Context) ([]model.UserLayout, error) {
	panic("not implemented")
}
func (r *queryResolver) UsersForAdmin(ctx context.Context) ([]prisma.User, error) {
	panic("not implemented")
}
func (r *queryResolver) MyFriends(ctx context.Context) ([]model.UserForFriend, error) {
	panic("not implemented")
}
func (r *queryResolver) UserByUsername(ctx context.Context, input model.UserByUsernameInput) (*model.UserLayout, error) {
	panic("not implemented")
}

type todoResolver struct{ *Resolver }

func (r *todoResolver) Sort(ctx context.Context, obj *prisma.Todo) (int, error) {
	panic("not implemented")
}
func (r *todoResolver) Author(ctx context.Context, obj *prisma.Todo) (*model.UserLayout, error) {
	panic("not implemented")
}

type userResolver struct{ *Resolver }

func (r *userResolver) UserLevel(ctx context.Context, obj *prisma.User) (model.Level, error) {
	panic("not implemented")
}
func (r *userResolver) Friends(ctx context.Context, obj *prisma.User) ([]model.UserForFriend, error) {
	panic("not implemented")
}
func (r *userResolver) Todos(ctx context.Context, obj *prisma.User) ([]prisma.Todo, error) {
	panic("not implemented")
}
