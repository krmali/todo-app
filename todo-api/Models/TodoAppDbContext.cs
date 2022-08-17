#nullable disable
using Microsoft.EntityFrameworkCore;

namespace todo_api.Models
{
    public partial class TodoAppDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public TodoAppDbContext()
        {
        }

        public TodoAppDbContext(DbContextOptions<TodoContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        public virtual DbSet<Todo> Todos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            Console.WriteLine($"Will use database of type: {_configuration["DATABASE"]}");
            if (!optionsBuilder.IsConfigured)
            {
                if (_configuration["DATABASE"] == "mssql")
                {
                    optionsBuilder.UseSqlServer("Server=db,1433;Database=product;User Id=SA;Password=Passw0rd");
                }
                else
                {
                    optionsBuilder.UseNpgsql("User ID=postgres;Password=postgres;Host=db;Port=5432;Database=product;");
                }
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

