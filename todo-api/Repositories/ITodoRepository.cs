using todo_api.Models;

namespace todo_api.Repositories
{
    public interface ITodoRepository
    {
        IEnumerable<Todo> GetAll();

        Todo? Get(long Id);

        void Create(Todo Todo);

        void Update(Todo Todo);

        void Delete(long Id);
    }
}
