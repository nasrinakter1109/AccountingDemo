using AccountingBackend.Data.ViewModel;
using AccountingBackend.Data;
using AccountingBackend.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace AccountingBackend.Repository.Services
{
    public class UnitService : IUnit
    {
        private readonly ApplicationDbContext _context;
        public UnitService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<bool> CheckName(string name)
        {
            var checkResult = (from progm in _context.Unit
                               where progm.UnitName == name
                               select progm.UnitId).Count();
            if (checkResult > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<int> CheckNameId(string name)
        {
            var checkResult = (from progm in _context.Unit
                               where progm.UnitName == name
                               select progm.UnitId).Count();
            if (checkResult > 0)
            {

                var checkAccount = (from progm in _context.Unit
                                    where progm.UnitName == name
                                    select progm.UnitId).FirstOrDefault();
                return checkAccount;
            }
            else
            {
                return 0;
            }
        }

        public async Task<bool> Delete(int id)
        {
            var checkResult = await (from progm in _context.Product
                                     where progm.UnitId == id
                                     select progm.UnitId).CountAsync();
            if (checkResult > 0)
            {
                return false;
            }
            else
            {
                Unit user = await _context.Unit.FindAsync(id);
                _context.Remove(user);
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<List<UnitView>> GetAll()
        {
            var result = await (from a in _context.Unit
                                select new UnitView
                                {
                                    UnitId = a.UnitId,
                                    UnitName = a.UnitName,
                                    NoOfDecimalplaces = a.NoOfDecimalplaces
                                }).ToListAsync();
            return result;
        }

        public async Task<Unit> GetbyId(int id)
        {
            Unit model = await _context.Unit.FindAsync(id);
            return model;
        }

        public async Task<int> Save(Unit model)
        {
            await _context.Unit.AddAsync(model);
            await _context.SaveChangesAsync();
            int id = model.UnitId;
            return id;
        }

        public async Task<bool> Update(Unit model)
        {
            _context.Unit.Update(model);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
