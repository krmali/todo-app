using todo_api.Models;

namespace todo_api.Repositories;

public class TodoRepository : ITodoRepository
{
    private readonly TodoAppDbContext _todoAppDbContext;

    public TodoRepository(TodoAppDbContext todoAppDbContext)
    {
        _todoAppDbContext = todoAppDbContext;
    }

    public void Create(Todo todo)
    {
        var newTodo = _todoAppDbContext.Todos.Add(todo);
        _todoAppDbContext.SaveChanges();
    }

    public void Delete(long id)
    {
        var todo = _todoAppDbContext.Todos.Find(id);
        if (todo != null)
        {
            _todoAppDbContext.Todos.Remove(todo);
            _todoAppDbContext.SaveChanges();
        }
    }

    public Todo? Get(long id)
    {
        var todo = _todoAppDbContext.Todos.Find(id);
        return todo;
    }

    public IEnumerable<Todo> GetAll()
    {
        return _todoAppDbContext.Todos.ToList();
    }

    public void Update(Todo todo)
    {
        _todoAppDbContext.Todos.Update(todo);
    }
}
