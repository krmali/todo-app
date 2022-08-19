#nullable disable

namespace todo_api.Models
{
    public class Person
    {
        public long Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public virtual List<Todo> Todos {get; set;}
    }
}
