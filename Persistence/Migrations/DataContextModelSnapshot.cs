﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.3");

            modelBuilder.Entity("Domain.Book", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Autori")
                        .HasColumnType("TEXT");

                    b.Property<string>("Category")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Librat");
                });

            modelBuilder.Entity("Domain.Profesori", b =>
                {
                    b.Property<Guid>("ProfesoriID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Adresa")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Datelindja")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("Emri")
                        .HasColumnType("TEXT");

                    b.Property<string>("Mbiemri")
                        .HasColumnType("TEXT");

                    b.Property<string>("NumriKontaktues")
                        .HasColumnType("TEXT");

                    b.Property<string>("Titulli")
                        .HasColumnType("TEXT");

                    b.HasKey("ProfesoriID");

                    b.ToTable("Profesorat");
                });

            modelBuilder.Entity("Domain.Studenti", b =>
                {
                    b.Property<Guid>("StudentiID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Adresa")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Datelindja")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("Emri")
                        .HasColumnType("TEXT");

                    b.Property<string>("Mbiemri")
                        .HasColumnType("TEXT");

                    b.Property<string>("NumriKontaktues")
                        .HasColumnType("TEXT");

                    b.HasKey("StudentiID");

                    b.ToTable("Studentat");
                });
#pragma warning restore 612, 618
        }
    }
}
