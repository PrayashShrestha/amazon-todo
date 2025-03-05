import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/todos/todoThunks";
import { AppDispatch, RootState } from "../store/store";

export const useTodos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const error = useSelector((state: RootState) => state.todos.error);
  const isFetched = useSelector((state: RootState) => state.todos.isFetched); // ✅ Track if fetched

  useEffect(() => {
    if (!isFetched && !loading) { 
      dispatch(fetchTodos());
    }
  }, [dispatch, isFetched, loading]); 

  return { todos, loading, error };
};
