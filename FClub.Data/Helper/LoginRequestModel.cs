using System;
using System.Collections.Generic;
using System.Text;

namespace FClub.Data.Helper
{
    public class LoginRequestModel
    {
        public string IdToken { get; set; }

        public string deviceId { get; set; }

        public string AccessToken { get; set; }

        public string ProviderId { get; set; }

        public string SignInMethod { get; set; }
    }
}
