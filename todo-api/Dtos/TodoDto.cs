using System.ComponentModel.DataAnnotations;
using todo_api.Utils;

namespace todo_api.Dtos;

public class TodoDto : Entity
{

    public DateTime? Due{ get; set; }

    [Required(ErrorMessage="Description is required")]
    public string Description{ get; set; }

    public bool IsChecked{ get; set; } = false;

    public long PersonId {get; set;}

}
