using Microsoft.AspNetCore.Mvc;
using todo_api.Models;

namespace todo_api.Controllers;

[ApiController]
[Route("[controller]")]
public class TodoController : ControllerBase
{

    private readonly ILogger<TodoController> _logger;

    public TodoController(ILogger<TodoController> logger)
    {
        _logger = logger;
    }

    [HttpGet()]
    public IEnumerable<Todo> GetTodos()
    {
        return Enumerable.Range(1, 5).Select(index => new Todo
        {
            Due = DateTime.Now.AddDays(index),
            Description = "hello todo 1",
            IsChecked = true
        })
        .ToArray();
    }

    [HttpGet("{Id}")]
    public IEnumerable<Todo> GetTodo(int Id)
    {
        return Enumerable.Range(1, 5).Select(index => new Todo
        {
            Due = DateTime.Now.AddDays(index),
            Description = "hello todo 1",
            IsChecked = true
        })
        .ToArray();
    }
}
