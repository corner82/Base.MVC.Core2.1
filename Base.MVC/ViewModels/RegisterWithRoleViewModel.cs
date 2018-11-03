using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Base.MVC.ViewModels
{
    public class RegisterWithRoleViewModel
    {
        //[Required]
        //public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        //[Required]
        //public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "BoxLengthRequired")]
        public string Email { get; set; }

        [Required(ErrorMessage = "User Name field is required")]
        [MaxLength(256)]
        public string UserName { get; set; }

        [Required(ErrorMessage = "BoxLengthRequired")]
        [MaxLength(256)]
        [MinLength(6)]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }


        [Required(ErrorMessage = "BoxLengthRequired")]
        [MaxLength(256)]
        public string Role { get; set; }
    }
}
