using System.Linq.Expressions;

namespace BudgetBackend.Repositories.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> GetAll();
        IQueryable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
        void AddAsync(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        void SaveChangesAsync();
    };
}
