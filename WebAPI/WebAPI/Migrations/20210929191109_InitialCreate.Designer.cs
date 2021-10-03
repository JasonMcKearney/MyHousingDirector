﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPI.Models;

namespace WebAPI.Migrations
{
    [DbContext(typeof(HousingDBContext))]
    [Migration("20210929191109_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.7");

            modelBuilder.Entity("WebAPI.Models.DStudents", b =>
                {
                    b.Property<int>("user_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("confirmpassword")
                        .HasColumnType("nvarchar(64)");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("firstName")
                        .HasColumnType("nvarchar(64)");

                    b.Property<string>("lastName")
                        .HasColumnType("nvarchar(64)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(64)");

                    b.Property<string>("username")
                        .HasColumnType("nvarchar(64)");

                    b.Property<string>("verificationCode")
                        .HasColumnType("nvarchar(16)");

                    b.HasKey("user_id");

                    b.ToTable("DBUserTbls");
                });
#pragma warning restore 612, 618
        }
    }
}