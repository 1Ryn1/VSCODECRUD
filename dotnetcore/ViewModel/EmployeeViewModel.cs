using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetcore.ViewModel
{
    public class EmployeeViewModel
    {
        [Key]
        public int EmployeeId { get; set; }
        [Required(ErrorMessage = "This field is required to be fulfilled")]
        public string FullName { get; set; }
        [MaxLength(3, ErrorMessage ="Plese enter characters not greater than 3")]
        public string EmpCode { get; set; }

        [Required(ErrorMessage = "Please specify your position")]
        public string Position { get; set; }
       
        public string OfficeLocation { get; set; }
    }
}
