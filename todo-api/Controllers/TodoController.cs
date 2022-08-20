using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todo_api.Dtos;
using todo_api.Models;
using todo_api.Repositories;

namespace todo_api.Controllers;

[ApiController]
[Route("[controller]")]
public class TodoController : ControllerBase
{

    private readonly ITodoRepository _todoRepository;
    private readonly IPersonRepository _personRepository;
    private readonly ILogger<TodoController> _logger;

    public TodoController(ILogger<TodoController> logger,
            ITodoRepository todoRepository,
            IPersonRepository personRepository
            )
    {
        _logger = logger;
        _todoRepository = todoRepository;
        _personRepository = personRepository;
    }

    [Authorize]
    [HttpGet]
    public IEnumerable<TodoDto> GetTodos()
    {
        var username = HttpContext.User.Identity!.Name;
        var person = _personRepository.GetByUsername(username!);

        if (person != null)
        {
            var todos = person.Todos;
            List<TodoDto> todoDtos = new List<TodoDto>();
            foreach (var t in todos)
            {
                todoDtos.Add(new TodoDto()
                {
                    Description = t.Description,
                    Due = t.Due,
                    IsChecked = t.IsChecked,
                    Id = t.Id
                });
            }
            return todoDtos;
        }
        return new List<TodoDto>();
    }

    [Authorize]
    [HttpGet("{Id}")]
    public Todo? GetTodo(int Id)
    {
        var todos = _todoRepository.Get(Id);
        return todos;
    }

    [Authorize]
    [HttpPost]
    public void CreateTodo([FromBody] TodoDto todoDto)
    {

        if (String.IsNullOrWhiteSpace(todoDto.Description))
            BadRequest();

        var username = HttpContext.User.Identity!.Name;
        var person = _personRepository.GetByUsername(username!);

        var todo = new Todo
        {
            IsChecked = todoDto.IsChecked,
            Description = todoDto.Description!,
            Due = todoDto.Due,
            PersonId = person!.Id
        };
        _todoRepository.Create(todo);
    }
    [Authorize]
    [HttpPut]
    public void UpdateTodo([FromBody] TodoDto todoDto)
    {

        if (String.IsNullOrWhiteSpace(todoDto.Description))
            BadRequest();

        var username = HttpContext.User.Identity!.Name;
        var personId = _personRepository.GetIdByUsername(username!);

        if(personId == null || todoDto.PersonId != personId)
            BadRequest();

        /* var todo = _todoRepository.Get((long)todoDto.Id); */
        /* if(todo == null) */
        /*     BadRequest(); */


        var todo = new Todo
        {
            IsChecked = todoDto.IsChecked,
            Description = todoDto.Description!,
            Due = todoDto.Due,
            Id = todoDto.Id,
            PersonId = (long)personId
        };

        _todoRepository.Update(todo);
    }

    [Authorize]
    [HttpDelete]
    public void deteteTodo(long? id)
    {

        if (id == null)
            BadRequest();

        var username = HttpContext.User.Identity!.Name;
        var personId = _personRepository.GetIdByUsername(username!);
        var todo = _todoRepository.Get((long)id);


        if (todo == null || personId == null || todo.PersonId != personId)
            BadRequest();

        Console.WriteLine("did not send bad request");
        _todoRepository.Delete((long)id);
    }


}
