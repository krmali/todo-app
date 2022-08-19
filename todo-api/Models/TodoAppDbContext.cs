#nullable disable
using Microsoft.EntityFrameworkCore;

namespace todo_api.Models
{
    public partial class TodoAppDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public TodoAppDbContext(DbContextOptions<TodoAppDbContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        public virtual DbSet<Todo> Todos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            Console.WriteLine($"Will use database of type: {_configuration.GetConnectionString("MssqlTodoDb")}");
            Console.WriteLine($"Will use database of type: {_configuration.GetConnectionString("TodoDb")}");
            Console.WriteLine($"Will use database of type: {_configuration.GetValue(typeof(string), "Database")}");
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
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

