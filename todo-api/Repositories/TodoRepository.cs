using todo_api.Models;

namespace todo_api.Repositories;

public class TodoRepository : ITodoRepository, IDisposable
{
  private readonly TodoAppDbContext _todoAppDbContext;

  public TodoRepository(TodoAppDbContext todoAppDbContext)
  {
    _todoAppDbContext = todoAppDbContext;
  }

  public void Save()
  {
    _todoAppDbContext.SaveChanges();
  }

  public int Create(Todo Todo)
  {
    _todoAppDbContext.Todos.Add(Todo);
  }

  public async Task<bool> Delete(long Id)
  {
    var todo = _todoAppDbContext.Todos.Find(Id);
    if(todo != null){
      _todoAppDbContext.Todos.Remove(todo);
      await _todoAppDbContext.SaveChangesAsync();
      return true;
    }
    return false;
  }

  public void Dispose()
  {
    Dispose();
    GC.SuppressFinalize(this);
  }

    public Task<Todo> Get(long Id)
  {
    var todo = _todoAppDbContext.Todos.Find(Id);
    if(todo != null){
       
    }
  }

  public Task<IEnumerable<Todo>> GetAll()
  {
      throw new NotImplementedException();
  }

  public Task<Todo> Update(Todo Todo)
  {
      throw new NotImplementedException();
  }
}
