using BudgetBackend.Models.Context;
using BudgetBackend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace BudgetBackend.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly BudgetContext _budgetDBContext;
        public Repository(BudgetContext budgetDBContext)
        {
            _budgetDBContext = budgetDBContext;
        }
        public async void AddAsync(TEntity entity)
        {
           await _budgetDBContext.Set<TEntity>().AddAsync(entity);
        }

        public void Delete(TEntity entity)
        {
            _budgetDBContext.Set<TEntity>().Remove(entity);
        }

        public IQueryable<TEntity> GetAll()
        {
            return GetDbSet();
        }

        public IQueryable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
           return GetDbSet().Where(predicate);
        }

        public void SaveChanges()
        {
            _budgetDBContext.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            _budgetDBContext.Set<TEntity>().Update(entity);
        }

        public async Task<TEntity?> GetByIdAsync(params object[] keyValues)
        {
            var entity = await _budgetDBContext.Set<TEntity>().FindAsync(keyValues);
            return entity;
        }

        public async Task<TEntity?> GetSingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, bool asNoTracking = true, CancellationToken cancellationToken = default)
        {
            var query = GetDbSet().Where(predicate);
            if (asNoTracking) query = query.AsNoTracking();
            return await query.SingleOrDefaultAsync(cancellationToken);
        }

        private DbSet<TEntity> GetDbSet()
        {
            return _budgetDBContext.Set<TEntity>();
        }


    }
}
