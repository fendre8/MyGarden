using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyGarden.DAL.EF.DbModels;
using System;

namespace MyGarden.DAL.EF
{
    public class MyGardenDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        public MyGardenDbContext(DbContextOptions<MyGardenDbContext> options) : base(options)
        {
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Plant> Plants { get; set; }
        public DbSet<Issue> Issues { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Friendship> Friendships { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            ConfigureModelBuilderForPlant(modelBuilder);
            ConfigureModelBuilderForUsers(modelBuilder);
            ConfigureModelBuilderForAnswer(modelBuilder);
            ConfigureModelBuilderForIssue(modelBuilder);
        }

        void ConfigureModelBuilderForUsers(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                entity.ToTable("Profiles");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("ID");

                entity.Property(e => e.UserName)
                    .HasMaxLength(50)
                    .IsRequired();

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsRequired();

                entity.Property(e => e.First_name).HasMaxLength(50);

                entity.Property(e => e.Last_name).HasMaxLength(50);

                entity.HasMany(e => e.Plants);

                entity.HasMany(e => e.Issues)
                    .WithOne(i => i.Author)
                    .HasForeignKey(i => i.AuthorId);

                //entity.HasMany(e => e.Friends)
                //    .WithMany(e => e.Friends)
                //    .UsingEntity(f => f.ToTable("Friendship"));

            });

            modelBuilder.Entity<Friendship>(entity =>
            {
                entity.HasKey(f => f.Id);

                entity.HasOne(f => f.Friend1)
                    .WithMany(p => p.Friendship)
                    .HasForeignKey(f => f.Friend1Id);

                entity.HasOne(f => f.Friend2)
                    .WithMany()
                    .HasForeignKey(f => f.Friend2Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });
        }

        void ConfigureModelBuilderForAnswer(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Answer>(entity =>
            {
                entity.ToTable("Answers");

                entity.Property(e => e.Id).ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                entity.Property(e => e.Text).HasMaxLength(1000)
                    .HasColumnName("Text")
                    .IsRequired();

                entity.HasOne(a => a.Author);
            });

        }

        void ConfigureModelBuilderForIssue(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Issue>(entity =>
            {
                entity.ToTable("Issues");

                entity.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("ID");

                entity.Property(e => e.Title)
                    .HasMaxLength(50)
                    .IsRequired();

                entity.Property(e => e.Is_open);

                entity.Property(e => e.Description)
                    .HasMaxLength(1000)
                    .IsRequired();

                entity.HasOne(a => a.Author)
                    .WithMany(i => i.Issues);

                entity.HasOne(p => p.Plant);

                entity.HasMany(a => a.Answers);
            });
        }

        void ConfigureModelBuilderForPlant(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Plant>(entity =>
            {
                entity.ToTable("Plants");

                entity.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("ID");

                entity.Property(e => e.Name)
                    .IsRequired();

                entity.Property(e => e.Scientific_name)
                    .IsRequired();

                entity.Property(e => e.Plant_time);

                entity.Property(e => e.Img_url).IsRequired();

                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.Median_lifespan);
                entity.Property(e => e.First_harvest_exp);
                entity.Property(e => e.Last_harvest_exp);
                entity.Property(e => e.Height);
                entity.Property(e => e.Spread);
                entity.Property(e => e.Row_spacing);
                entity.Property(e => e.Sun_requirements);
                entity.Property(e => e.Sowing_method).HasMaxLength(1000);

            });
        }

    }
}
