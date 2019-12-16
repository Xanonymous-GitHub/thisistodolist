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
	user, err := r.Prisma.User(prisma.UserWhereUniqueInput{Username: controller.ForContext(ctx)}).Exec(ctx)
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
	user, err := r.Prisma.User(prisma.UserWhereUniqueInput{Username: controller.ForContext(ctx)}).Exec(ctx)
	if err != nil || user == nil || user.UserLevel == prisma.LevelRestricted {
		return nil, fmt.Errorf("Access denied")
	}
	if user.UserLevel != prisma.LevelAdmin && user.Username != input.Username {
		return nil, fmt.Errorf("Access denied")
	}
	if input.Oldpassword != nil || input.Newpassword != nil {
		user, err := r.Prisma.User(prisma.UserWhereUniqueInput{Username: &input.Username}).Exec(ctx)
		if err != nil || user == nil {
			return nil, fmt.Errorf("This people not exist")
		}
		if user.Password != *input.Oldpassword {
			return nil, fmt.Errorf("Password not right")
		}
	}
	return r.Prisma.UpdateUser(
		prisma.UserUpdateParams{
			Data: prisma.UserUpdateInput{
				Nickname:   input.Nikename,
				PictureUrl: input.PictureURL,
				Password:   input.Newpassword,
			},
			Where: prisma.UserWhereUniqueInput{
				Username: &input.Username,
			}}).Exec(ctx)
}
func (r *mutationResolver) CreateTodo(ctx context.Context, input *model.CreatTodoInput) (*prisma.Todo, error) {
	username := controller.ForContext(ctx)
	user, err := r.Prisma.User(prisma.UserWhereUniqueInput{Username: username}).Exec(ctx)
	if err != nil || user == nil || user.UserLevel == prisma.LevelRestricted {
		return nil, fmt.Errorf("Access denied")
	}
	return r.Prisma.CreateTodo(prisma.TodoCreateInput{
		Content:   input.Content,
		Locked:    input.Locked,
		Private:   input.Private,
		Completed: input.Completed,
		Author:    prisma.UserCreateOneWithoutTodosInput{Connect: &prisma.UserWhereUniqueInput{Username: username}},
		Sort:      &prisma.TodoSortCreateOneWithoutTodoInput{Create: &prisma.TodoSortCreateWithoutTodoInput{}},
	}).Exec(ctx)
}
func (r *mutationResolver) CreateUser(ctx context.Context, input *model.CreatUserInput) (*prisma.User, error) {
	panic("not implemented")
}
func (r *mutationResolver) Login(ctx context.Context, input *model.LoginInput) (*prisma.User, error) {
	panic("not implemented")
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Me(ctx context.Context) (*prisma.User, error) {
	username := controller.ForContext(ctx)
	return r.Prisma.User(prisma.UserWhereUniqueInput{Username: username}).Exec(ctx)
}
func (r *queryResolver) Users(ctx context.Context) ([]model.UserLayout, error) {
	username := controller.ForContext(ctx)
	user, err := r.Prisma.User(prisma.UserWhereUniqueInput{Username: username}).Exec(ctx)
	if err != nil || user == nil {
		return nil, fmt.Errorf("Access denied")
	}
	users, err := r.Prisma.Users(&prisma.UsersParams{Where: &prisma.UserWhereInput{UsernameNot: username}}).Exec(ctx)
	layout := make([]model.UserLayout, len(users))
	for i, v := range users {
		layout[i].Nickname = v.Nickname
		layout[i].PictureURL = v.PictureUrl
		layout[i].Verified = v.Verified
		layout[i].Username = v.Username
	}
	return layout, err
}
func (r *queryResolver) UsersForAdmin(ctx context.Context) ([]prisma.User, error) {
	username := controller.ForContext(ctx)
	user, err := r.Prisma.User(prisma.UserWhereUniqueInput{Username: username}).Exec(ctx)
	if err != nil || user == nil || user.UserLevel != prisma.LevelAdmin {
		return nil, fmt.Errorf("Access denied")
	}
	return r.Prisma.Users(&prisma.UsersParams{Where: &prisma.UserWhereInput{UsernameNot: username}}).Exec(ctx)
}
func (r *queryResolver) MyFriends(ctx context.Context) ([]model.UserForFriend, error) {
	panic("not implemented")
}
func (r *queryResolver) UserByUsername(ctx context.Context, input model.UserByUsernameInput) (*model.UserLayout, error) {
	username := controller.ForContext(ctx)
	user, err := r.Prisma.User(prisma.UserWhereUniqueInput{Username: username}).Exec(ctx)
	if err != nil || user == nil {
		return nil, fmt.Errorf("Access denied")
	}
	userother, err := r.Prisma.User(prisma.UserWhereUniqueInput{Username: &input.Username}).Exec(ctx)
	var layout model.UserLayout
	layout.Nickname = userother.Nickname
	layout.PictureURL = userother.PictureUrl
	layout.Verified = userother.Verified
	layout.Username = userother.Username
	return &layout, err
}

type todoResolver struct{ *Resolver }

func (r *todoResolver) Sort(ctx context.Context, obj *prisma.Todo) (int, error) {
	sort, err := r.Prisma.TodoSorts(&prisma.TodoSortsParams{Where: &prisma.TodoSortWhereInput{Todo: &prisma.TodoWhereInput{ID: &obj.ID}}}).Exec(ctx)
	return int(sort[0].SortId), err
}
func (r *todoResolver) Author(ctx context.Context, obj *prisma.Todo) (*model.UserLayout, error) {
	user, err := r.Prisma.Users(&prisma.UsersParams{Where: &prisma.UserWhereInput{TodosSome: &prisma.TodoWhereInput{ID: &obj.ID}}}).Exec(ctx)
	var layout model.UserLayout
	layout.Verified = user[0].Verified
	layout.PictureURL = user[0].PictureUrl
	layout.Nickname = user[0].Nickname
	layout.Username = user[0].Username
	return &layout, err
}

type userResolver struct{ *Resolver }

func (r *userResolver) UserLevel(ctx context.Context, obj *prisma.User) (model.Level, error) {
	var level model.Level
	if obj.UserLevel == prisma.LevelAdmin {
		level = model.LevelAdmin
	} else if obj.UserLevel == prisma.LevelUser {
		level = model.LevelUser
	} else {
		level = model.LevelRestricted
	}
	return level, nil
}
func (r *userResolver) Friends(ctx context.Context, obj *prisma.User) ([]model.UserForFriend, error) {
	panic("not implemented")
}
func (r *userResolver) Todos(ctx context.Context, obj *prisma.User) ([]prisma.Todo, error) {
	return r.Prisma.Todoes(&prisma.TodoesParams{Where: &prisma.TodoWhereInput{Author: &prisma.UserWhereInput{Username: &obj.Username}}}).Exec(ctx)
}