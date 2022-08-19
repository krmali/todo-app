using todo_api.Models;

namespace todo_api.Repositories;

public class TodoRepository : ITodoRepository
{
    private readonly TodoAppDbContext _todoAppDbContext;

    public TodoRepository(TodoAppDbContext todoAppDbContext)
    {
        _todoAppDbContext = todoAppDbContext;
    }

    public void Create(Todo Todo)
    {
        _todoAppDbContext.Todos.Add(Todo);
        _todoAppDbContext.SaveChanges();
    }

    public void Delete(long Id)
    {
        var todo = _todoAppDbContext.Todos.Find(Id);
        if (todo != null)
        {
            _todoAppDbContext.Todos.Remove(todo);
            _todoAppDbContext.SaveChanges();
        }
    }

    public Todo? Get(long Id)
    {
        var todo = _todoAppDbContext.Todos.Find(Id);
        return todo;
    }

    public IEnumerable<Todo> GetAll()
    {
        return _todoAppDbContext.Todos.ToList();
    }

    public void Update(Todo Todo)
    {
        _todoAppDbContext.Todos.Update(Todo);
    }
}
