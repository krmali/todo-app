using todo_api.Models;

namespace todo_api.Repositories
{
  public interface ITodoRepository: IDisposable
  {
    IEnumerable<Todo> GetAll();

    Todo Get(long Id);

    int Create(Todo TodoView);

    Todo Update(Todo Todo);

    bool Delete(long Id);
  }
}
