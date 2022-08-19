using System.ComponentModel.DataAnnotations;

namespace todo_api.ApiView
{
    public class UserCred
    {
        [Required(ErrorMessage="Username is required")]
        public string? Username { get; set; }

        [Required(ErrorMessage="Password is required")]
        public string? Password { get;  set; }
    }
}

