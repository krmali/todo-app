using todo_api.Utils;

namespace todo_api.ViewModels;

public class TodoViewModel : Entity, IHasCreationTime
{

    public DateTime Due{ get; set; }

    public string? Description{ get; set; }

    public bool IsChecked{ get; set; }

    public DateTime CreationTime { get; set; }
}
