using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.ViewModels
{
    public class DeletUserViewModel
    {
        

        [Required(ErrorMessage = "BoxLengthRequired")]
        public string Email { get; set; }

        [Required(ErrorMessage = "User Name field is required")]
        [MaxLength(256)]
        public string UserName { get; set; }

        
    }
}
