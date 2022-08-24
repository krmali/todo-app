using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using todo_api.ApiView;
using todo_api.Models;
using todo_api.Repositories;
using System.Security.Cryptography;
using System.Text;

namespace todo_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController: ControllerBase
{
    private readonly IPersonRepository _personRepository;
    private readonly IConfiguration _configuration;

    public AuthenticationController(
            IConfiguration configuration,
            IPersonRepository personRepository)
    {
        _configuration = configuration;
        _personRepository = personRepository;
    }

    private JwtSecurityToken GetToken(List<Claim> authClaims)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

        var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

        return token;
    }

    private string GetHashedPassword(string password)
    {
        var sha = SHA256.Create();
        var byteArrayPassword = Encoding.Default.GetBytes(password);
        var hashedPassword = sha.ComputeHash(byteArrayPassword);
        return Convert.ToBase64String(hashedPassword);
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] UserCred model)
    {
        var hashedPassword = GetHashedPassword(model.Password);
        var user = _personRepository.Get(model.Username, hashedPassword);
        if (user != null)
        {
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name , user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = GetToken(authClaims);

            return Ok(new
                    {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    personId = user.Id
                    });
        }
        return Unauthorized();
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] UserCred model)
    {
        if (model.Username == null)
            return StatusCode(StatusCodes.Status400BadRequest, new { Status = "Error", Message = "bad request" });

        var user = _personRepository.GetByUsername(model.Username);
        if (user != null)
            return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = "User already exists!" });

        Person newPerson = new Person
        {
            Username = model.Username,
            Password = GetHashedPassword(model.Password)
        };

        var saved = _personRepository.Create(newPerson);
        if (!saved)
            return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = "User creation failed! Please check user details and try again." });

        return Ok(new { Status = "Success", Message = "User created successfully!" });
    }
}

