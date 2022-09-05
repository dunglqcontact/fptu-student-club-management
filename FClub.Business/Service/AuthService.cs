using FClub.Data.Database;
using FClub.Data.Helper;
using FClub.Data.Interface;
using FirebaseAdmin.Auth;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FClub.Business.Service
{
    public class AuthService
    {

        private readonly IUserInfoRepository _repository;

        public AuthService(IUserInfoRepository userInfoRepository)
        {
            _repository = userInfoRepository;
        }
        //register
        public async Task<LoginViewModel> Register(LoginRequestModel loginRequestModel, String universityId, String username)
        {

            var userViewModel = await VerifyFirebaseTokenIdRegister(loginRequestModel.IdToken, universityId, username);
            var claims = new List<Claim>
            {
                new(ClaimTypes.Email, userViewModel.Email),
                new(ClaimTypes.Name, userViewModel.Name),
            };

            var accessToken = GenerateAccessToken(claims);
            // var refreshToken = GenerateRefreshToken();

            userViewModel.JwtToken = accessToken;
            return userViewModel;
        }

        //verify for register
        public async Task<LoginViewModel> VerifyFirebaseTokenIdRegister(string idToken, String universityId, String username)
        {
            FirebaseToken decodedToken;
            try
            {
                decodedToken = await FirebaseAuth.DefaultInstance
                       .VerifyIdTokenAsync(idToken);
            }
            catch
            {
                throw new Exception();
            }
            string uid = decodedToken.Uid;
            var user = await FirebaseAuth.DefaultInstance.GetUserAsync(uid);

            UserInfo userInfo = new UserInfo();
            userInfo.Email = user.Email;
            userInfo.Name = username;
            userInfo.UniversityId = universityId;
            userInfo.IsAdmin = false;
            userInfo.Status = true;

            try
            {
                _repository.Add(userInfo);
                _repository.SaveDbChange();
            } catch (Exception)
            {
                throw new Exception();
            }

            // Query account table in DB
            var account = _repository.GetFirstOrDefault(x => x.Email == user.Email);

            if (account == null) throw new UnauthorizedAccessException();

            var loginViewModel = new LoginViewModel
            {
                Id = account.Id,
                Email = account.Email,
                Name = account.Name,
                JwtToken = null
            };
            return loginViewModel;
        }

        //login
        public async Task<LoginViewModel> Login(LoginRequestModel loginRequestModel)
        {

            var userViewModel = await VerifyFirebaseTokenId(loginRequestModel.IdToken, loginRequestModel.deviceId);
            var claims = new List<Claim>
            {
                new(ClaimTypes.Email, userViewModel.Email),
                new(ClaimTypes.Name, userViewModel.Name),
            };

            var accessToken = GenerateAccessToken(claims);
            // var refreshToken = GenerateRefreshToken();

            userViewModel.JwtToken = accessToken;
            return userViewModel;
        }

        public async Task<LoginViewModel> VerifyFirebaseTokenId(string idToken, string deviceId)
        {
            FirebaseToken decodedToken;
            try
            {
                decodedToken = await FirebaseAuth.DefaultInstance
                       .VerifyIdTokenAsync(idToken);
            }
            catch
            {
                throw new Exception();
            }
            string uid = decodedToken.Uid;
            var user = await FirebaseAuth.DefaultInstance.GetUserAsync(uid);

            // Query account table in DB
            var account = _repository.GetFirstOrDefault(x => x.Email == user.Email);

            if (account == null) throw new UnauthorizedAccessException();

            if (deviceId != null)
            {
                try
                {
                    account.DeviceId = deviceId;
                    _repository.Update(account);
                    _repository.SaveDbChange();
                } catch (Exception)
                {
                    throw new Exception();
                }
                
            }

            var loginViewModel = new LoginViewModel
            {
                Id = account.Id,
                Email = account.Email,
                Name = account.Name,
                JwtToken = null
            };
            return loginViewModel;
        }

        public string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256Signature);
            /*var tokeOptions = new JwtSecurityToken(
                claims: claims,
                issuer: "https://securetoken.google.com/tutor-helper-6faa2",
                audience: "tutor-helper-6faa2",
                expires: DateTime.Now.AddDays(5),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
         */
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(5),
                SigningCredentials = signinCredentials,
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenStr = tokenHandler.WriteToken(token);

            return tokenStr;

        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience =
                    false, //you might want to validate the audience and issuer depending on your use case
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345")),
                ValidateLifetime = false //here we are saying that we don't care about the token's expiration date
            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);

            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");
            return principal;
        }
    }
}
