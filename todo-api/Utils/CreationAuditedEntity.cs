namespace todo_api.Utils;

public class CreationAuditedEntity : Entity, IHasCreationTime, ICreationAudited
{
    public long? CreatorUserId { get; set; }
    public DateTime CreationTime { get; set; }
}
