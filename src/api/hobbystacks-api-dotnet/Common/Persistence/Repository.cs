using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace HobbyStacks.Api.Common.Persistence;

// REFERENCES:
// - https://learn.microsoft.com/en-us/aspnet/mvc/overview/older-versions/getting-started-with-ef-5-using-mvc-4/implementing-the-repository-and-unit-of-work-patterns-in-an-asp-net-mvc-application#implement-a-generic-repository-and-a-unit-of-work-class
// - https://github.com/dotnet-architecture/eShopOnContainers/blob/main/src/Services/Ordering/Ordering.Infrastructure/Repositories/OrderRepository.cs

/// <summary>
/// Generic repository pattern providing CRUD operations for a specific 
/// domain entity.
/// </summary>
/// <remarks>Encapsulate all EF Core functionality from calling code.</remarks>
/// <typeparam name="TEntity"></typeparam>
public abstract class Repository<TEntity>
    where TEntity : class
{
    private readonly DbContext _context;

    private DbSet<TEntity> Set;

    public Repository(DbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        Set = _context.Set<TEntity>();
    }

    protected IQueryable<TEntity> FindAll() => Set
        .AsNoTracking();

    protected IQueryable<TEntity> FindByCondition(Expression<Func<TEntity, bool>> condition) => Set
        .Where(condition)
        .AsNoTracking();

    protected void Create(TEntity entity) => Set
        .Add(entity);

    protected void Update(TEntity entity) => Set
        .Update(entity);

    protected void Delete(TEntity entity) => Set
        .Remove(entity);
}
