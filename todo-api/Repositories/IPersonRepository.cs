using todo_api.Models;

namespace todo_api.Repositories
{
    public interface IPersonRepository
    {
      bool Create(Person person);

      IQueryable<Person> GetAll();

      Person? Get(int id);

      Person? GetByUsername(string username);

      long? GetIdByUsername(string username);

      Person? Get(string username, string password);
    }
}

