using AccountingBackend.Data.Accounting;
using AccountingBackend.Data.Authentication;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace AccountingBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

        }
        public DbSet<Role> Role { get; set; }
        public DbSet<UserMaster> UserMaster { get; set; }
        public DbSet<Privilege> Privilege { get; set; }
        public DbSet<AccountGroup> AccountGroup { get; set; }
        public DbSet<AccountLedger> AccountLedger { get; set; }
        public DbSet<LedgerPosting> LedgerPosting { get; set; }
        public DbSet<JournalMaster> JournalMaster { get; set; }
        public DbSet<JournalDetails> JournalDetails { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<InvoiceSetting> InvoiceSetting { get; set; }
        public DbSet<Currency> Currency { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Brand> Brand { get; set; }
        public DbSet<Unit> Unit { get; set; }
        public DbSet<ProductGroup> ProductGroup { get; set; }
        public DbSet<StockPosting> StockPosting { get; set; }
        public DbSet<SalesDetails> SalesDetails { get; set; }
        public DbSet<SalesMaster> SalesMaster { get; set; }
        public DbSet<Tax> Tax { get; set; }
    }
}
