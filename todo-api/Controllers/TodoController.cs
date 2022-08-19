using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using todo_api.Models;
using todo_api.Repositories;

namespace todo_api.Controllers;

[ApiController]
[Route("[controller]")]
public class TodoController : ControllerBase
{

    private readonly ITodoRepository  _todoRepository;
    private readonly ILogger<TodoController> _logger;

    public TodoController(ILogger<TodoController> logger,
            ITodoRepository  todoRepository
            )
    {
        _logger = logger;
        _todoRepository = todoRepository;
    }

    [Authorize]
    [HttpGet]
    public IEnumerable<Todo> GetTodos()
    {
        var a = HttpContext.User.Identity.Name;

        Console.WriteLine("-------------------------------------------");
        Console.WriteLine("-------------------------------------------");
        Console.WriteLine("-------------------------------------------");
        Console.WriteLine(a);
        Console.WriteLine("-------------------------------------------");
        Console.WriteLine("-------------------------------------------");
        Console.WriteLine("-------------------------------------------");
        var todos = _todoRepository.GetAll();
        return todos;
        
        /* return Enumerable.Range(1, 5).Select(index => new Todo */
        /* { */
        /*     Due = DateTime.Now.AddDays(index), */
        /*     Description = "hello todo 1", */
        /*     IsChecked = true */
        /* }) */
        /* .ToArray(); */
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
    public void CreateTodo([FromBody] Todo Todo)
    {

        _todoRepository.Create(Todo);
    }
}
