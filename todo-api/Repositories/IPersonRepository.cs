using todo_api.Models;

namespace todo_api.Repositories
{
    public interface IPersonRepository
    {
      bool Create(Person person);

      Person? Get(int id);

      Person? GetByUsername(string username);

      Person? Get(string username, string password);
    }
}

