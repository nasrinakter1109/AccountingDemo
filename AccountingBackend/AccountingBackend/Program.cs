using AccountingBackend.Data;
using AccountingBackend.Repository.Interface;
using AccountingBackend.Repository.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy.WithOrigins("http://localhost:4200", "http://localhost:51414") // Update the origin with your Angular URL
        .AllowAnyMethod()
        .AllowAnyHeader());
});
var key = builder.Configuration["Jwt:Key"];
var issuer = builder.Configuration["Jwt:Issuer"];
var audience = builder.Configuration["Jwt:Audience"];
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
    };
});

builder.Services.AddAuthorization();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection")), ServiceLifetime.Transient);
builder.Services.AddSingleton<DatabaseConnection>();
// Add services to the container.
builder.Services.AddTransient<IUser, UserService>();
builder.Services.AddTransient<IPrivilege, PrivilegeService>();
builder.Services.AddTransient<ICustomerSupplier, CustomerSupplierService>();
builder.Services.AddTransient<IAccountGroup, AccountGroupService>();
builder.Services.AddTransient<IJournalVoucher, JournalService>();
builder.Services.AddTransient<ICompany, CompanyService>();
builder.Services.AddTransient<IInvoiceSetting, InvoiceService>();
builder.Services.AddTransient<IBrand, BrandService>();
builder.Services.AddTransient<IUnit, UnitService>();
builder.Services.AddTransient<ICategory, CategoryService>();
builder.Services.AddTransient<IProduct, ProductService>();
builder.Services.AddTransient<ISalesInvoice, SalesInvoiceService>();
builder.Services.AddTransient<UserAccountService>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null; // Prevents camel case transformation
}); ;
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Use the CORS policy
app.UseCors("AllowAngularApp");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
