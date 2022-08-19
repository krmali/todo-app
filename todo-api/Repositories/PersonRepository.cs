using todo_api.Models;

namespace todo_api.Repositories;

public class PersonRepository : IPersonRepository
{

    private readonly TodoAppDbContext _todoAppDbContext;

    public PersonRepository(TodoAppDbContext todoAppDbContext)
    {
        _todoAppDbContext = todoAppDbContext;
    }

    public bool Create(Person person)
    {
        _todoAppDbContext.Persons.Add(person);
        var saved = _todoAppDbContext.SaveChanges() > 0;
        return saved;

    }

    public Person? Get(int id)
    {
        var person= _todoAppDbContext.Persons.Find(id);
        return person;
    }

    public Person? GetByUsername(string username)
    {
        var person = _todoAppDbContext.Persons.Where(p => p.Username == username).FirstOrDefault();
        return person;
    }

    public Person? Get(string username, string password)
    {
        var person = _todoAppDbContext.Persons.Where(p => p.Username == username && p.Password == password).FirstOrDefault();
        return person;
    }
}
