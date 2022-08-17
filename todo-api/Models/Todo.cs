using todo_api.Utils;

namespace todo_api.Models;

public class Todo: CreationAuditedEntity
{
    public DateTime Due{ get; set; }

    public string? Description{ get; set; }

    public bool IsChecked{ get; set; }
}
