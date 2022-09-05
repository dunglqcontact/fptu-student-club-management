using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Helper
{
    public class LoginViewModel
    {
        public string JwtToken { get; set; }
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public LoginViewModel()
        {
        }
    }
}
