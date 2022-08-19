using System.ComponentModel.DataAnnotations.Schema;
using todo_api.Utils;

namespace todo_api.Models;
public class Todo : Entity
{
    public DateTime? Due {get; set;}

    public string Description {get; set;}

    [ForeignKey("Person")]
    public long PersonId {get; set;}

    public virtual Person Person {get; set;}
}
