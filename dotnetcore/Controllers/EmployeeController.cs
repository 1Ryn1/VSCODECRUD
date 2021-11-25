using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using dotnetcore.Models;
using dotnetcore.ViewModel;

namespace dotnetcore.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly Employeecontext _context;

        public EmployeeController(Employeecontext context)
        {
            _context = context;
        }

        // GET: Employee
        public async Task<IActionResult> Index()
        {
            var employeeList = new List<EmployeeViewModel>(); 
            var employees=await _context.Employees.ToListAsync();
            foreach(var employee in employees)
            {
                employeeList.Add(new EmployeeViewModel
                {
                    EmployeeId = employee.EmployeeId,
                    EmpCode = employee.EmpCode,
                    FullName = employee.FullName,
                    Position = employee.Position,
                    OfficeLocation = employee.OfficeLocation
                });
               
            }
            return View(employeeList);
        }

 

        // GET: Employee/Create
        public IActionResult AddOrEdit(int id=0)
        {
            if (id == 0)
                return View(new EmployeeViewModel());
            else
            {
                var employee = _context.Employees.Find(id);

                return View(new EmployeeViewModel {
                EmployeeId=employee.EmployeeId,
                EmpCode=employee.EmpCode,
                FullName=employee.FullName,
                Position=employee.Position,
                OfficeLocation=employee.OfficeLocation});
            }
        }

        // POST: Employee/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddOrEdit([Bind("EmployeeId,FullName,EmpCode,Position,OfficeLocation")] EmployeeViewModel employee)
        {
            if (ModelState.IsValid)
            {
                if (employee.EmployeeId == 0)
                    _context.Add(new Employee { 
                        EmployeeId = employee.EmployeeId,
                        FullName = employee.FullName,
                        EmpCode = employee.EmpCode, 
                        Position = employee.Position,
                        OfficeLocation = employee.OfficeLocation });
                else
                    _context.Update(new Employee { EmployeeId = employee.EmployeeId, FullName = employee.FullName, EmpCode = employee.EmpCode, Position = employee.Position, OfficeLocation = employee.OfficeLocation });
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(employee);
        }

      
        // GET: Employee/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            var employee = await _context.Employees.FindAsync(id);
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Loaddata()
        {
            var employeeList = new List<EmployeeViewModel>();
            var employees = await _context.Employees.ToListAsync();
            foreach (var employee in employees)
            {
                employeeList.Add(new EmployeeViewModel
                {
                    EmployeeId = employee.EmployeeId,
                    EmpCode = employee.EmpCode,
                    FullName = employee.FullName,
                    Position = employee.Position,
                    OfficeLocation = employee.OfficeLocation
                });

            }
            return Ok(employeeList);

        }


    }
}
