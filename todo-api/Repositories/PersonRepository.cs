using todo_api.Models;
using Microsoft.EntityFrameworkCore;

namespace todo_api.Repositories;

public class PersonRepository : IPersonRepository
{

    private readonly TodoAppDbContext _todoAppDbContext;

    public PersonRepository(TodoAppDbContext todoAppDbContext)
    {
        _todoAppDbContext = todoAppDbContext;
    }

    public IQueryable<Person> GetAll()
    {
        return _todoAppDbContext.Persons.AsQueryable();
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
        var person = _todoAppDbContext.Persons.Include(p => p.Todos).Where(p => p.Username == username).FirstOrDefault();
        return person;
    }

    public Person? Get(string username, string password)
    {
        var person = _todoAppDbContext.Persons.Where(p => p.Username == username && p.Password == password).FirstOrDefault();
        return person;
    }
}
