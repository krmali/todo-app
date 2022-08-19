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

    [HttpGet()]
    public IEnumerable<Todo> GetTodos()
    {
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

    [HttpGet("{Id}")]
    public Todo? GetTodo(int Id)
    {
        var todos = _todoRepository.Get(Id);
        return todos;
    }
}
