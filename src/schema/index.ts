import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from "graphql";
import Todo from "../models/Todo";

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    completed: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    createdDate: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

const RootQuery: GraphQLObjectType<
  any,
  any,
  { id?: string }
> = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    allTodos: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TodoType))),
      resolve: async () => {
        const todos: any = await Todo.find({}, {}, { lean: true });
        const newTodos = todos.map(todo => {
          return {
            ...todo,
            id: todo._id
          };
        });
        return newTodos;
      }
    },
    todo: {
      type: new GraphQLNonNull(TodoType),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (parent, { id }) => {
        const todo: any = await Todo.findById(id, {}, { lean: true });
        return {
          ...todo,
          id: todo._id
        };
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    createTodo: {
      type: new GraphQLNonNull(TodoType),
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (parent, { title }) => {
        if (title) {
          const todo = new Todo({
            title
          });
          const savedTodo: any = await todo.save();
          return {
            ...savedTodo._doc,
            id: savedTodo._id
          };
        }
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
