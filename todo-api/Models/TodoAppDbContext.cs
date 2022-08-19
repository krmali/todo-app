#nullable disable
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace todo_api.Models
{
    public partial class TodoAppDbContext : IdentityDbContext<IdentityUser>
    {
        private readonly IConfiguration _configuration;

        public TodoAppDbContext(DbContextOptions<TodoAppDbContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        public virtual DbSet<Todo> Todos { get; set; }
        public virtual DbSet<Person> Persons { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            Console.WriteLine($"Will use database of type: {_configuration.GetValue(typeof(string), "Database")}");
            Console.WriteLine(_configuration.GetConnectionString("MssqlTodoDb"));
            Console.WriteLine(_configuration.GetConnectionString("TodoDb"));
            if (!optionsBuilder.IsConfigured)
            {
                if (_configuration["DATABASE"] == "mssql")
                {
                    optionsBuilder.UseSqlServer(_configuration.GetConnectionString("MssqlTodoDb"));
                }
                else
                {
                    optionsBuilder.UseNpgsql(_configuration.GetConnectionString("TodoDb"));
                }
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

