using Microsoft.EntityFrameworkCore;
using MyGarden.Models;

namespace MyGarden.DAL.EF
{
    public class MyGardenDbContext : DbContext
    {

        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Plant> Plants { get; set; }
        public DbSet<Issue> Issues { get; set; }
        public DbSet<Answer> Answers { get; set; }

        public MyGardenDbContext(DbContextOptions<MyGardenDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ConfigureModelBuilderForProfile(modelBuilder);
        }

        void ConfigureModelBuilderForProfile(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Profile>(entity =>
            {
                entity.ToTable("Profile");

                entity.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("ID");

                entity.Property(user => user.Username)
                    .HasMaxLength(50)
                    .IsRequired();

                entity.Property(user => user.Email)
                    .HasMaxLength(50)
                    .IsRequired();

                entity.Property(user => user.Password)
                    .IsRequired();

                entity.Property(e => e.First_name).HasMaxLength(50);

                entity.Property(e => e.Last_name).HasMaxLength(50);

                entity.HasMany(e => e.Plants);

                entity.HasMany(e => e.Issues)
                    .WithOne(i => i.Author);

                entity.HasMany(e => e.Friends)
                    .WithMany(e => e.Friends);
            });
        }
    }
}
