﻿// <auto-generated />
using System;
using AccountingBackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AccountingBackend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241002223745_JournalMasterAndDetailsEntityAdd")]
    partial class JournalMasterAndDetailsEntityAdd
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AccountingBackend.Data.Accounting.AccountGroup", b =>
                {
                    b.Property<int>("AccountGroupId")
                        .HasColumnType("int");

                    b.Property<string>("AccountGroupName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("AddedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("AffectGrossProfit")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<int?>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<string>("GroupCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GroupUnder")
                        .HasColumnType("int");

                    b.Property<bool>("IsDefault")
                        .HasColumnType("bit");

                    b.Property<int?>("ModifyBy")
                        .HasColumnType("int");

                    b.Property<DateTime?>("ModifyDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Narration")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nature")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AccountGroupId");

                    b.ToTable("AccountGroup");
                });

            modelBuilder.Entity("AccountingBackend.Data.Accounting.AccountLedger", b =>
                {
                    b.Property<int>("LedgerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LedgerId"));

                    b.Property<int>("AccountGroupId")
                        .HasColumnType("int");

                    b.Property<string>("AccountName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AccountNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("AddedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CrOrDr")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("CreditLimit")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("CreditPeriod")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDefault")
                        .HasColumnType("bit");

                    b.Property<string>("LedgerCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LedgerName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ModifyDate")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("OpeningBalance")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShippingAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TaxNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("LedgerId");

                    b.ToTable("AccountLedger");
                });

            modelBuilder.Entity("AccountingBackend.Data.Accounting.LedgerPosting", b =>
                {
                    b.Property<int>("LedgerPostingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LedgerPostingId"));

                    b.Property<DateTime?>("AddedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ChequeDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ChequeNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<decimal>("Credit")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("Debit")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("DetailsId")
                        .HasColumnType("int");

                    b.Property<string>("InvoiceNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LedgerId")
                        .HasColumnType("int");

                    b.Property<string>("LongReference")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ModifyDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("NepaliDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReferenceN")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VoucherNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VoucherTypeId")
                        .HasColumnType("int");

                    b.Property<int>("YearId")
                        .HasColumnType("int");

                    b.HasKey("LedgerPostingId");

                    b.ToTable("LedgerPosting");
                });

            modelBuilder.Entity("AccountingBackend.Data.Authentication.Privilege", b =>
                {
                    b.Property<int>("PrivilegeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PrivilegeId"));

                    b.Property<bool>("AddAction")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("AddedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<bool>("DeleteAction")
                        .HasColumnType("bit");

                    b.Property<bool>("EditAction")
                        .HasColumnType("bit");

                    b.Property<string>("FormName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifyDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<string>("SettingType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("ShowAction")
                        .HasColumnType("bit");

                    b.HasKey("PrivilegeId");

                    b.ToTable("Privilege");
                });

            modelBuilder.Entity("AccountingBackend.Data.Authentication.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RoleId"));

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RoleId");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("AccountingBackend.Data.Authentication.UserMaster", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("AddedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ConfirmPassword")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ModifyDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("UserMaster");
                });

            modelBuilder.Entity("AccountingBackend.Data.JournalDetails", b =>
                {
                    b.Property<int>("JournalDetailsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("JournalDetailsId"));

                    b.Property<decimal>("Credit")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("Debit")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("JournalMasterId")
                        .HasColumnType("int");

                    b.Property<int>("LedgerId")
                        .HasColumnType("int");

                    b.Property<string>("Narration")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("JournalDetailsId");

                    b.ToTable("JournalDetails");
                });

            modelBuilder.Entity("AccountingBackend.Data.JournalMaster", b =>
                {
                    b.Property<int>("JournalMasterId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("JournalMasterId"));

                    b.Property<DateTime?>("AddedDate")
                        .HasColumnType("datetime2");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("FinancialYearId")
                        .HasColumnType("int");

                    b.Property<string>("InvoiceNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ModifyDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Narration")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SerialNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VoucherNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VoucherTypeId")
                        .HasColumnType("int");

                    b.HasKey("JournalMasterId");

                    b.ToTable("JournalMaster");
                });
#pragma warning restore 612, 618
        }
    }
}
