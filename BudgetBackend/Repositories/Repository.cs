using BudgetBackend.Models.Context;
using BudgetBackend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

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

        public async void SaveChangesAsync()
        {
            await _budgetDBContext.SaveChangesAsync();
        }

        public void Update(TEntity entity)
        {
            _budgetDBContext.Set<TEntity>().Update(entity);
        }

        private DbSet<TEntity> GetDbSet()
        {
            return _budgetDBContext.Set<TEntity>();
        }
    }
}
